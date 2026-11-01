import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@database/database.service';
import { EmailService } from '@modules/email/email.service';
import { AppLogger } from '@common/logger/logger.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly logger: AppLogger,
  ) {}

  private generateAccessToken(userId: string, email: string, roleId: string): string {
    const expiresIn = (this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '15m') as any;
    return this.jwtService.sign(
      { sub: userId, email, roleId },
      {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn,
      },
    );
  }

  private generateRefreshToken(userId: string): string {
    const expiresIn = (this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d') as any;
    return this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn,
      },
    );
  }

  async login(dto: LoginDto) {
    const user = await this.db.user.findUnique({ where: { email: dto.email } });
    if (!user || user.deletedAt) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    if (user.status !== 'active') {
      throw new UnauthorizedException('Your account has been suspended. Contact support.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const accessToken = this.generateAccessToken(user.id, user.email, user.roleId);
    const refreshToken = this.generateRefreshToken(user.id);

    // Hash and store refresh token
    const salt = await bcrypt.genSalt(10);
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
    await this.db.user.update({
      where: { id: user.id },
      data: { refreshTokenHash },
    });

    this.logger.log(`User logged in: ${user.email}`, 'AuthService');

    const { passwordHash, refreshTokenHash: _rt, verificationToken, passwordResetToken, passwordResetExpires, ...safeUser } = user as Record<string, unknown> & typeof user;
    void passwordHash; void _rt; void verificationToken; void passwordResetToken; void passwordResetExpires;

    return { accessToken, refreshToken, user: safeUser };
  }

  async register(dto: RegisterDto) {
    const existing = await this.db.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('An account with this email address already exists.');
    }

    // Resolve role — use provided roleId or find 'viewer' default
    let roleId = dto.roleId;
    if (!roleId) {
      const viewerRole = await this.db.role.findFirst({ where: { name: 'viewer' } });
      if (!viewerRole) throw new BadRequestException('Default viewer role not found. Please seed the database first.');
      roleId = viewerRole.id;
    } else {
      const roleExists = await this.db.role.findUnique({ where: { id: roleId } });
      if (!roleExists) throw new BadRequestException(`Role with ID "${roleId}" not found.`);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = await this.db.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash,
        roleId,
      },
    });

    const appUrl = this.configService.get<string>('resend.appUrl') || 'http://localhost:3000';
    await this.emailService.sendWelcomeEmail(user.email, user.firstName, `${appUrl}/login`).catch(() => {
      this.logger.warn(`Welcome email failed to send for ${user.email}`, 'AuthService');
    });

    this.logger.log(`New user registered: ${user.email}`, 'AuthService');

    const { passwordHash: _ph, refreshTokenHash, verificationToken, passwordResetToken, passwordResetExpires, ...safeUser } = user as Record<string, unknown> & typeof user;
    void _ph; void refreshTokenHash; void verificationToken; void passwordResetToken; void passwordResetExpires;

    return safeUser;
  }

  async refresh(rawRefreshToken: string) {
    let payload: { sub: string };
    try {
      payload = this.jwtService.verify<{ sub: string }>(rawRefreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or has expired. Please log in again.');
    }

    const user = await this.db.user.findFirst({
      where: { id: payload.sub, deletedAt: null },
    });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Session has been revoked. Please log in again.');
    }

    const isTokenValid = await bcrypt.compare(rawRefreshToken, user.refreshTokenHash);
    if (!isTokenValid) {
      throw new UnauthorizedException('Refresh token mismatch. Please log in again.');
    }

    const newAccessToken = this.generateAccessToken(user.id, user.email, user.roleId);
    const newRefreshToken = this.generateRefreshToken(user.id);

    const salt = await bcrypt.genSalt(10);
    const newRefreshHash = await bcrypt.hash(newRefreshToken, salt);
    await this.db.user.update({ where: { id: user.id }, data: { refreshTokenHash: newRefreshHash } });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: string): Promise<void> {
    const user = await this.db.user.findFirst({ where: { id: userId, deletedAt: null } });
    if (!user) throw new NotFoundException('User not found.');
    await this.db.user.update({ where: { id: userId }, data: { refreshTokenHash: null } });
    this.logger.log(`User logged out: ${user.email}`, 'AuthService');
  }
}

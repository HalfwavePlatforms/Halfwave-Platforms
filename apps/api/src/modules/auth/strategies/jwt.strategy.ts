import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@database/database.service';

interface JwtPayload {
  sub: string;
  email: string;
  roleId: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly db: DatabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessSecret') as string,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.db.user.findFirst({
      where: { id: payload.sub, deletedAt: null },
    });
    if (!user || user.status !== 'active') {
      throw new UnauthorizedException('User account is inactive or not found.');
    }
    return user; // attached to request.user
  }
}

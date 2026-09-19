import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from '@database/database.service';
import { PERMISSIONS_KEY } from '@common/decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly db: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Resolve required permissions metadata from controller class and method
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no specific permission requirements are tagged, allow access
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // 2. Retrieve user context attached to the request
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { id: string; roleId: string } }>();
    const user = request.user;

    if (!user || !user.roleId) {
      throw new ForbiddenException(
        'Access denied: Authenticated user context not found.',
      );
    }

    // 3. Query PostgreSQL to load the user\'s role and permissions
    const roleWithPermissions = await this.db.role.findUnique({
      where: { id: user.roleId },
      include: {
        permissions: {
          select: { name: true },
        },
      },
    });

    if (!roleWithPermissions) {
      throw new ForbiddenException(
        'Access denied: Target user role does not exist.',
      );
    }

    // Safeguard: Super Admin bypasses all checks to avoid lockouts on newly added keys
    if (roleWithPermissions.name === 'super_admin') {
      return true;
    }

    // Extract names of permissions associated with the role
    const userPermissions = roleWithPermissions.permissions.map((p: { name: string }) => p.name);

    // 4. Verify user has every required permission
    const hasAllPermissions = requiredPermissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasAllPermissions) {
      throw new ForbiddenException(
        'Access denied: You do not possess the required permissions.',
      );
    }

    return true;
  }
}

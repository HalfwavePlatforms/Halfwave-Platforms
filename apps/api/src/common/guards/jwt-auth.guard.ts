import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Can override canActivate to support public routes or request logs if needed
  override canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}

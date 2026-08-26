import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DatabaseService } from "../../database/database.service";
export declare class PermissionsGuard implements CanActivate {
    private readonly reflector;
    private readonly db;
    constructor(reflector: Reflector, db: DatabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

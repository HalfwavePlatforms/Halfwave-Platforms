import { DatabaseService } from "../../database/database.service";
import { Permission } from '@prisma/client';
export declare class PermissionsService {
    private readonly db;
    constructor(db: DatabaseService);
    findAll(): Promise<Permission[]>;
}

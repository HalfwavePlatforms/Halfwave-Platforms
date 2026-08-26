import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { Permission } from '@prisma/client';

@Injectable()
export class PermissionsService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Fetch all permissions registered in the database.
   */
  async findAll(): Promise<Permission[]> {
    return this.db.permission.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}

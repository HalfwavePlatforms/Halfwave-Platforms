import { DatabaseService } from "../../database/database.service";
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReorderServicesDto } from './dto/reorder-services.dto';
import { QueryServicesDto } from './dto/query-services.dto';
import { Service } from '@prisma/client';
export declare class ServicesService {
    private readonly db;
    constructor(db: DatabaseService);
    private slugify;
    create(dto: CreateServiceDto, userId: string): Promise<Service>;
    findAllActive(): Promise<Service[]>;
    findAllAdmin(query: QueryServicesDto): Promise<{
        data: ({
            createdBy: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            } | null;
            updatedBy: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            } | null;
        } & {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            title: string;
            summary: string;
            icon: string;
            displayOrder: number;
            isActive: boolean;
            slug: string;
            createdById: string | null;
            updatedById: string | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<Service>;
    update(id: string, dto: UpdateServiceDto, userId: string): Promise<Service>;
    remove(id: string, userId: string): Promise<Service>;
    reorder(dto: ReorderServicesDto, userId: string): Promise<void>;
}

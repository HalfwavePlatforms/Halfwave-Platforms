import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ReorderServicesDto } from './dto/reorder-services.dto';
import { QueryServicesDto } from './dto/query-services.dto';
import type { User } from '@prisma/client';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAllActive(): Promise<{
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
    }[]>;
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
    findOne(id: string): Promise<{
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
    }>;
    create(dto: CreateServiceDto, user: User): Promise<{
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
    }>;
    reorder(dto: ReorderServicesDto, user: User): Promise<void>;
    update(id: string, dto: UpdateServiceDto, user: User): Promise<{
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
    }>;
    remove(id: string, user: User): Promise<{
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
    }>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let ServicesService = class ServicesService {
    db;
    constructor(db) {
        this.db = db;
    }
    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }
    async create(dto, userId) {
        const slug = this.slugify(dto.title);
        const existing = await this.db.service.findFirst({
            where: { slug, deletedAt: null },
        });
        if (existing) {
            throw new common_1.ConflictException(`A service with the slug "${slug}" generated from title already exists.`);
        }
        return this.db.service.create({
            data: {
                title: dto.title,
                slug,
                summary: dto.summary,
                description: dto.description,
                icon: dto.icon,
                displayOrder: dto.displayOrder ?? 0,
                isActive: dto.isActive ?? true,
                createdBy: userId ? { connect: { id: userId } } : undefined,
            },
        });
    }
    async findAllActive() {
        return this.db.service.findMany({
            where: {
                isActive: true,
                deletedAt: null,
            },
            orderBy: {
                displayOrder: 'asc',
            },
        });
    }
    async findAllAdmin(query) {
        const { page, limit, isActive } = query;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
        };
        if (isActive !== undefined) {
            where.isActive = isActive;
        }
        const [data, total] = await Promise.all([
            this.db.service.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    displayOrder: 'asc',
                },
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    updatedBy: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.db.service.count({ where }),
        ]);
        const totalPages = Math.ceil(total / limit);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages,
            },
        };
    }
    async findOne(id) {
        const service = await this.db.service.findFirst({
            where: { id, deletedAt: null },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                updatedBy: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID "${id}" not found.`);
        }
        return service;
    }
    async update(id, dto, userId) {
        await this.findOne(id);
        const updateData = {
            title: dto.title,
            summary: dto.summary,
            description: dto.description,
            icon: dto.icon,
            displayOrder: dto.displayOrder,
            isActive: dto.isActive,
            updatedBy: userId ? { connect: { id: userId } } : undefined,
        };
        if (dto.title) {
            const slug = this.slugify(dto.title);
            const existing = await this.db.service.findFirst({
                where: {
                    slug,
                    id: { not: id },
                    deletedAt: null,
                },
            });
            if (existing) {
                throw new common_1.ConflictException(`A service with the slug "${slug}" already exists.`);
            }
            updateData.slug = slug;
        }
        return this.db.service.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id, userId) {
        await this.findOne(id);
        return this.db.service.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                updatedBy: userId ? { connect: { id: userId } } : undefined,
            },
        });
    }
    async reorder(dto, userId) {
        await this.db.$transaction(dto.orders.map((item) => this.db.service.update({
            where: { id: item.id },
            data: {
                displayOrder: item.displayOrder,
                updatedBy: userId ? { connect: { id: userId } } : undefined,
            },
        })));
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ServicesService);
//# sourceMappingURL=services.service.js.map
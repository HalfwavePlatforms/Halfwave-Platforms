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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let RolesService = class RolesService {
    db;
    constructor(db) {
        this.db = db;
    }
    async create(dto) {
        const existingRole = await this.db.role.findUnique({
            where: { name: dto.name.toLowerCase() },
        });
        if (existingRole) {
            throw new common_1.ConflictException(`Role with name "${dto.name}" already exists.`);
        }
        const { permissionIds, name, description } = dto;
        return this.db.role.create({
            data: {
                name: name.toLowerCase(),
                description,
                permissions: permissionIds
                    ? {
                        connect: permissionIds.map((id) => ({ id })),
                    }
                    : undefined,
            },
            include: {
                permissions: true,
            },
        });
    }
    async findAll() {
        return this.db.role.findMany({
            include: {
                permissions: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
    async findOne(id) {
        const role = await this.db.role.findUnique({
            where: { id },
            include: {
                permissions: true,
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID "${id}" not found.`);
        }
        return role;
    }
    async update(id, dto) {
        const role = await this.db.role.findUnique({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID "${id}" not found.`);
        }
        const { permissionIds, name, description } = dto;
        if (name && name.toLowerCase() !== role.name) {
            const existingName = await this.db.role.findUnique({
                where: { name: name.toLowerCase() },
            });
            if (existingName) {
                throw new common_1.ConflictException(`Role with name "${name}" already exists.`);
            }
        }
        return this.db.role.update({
            where: { id },
            data: {
                name: name ? name.toLowerCase() : undefined,
                description,
                permissions: permissionIds
                    ? {
                        set: permissionIds.map((pid) => ({ id: pid })),
                    }
                    : undefined,
            },
            include: {
                permissions: true,
            },
        });
    }
    async remove(id) {
        const role = await this.db.role.findUnique({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID "${id}" not found.`);
        }
        const assignedUsersCount = await this.db.user.count({
            where: { roleId: id },
        });
        if (assignedUsersCount > 0) {
            throw new common_1.BadRequestException(`Access denied: You cannot delete the role "${role.name}" because it is currently assigned to ${assignedUsersCount} active users.`);
        }
        return this.db.role.delete({
            where: { id },
        });
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RolesService);
//# sourceMappingURL=roles.service.js.map
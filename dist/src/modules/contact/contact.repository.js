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
exports.ContactRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
let ContactRepository = class ContactRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        return this.db.contactSubmission.create({
            data,
        });
    }
    async findAll(params) {
        const { page, limit, search, status, sortBy = 'createdAt', sortOrder = 'desc', } = params;
        const skip = (page - 1) * limit;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { company: { contains: search, mode: 'insensitive' } },
                { serviceInterested: { contains: search, mode: 'insensitive' } },
                { message: { contains: search, mode: 'insensitive' } },
            ];
        }
        const whitelistedSortFields = [
            'name',
            'email',
            'company',
            'serviceInterested',
            'status',
            'createdAt',
            'updatedAt',
        ];
        const orderField = whitelistedSortFields.includes(sortBy)
            ? sortBy
            : 'createdAt';
        const [data, total] = await Promise.all([
            this.db.contactSubmission.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    [orderField]: sortOrder,
                },
                include: {
                    assignee: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),
            this.db.contactSubmission.count({ where }),
        ]);
        return { data, total };
    }
    async findOne(id) {
        return this.db.contactSubmission.findUnique({
            where: { id },
            include: {
                assignee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
    }
    async update(id, data) {
        return this.db.contactSubmission.update({
            where: { id },
            data,
            include: {
                assignee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
    }
    async remove(id) {
        return this.db.contactSubmission.delete({
            where: { id },
        });
    }
};
exports.ContactRepository = ContactRepository;
exports.ContactRepository = ContactRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ContactRepository);
//# sourceMappingURL=contact.repository.js.map
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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const contact_repository_1 = require("./contact.repository");
const database_service_1 = require("../../database/database.service");
let ContactService = class ContactService {
    contactRepository;
    db;
    constructor(contactRepository, db) {
        this.contactRepository = contactRepository;
        this.db = db;
    }
    async submit(dto) {
        return this.contactRepository.create(dto);
    }
    async findAll(queryDto) {
        const { page, limit, search, status, sortBy, sortOrder } = queryDto;
        const { data, total } = await this.contactRepository.findAll({
            page,
            limit,
            search,
            status,
            sortBy,
            sortOrder,
        });
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
        const enquiry = await this.contactRepository.findOne(id);
        if (!enquiry) {
            throw new common_1.NotFoundException(`Enquiry with ID "${id}" not found.`);
        }
        return enquiry;
    }
    async updateStatus(id, dto) {
        await this.findOne(id);
        if (dto.assignedTo) {
            const userExists = await this.db.user.findUnique({
                where: { id: dto.assignedTo },
            });
            if (!userExists) {
                throw new common_1.BadRequestException(`Staff assignment failed: User with ID "${dto.assignedTo}" does not exist.`);
            }
        }
        const updateData = {
            status: dto.status,
        };
        if (dto.assignedTo !== undefined) {
            updateData.assignee = dto.assignedTo
                ? { connect: { id: dto.assignedTo } }
                : { disconnect: true };
        }
        return this.contactRepository.update(id, updateData);
    }
    async addNotes(id, dto) {
        await this.findOne(id);
        return this.contactRepository.update(id, {
            internalNotes: dto.notes,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.contactRepository.remove(id);
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contact_repository_1.ContactRepository,
        database_service_1.DatabaseService])
], ContactService);
//# sourceMappingURL=contact.service.js.map
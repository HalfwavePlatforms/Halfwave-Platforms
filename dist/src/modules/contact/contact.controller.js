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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_service_1 = require("./contact.service");
const submit_enquiry_dto_1 = require("./dto/submit-enquiry.dto");
const query_enquiries_dto_1 = require("./dto/query-enquiries.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const add_notes_dto_1 = require("./dto/add-notes.dto");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let ContactController = class ContactController {
    contactService;
    constructor(contactService) {
        this.contactService = contactService;
    }
    submit(dto) {
        return this.contactService.submit(dto);
    }
    findAll(queryDto) {
        return this.contactService.findAll(queryDto);
    }
    findOne(id) {
        return this.contactService.findOne(id);
    }
    updateStatus(id, dto) {
        return this.contactService.updateStatus(id, dto);
    }
    addNotes(id, dto) {
        return this.contactService.addNotes(id, dto);
    }
    remove(id) {
        return this.contactService.remove(id);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Submit a new public contact request enquiry' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Contact enquiry submitted successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Validation failed for input variables.',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_enquiry_dto_1.SubmitEnquiryDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "submit", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all contact enquiries (Paginated, Filtered, Sorted) - Admin Only',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of enquiries returned.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Missing or invalid token.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Missing contact:read permission.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Get)('admin'),
    (0, permissions_decorator_1.RequirePermissions)('contact:read'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_enquiries_dto_1.QueryEnquiriesDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'View a specific contact enquiry by ID - Admin Only',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique enquiry UUID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Enquiry details returned.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Enquiry not found.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Get)('admin/:id'),
    (0, permissions_decorator_1.RequirePermissions)('contact:read'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update status or assign manager to an enquiry - Admin Only',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique enquiry UUID to update' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Status updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid status or missing staff UUID.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Patch)('admin/:id/status'),
    (0, permissions_decorator_1.RequirePermissions)('contact:write'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateEnquiryStatusDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "updateStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Add internal coordination notes to an enquiry - Admin Only',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique enquiry UUID to append comments to',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Internal notes saved.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Patch)('admin/:id/notes'),
    (0, permissions_decorator_1.RequirePermissions)('contact:write'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_notes_dto_1.AddInternalNotesDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "addNotes", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Permanently delete an enquiry record - Admin Only',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique enquiry UUID to delete' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Enquiry deleted.' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Delete)('admin/:id'),
    (0, permissions_decorator_1.RequirePermissions)('contact:write'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "remove", null);
exports.ContactController = ContactController = __decorate([
    (0, swagger_1.ApiTags)('Contacts'),
    (0, common_1.Controller)('contacts'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map
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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_service_1 = require("./services.service");
const create_service_dto_1 = require("./dto/create-service.dto");
const update_service_dto_1 = require("./dto/update-service.dto");
const reorder_services_dto_1 = require("./dto/reorder-services.dto");
const query_services_dto_1 = require("./dto/query-services.dto");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let ServicesController = class ServicesController {
    servicesService;
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    findAllActive() {
        return this.servicesService.findAllActive();
    }
    findAllAdmin(query) {
        return this.servicesService.findAllAdmin(query);
    }
    findOne(id) {
        return this.servicesService.findOne(id);
    }
    create(dto, user) {
        return this.servicesService.create(dto, user.id);
    }
    reorder(dto, user) {
        return this.servicesService.reorder(dto, user.id);
    }
    update(id, dto, user) {
        return this.servicesService.update(id, dto, user.id);
    }
    remove(id, user) {
        return this.servicesService.remove(id, user.id);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get all active services sorted by display order (Public API)',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Flat list of active services returned successfully.',
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAllActive", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get paginated list of all services - Admin Only' }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Catalog table rows returned.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'Missing or invalid token.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Missing services:read permission.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Get)('admin'),
    (0, permissions_decorator_1.RequirePermissions)('services:read'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_services_dto_1.QueryServicesDto]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAllAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'View a specific service detail by ID - Admin Only',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique service UUID' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service details returned.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Service not found.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Get)('admin/:id'),
    (0, permissions_decorator_1.RequirePermissions)('services:read'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new service - Admin Only' }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Service registered successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'Service with generated slug already exists.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Post)('admin'),
    (0, permissions_decorator_1.RequirePermissions)('services:write'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto, Object]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Bulk reorder services display orders - Admin Only',
    }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Reordering successfully applied.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Patch)('admin/reorder'),
    (0, permissions_decorator_1.RequirePermissions)('services:write'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reorder_services_dto_1.ReorderServicesDto, Object]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "reorder", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update service details - Admin Only' }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique service UUID to update' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Service not found.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Patch)('admin/:id'),
    (0, permissions_decorator_1.RequirePermissions)('services:write'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_service_dto_1.UpdateServiceDto, Object]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Soft-delete a service - Admin Only' }),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Unique service UUID to delete' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Service soft-deleted.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Service not found.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    (0, common_1.Delete)('admin/:id'),
    (0, permissions_decorator_1.RequirePermissions)('services:write'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "remove", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)('Services'),
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map
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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const email_provider_interface_1 = require("./providers/email-provider.interface");
const email_templates_1 = require("./templates/email-templates");
const logger_service_1 = require("../../common/logger/logger.service");
let EmailService = class EmailService {
    provider;
    configService;
    logger;
    constructor(provider, configService, logger) {
        this.provider = provider;
        this.configService = configService;
        this.logger = logger;
    }
    compileTemplate(html, variables) {
        let rendered = html;
        for (const [key, value] of Object.entries(variables)) {
            const escapedKey = key.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
            rendered = rendered.replace(new RegExp(`{{${escapedKey}}}`, 'g'), value || '');
        }
        return rendered;
    }
    async sendWelcomeEmail(to, name, loginLink) {
        try {
            const html = this.compileTemplate(email_templates_1.welcomeTemplate, { name, loginLink });
            await this.provider.send({
                to,
                subject: 'Welcome to Halfwave Platforms Admin Panel',
                html,
            });
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            this.logger.error(`Failed to send welcome email to ${to}: ${msg}`, stack, 'EmailService');
        }
    }
    async sendContactConfirmationEmail(to, name, serviceInterested, message) {
        try {
            const html = this.compileTemplate(email_templates_1.contactConfirmationTemplate, {
                name,
                serviceInterested,
                message,
            });
            await this.provider.send({
                to,
                subject: 'We have received your enquiry - Halfwave Platforms',
                html,
            });
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            this.logger.error(`Failed to send contact confirmation to ${to}: ${msg}`, stack, 'EmailService');
        }
    }
    async sendAdminNotificationEmail(enquiry) {
        const adminEmail = this.configService.get('ADMIN_EMAIL') ||
            'admin@halfwaveplatforms.com';
        const baseUrl = this.configService.get('APP_URL') || 'http://localhost:3000';
        const adminLink = `${baseUrl}/api/v1/contacts/admin/${enquiry.id}`;
        try {
            const html = this.compileTemplate(email_templates_1.adminNotificationTemplate, {
                name: enquiry.name,
                email: enquiry.email,
                phone: enquiry.phone || 'N/A',
                company: enquiry.company || 'N/A',
                serviceInterested: enquiry.serviceInterested,
                budget: enquiry.budget || 'N/A',
                message: enquiry.message,
                adminLink,
            });
            await this.provider.send({
                to: adminEmail,
                subject: `⚠️ New Lead Alert: ${enquiry.serviceInterested} from ${enquiry.name}`,
                html,
            });
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            this.logger.error(`Failed to send admin lead notification email: ${msg}`, stack, 'EmailService');
        }
    }
    async sendPasswordResetEmail(to, name, resetLink, expiryTime) {
        try {
            const html = this.compileTemplate(email_templates_1.passwordResetTemplate, {
                name,
                resetLink,
                expiryTime,
            });
            await this.provider.send({
                to,
                subject: 'Reset your Halfwave Platforms password',
                html,
            });
        }
        catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            this.logger.error(`Failed to send password reset email to ${to}: ${msg}`, stack, 'EmailService');
            throw new common_1.InternalServerErrorException('Failed to dispatch password reset email. Please try again later.');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(email_provider_interface_1.EMAIL_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService,
        logger_service_1.AppLogger])
], EmailService);
//# sourceMappingURL=email.service.js.map
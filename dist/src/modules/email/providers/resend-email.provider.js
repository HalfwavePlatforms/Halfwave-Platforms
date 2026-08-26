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
exports.ResendEmailProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ResendEmailProvider = class ResendEmailProvider {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async send(options) {
        const apiKey = this.configService.get('RESEND_API_KEY');
        const defaultFrom = this.configService.get('EMAIL_FROM') ||
            'noreply@halfwaveplatforms.com';
        if (!apiKey) {
            throw new common_1.InternalServerErrorException('Email transmission failed: RESEND_API_KEY is not configured in the application environment.');
        }
        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: options.from || defaultFrom,
                    to: [options.to],
                    subject: options.subject,
                    html: options.html,
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Resend API returned status code ${response.status}: ${errorText}`);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Email dispatch failure: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
};
exports.ResendEmailProvider = ResendEmailProvider;
exports.ResendEmailProvider = ResendEmailProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ResendEmailProvider);
//# sourceMappingURL=resend-email.provider.js.map
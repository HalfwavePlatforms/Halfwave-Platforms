import { ConfigService } from '@nestjs/config';
import type { EmailProvider } from './providers/email-provider.interface';
import { AppLogger } from "../../common/logger/logger.service";
export declare class EmailService {
    private readonly provider;
    private readonly configService;
    private readonly logger;
    constructor(provider: EmailProvider, configService: ConfigService, logger: AppLogger);
    private compileTemplate;
    sendWelcomeEmail(to: string, name: string, loginLink: string): Promise<void>;
    sendContactConfirmationEmail(to: string, name: string, serviceInterested: string, message: string): Promise<void>;
    sendAdminNotificationEmail(enquiry: {
        id: string;
        name: string;
        email: string;
        phone?: string;
        company?: string;
        serviceInterested: string;
        budget?: string;
        message: string;
    }): Promise<void>;
    sendPasswordResetEmail(to: string, name: string, resetLink: string, expiryTime: string): Promise<void>;
}

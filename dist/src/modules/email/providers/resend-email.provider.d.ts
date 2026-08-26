import { ConfigService } from '@nestjs/config';
import { EmailProvider, SendEmailOptions } from './email-provider.interface';
export declare class ResendEmailProvider implements EmailProvider {
    private readonly configService;
    constructor(configService: ConfigService);
    send(options: SendEmailOptions): Promise<void>;
}

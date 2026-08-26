import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { EMAIL_PROVIDER_TOKEN } from './providers/email-provider.interface';
import { ResendEmailProvider } from './providers/resend-email.provider';
import { LoggerModule } from '@common/logger/logger.module';

@Global()
@Module({
  imports: [LoggerModule],
  providers: [
    EmailService,
    {
      // Dependency Inversion: Map the token to the Resend implementation
      provide: EMAIL_PROVIDER_TOKEN,
      useClass: ResendEmailProvider,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}

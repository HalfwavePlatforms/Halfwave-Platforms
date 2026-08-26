import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EMAIL_PROVIDER_TOKEN } from './providers/email-provider.interface';
import type { EmailProvider } from './providers/email-provider.interface';
import {
  welcomeTemplate,
  contactConfirmationTemplate,
  adminNotificationTemplate,
  passwordResetTemplate,
} from './templates/email-templates';
import { AppLogger } from '@common/logger/logger.service';

@Injectable()
export class EmailService {
  constructor(
    @Inject(EMAIL_PROVIDER_TOKEN)
    private readonly provider: EmailProvider,
    private readonly configService: ConfigService,
    private readonly logger: AppLogger,
  ) {}

  /**
   * Helper utility to perform simple regex placeholder replacements.
   */
  private compileTemplate(
    html: string,
    variables: Record<string, string>,
  ): string {
    let rendered = html;
    for (const [key, value] of Object.entries(variables)) {
      // Escape special characters to prevent regex crashes
      const escapedKey = key.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      rendered = rendered.replace(
        new RegExp(`{{${escapedKey}}}`, 'g'),
        value || '',
      );
    }
    return rendered;
  }

  /**
   * Dispatch welcome email to new administrators.
   */
  async sendWelcomeEmail(
    to: string,
    name: string,
    loginLink: string,
  ): Promise<void> {
    try {
      const html = this.compileTemplate(welcomeTemplate, { name, loginLink });
      await this.provider.send({
        to,
        subject: 'Welcome to Halfwave Platforms Admin Panel',
        html,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to send welcome email to ${to}: ${msg}`,
        stack,
        'EmailService',
      );
    }
  }

  /**
   * Dispatch acknowledgement confirmation to a prospective client who submitted an enquiry.
   */
  async sendContactConfirmationEmail(
    to: string,
    name: string,
    serviceInterested: string,
    message: string,
  ): Promise<void> {
    try {
      const html = this.compileTemplate(contactConfirmationTemplate, {
        name,
        serviceInterested,
        message,
      });
      await this.provider.send({
        to,
        subject: 'We have received your enquiry - Halfwave Platforms',
        html,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to send contact confirmation to ${to}: ${msg}`,
        stack,
        'EmailService',
      );
    }
  }

  /**
   * Notify administrators about a newly submitted contact enquiry.
   */
  async sendAdminNotificationEmail(enquiry: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    serviceInterested: string;
    budget?: string;
    message: string;
  }): Promise<void> {
    const adminEmail =
      this.configService.get<string>('ADMIN_EMAIL') ||
      'admin@halfwaveplatforms.com';
    const baseUrl =
      this.configService.get<string>('APP_URL') || 'http://localhost:3000';
    const adminLink = `${baseUrl}/api/v1/contacts/admin/${enquiry.id}`;

    try {
      const html = this.compileTemplate(adminNotificationTemplate, {
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
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to send admin lead notification email: ${msg}`,
        stack,
        'EmailService',
      );
    }
  }

  /**
   * Dispatch secure password reset links.
   */
  async sendPasswordResetEmail(
    to: string,
    name: string,
    resetLink: string,
    expiryTime: string,
  ): Promise<void> {
    try {
      const html = this.compileTemplate(passwordResetTemplate, {
        name,
        resetLink,
        expiryTime,
      });
      await this.provider.send({
        to,
        subject: 'Reset your Halfwave Platforms password',
        html,
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to send password reset email to ${to}: ${msg}`,
        stack,
        'EmailService',
      );
      throw new InternalServerErrorException(
        'Failed to dispatch password reset email. Please try again later.',
      );
    }
  }
}

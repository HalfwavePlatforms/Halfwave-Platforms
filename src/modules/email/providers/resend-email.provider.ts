import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailProvider, SendEmailOptions } from './email-provider.interface';

@Injectable()
export class ResendEmailProvider implements EmailProvider {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Send an email using Resend\'s HTTPS REST endpoint.
   */
  async send(options: SendEmailOptions): Promise<void> {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    const defaultFrom =
      this.configService.get<string>('EMAIL_FROM') ||
      'noreply@halfwaveplatforms.com';

    if (!apiKey) {
      throw new InternalServerErrorException(
        'Email transmission failed: RESEND_API_KEY is not configured in the application environment.',
      );
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
        throw new Error(
          `Resend API returned status code ${response.status}: ${errorText}`,
        );
      }
    } catch (error: unknown) {
      throw new InternalServerErrorException(
        `Email dispatch failure: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

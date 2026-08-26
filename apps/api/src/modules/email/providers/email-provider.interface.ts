export const EMAIL_PROVIDER_TOKEN = 'EmailProviderToken';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export interface EmailProvider {
  /**
   * Send an email payload using the active provider integration.
   * Resolves on successful dispatch, throws error on failure.
   */
  send(options: SendEmailOptions): Promise<void>;
}

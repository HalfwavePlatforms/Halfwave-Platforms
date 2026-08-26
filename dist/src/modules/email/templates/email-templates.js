"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetTemplate = exports.adminNotificationTemplate = exports.contactConfirmationTemplate = exports.welcomeTemplate = void 0;
const baseStyles = `
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  background-color: #f8fafc;
  margin: 0;
  padding: 40px 0;
  width: 100%;
`;
const cardStyles = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
`;
const headerStyles = `
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 32px;
  text-align: center;
`;
const bodyStyles = `
  padding: 40px 32px;
  color: #334155;
  font-size: 16px;
  line-height: 24px;
`;
const footerStyles = `
  background-color: #f1f5f9;
  padding: 24px 32px;
  text-align: center;
  font-size: 12px;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
`;
const buttonStyles = `
  display: inline-block;
  background-color: #3b82f6;
  color: #ffffff;
  padding: 12px 24px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  margin-top: 16px;
  text-align: center;
`;
exports.welcomeTemplate = `
<div style="${baseStyles}">
  <table style="${cardStyles}" cellpadding="0" cellspacing="0">
    <tr>
      <td style="${headerStyles}">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: -0.025em;">Halfwave Platforms</h1>
      </td>
    </tr>
    <tr>
      <td style="${bodyStyles}">
        <h2 style="color: #0f172a; font-size: 20px; margin-top: 0; font-weight: 600;">Welcome to the Platform, {{name}}!</h2>
        <p>Your administrator account has been set up successfully. You now have access to manage our CMS settings, candidate job applications, and inbound leads.</p>
        <p>Please click the link below to sign into your dashboard and get started:</p>
        <a href="{{loginLink}}" target="_blank" style="${buttonStyles}">Access Admin Dashboard</a>
        <p style="margin-top: 24px; font-size: 14px; color: #64748b;">If you have any questions or require support, please contact system administration.</p>
      </td>
    </tr>
    <tr>
      <td style="${footerStyles}">
        <p style="margin: 0 0 8px 0;">&copy; 2026 Halfwave Platforms. All rights reserved.</p>
        <p style="margin: 0;">This is an automated notification. Please do not reply to this email.</p>
      </td>
    </tr>
  </table>
</div>
`;
exports.contactConfirmationTemplate = `
<div style="${baseStyles}">
  <table style="${cardStyles}" cellpadding="0" cellspacing="0">
    <tr>
      <td style="${headerStyles}">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: -0.025em;">Halfwave Platforms</h1>
      </td>
    </tr>
    <tr>
      <td style="${bodyStyles}">
        <h2 style="color: #0f172a; font-size: 20px; margin-top: 0; font-weight: 600;">Thank you for reaching out, {{name}}!</h2>
        <p>We have successfully received your enquiry regarding <strong>{{serviceInterested}}</strong>.</p>
        <p>One of our platform solution specialists will review your requirements and get back to you within 24 business hours.</p>
        <p>Here is a copy of your request for your records:</p>
        <blockquote style="border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 20px 0; background-color: #f8fafc; font-style: italic; color: #475569;">
          "{{message}}"
        </blockquote>
        <p style="font-size: 14px; color: #64748b;">Kind regards,<br>The Halfwave Platforms Team</p>
      </td>
    </tr>
    <tr>
      <td style="${footerStyles}">
        <p style="margin: 0 0 8px 0;">&copy; 2026 Halfwave Platforms. All rights reserved.</p>
        <p style="margin: 0;">You received this email because you submitted a contact request form on our website.</p>
      </td>
    </tr>
  </table>
</div>
`;
exports.adminNotificationTemplate = `
<div style="${baseStyles}">
  <table style="${cardStyles}" cellpadding="0" cellspacing="0">
    <tr>
      <td style="${headerStyles}">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: -0.025em;">Halfwave Platforms</h1>
      </td>
    </tr>
    <tr>
      <td style="${bodyStyles}">
        <h2 style="color: #ef4444; font-size: 20px; margin-top: 0; font-weight: 600;">New Inbound Enquiry Received</h2>
        <p>A new contact enquiry has been submitted. Please review the details below in your CRM administration portal:</p>
        <table width="100%" cellpadding="8" cellspacing="0" style="margin: 20px 0; border: 1px solid #e2e8f0; border-collapse: collapse; font-size: 14px;">
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td width="35%" style="font-weight: 600; color: #475569;">Name:</td>
            <td>{{name}}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #475569;">Email:</td>
            <td><a href="mailto:{{email}}" style="color: #3b82f6;">{{email}}</a></td>
          </tr>
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #475569;">Phone:</td>
            <td>{{phone}}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #475569;">Company:</td>
            <td>{{company}}</td>
          </tr>
          <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #475569;">Interested In:</td>
            <td>{{serviceInterested}}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="font-weight: 600; color: #475569;">Budget:</td>
            <td>{{budget}}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #475569; vertical-align: top;">Message:</td>
            <td>{{message}}</td>
          </tr>
        </table>
        <a href="{{adminLink}}" target="_blank" style="${buttonStyles}">Open Enquiry in CRM</a>
      </td>
    </tr>
    <tr>
      <td style="${footerStyles}">
        <p style="margin: 0 0 8px 0;">&copy; 2026 Halfwave Platforms. All rights reserved.</p>
        <p style="margin: 0;">This is an internal system notification.</p>
      </td>
    </tr>
  </table>
</div>
`;
exports.passwordResetTemplate = `
<div style="${baseStyles}">
  <table style="${cardStyles}" cellpadding="0" cellspacing="0">
    <tr>
      <td style="${headerStyles}">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700; letter-spacing: -0.025em;">Halfwave Platforms</h1>
      </td>
    </tr>
    <tr>
      <td style="${bodyStyles}">
        <h2 style="color: #0f172a; font-size: 20px; margin-top: 0; font-weight: 600;">Reset Your Password</h2>
        <p>Hello {{name}},</p>
        <p>We received a request to reset the password associated with your Halfwave Platforms account. Click the button below to configure your new credentials:</p>
        <a href="{{resetLink}}" target="_blank" style="${buttonStyles}">Reset Password</a>
        <p style="margin-top: 24px;">Note: This link will expire in <strong>{{expiryTime}}</strong> for security purposes.</p>
        <p style="font-size: 14px; color: #64748b;">If you did not request a password reset, you can safely ignore this email. Your current credentials will remain secure.</p>
      </td>
    </tr>
    <tr>
      <td style="${footerStyles}">
        <p style="margin: 0 0 8px 0;">&copy; 2026 Halfwave Platforms. All rights reserved.</p>
        <p style="margin: 0;">This is a security notification sent regarding your platform profile.</p>
      </td>
    </tr>
  </table>
</div>
`;
//# sourceMappingURL=email-templates.js.map
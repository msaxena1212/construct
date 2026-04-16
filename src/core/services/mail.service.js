const nodemailer = require("nodemailer");
require("dotenv").config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: process.env.MAIL_PORT || 587,
      secure: process.env.MAIL_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(to, subject, htmlContent) {
    try {
      const mailOptions = {
        from: process.env.MAIL_FROM || '"Zyno Admin" <no-reply@zynoconstruction.com>',
        to,
        subject,
        html: htmlContent,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[MAIL SERVICE] Email sent successfully to ${to}. Message ID: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error(`[MAIL SERVICE ERROR] Failed to send email to ${to}: `, error);
      throw error;
    }
  }

  // Template pre-builders for reusability:
  async sendInviteEmail(to, firstname, companyName, inviteToken) {
    // We assume the frontend is running locally on 4200 for accepting invites. Make this dynamic if needed.
    const acceptUrl = `http://localhost:4200/accept-invite?token=${inviteToken}`;

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; padding: 20px; border: 1px solid #ddd; border-top: 5px solid #2563eb; border-radius: 5px;">
        <h2 style="color: #2563eb;">Welcome to Zyno Construction!</h2>
        <p>Hi ${firstname},</p>
        <p>You have been invited to join the <strong>${companyName}</strong> team workspace upon the Zyno Platform.</p>
        
        <p>To finalize your account setup, establish your credentials by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${acceptUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Accept Invitation & Setup Account
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="font-size: 14px; color: #666; word-break: break-all;">${acceptUrl}</p>

        <p style="margin-top: 40px; font-size: 12px; color: #999;">
          This is an automated message. Please do not reply directly to this email.
        </p>
      </div>
    `;

    return this.sendMail(to, `Invitation to join ${companyName} on Zyno`, htmlTemplate);
  }
}

module.exports = new MailService();

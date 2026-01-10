import nodemailer from "nodemailer";

// SMTP configuration from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Parse comma-separated recipients from environment
function getRecipients(): string[] {
  const recipients = process.env.CONTACT_EMAIL_RECIPIENTS || "";
  return recipients
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

// Check if email is configured
export function isEmailConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_EMAIL_RECIPIENTS
  );
}

interface ContactFormData {
  name: string;
  phone: string;
  message?: string | null;
}

// Simple HTML escape function
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

// Generate simple HTML email template
function generateContactEmailHtml(data: ContactFormData): string {
  const messageSection = data.message
    ? `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Mesaj</td>
        <td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
      </tr>`
    : "";

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
    Yeni Iletisim Formu Gonderimi
  </h2>

  <p style="margin-bottom: 20px;">Web sitenizden yeni bir iletisim formu gonderildi:</p>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9; width: 120px;">Ad Soyad</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td>
    </tr>
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9;">Telefon</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(data.phone)}</td>
    </tr>
    ${messageSection}
  </table>

  <p style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
    Bu e-posta CT Prefabrik web sitesi iletisim formu tarafindan otomatik olarak gonderilmistir.
  </p>
</body>
</html>
  `.trim();
}

// Generate plain text version
function generateContactEmailText(data: ContactFormData): string {
  let text = `Yeni Iletisim Formu Gonderimi\n\n`;
  text += `Ad Soyad: ${data.name}\n`;
  text += `Telefon: ${data.phone}\n`;
  if (data.message) {
    text += `Mesaj: ${data.message}\n`;
  }
  text += `\n---\nBu e-posta CT Prefabrik web sitesi iletisim formu tarafindan otomatik olarak gonderilmistir.`;
  return text;
}

// Send contact form notification email
export async function sendContactNotification(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    console.warn("Email not configured, skipping notification");
    return { success: false, error: "Email not configured" };
  }

  const recipients = getRecipients();
  if (recipients.length === 0) {
    console.warn("No email recipients configured");
    return { success: false, error: "No recipients configured" };
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipients.join(", "),
      subject: `Yeni Iletisim Formu: ${data.name}`,
      text: generateContactEmailText(data),
      html: generateContactEmailHtml(data),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

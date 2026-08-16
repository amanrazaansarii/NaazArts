import { Resend } from 'resend';
import { config } from './config';

const resend = config.resend.apiKey ? new Resend(config.resend.apiKey) : null;

export interface SendOrderConfirmationParams {
  toEmail: string;
  recipientName: string;
  orderId: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    color?: string;
  }>;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingUrl: string;
}

export async function sendOrderConfirmationEmail(params: SendOrderConfirmationParams) {
  if (!resend) {
    console.warn('[Email] Resend API key is not configured. Skipping email dispatch.');
    return { success: false, reason: 'Missing API key' };
  }

  const itemsHtml = params.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #E8E5E1; font-family: 'Cabinet Grotesk', -apple-system, sans-serif; font-size: 14px; color: #2D2C2A;">
          <strong>${item.name}</strong> ${item.color ? `<span style="color: #7D7973;">(${item.color})</span>` : ''} × ${item.quantity}
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #E8E5E1; text-align: right; font-family: 'Cabinet Grotesk', -apple-system, sans-serif; font-size: 14px; color: #2D2C2A;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>`
    )
    .join('');

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Naaz Arts — Order Confirmation ${params.orderId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2D2C2A;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E8E5E1; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #B56142; padding: 36px 30px; text-align: center;">
              <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #F7E8E1; font-weight: 600; display: block; margin-bottom: 6px;">Handmade Concrete Studio</span>
              <h1 style="margin: 0; color: #FFFFFF; font-size: 26px; font-weight: 400; letter-spacing: -0.5px;">Naaz Arts</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="margin: 0 0 12px; font-size: 20px; color: #2D2C2A; font-weight: 600;">Order Confirmed: ${params.orderId}</h2>
              <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #615E59;">
                Dear ${params.recipientName},<br/><br/>
                Thank you for patronizing Naaz Arts. Your handcrafted concrete art pieces have entered our studio schedule and are currently preparing for mold mixing and curing.
              </p>

              <!-- Order Summary Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <thead>
                  <tr>
                    <th align="left" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9E9A93; border-bottom: 2px solid #E8E5E1;">Item</th>
                    <th align="right" style="padding-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9E9A93; border-bottom: 2px solid #E8E5E1;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td style="padding-top: 14px; font-size: 15px; font-weight: 700; color: #2D2C2A;">Total Paid</td>
                    <td style="padding-top: 14px; font-size: 16px; font-weight: 700; color: #B56142; text-align: right;">$${params.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <!-- Delivery Destination -->
              <div style="background-color: #FAF8F5; border-radius: 10px; padding: 18px; margin-bottom: 28px; border: 1px solid #EAE6DF;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7D7973; font-weight: 600; display: block; margin-bottom: 6px;">Delivery Destination:</span>
                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #3E3B37;">
                  <strong>${params.shippingAddress.fullName}</strong><br/>
                  ${params.shippingAddress.street}<br/>
                  ${params.shippingAddress.city}, ${params.shippingAddress.state} ${params.shippingAddress.zipCode}<br/>
                  ${params.shippingAddress.country}
                </p>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin: 32px 0 16px;">
                <a href="${params.trackingUrl}" style="background-color: #B56142; color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-size: 15px; font-weight: 600; display: inline-block;">
                  Track Live Studio Milestones →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF8F5; padding: 24px 30px; text-align: center; border-top: 1px solid #E8E5E1; font-size: 12px; color: #9E9A93;">
              <p style="margin: 0 0 6px;">Naaz Arts • Hand-cast, Hand-sealed, Made with Patience</p>
              <p style="margin: 0;">Have questions about your pieces? Reply directly to this email or visit our studio portal.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const result = await resend.emails.send({
      from: `Naaz Arts <${config.resend.fromEmail}>`,
      to: [params.toEmail],
      subject: `Order Confirmed: ${params.orderId} — Naaz Arts Studio`,
      html: htmlContent,
    });
    return { success: true, data: result };
  } catch (error: any) {
    console.error('[Email] Error sending email via primary sender:', error?.message);
    // If from domain not yet verified, try onboarding domain for test mode
    try {
      const fallbackResult = await resend.emails.send({
        from: `Naaz Arts <onboarding@resend.dev>`,
        to: [params.toEmail],
        subject: `Order Confirmed: ${params.orderId} — Naaz Arts Studio`,
        html: htmlContent,
      });
      return { success: true, data: fallbackResult };
    } catch (fallbackErr: any) {
      console.error('[Email] Fallback email also failed:', fallbackErr?.message);
      return { success: false, error: fallbackErr?.message };
    }
  }
}

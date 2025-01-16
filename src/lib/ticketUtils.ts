import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";



interface TicketData {
  ticket_id: string;
  tier: string;
  additional_info?: Record<string, unknown>;
}

export class TicketManager {
  private secretKey: Buffer;

  constructor(secretKey: string) {
    this.secretKey = Buffer.from(secretKey, "utf-8");
  }

  // Generate a unique ticket ID
  generateTicketId(): string {
    return uuidv4();
  }

  // Create a simplified ticket payload
  createTicketPayload(
    ticket_id: string,
    tier: string,
    additionalInfo?: Record<string, unknown>
  ): TicketData {
    return {
      ticket_id,
      tier,
      // created_at: new Date().toISOString(),
      ...(additionalInfo && { additional_info: additionalInfo }),
    };
  }

  // Generate a signed QR code string with essential details
  generateQRString(payload: Pick<TicketData, "ticket_id">): string {
    const jsonPayload = JSON.stringify(payload);
    const signature = crypto
      .createHmac("sha256", this.secretKey)
      .update(jsonPayload)
      .digest();

    const encodedPayload = Buffer.from(jsonPayload).toString("base64url");
    const encodedSignature = signature.toString("base64url");

    return `${encodedPayload}.${encodedSignature}`;
  }

  // Generate QR code data URL
  async generateQRCode(payload: Pick<TicketData, "ticket_id">): Promise<string> {
    const qrString = this.generateQRString(payload);
    const QRCode = await import("qrcode"); // Dynamically import QRCode
    return QRCode.toDataURL(qrString);
  }



  validateQRString(qrString: string): TicketData | null {
    try {
      const [encodedPayload, encodedSignature] = qrString.split('.');
      const jsonPayload = Buffer.from(encodedPayload, 'base64url').toString();
      const receivedSignature = Buffer.from(encodedSignature, 'base64url');

      const expectedSignature = crypto
        .createHmac('sha256', this.secretKey)
        .update(jsonPayload)
        .digest();

      if (crypto.timingSafeEqual(receivedSignature, expectedSignature)) {
        return JSON.parse(jsonPayload);
      }
      return null;
    } catch {
      return null;
    }
  }
}

export const ticketPurchaseTemplate = (
  data: { name: string; time: string; venue: string },
  totalAmount: number,
  date: string,
  purchaseId: string,
  quantity: number,
  ticketTierPrice: number
): string => {
return `
     <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
       <h1 style="color: #000; font-size: 24px; margin-bottom: 24px;">Your Tickets are Confirmed!</h1>
   
       <div style="background: #f4f4f4; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
         <h2 style="margin: 0 0 16px; font-size: 20px;">${data.name}</h2>
         <p style="margin: 0 0 8px; color: #666;">
           Date: ${new Date(date).toLocaleDateString()}<br>
           Time: ${data.time}<br>
           Venue: ${data.venue}
         </p>
       </div>
       <div style="margin-bottom: 24px;">
         <h3 style="margin: 0 0 16px;">Ticket Details</h3>
  
         <p style="font-weight: bold; text-align: right; margin: 16px 0;">
           ${quantity} Ticket(s) x ${ticketTierPrice} = Rs. ${totalAmount}
         </p>
         <p style="font-weight: bold; text-align: right; margin: 16px 0;">
           Total: Rs. ${totalAmount}
         </p>
       </div>
       <p style="margin-bottom: 24px;">
         Your tickets have been confirmed. Please show the QR code below at the venue.
       </p>
       <p style="color: #666; font-size: 14px;">
         View your tickets anytime at: ${process.env.NEXTAUTH_URL}/dashboard/purchases/${purchaseId}
       </p>
     </div>
   `;
};

export const forgotPasswordTemplate = (resetToken: string): string => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #000; font-size: 24px; margin-bottom: 24px;">Reset Your Password</h1>
  
      <div style="background: #f4f4f4; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px; color: #666;">
          You have requested to reset your password. Please click the link below to reset your password.
        </p>
        <a href="${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}" style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
      </div>
    </div>
  `;
};

//email verification template
export const emailVerificationTemplate = (verificationToken: string): string => {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #000; font-size: 24px; margin-bottom: 24px;">Verify Your Email</h1>
  
      <div style="background: #f4f4f4; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px; color: #666;">
          Please click the link below to verify your email address.
        </p>
        <a href="${process.env.NEXTAUTH_URL}/api/user/profile/verify-email/chgfykjtjgsrfedjrjrkt?token=${verificationToken}" style="display: inline-block; padding: 12px 24px; background: #000; color: #fff; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
      </div>
    </div>
  `;
};
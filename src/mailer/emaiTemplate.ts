
import { verify } from "crypto";

export const emailTemplate = {
    welcome: (First_Name: string) => `
    <div>
        <h2>Welcome ${First_Name}!</h2>
        <p>Thank you for registering with our cms app. We're excited to have you on board!</p>
        <P>You can now log in and start managing your tasks efficiently.</P>
        <br/>
    
       <style>
           @keyframes blink {
               0% { background-color: yellow; }
               50% { background-color: transparent; }
               100% { background-color: yellow; }
           }
           .blinking {
               animation: blink 1s infinite;
           }
       </style>
       <p class="blinking">Congratulations on your successful registration!</p>
       <p>Regards,</p>
       <p>Wyclif</p>
    </div>
    `,
    //verification email template
    verify: (First_Name: string, code: string) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hello ${First_Name}!</h2>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>Please enter this code in the app to verify your email address.</p>
        <br />
        <p> Thank you,<br/>The Todo App Team</p>
    </div>
    `,
    //email template for successful verification
    verifiedSuccess: (firstName: string) => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Hello ${firstName},</h2>
      <p> Your account has been verified successfully!</p>
      <p>You can now log in and start using all features.</p>
      <br/>
      <p> Thank you,<br/>The Todo App Team</p>
    </div>
  `



}

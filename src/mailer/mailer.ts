import nodemailer from 'nodemailer';;
import dotenv from 'dotenv';
import { promises } from 'dns';

dotenv.config(); 

export const sendMail = async (
    to: string, 
    subject: string,
    html?: string
): Promise<string> => {

    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 456,
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PWD
            }
        });


    const mailOptions : nodemailer.SendMailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " ,info);
    
    if (info.accepted.length > 0) {
        return "Email sent successfully";
    }
    if (info.rejected.length > 0) {
        return "Email sending failed";
    }

    return "Email server not responding";
    }catch (error:any) {

        console.log("Email sending error: ", error.message);
        return  JSON.stringify(error.message);
    }
};

import { transporter } from "../config/nodemailer.js";
interface IEmail{
    email:string,
    name:string,
    token:string
}
export class AuthEmail{
    static sentConfirmationEmail = async (user:IEmail)=>{
        const info = await transporter.sendMail({
            from:'Administration <admin@root.com>',
            to:user.email,
            subject:'UpTask - Confirm you account',
            html:`<p>Hi: ${user.name}, you have created you account , You just need to confirm your account  </p>
                    <p>Visit the following link</p>
                    <a href="">Confirm you account</a>
                    <p>Put the code: <b>${user.token}</b></p>
                    <p>This token will expired in 10 minutes</p>
                    `
        })
    }
}
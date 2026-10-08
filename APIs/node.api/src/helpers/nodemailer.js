import nodemailer from "nodemailer";
import fs from "fs";

function sendEmail( newPassword, userEmail ) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "zionkeim387@gmail.com",
            pass: "jnkm rtal oggj fpag"
        }
    });

    let mailOptions = {
        from: "z10nk41m@gmail.com",
        to: userEmail,
        subject: "Recuperação de senha",
        html: getEmailTemplate(newPassword)
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(`Erro ao enviar email: ${error}`);
        } else {
            console.log(`Email enviado com sucesso: ${info.response}`);
        }   
    });
}

const getEmailTemplate = (newPassword) => {
    const htmlTemplate = fs.readFileSync("src/templates/changePassword.html", "utf-8");
    return htmlTemplate.replace('{{newPassword}}', newPassword)
}

export {sendEmail};
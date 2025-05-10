import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "amirconcept12@gmail.com",
        pass: "tzrwhbphswhntojq",
    },
});
 export default transporter
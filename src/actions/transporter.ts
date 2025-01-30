import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.ADMIN_SENDER_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

export {transporter}
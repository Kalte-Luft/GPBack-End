const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "nghianb.23itb@vku.udn.vn",
        pass: "kjjqfqmvcxbsxezb",
    },
});

    
function sendEmail() {
    transporter.sendMail({
        from: '"GreenPaws Organization 🐾"<nghianb.23itb@vku.udn.vn>',
        //gửi đến khanhbq.23itb@vku.udn.vn
        to: "nghianguyenba154@gmail.com",
        subject: "Thanks you for your donation!", 
        html: `
        <h1>Dear Khanh Bui,</h1>
        <p>Thank you for your donation to our campaign. We are very grateful for your support.</p>
        <div><b>Time: 12:12 23/12/2024</b></div>
        <div><b>Amount: 100.000 VND</b></div>
        <p>If you have any questions, please feel free to <a href="http://localhost:3000/contact">contact us</a> at any time.</p>
        <p>Best regards,</p>
        `,
    });
}

sendEmail();
//module.exports = sendEmail;


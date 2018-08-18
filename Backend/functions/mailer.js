var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'djangelopoku@gmail.com',
        pass: '0kp0ku0n'
    }
});

//client email body
exports.subscriberAdded= function(email, callback) {
    var mailOptions = {
        from: '"OgeneTV"',
        to: email,
        subject: 'Welcome to OgeneTV',
        html: `<center><h2><strong></string>Please verify your email address by clicking the link below</strong></h2>
                <div style="text-align:center; width: 50%; font-family:tahoma; columns: #909090;">
                <div style="background: wheat; padding:8%">
               
               <a href="https://ogene.herokuapp.com/users/verify/${email}"><button style="color: red">Verify Email</button></a><br><br>
               <small>not working? Try copying and pasting the link below into your brower</small><br>
               <p> https://ogene.herokuapp.com/users/verify/${email}</p>
               </div>
                </center>`
    };
    transporter.sendMail(mailOptions, callback);
}


//Admin email body
exports.adminAdded = function(email,callback,name) {
    var mailOptions = {
        from: '"OgeneTV"',
        to: email,
        subject: 'Welcome to OgeneTV Admin Page',
        html: `<center><h2><strong></string><p>Dear, ${name}.</p><br>You have successfully signed up for the Admin role in OgeneTV</strong></h2><center>`
 };
 transporter.sendMail(mailOptions, callback);
}
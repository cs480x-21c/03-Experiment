var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rinemiya0203@gmail.com',
        pass: 'ainiruchu0723'
    }
});

var mailOptions = {
    from: 'rinemiya0203@gmail.com',
    to: 'rinemiya0203@gmail.com',
    subject: 'hello',
    text: `hello`,
    attachments: [
        {   // filename and content type is derived from path
            path: './responds/data.csv'
        },
    ]
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
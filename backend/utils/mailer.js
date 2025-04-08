const nodemailer = require('nodemailer');
 
 
async function sendMail(to ,username, password) {

  const transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Info.teirrax@gmail.com',
            pass: 'aqkl qlsg qppx kpxu'
        }
    })
    const mailOptions = {
      from: 'Info.teirrax@gmail.com',
      to: to,
      subject: 'Welcome to Teirrax!',
      text: `Hi ${username},\n\nWelcome to Teirrax!\n\nWe're excited to have you join our community. Here are your login details:\n\nEmail: ${to}\nPassword: ${password}\n\nExplore our platform and take full advantage of all the tools and features available to you. If you have any questions, feel free to reach out to our support team.\n\nHappy Trading!\n\nThe Teirrax Team\nhttps://teirrax.com`
  };
  
 
    try {
      const result = await transporter.sendMail(mailOptions);
    //   console.log(result);
     
      console.log('Email sent successfully');
    } catch (error) {
        console.log('Email sent error:',error)
    }
 
 
}


async function sendResetPasswordEmail({email}) {
  const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Info.teirrax@gmail.com',
        pass: 'aqkl qlsg qppx kpxu'
    }
})
  const mailOptions = {
    from: 'Info.teirrax@gmail.com',
    to: email,
    subject: 'Reseting Password!',
    text: `Hello,

We received a request to reset your password for your Teirrax account. Click the link below to reset your password:

Reset Password Link: https://teirrax.com/

If you did not request a password reset, please ignore this email or contact support if you have concerns.

This link will expire in 1 hour.

Best regards,
The Teirrax Team`,
  };

  try {
    await transporter.sendMail(mailOptions); // Send the email
     // Return the token for logging/debugging purposes
  } catch (error) {
    console.log(error);
    
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email"); // Throw an error if sending fails
  }
}

module.exports = {
  sendMail,
  sendResetPasswordEmail,
};

 
// Create logger instance
const ResetPasswordEmail = (password) => {
    return `
    <h1>Password Reset Request</h1>
    <p>We received a request to reset your password</p>
    <p>Here is your new password : 
     
     <span style="color: white; background: #00c7ff; border-radius: 3px; padding: 6px; font-size: 17px;">
             ${password} 
    </span>
   </p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Thank you,</p>
    <p>TOP10</p>
  `;
};


module.exports = ResetPasswordEmail;

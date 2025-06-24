export const userActivationUrlEmailTemplate = async ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, //sender address
    to: email, //list of reciever address
    subject: "Action Required- Activate your new account", //subject line
    text: `Hello ${name} follow the link to activate your account.${url}`, // plain‑text body
    html: `<p>Hello ${name}</p>
<br/>
<br/>
<br/>

<p>Your account has been created. Click the button below to activate your account.</p>
<br/>
<br/>
<a href=${url} target="_blank">
<button style="background:blue; color:white; padding:1.5rem border-radius:10px">Active Now</button>
</a>
<br/>
<br/>

Regards, 
---`, // HTML body
  };
};

export const userActivatedNotificationTemplate = async ({ email, name }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, //sender address
    to: email, //list of reciever address
    subject: "Your account is now active.", //subject line
    text: `Hello ${name} Your account is active to use. You may go and sign in now.`, // plain‑text body
    html: `<p>Hello ${name}</p>
<br/>
<br/>
<p>Your account is active to use. You may go and sign in now.</p>
<br/>
<br/>

Regards, 
---`, // HTML body
  };
};

export const passwordResetOTPSendTemplate = async ({ email, name, otp }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, //sender address
    to: email, //list of reciever address
    subject: "Your OTP to reset the password.", //subject line
    text: `Hello ${name}, Here is your OTP to reset the password. This otp will expires in 5min. OTP is ${otp}`, // plain‑text body
    html: `<p>Hello ${name}</p>
<br/>
<br/>
<p>Here is your OTP to reset the password. This otp will expires in 5min.</p>
<br/>
<br/>
<p>OTP is ${otp} </p>
<br/>
<br/>

Regards, 
---`, // HTML body
  };
};
export const userPasswordResetNotificationTemplate = async ({
  email,
  name,
}) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, //sender address
    to: email, //list of reciever address
    subject: "Your password has been reset.", //subject line
    text: `Hello ${name}, Your password has been updated you may login now. If it's not you the change your password`, // plain‑text body
    html: `<p>Hello ${name}</p>
<br/>
<br/>
<p>Your password has been reset.</p>
<br/>
<br/>

Regards, 
---`, // HTML body
  };
};

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
<a href=${url}>
<button style="background:blue; color:white; padding:1.5rem border-radius:10px">Active Now</button>
</a>
<br/>
<br/>

Regards, 
---`, // HTML body
  };
};

import {
  passwordResetOTPSendTemplate,
  userActivatedNotificationTemplate,
  userActivationUrlEmailTemplate,
  userPasswordResetNotificationTemplate,
} from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  const transport = emailTransporter();
  const mailOptions = await userActivationUrlEmailTemplate(obj);
  const info = await transport.sendMail(mailOptions); // ✅ send the resolved object
  console.log("Message ID:", info.messageId);
  return info.messageId;
};
export const userActivatedNotificationEmail = async (obj) => {
  const transport = emailTransporter();
  const mailOptions = await userActivatedNotificationTemplate(obj);
  const info = await transport.sendMail(mailOptions); // ✅ send the resolved object
  console.log("Message ID:", info.messageId);
  return info.messageId;
};

export const passwordResetOTPSend = async (obj) => {
  const transport = emailTransporter();
  const mailOptions = await passwordResetOTPSendTemplate(obj);
  const info = await transport.sendMail(mailOptions); // ✅ send the resolved object
  console.log("Message ID:", info.messageId);
  return info.messageId;
};
export const userPasswordResetNotificationEmail = async (obj) => {
  const transport = emailTransporter();
  const mailOptions = await userPasswordResetNotificationTemplate(obj);
  const info = await transport.sendMail(mailOptions); // ✅ send the resolved object
  console.log("Message ID:", info.messageId);
  return info.messageId;
};

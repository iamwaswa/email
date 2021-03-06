import * as Mail from 'nodemailer/lib/mailer';
import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

import { google } from 'googleapis';

type CustomObject = {
  [key: string]: any,
};

type CallData = {
  from: Mail.Address,
  to?: Mail.Address,
  cc?: Mail.Address,
  bcc?: Mail.Address,
  subject?: string,
  text?: string,
  attachments?: CustomObject[], 
};

enum ResponseStatusEnum {
  SUCCESS,
  FAILURE
}

type BasicResponse = {
  message: string;
  status: ResponseStatusEnum;
};

/**
 * functions.config() contains environment variables
 * that should not be pushed to production
 */

export default async (data: CallData): Promise<BasicResponse> => {
  try {
    console.log(`Sending email...`);

    const OAuth2 = google.auth.OAuth2;
    const clientId = functions.config().client.id;
    const clientSecret = functions.config().client.secret;
    const refreshToken = functions.config().refresh.token;

    const oauth2Client = new OAuth2(
      clientId,
      clientSecret,
      functions.config().redirect.url
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const tokens = await oauth2Client.refreshAccessToken();
    const accessToken = tokens.credentials.access_token;

    const smtpTransport = nodemailer.createTransport({
      //@ts-ignore
      service: `gmail`,
      auth: {
        type: `OAuth2`,
        user: functions.config().user.email,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });

    const response = await smtpTransport.sendMail({
      from: data.from,
      to: data.to,
      cc: data.cc,
      bcc: data.bcc,
      replyTo: data.from,
      subject: `Accompany${data.subject ? ` - ${data.subject}` : ``}`,
      text: data.text,
      attachments: data.attachments 
        ? data.attachments.map(
          (attachment: CustomObject): CustomObject => ({
            filename: attachment.filename,
            path: attachment.content,
          })
        ) 
        : undefined,
    });

    smtpTransport.close();

    console.log(response);

    console.log(`Sent group email!`);

    return handleResponse(
      `Your email has been sent!`,
      ResponseStatusEnum.SUCCESS
    );
  } catch ({ message }) {
    return handleResponse(message, ResponseStatusEnum.FAILURE);
  }
};
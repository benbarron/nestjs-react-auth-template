import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  send = async (
    to: string,
    subject: string,
    html: string,
  ): Promise<string | null> => {
    return new Promise(async (resolve, reject) => {
      try {
        let transporter: any = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: String(process.env.EMAIL_ACCOUNT),
            pass: String(process.env.EMAIL_PASSWORD),
          },
        });

        await transporter.sendMail({
          from: String(process.env.EMAIL_ACCOUNT),
          to,
          subject,
          text: '',
          html,
        });
        resolve();
      } catch (e) {
        reject('Internal Server error.');
      }
    });
  };
}

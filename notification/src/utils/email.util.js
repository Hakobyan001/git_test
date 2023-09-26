// NPM Modules
import sgMail from '@sendgrid/mail';

sgMail.setApiKey("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");

export default class EmailUtil {
  static sendMail(from, to, html, subject) {
    console.log(from, to, html, subject,"aaa")
    const msg = {
      from,
      to,
      html,
      subject
    };

    return sgMail.send(msg);
  }
}

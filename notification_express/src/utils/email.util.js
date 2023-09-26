// NPM Modules
import sgMail from '@sendgrid/mail';

// Local Modules
sgMail.setApiKey('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');

export default class EmailUtil {
  static sendMail(from, to, html, subject) {
    const msg = {
      from,
      to,
      html,
      subject
    };

    return sgMail.send(msg);
  }
}

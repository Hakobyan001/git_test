export default class RegisterVerificationCode {
  static generateActivationCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return [...Array(4)].map(() => chars
      .charAt(Math.floor(Math.random() * chars.length))).join('');
  }
}

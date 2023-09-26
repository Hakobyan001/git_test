const NotificationMethodsEnum = {
  email: {
    serviceName: 'EmailService',
    methodName: 'sendEmail'
  },
  sms: {
    serviceName: 'SMSService',
    methodName: 'sendSMS'
  }
};

export default NotificationMethodsEnum;

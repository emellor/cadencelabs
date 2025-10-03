const nodemailer = require('nodemailer');

async function getEmailCredentials() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('✅ Free test email credentials generated:');
    console.log('');
    console.log('Add these to your .env.local file:');
    console.log('');
    console.log(`EMAIL_SERVER_HOST=smtp.ethereal.email`);
    console.log(`EMAIL_SERVER_PORT=587`);
    console.log(`EMAIL_SERVER_USER=${testAccount.user}`);
    console.log(`EMAIL_SERVER_PASSWORD=${testAccount.pass}`);
    console.log(`EMAIL_FROM=noreply@yourdomain.com`);
    console.log('');
    console.log('🌐 View sent emails at: https://ethereal.email');
    console.log(`📧 Login with: ${testAccount.user} / ${testAccount.pass}`);
  } catch (error) {
    console.error('Error creating test account:', error);
  }
}

getEmailCredentials();

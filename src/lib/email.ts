import nodemailer from 'nodemailer';

// Validate required environment variables
const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error('Missing environment variables:', missingEnvVars);
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // Add debugging options
    logger: true,
    debug: process.env.NODE_ENV === 'development',
});

// Verify transporter configuration
transporter.verify((error: Error | null, success: boolean) => {
    if (error) {
        console.error('Email transporter configuration error:', error);
    } else {
        console.log('Email transporter is ready to send messages');
    }
});

export interface EmailData {
    name: string;
    email: string;
    message: string;
}

export async function sendContactEmail(data: EmailData) {
    const { name, email, message } = data;

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_TO) {
        throw new Error('Email configuration is missing. Please check environment variables.');
    }

    // Log the email data for debugging (without sensitive information)
    console.log('Preparing to send email from contact form:', {
        name,
        email,
        messageLength: message.length,
        to: process.env.EMAIL_TO
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO, // This should be your email address (alif.mohamady20@gmail.com)
        replyTo: email,
        subject: `Contact Form Submission from ${name}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong style="color: #333;">Name:</strong> ${name}</p>
          <p><strong style="color: #333;">Email:</strong> ${email}</p>
          <p><strong style="color: #333;">Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #6366f1;">
            <p style="margin: 0; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        
        <p style="color: #666; font-size: 14px;">
          <em>This message was sent from your portfolio website contact form.</em>
        </p>
      </div>
    `,
    };

    try {
        console.log('Attempting to send email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error('Error sending email:', error);
        // Provide more specific error information
        if (error.code) {
            console.error('Error code:', error.code);
        }
        if (error.response) {
            console.error('Error response:', error.response);
        }
        throw new Error(`Failed to send email: ${error.message}`);
    }
}
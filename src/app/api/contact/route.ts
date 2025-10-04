import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    // Check if required environment variables are set
    const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
        // In development, we can return a mock success
        if (process.env.NODE_ENV === 'development') {
            console.warn('Missing environment variables in development:', missingEnvVars);
            return new Response(
                JSON.stringify({
                    message: 'Email sent successfully (mocked in development)'
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // In production, we need the environment variables
        return new Response(
            JSON.stringify({
                error: 'Email service not configured properly',
                missingVars: missingEnvVars,
                message: 'Please set the required environment variables: EMAIL_USER, EMAIL_PASS, EMAIL_TO'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }

    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can change this to your email provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Define email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `[Portfolio Contact] ${subject}`,
            text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({
                message: 'Email sent successfully!'
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error: any) {
        console.error('Error sending email:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to send email',
                message: error.message || 'Unknown error occurred'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Handle preflight requests
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // In a real implementation, you would send the email here using a service like:
        // - Nodemailer with SMTP
        // - SendGrid API
        // - Resend API
        // - AWS SES
        // - etc.

        // For now, we'll simulate a successful response
        // In production, you would integrate with an email service here

        // Example using a service like Resend:
        /*
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'alif.mohamady20@gmail.com',
          subject: `Contact from Portfolio - ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><em>Sent from portfolio website</em></p>
          `
        });
        
        if (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        */

        // Simulate successful email sending with a delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log(`Email sent from ${name} (${email}): ${message}`);

        return NextResponse.json(
            {
                message: 'Message sent successfully!',
                details: {
                    name,
                    email,
                    message,
                    timestamp: new Date().toISOString()
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        );
    }
}
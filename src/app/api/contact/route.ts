import { NextResponse } from 'next/server';
import { sendContactEmail, EmailData } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const { name, email, message }: EmailData = await request.json();
        console.log('Received contact form submission:', { name, email, message: message.substring(0, 50) + '...' });

        // Validate input
        if (!name || !email || !message) {
            console.log('Validation failed: missing fields');
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Validation failed: invalid email format');
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check if message is not too short
        if (message.trim().length < 10) {
            console.log('Validation failed: message too short');
            return NextResponse.json(
                { error: 'Message must be at least 10 characters long' },
                { status: 400 }
            );
        }

        console.log('Sending email...');
        // Send email
        const result = await sendContactEmail({ name, email, message });

        console.log('Email sent successfully:', result);

        return NextResponse.json(
            {
                message: 'Message sent successfully!',
                details: {
                    name,
                    email,
                    message: message.substring(0, 50) + '...',
                    timestamp: new Date().toISOString()
                }
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error in contact form API:', error);

        // Provide more specific error messages
        let errorMessage = 'Failed to send message. Please try again later.';

        // Handle missing environment variables specifically
        if (error.message && error.message.includes('Missing required environment variables')) {
            errorMessage = 'Contact form is currently unavailable. Please try again later or contact directly via email.';
        } else if (error.message) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
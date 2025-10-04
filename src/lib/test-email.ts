import { sendContactEmail } from './email';

// Test the email functionality
async function testEmail() {
    try {
        console.log('Testing email functionality...');

        // Check if environment variables are loaded
        console.log('Environment variables check:');
        console.log('- EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
        console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
        console.log('- EMAIL_TO:', process.env.EMAIL_TO ? 'SET' : 'NOT SET');

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
            console.log('❌ Missing environment variables. Please check .env.local file');
            return;
        }

        const result = await sendContactEmail({
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message from the portfolio contact form.\n\nIt includes multiple lines.\n\nBest regards,\nTest User'
        });

        console.log('✅ Email sent successfully!', result);
    } catch (error: any) {
        console.error('❌ Error sending test email:', error.message);
        if (error.code) {
            console.error('Error code:', error.code);
        }
        if (error.response) {
            console.error('Error response:', error.response);
        }
    }
}

// Run the test if this file is executed directly
if (require.main === module) {
    testEmail();
}
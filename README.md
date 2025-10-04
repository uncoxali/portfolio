# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Responsive design that works on all devices
- Dark/light mode toggle
- Smooth scrolling navigation
- Animated sections with Framer Motion
- 3D elements with Three.js
- Progressive Web App (PWA) support
- Cookie consent management
- Visitor counter
- Contact form with email functionality

## Enhanced Sections

1. **Hero Section** - Animated name/title reveal with typing effect, floating particles, call-to-action buttons with hover effects
2. **About Me** - Tabbed interface for different content sections, animated stats/skills
3. **Skills** - Categorized skill cards with hover effects and proficiency levels, category filtering
4. **Experience** - Timeline with expandable details and key achievements, company logos
5. **Projects** - Grid layout with enhanced hover effects, project links, technology tags, category filtering
6. **Contact** - Contact form with validation and email functionality, direct contact information with social media links and hover effects
7. **Chaos Toolbar** - Interactive toolbar with grabber, eraser, bomb, and wand tools (inspired by Josh W. Comeau)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

For the contact form to work properly, you need to set the following environment variables:

```env
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_specific_password
EMAIL_TO=your_email@example.com
```

### For Gmail Users

If you're using Gmail, you'll need to use an App Password instead of your regular password:

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to your Google Account settings
   - Navigate to Security > 2-Step Verification > App passwords
   - Generate a new app password for "Mail"
   - Use this app password as your EMAIL_PASS

### For Other Email Providers

You can configure the email service in `src/app/api/contact/route.ts`. The current implementation uses Gmail, but you can modify it for other providers:

```javascript
const transporter = nodemailer.createTransport({
  service: 'your-email-service', // e.g., 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

For more complex configurations (like SMTP), you can replace the service option with host, port, and secure options:

```javascript
const transporter = nodemailer.createTransport({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Deployment

This portfolio can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Sign up/log in to Vercel
3. Create a new project and import your repository
4. Configure the environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add EMAIL_USER, EMAIL_PASS, and EMAIL_TO with your values
5. Deploy!

## License

This project is licensed under the MIT License.

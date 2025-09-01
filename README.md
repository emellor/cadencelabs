# DailyFit - Fitness Paywall Application

A production-ready Next.js application with authentication, Stripe payments, and subscription management for fitness services.

## 🚀 Features

- **Landing Page** with clean, modern design
- **Authentication** using NextAuth.js (Email + Google OAuth)
- **Stripe Integration** for subscription payments
- **Paywall System** protecting premium content
- **User Management** with Prisma and PostgreSQL
- **Responsive Design** using Tailwind CSS
- **TypeScript** for type safety
- **Middleware Protection** for secure routes

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Validation**: Zod

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dailyfit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```env
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-here

   # Database
   DATABASE_URL=postgresql://postgres:password@localhost:5432/fitness_paywall

   # Stripe (Use your own test keys)
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PRICE_ID=price_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Optional Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Set up the database**
   ```bash
   # Create the database
   createdb fitness_paywall
   
   # Run migrations
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Set up email delivery (for magic links)**
   Add these email settings to your `.env.local` for development:
   ```env
   # Email settings (use a service like Mailtrap, SendGrid, or Ethereal)
   EMAIL_SERVER_HOST=smtp.ethereal.email
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-ethereal-user
   EMAIL_SERVER_PASSWORD=your-ethereal-pass
   EMAIL_FROM=noreply@dailyfit.com
   ```

## 🏃‍♂️ Running the Application

1. **Development server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

2. **Production build**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Stripe Setup

### 1. Create Stripe Products
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create a **Product** (e.g., "DailyFit Pro")
3. Add a **Recurring Price** (e.g., $29/month)
4. Copy the price ID to your `STRIPE_PRICE_ID` environment variable

### 2. Configure Customer Portal
1. In your Stripe Dashboard, go to **Settings** → **Billing** → **Customer Portal**
2. Enable the customer portal and configure settings
3. Set return URL to `http://localhost:3000/app`

### 3. Set up Webhooks
1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks to local development:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

### 4. Webhook Events
Make sure your webhook endpoint handles these events:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

## 📱 Application Flow

### New User Journey
1. **Landing Page** → Click "Get Started Free"
2. **Sign Up** → Enter email or use Google OAuth
3. **Paywall** → Choose subscription plan
4. **Stripe Checkout** → Complete payment
5. **App Dashboard** → Access premium features

### Existing User Journey
1. **Landing Page** → Click "Sign In"
2. **Sign In** → Enter credentials
3. **Automatic Redirect** → If subscribed → App, if not → Paywall

## 🗂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # NextAuth configuration
│   │   └── stripe/
│   │       ├── create-checkout/route.ts   # Stripe checkout
│   │       ├── create-portal/route.ts     # Billing portal
│   │       └── webhook/route.ts           # Webhook handler
│   ├── app/page.tsx                       # Protected dashboard
│   ├── paywall/page.tsx                   # Subscription page
│   ├── signin/page.tsx                    # Sign in page
│   ├── signup/page.tsx                    # Sign up page
│   ├── layout.tsx                         # Root layout
│   └── page.tsx                           # Landing page
├── components/
│   ├── AuthForm.tsx                       # Authentication form
│   ├── Navbar.tsx                         # Navigation component
│   ├── PaywallCard.tsx                    # Subscription card
│   ├── Protected.tsx                      # Route protection
│   └── SessionProvider.tsx                # Session context
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   ├── prisma.ts                         # Database client
│   ├── stripe.ts                         # Stripe client
│   └── subscription.ts                   # Subscription utilities
├── types/
│   └── next-auth.d.ts                    # NextAuth type extensions
└── middleware.ts                          # Route protection middleware
```

## 🔐 Authentication

The app uses NextAuth.js with:
- **Email Provider**: Magic link authentication
- **Google Provider**: OAuth integration (optional)
- **Custom Callbacks**: Handle sign-up redirects
- **Session Management**: JWT-based sessions

## 💳 Subscription Logic

- **New users** are redirected to paywall after sign up
- **Existing users** with active subscriptions access the app
- **Expired subscriptions** redirect to paywall
- **Webhook sync** keeps subscription status updated
- **Billing portal** allows subscription management

## 🛡 Security

- **Middleware protection** for `/app` routes
- **Server-side session validation**
- **Stripe webhook verification**
- **Environment variable validation**
- **Type-safe database queries**

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your Git repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Railway/Heroku
1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy from repository

### Database Hosting
- **Neon**: Serverless PostgreSQL
- **Supabase**: PostgreSQL with additional features
- **PlanetScale**: MySQL-compatible option

## 🧪 Testing Stripe Integration

Use these test card numbers:
- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

## 📞 Support

For questions or issues:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Stripe documentation](https://stripe.com/docs)
3. Check [NextAuth.js documentation](https://next-auth.js.org/)

## 📄 License

This project is licensed under the MIT License.

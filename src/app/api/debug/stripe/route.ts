import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { stripe } from "@/lib/stripe";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      authenticated: !!session?.user?.email,
      user: session?.user?.email || null,
      stripeConfigured: {
        hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
        secretKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 20) + "...",
        hasPriceId: !!process.env.STRIPE_PRICE_ID,
        priceId: process.env.STRIPE_PRICE_ID,
      },
      nextAuthUrl: process.env.NEXTAUTH_URL,
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: "Debug failed", details: error },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user already has an active subscription
    if (user.subscription && ["active", "trialing"].includes(user.subscription.status)) {
      return NextResponse.json({ error: "User already has an active subscription" }, { status: 400 });
    }

    // Test Stripe connection first
    try {
      await stripe.customers.list({ limit: 1 });
    } catch (stripeError) {
      console.error("Stripe connection error:", stripeError);
      return NextResponse.json(
        { error: "Stripe configuration error", details: stripeError },
        { status: 500 }
      );
    }

    // Check if price exists
    try {
      await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!);
    } catch (priceError) {
      console.error("Stripe price error:", priceError);
      return NextResponse.json(
        { error: "Invalid Stripe price ID", priceId: process.env.STRIPE_PRICE_ID, details: priceError },
        { status: 500 }
      );
    }

    // Ensure Stripe customer exists
    let customerId = user.subscription?.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
      });
      customerId = customer.id;
    }

    // Create Checkout Session
    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/app?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/paywall`,
    });

    // Create or update subscription record
    await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeCustomerId: customerId,
        stripeSubscriptionId: "pending",
        status: "incomplete",
        currentPeriodEnd: new Date(),
      },
      update: {
        stripeCustomerId: customerId,
      },
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: error },
      { status: 500 }
    );
  }
}

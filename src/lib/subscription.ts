import { prisma } from "./prisma";

export async function getSubscription(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  return subscription;
}

export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await getSubscription(userId);
  
  if (!subscription) return false;

  const isActive = 
    ["active", "trialing"].includes(subscription.status) &&
    subscription.currentPeriodEnd > new Date();

  return isActive;
}

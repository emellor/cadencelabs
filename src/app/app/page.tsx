"use client";

import { useState, useEffect } from "react";
import { Protected } from "@/components/Protected";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AppPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const router = useRouter();

  // Check subscription status when component mounts
  useEffect(() => {
    const checkSubscription = async () => {
      if (!session?.user?.email) return;
      
      try {
        // For now, we'll assume users don't have a subscription and redirect to paywall
        // In a real app, you'd check the subscription status here
        setCheckingSubscription(false);
        
        // Uncomment this to redirect users without subscriptions to paywall
        // router.push("/paywall");
      } catch (error) {
        console.error("Error checking subscription:", error);
        setCheckingSubscription(false);
      }
    };

    if (session) {
      checkSubscription();
    }
  }, [session, router]);

  const openBillingPortal = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to open billing portal");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Protected>
      {checkingSubscription ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome to DailyFit Pro! 🎉
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Hello, {session?.user?.name || session?.user?.email}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6">
                  <button
                    onClick={openBillingPortal}
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Manage Billing"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Workout Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">💪</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Today&apos;s Workout
                  </h3>
                  <p className="text-sm text-gray-500">
                    Upper Body Strength Training
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Start Workout
                </button>
              </div>
            </div>

            {/* Nutrition Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">🍎</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Nutrition Goals
                  </h3>
                  <p className="text-sm text-gray-500">
                    1,847 / 2,200 calories
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">📊</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Weekly Progress
                  </h3>
                  <p className="text-sm text-gray-500">
                    5 of 6 workouts completed
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">This week</span>
                  <span className="text-green-600 font-medium">+2.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Pro Features</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Personalized Workout Plans
                </h3>
                <p className="text-gray-600">
                  AI-powered workouts tailored to your goals, fitness level, and preferences.
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nutrition Tracking & Meal Plans
                </h3>
                <p className="text-gray-600">
                  Track your meals, monitor macros, and get personalized meal recommendations.
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Progress Analytics
                </h3>
                <p className="text-gray-600">
                  Detailed insights and analytics to track your progress and celebrate milestones.
                </p>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  24/7 Expert Support
                </h3>
                <p className="text-gray-600">
                  Get answers to your questions from certified fitness professionals anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </Protected>
  );
}

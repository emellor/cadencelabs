"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DailyForm from "../../../../components/DailyForm";

export default function DailyDataLoggingPage() {
  const params = useParams();
  const athleteId = params.id as string;

  // Static athlete data - in real app, this would be fetched based on ID
  const athleteData: Record<string, { name: string; sport: string; team: string }> = {
    "1": { name: "Sarah Johnson", sport: "Road Cycling", team: "Pro Team Alpha" },
    "2": { name: "Mike Chen", sport: "Mountain Biking", team: "Trail Blazers" },
    "3": { name: "Emma Rodriguez", sport: "Track Cycling", team: "Velocity Squad" },
    "4": { name: "Alex Thompson", sport: "Road Cycling", team: "Endurance Elite" }
  };

  const athlete = athleteData[athleteId] || { 
    name: "Julian Alaphilippe", 
    sport: "Road Cycling", 
    team: "Quick-Step Alpha Vinyl" 
  };

  // Get current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Daily data submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Logged Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your daily check-in for {formattedDate} has been recorded.
            </p>
            <div className="space-y-4">
              <Link 
                href={`/athlete/${athleteId}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors inline-block"
              >
                View Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-md transition-colors"
              >
                Log Another Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href={`/athlete/${athleteId}`} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-3 inline-block"
          >
            ← Back to Dashboard
          </Link>
          
          {/* Date display - small and unobtrusive */}
          <div className="text-sm text-gray-500 mb-2">
            {formattedDate}
          </div>
          
          {/* Dynamic title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Daily Check-in for {athlete.name}
          </h1>
          <p className="text-gray-600 text-sm">
            Complete your daily metrics to help track your training progress
          </p>
        </div>

        {/* Main content container */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Form Container */}
          <div className="p-6">
            <DailyForm 
              athleteId={athleteId} 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Submit button at bottom */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              form="daily-form"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Daily Data'
              )}
            </button>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your data is encrypted and only shared with your coaching team
          </p>
        </div>
      </div>
    </div>
  );
}

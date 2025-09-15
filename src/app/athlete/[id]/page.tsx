"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

function RiskCard({ riskScore, status }: { riskScore: string; status: string }) {
  const getRiskStyles = (status: string) => {
    if (status.toLowerCase().includes('high')) {
      return 'bg-red-100 text-red-800 border-red-200';
    } else if (status.toLowerCase().includes('moderate')) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    } else {
      return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Overtraining & Injury Risk</h3>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-3xl font-bold text-gray-900">{riskScore}</div>
          <div className="text-sm text-gray-500">Risk Score</div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskStyles(status)}`}>
          {status}
        </span>
      </div>
      <Link 
        href={`/notebook/${useParams().id}`}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors inline-block text-center"
      >
        Analyze with AI
      </Link>
    </div>
  );
}

function PlaceholderChart({ title, height = "h-64" }: { title: string; height?: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className={`${height} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <div className="text-sm">Chart placeholder</div>
        </div>
      </div>
    </div>
  );
}

export default function AthleteDetailPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/app/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{athlete.name}</h1>
          <p className="mt-2 text-gray-600">Athlete Performance Analysis</p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Summary Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Photo and Basic Details */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{athlete.name}</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sport:</span>
                  <span className="text-gray-900">{athlete.sport}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Team:</span>
                  <span className="text-gray-900">{athlete.team}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Age:</span>
                  <span className="text-gray-900">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight:</span>
                  <span className="text-gray-900">68 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">FTP:</span>
                  <span className="text-gray-900">285 W</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">This Week:</span>
                  <span className="text-gray-900">12.5 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">TSS:</span>
                  <span className="text-gray-900">850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">HRV:</span>
                  <span className="text-gray-900">42 ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sleep:</span>
                  <span className="text-gray-900">7.2 hrs avg</span>
                </div>
              </div>
            </div>

            {/* Forms Quick Access */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Forms</h3>
              <Link 
                href={`/athlete/${athleteId}/forms`}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors inline-block text-center"
              >
                View My Forms
              </Link>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Complete daily check-ins and surveys
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Risk Card - Prominent */}
            <RiskCard riskScore="85/100" status="High Risk" />

            {/* Training Overview and Recovery Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PlaceholderChart title="Training Overview" />
              <PlaceholderChart title="Recovery Metrics" />
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PlaceholderChart title="Power Curve Analysis" />
              <PlaceholderChart title="Heart Rate Zones" />
            </div>

            {/* Full-width chart */}
            <PlaceholderChart title="Training Load Trends (Last 12 Weeks)" height="h-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

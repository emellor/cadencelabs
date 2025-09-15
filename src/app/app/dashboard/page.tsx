"use client";

import React from "react";
import Link from "next/link";
import { MetricsCard } from "@/components/MetricsCard";

function RiskLevelBadge({ riskLevel }: { riskLevel: 'High' | 'Moderate' | 'Low' }) {
  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDotColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-500';
      case 'Moderate':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskStyles(riskLevel)}`}>
      <div className={`w-2 h-2 rounded-full mr-1.5 ${getDotColor(riskLevel)}`}></div>
      {riskLevel}
    </span>
  );
}

export default function PerformanceDirectorDashboard() {
  const summaryData = [
    { title: "Avg. Team Readiness", value: "8.5", unit: "/10" },
    { title: "Avg. Training Load", value: "850", unit: "TSS" },
    { title: "High-Risk Athletes", value: "2", unit: undefined }
  ];

  const athleteRoster = [
    { id: 1, name: "Sarah Johnson", riskLevel: "Low" as const, trainingLoad: 420 },
    { id: 2, name: "Mike Chen", riskLevel: "Moderate" as const, trainingLoad: 680 },
    { id: 3, name: "Emma Rodriguez", riskLevel: "High" as const, trainingLoad: 920 },
    { id: 4, name: "Alex Thompson", riskLevel: "Low" as const, trainingLoad: 380 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Performance Overview</h1>
          <p className="mt-2 text-gray-600">Monitor your team's readiness, training load, and risk factors</p>
          
          {/* Quick Navigation */}
          <div className="mt-4 flex gap-3 flex-wrap">
            <Link 
              href="/knowledge"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              📚 Knowledge Navigator
            </Link>
            <Link 
              href="/knowledge-studio"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              🧠 Knowledge Studio
            </Link>
            <Link 
              href="/model-reference"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              🔬 Model Reference
            </Link>
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryData.map((card, index) => (
            <MetricsCard key={index} title={card.title} value={card.value} unit={card.unit} />
          ))}
        </div>

        {/* Athlete Roster Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Athlete Roster</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Athlete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training Load (TSS)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {athleteRoster.map((athlete, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/athlete/${athlete.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {athlete.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RiskLevelBadge riskLevel={athlete.riskLevel} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{athlete.trainingLoad}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

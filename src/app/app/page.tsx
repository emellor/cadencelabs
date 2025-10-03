"use client";

import React, { useState } from "react";
import Link from "next/link";

function IntegrationButton({ service, connected, onConnect }: { service: string; connected: boolean; onConnect: () => void }) {
  return (
    <button
      className={`flex items-center px-6 py-3 rounded-lg shadow-md text-lg font-semibold transition-colors duration-200 mb-4 w-full justify-between border border-gray-200 bg-white hover:bg-gray-50 ${connected ? 'cursor-default border-green-500' : 'cursor-pointer'}`}
      disabled={connected}
      onClick={connected ? undefined : onConnect}
    >
      <span>{service}</span>
      {connected ? (
        <span className="flex items-center text-green-600 font-bold">
          <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          Connected
        </span>
      ) : (
        <span className="text-blue-600">Connect</span>
      )}
    </button>
  );
}

export default function AppPage() {
  const [connections, setConnections] = useState({ TrainingPeaks: false, WHOOP: false });
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const allConnected = Object.values(connections).every(Boolean);

  const handleConnect = (service: string) => {
    setLoading((prev) => ({ ...prev, [service]: true }));
    setTimeout(() => {
      setConnections((prev) => ({ ...prev, [service]: true }));
      setLoading((prev) => ({ ...prev, [service]: false }));
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Cadence Labs Setup: Connect Your Data</h1>
        
        {/* Skip Setup Option */}
        <div className="text-center mb-6">
          <Link 
            href="/app/dashboard"
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Skip setup and go to dashboard →
          </Link>
        </div>
        
        <div className="space-y-4">
          <IntegrationButton
            service="TrainingPeaks"
            connected={connections.TrainingPeaks}
            onConnect={() => handleConnect("TrainingPeaks")}
          />
          {loading["TrainingPeaks"] && (
            <div className="text-blue-500 text-sm mb-2">Connecting TrainingPeaks...</div>
          )}
          <IntegrationButton
            service="WHOOP"
            connected={connections.WHOOP}
            onConnect={() => handleConnect("WHOOP")}
          />
          {loading["WHOOP"] && (
            <div className="text-blue-500 text-sm mb-2">Connecting WHOOP...</div>
          )}
        </div>
        {allConnected && (
          <Link 
            href="/app/dashboard"
            className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors text-lg block text-center"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}

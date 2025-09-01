/**
 * Test Stripe Configuration
 * 
 * This page helps you validate your Stripe setup before using the paywall.
 * Visit /test-stripe after starting your dev server.
 */

"use client";

import { useState } from "react";

export default function TestStripePage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testStripeConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/debug/stripe");
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      setDebugInfo({ error: "Failed to fetch debug info" });
    } finally {
      setLoading(false);
    }
  };

  const testCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/debug/stripe", {
        method: "POST",
      });
      const data = await response.json();
      setCheckoutResponse(data);
    } catch (error) {
      setCheckoutResponse({ error: "Failed to test checkout" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Test Stripe Configuration</h1>
      
      <div className="space-y-8">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Step 1: Check Configuration</h2>
          <button 
            onClick={testStripeConfig} 
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
          >
            {loading ? "Testing..." : "Test Stripe Config"}
          </button>
          
          {debugInfo && (
            <div className="bg-gray-100 p-4 rounded mt-4">
              <pre className="text-sm overflow-auto whitespace-pre-wrap">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Step 2: Test Checkout Session Creation</h2>
          <p className="text-sm text-gray-600 mb-4">
            Note: You need to be signed in for this test to work.
          </p>
          <button 
            onClick={testCheckout} 
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 mb-4"
          >
            {loading ? "Testing..." : "Test Checkout Creation"}
          </button>
          
          {checkoutResponse && (
            <div className="bg-gray-100 p-4 rounded mt-4">
              <pre className="text-sm overflow-auto whitespace-pre-wrap">
                {JSON.stringify(checkoutResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How to Fix Common Issues</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">1. Invalid Price ID</h3>
              <p className="text-sm text-gray-600">
                Go to your Stripe Dashboard → Products → Create a product → Copy the price ID
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">2. Invalid API Key</h3>
              <p className="text-sm text-gray-600">
                Go to your Stripe Dashboard → Developers → API Keys → Copy the secret key
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">3. Test Mode Issues</h3>
              <p className="text-sm text-gray-600">
                Make sure you&apos;re using test keys and test price IDs (they start with sk_test_ and price_)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

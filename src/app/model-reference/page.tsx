"use client";

import React, { useState } from 'react';

// Model Reference System as React Component
export default function ModelReferencePage() {
  const [expandedPanel, setExpandedPanel] = useState<string | null>(null);

  const sampleRecommendation = {
    text: "Consume 90g/hr of carbohydrates (405g total). Use 2:1 glucose:fructose ratio with 330ml/hr fluid.",
    confidence: 92,
    evidence: [
      {
        citation: "[Burke et al., 2024]",
        title: "Optimizing Carbohydrate Intake During Ultra-Endurance Exercise",
        finding: "90g/hr carbohydrate intake maximizes absorption",
        relevance: 95
      },
      {
        citation: "[Stellingwerff & Cox, 2024]", 
        title: "Gastrointestinal Adaptation to High Carbohydrate Intake",
        finding: "2:1 glucose:fructose ratio optimal for gut tolerance",
        relevance: 88
      }
    ],
    explanation: "This recommendation is based on current sports nutrition research showing optimal carbohydrate absorption rates for endurance exercise lasting 4.5 hours. The 90g/hr rate maximizes gut absorption while minimizing gastrointestinal distress."
  };

  const togglePanel = (panelId: string) => {
    setExpandedPanel(expandedPanel === panelId ? null : panelId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Model Reference System</h1>
          <p className="mt-2 text-gray-600">
            Transparent AI recommendations with scientific evidence
          </p>
        </div>

        {/* Demo Recommendation Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🔬 AI Recommendation
                </h3>
                <p className="text-gray-700 mb-3">
                  {sampleRecommendation.text}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-600">
                    Confidence: <span className="font-semibold text-green-600">
                      {sampleRecommendation.confidence}%
                    </span>
                  </span>
                  <button
                    onClick={() => togglePanel('fueling-evidence')}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                  >
                    🔗 Why this recommendation?
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Evidence Panel */}
            {expandedPanel === 'fueling-evidence' && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    📚 Scientific Evidence Panel
                  </h4>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Explanation:</h5>
                    <p className="text-sm text-gray-700 mb-3">
                      {sampleRecommendation.explanation}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Supporting Research:</h5>
                    <div className="space-y-3">
                      {sampleRecommendation.evidence.map((paper, index) => (
                        <div key={index} className="bg-white rounded p-3 border border-blue-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-900">
                                {paper.citation} - {paper.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">Key Finding:</span> {paper.finding}
                              </p>
                            </div>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-3">
                              {paper.relevance}% relevant
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedPanel(null)}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                  >
                    ← Collapse evidence panel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎯 Integration Guide
            </h3>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900">Dashboard Integration:</h4>
                <p>Add "Why?" links to AI recommendations in athlete detail pages</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Knowledge Navigator:</h4>
                <p>Link search results to this evidence panel system</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Athlete Analysis:</h4>
                <p>Show scientific backing for risk assessments and training recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

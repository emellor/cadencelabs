"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  source: string;
  sourceType: "Peer-Reviewed Study" | "Expert Consensus" | "Manufacturer Data";
  topic: "Nutrition" | "Recovery" | "Biomechanics" | "Training" | "Performance";
  date: string;
  relevanceScore: number;
}

function FilterBadge({ 
  label, 
  isActive, 
  onClick 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

function SearchResultCard({ result }: { result: SearchResult }) {
  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'Peer-Reviewed Study':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expert Consensus':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Manufacturer Data':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case 'Nutrition':
        return 'bg-purple-100 text-purple-800';
      case 'Recovery':
        return 'bg-indigo-100 text-indigo-800';
      case 'Biomechanics':
        return 'bg-red-100 text-red-800';
      case 'Training':
        return 'bg-yellow-100 text-yellow-800';
      case 'Performance':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
          {result.title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{result.relevanceScore}% match</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">
        {result.snippet}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSourceTypeColor(result.sourceType)}`}>
            {result.sourceType}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTopicColor(result.topic)}`}>
            {result.topic}
          </span>
          <span className="text-sm text-gray-500">{result.date}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-blue-600 font-medium">[{result.source}]</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors">
            View Full Study
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeNavigator() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    sourceType: string[];
    topic: string[];
    recency: string;
  }>({
    sourceType: [],
    topic: [],
    recency: 'all'
  });

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "Carbohydrate Absorption Rates During Prolonged Endurance Exercise",
      snippet: "Recent findings suggest that carbohydrate absorption rates can be significantly enhanced through proper timing and substrate selection. The study demonstrates that maltodextrin combined with fructose in a 2:1 ratio optimizes gastric emptying and reduces gastrointestinal distress during ultra-endurance events lasting over 3 hours.",
      source: "Burke et al., 2024",
      sourceType: "Peer-Reviewed Study",
      topic: "Nutrition",
      date: "2024-03-15",
      relevanceScore: 94
    },
    {
      id: "2",
      title: "Heart Rate Variability as a Predictor of Overtraining Syndrome",
      snippet: "Analysis of 156 elite cyclists reveals that HRV metrics, particularly RMSSD, show significant decline 7-10 days before clinical manifestation of overtraining symptoms. The research establishes new baseline thresholds for early intervention protocols.",
      source: "Plews & Laursen, 2024",
      sourceType: "Peer-Reviewed Study",
      topic: "Recovery",
      date: "2024-02-28",
      relevanceScore: 88
    },
    {
      id: "3",
      title: "Biomechanical Efficiency in Cycling: The Role of Cadence Optimization",
      snippet: "Expert consensus from the International Cycling Biomechanics Committee indicates that individualized cadence zones, rather than fixed ranges, improve power output efficiency by 12-15%. The optimal cadence varies significantly based on fiber type distribution and training history.",
      source: "ICBC Consensus Statement, 2024",
      sourceType: "Expert Consensus",
      topic: "Biomechanics",
      date: "2024-01-20",
      relevanceScore: 82
    }
  ];

  const sourceTypes = ["Peer-Reviewed Study", "Expert Consensus", "Manufacturer Data"];
  const topics = ["Nutrition", "Recovery", "Biomechanics", "Training", "Performance"];
  const recencyOptions = [
    { value: "all", label: "All Time" },
    { value: "1year", label: "Past Year" },
    { value: "6months", label: "Past 6 Months" },
    { value: "3months", label: "Past 3 Months" }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 1000);
  };

  const toggleFilter = (filterType: 'sourceType' | 'topic', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/app/dashboard" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Navigator</h1>
          <p className="mt-2 text-gray-600">Explore and research the latest sports science findings with semantic search</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Ask anything... e.g., 'What are the latest findings on carbohydrate absorption rates in endurance athletes?'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Refine Your Search</h3>
          
          {/* Source Type Filters */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Source Type</h4>
            <div className="flex flex-wrap gap-2">
              {sourceTypes.map(type => (
                <FilterBadge
                  key={type}
                  label={type}
                  isActive={activeFilters.sourceType.includes(type)}
                  onClick={() => toggleFilter('sourceType', type)}
                />
              ))}
            </div>
          </div>

          {/* Topic Filters */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Topic</h4>
            <div className="flex flex-wrap gap-2">
              {topics.map(topic => (
                <FilterBadge
                  key={topic}
                  label={topic}
                  isActive={activeFilters.topic.includes(topic)}
                  onClick={() => toggleFilter('topic', topic)}
                />
              ))}
            </div>
          </div>

          {/* Recency Filter */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recency</h4>
            <select
              value={activeFilters.recency}
              onChange={(e) => setActiveFilters(prev => ({ ...prev, recency: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {recencyOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Search Results ({mockResults.length} found)
              </h2>
              <div className="text-sm text-gray-500">
                Sorted by relevance
              </div>
            </div>

            <div className="space-y-6">
              {mockResults.map(result => (
                <SearchResultCard key={result.id} result={result} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors">
                Load More Results
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Research Journey</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Use the search bar above to explore our curated knowledge base of sports science research. 
              Ask questions in natural language to find relevant, verified findings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

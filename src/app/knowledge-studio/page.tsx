"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import { DocumentAnalyzerModal } from '@/components/knowledge/DocumentAnalyzerModal';

interface Citation {
  id: number;
  text: string;
  source?: string;
  year?: number;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  citations?: Citation[];
}

export default function KnowledgeStudioPage() {
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to Knowledge Studio! I\'m your AI assistant specialized in sports science research. Ask me anything about training, nutrition, recovery, or performance optimization.',
      sender: 'ai',
      timestamp: new Date(),
      citations: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'ai',
        timestamp: new Date(),
        citations: response.citations
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateResponse = (userInput: string): { content: string; citations: Citation[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('carbohydrate') || input.includes('fueling') || input.includes('nutrition')) {
      return {
        content: 'Based on current research [Burke et al., 2024], optimal carbohydrate intake during endurance exercise depends on duration and intensity. For events >3 hours, 90g/hr using a 2:1 glucose:fructose ratio maximizes absorption while minimizing GI distress [Stellingwerff & Cox, 2024]. Would you like me to explain the physiological mechanisms behind this recommendation?',
        citations: [
          {
            id: 1,
            text: 'Burke et al., 2024',
            source: 'Journal of Sports Nutrition',
            year: 2024
          },
          {
            id: 2,
            text: 'Stellingwerff & Cox, 2024',
            source: 'Sports Medicine Review',
            year: 2024
          }
        ]
      };
    }
    
    if (input.includes('training load') || input.includes('injury') || input.includes('risk')) {
      return {
        content: 'Training load monitoring is crucial for injury prevention. Research shows that acute:chronic workload ratios >1.5 increase injury risk by 40% [Laursen et al., 2024]. I can help you understand load management strategies, HRV monitoring, or specific risk assessment protocols. What aspect interests you most?',
        citations: [
          {
            id: 1,
            text: 'Laursen et al., 2024',
            source: 'British Journal of Sports Medicine',
            year: 2024
          }
        ]
      };
    }
    
    if (input.includes('recovery') || input.includes('sleep') || input.includes('hrv')) {
      return {
        content: 'Recovery optimization involves multiple factors: sleep quality (7-9h for athletes), HRV monitoring for autonomic balance, and strategic nutrition timing [Walker & Stickgold, 2022]. Elite athletes typically see 15-20% performance gains from structured recovery protocols [Kellmann et al., 2023]. Which recovery modality would you like to explore?',
        citations: [
          {
            id: 1,
            text: 'Walker & Stickgold, 2022',
            source: 'Sleep Medicine Reviews',
            year: 2022
          },
          {
            id: 2,
            text: 'Kellmann et al., 2023',
            source: 'International Journal of Sports Physiology',
            year: 2023
          }
        ]
      };
    }
    
    if (input.includes('power') || input.includes('threshold') || input.includes('ftp')) {
      return {
        content: 'Power-based training allows precise load quantification. FTP testing protocols, threshold intervals, and polarized training models are well-established [Seiler, 2023]. Current research suggests 80/20 intensity distribution for endurance athletes. Are you interested in testing protocols, training zones, or periodization strategies?',
        citations: [
          {
            id: 1,
            text: 'Seiler, 2023',
            source: 'Frontiers in Physiology',
            year: 2023
          }
        ]
      };
    }
    
    return {
      content: 'That\'s an excellent question about sports science! I can provide evidence-based insights on training methodology, exercise physiology, nutrition strategies, recovery protocols, and performance optimization. Could you be more specific about what aspect you\'d like to explore? I have access to the latest research and can explain complex concepts in practical terms.',
      citations: []
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Knowledge Studio</h1>
            <p className="text-sm text-gray-600 mt-1">
              AI-powered sports science research assistant
            </p>
          </div>
          <button
            onClick={() => setIsDocumentModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Chat with PDF
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                sender={message.sender}
                citations={message.citations}
                timestamp={message.timestamp}
              />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-white max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg rounded-bl-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-300">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area - Fixed Position */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about training, nutrition, recovery, or any sports science topic..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
          
          {/* Suggested Questions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "How much carbohydrate should I consume during a 4-hour ride?",
              "What's the optimal training load progression?",
              "How does HRV relate to recovery status?",
              "Explain polarized vs pyramidal training"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputValue(suggestion)}
                className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document Analyzer Modal */}
      <DocumentAnalyzerModal 
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
      />
    </div>
  );
}

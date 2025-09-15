import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/ChatMessage';

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

interface DocumentAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentAnalyzerModal({ isOpen, onClose }: DocumentAnalyzerModalProps) {
  const [modalState, setModalState] = useState<'upload' | 'chat'>('upload');
  const [documentName, setDocumentName] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setModalState('upload');
      setDocumentName('');
      setMessages([]);
      setInputValue('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      const fileName = file.name;
      setDocumentName(fileName);
      
      // Initialize chat with AI summary
      const welcomeMessage: Message = {
        id: '1',
        content: `I have analyzed '${fileName}'. This document contains ${Math.floor(Math.random() * 50) + 20} pages of research content. I can answer questions about specific sections, data points, methodologies, or help you understand the key findings. What would you like to know?`,
        sender: 'ai',
        timestamp: new Date(),
        citations: []
      };
      
      setMessages([welcomeMessage]);
      setModalState('chat');
    } else {
      alert('Please upload a PDF file only.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const generateDocumentResponse = (userInput: string, docName: string): { content: string; citations: Citation[] } => {
    const input = userInput.toLowerCase();
    const docBaseName = docName.replace('.pdf', '');
    
    if (input.includes('aerodynamic') || input.includes('drag') || input.includes('wind')) {
      return {
        content: `Based on the aerodynamic analysis in this document, drag coefficients were measured across various yaw angles. The study found that drag increased significantly at yaw angles greater than 15 degrees [Page 23, Figure 4]. Wind tunnel testing showed optimal positioning reduces drag by up to 12% compared to standard configurations [Table 3, Page 31].`,
        citations: [
          { id: 1, text: 'Page 23, Figure 4', source: docBaseName },
          { id: 2, text: 'Table 3, Page 31', source: docBaseName }
        ]
      };
    }
    
    if (input.includes('power') || input.includes('watt') || input.includes('output')) {
      return {
        content: `The power output data presented in Section 4 demonstrates significant variations across different conditions [Pages 18-22]. Peak power values reached 450W during sprint intervals, with sustained power averaging 280W over the test duration [Figure 7, Page 20]. The methodology section details the calibration procedures used [Appendix B, Page 45].`,
        citations: [
          { id: 1, text: 'Pages 18-22, Section 4', source: docBaseName },
          { id: 2, text: 'Figure 7, Page 20', source: docBaseName },
          { id: 3, text: 'Appendix B, Page 45', source: docBaseName }
        ]
      };
    }
    
    if (input.includes('method') || input.includes('protocol') || input.includes('procedure')) {
      return {
        content: `The experimental methodology is outlined in Section 2 [Pages 8-12]. The protocol involved a randomized controlled design with n=24 participants. Data collection procedures followed standardized protocols [Table 1, Page 9], with measurement intervals every 30 seconds during testing phases [Protocol Details, Page 11].`,
        citations: [
          { id: 1, text: 'Section 2, Pages 8-12', source: docBaseName },
          { id: 2, text: 'Table 1, Page 9', source: docBaseName },
          { id: 3, text: 'Protocol Details, Page 11', source: docBaseName }
        ]
      };
    }
    
    if (input.includes('result') || input.includes('finding') || input.includes('conclusion')) {
      return {
        content: `The key findings are summarized in the Results section [Pages 25-35]. Primary outcomes showed statistically significant improvements (p<0.05) across all measured parameters [Summary Table, Page 26]. The discussion section provides detailed interpretation of these results [Pages 36-40], with practical implications outlined in the conclusion [Page 42].`,
        citations: [
          { id: 1, text: 'Pages 25-35, Results', source: docBaseName },
          { id: 2, text: 'Summary Table, Page 26', source: docBaseName },
          { id: 3, text: 'Pages 36-40, Discussion', source: docBaseName },
          { id: 4, text: 'Page 42, Conclusion', source: docBaseName }
        ]
      };
    }
    
    if (input.includes('data') || input.includes('statistic') || input.includes('analysis')) {
      return {
        content: `The statistical analysis section presents comprehensive data processing methods [Section 3.2, Pages 14-17]. Raw data is available in the appendices [Appendix A, Pages 43-48], with processed results shown in multiple figures throughout the document [Figures 2-8, Pages 15-25]. Confidence intervals and effect sizes are reported for all primary measures [Table 4, Page 28].`,
        citations: [
          { id: 1, text: 'Section 3.2, Pages 14-17', source: docBaseName },
          { id: 2, text: 'Appendix A, Pages 43-48', source: docBaseName },
          { id: 3, text: 'Figures 2-8, Pages 15-25', source: docBaseName },
          { id: 4, text: 'Table 4, Page 28', source: docBaseName }
        ]
      };
    }
    
    return {
      content: `I can help you understand any aspect of '${docName}'. The document covers multiple topics with detailed analysis and supporting data. Could you be more specific about what section or topic you'd like me to explain? I can reference specific pages, tables, figures, or methodological details from the document.`,
      citations: []
    };
  };

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
      const response = generateDocumentResponse(userMessage.content, documentName);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'ai',
        timestamp: new Date(),
        citations: response.citations
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {modalState === 'upload' ? 'Document Analyzer' : `Chat with: ${documentName}`}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {modalState === 'upload' 
                ? 'Upload a PDF to start analyzing and asking questions' 
                : 'Ask specific questions about the document content'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-hidden">
          {modalState === 'upload' ? (
            /* Upload State */
            <div className="p-8 h-full flex items-center justify-center">
              <div className="text-center">
                {/* Drag and Drop Area */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-12 transition-colors ${
                    isDragOver 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your PDF here
                  </p>
                  <p className="text-gray-500 mb-6">
                    or click to browse your files
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose PDF File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
                
                <p className="text-sm text-gray-500 mt-4">
                  Supported format: PDF files only
                </p>
              </div>
            </div>
          ) : (
            /* Chat State */
            <div className="h-full flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                        <span className="text-sm text-gray-300">Analyzing document...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask questions about the document..."
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
                    "What are the key findings?",
                    "Explain the methodology",
                    "Show me the results data",
                    "What are the conclusions?"
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
          )}
        </div>
      </div>
    </div>
  );
}

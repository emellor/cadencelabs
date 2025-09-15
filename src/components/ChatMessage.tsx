import React from 'react';

interface Citation {
  id: number;
  text: string;
  source?: string;
  year?: number;
}

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ai';
  citations?: Citation[];
  timestamp?: Date;
}

export function ChatMessage({ message, sender, citations = [], timestamp }: ChatMessageProps) {
  // Function to insert citation superscripts into message text
  const formatMessageWithCitations = (text: string, citations: Citation[]) => {
    if (!citations.length) return text;
    
    let formattedText = text;
    citations.forEach((citation) => {
      // Replace citation markers like [Burke et al., 2024] with superscript numbers
      const citationPattern = new RegExp(`\\[([^\\]]+)\\]`, 'g');
      formattedText = formattedText.replace(citationPattern, (match, content) => {
        // Check if this citation content matches our citation
        if (citation.text.toLowerCase().includes(content.toLowerCase()) || 
            content.toLowerCase().includes(citation.text.toLowerCase())) {
          return `<sup class="citation-link">[${citation.id}]</sup>`;
        }
        return match;
      });
    });
    
    return formattedText;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
          sender === 'user'
            ? 'bg-gray-100 text-gray-900 rounded-br-sm'
            : 'bg-gray-800 text-white rounded-bl-sm'
        }`}
      >
        {/* Message Content */}
        <div className="text-sm leading-relaxed">
          {citations.length > 0 ? (
            <div
              dangerouslySetInnerHTML={{
                __html: formatMessageWithCitations(message, citations)
              }}
            />
          ) : (
            <p className="whitespace-pre-wrap">{message}</p>
          )}
        </div>

        {/* Citations List */}
        {sender === 'ai' && citations.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <p className="text-xs text-gray-300 mb-2 font-medium">References:</p>
            <div className="space-y-1">
              {citations.map((citation) => (
                <div key={citation.id} className="text-xs text-gray-300">
                  <span className="font-medium">[{citation.id}]</span>{' '}
                  <span>{citation.text}</span>
                  {citation.source && citation.year && (
                    <span className="text-gray-400"> - {citation.source} ({citation.year})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        {timestamp && (
          <p
            className={`text-xs mt-2 ${
              sender === 'user' ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            {formatTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}

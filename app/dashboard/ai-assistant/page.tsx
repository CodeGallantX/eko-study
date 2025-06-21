// app/dashboard/ai-assistant/page.tsx
'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles, BrainCircuit, User } from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: 'assistant',
      time: '10:30 AM'
    },
    {
      id: 2,
      content: "I need help with my project about renewable energy.",
      role: 'user',
      time: '10:31 AM'
    },
    {
      id: 3,
      content: "That sounds interesting! I can provide information on solar, wind, and hydroelectric power sources. Which would you like to focus on?",
      role: 'assistant',
      time: '10:31 AM'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      content: input,
      role: 'user' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newUserMessage]);
    setInput('');
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I understand you're asking about: " + input,
        "That's an interesting question. Let me think...",
        "Here's what I found about your query...",
        "Based on my knowledge, I can tell you that..."
      ];
      const newAiMessage = {
        id: messages.length + 2,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        role: 'assistant' as const,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <BrainCircuit className="h-8 w-8 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
            <p className="text-gray-600 dark:text-gray-400">Your intelligent learning companion</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-indigo-500 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === 'assistant' ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {message.role === 'assistant' ? 'StudyBuddy AI' : 'You'}
                    </span>
                    <span className="text-xs opacity-70 ml-auto">{message.time}</span>
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Assistant may produce inaccurate information
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "Instant Answers",
              description: "Get explanations for complex topics in simple terms",
              icon: "⚡"
            },
            {
              title: "24/7 Availability",
              description: "Study help whenever you need it, day or night",
              icon: "🌙"
            },
            {
              title: "Personalized Learning",
              description: "Adapts to your unique learning style",
              icon: "🎯"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-transform"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
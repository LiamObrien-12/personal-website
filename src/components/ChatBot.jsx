import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
// Remove getChatResponse import temporarily
// import { getChatResponse } from '../utils/chatbot';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [{
      id: Date.now(),
      text: "Hi! I'm here to help. Ask me anything!",
      sender: 'bot',
      timestamp: new Date().toISOString(),
      read: true
    }];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add keyboard navigation
  useKeyboardNavigation(isOpen, setIsOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(input);
      const botMessage = {
        id: Date.now(),
        text: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Mark message as read after a delay
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessage.id ? { ...msg, read: true } : msg
          )
        );
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Sorry, I'm having trouble right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        read: true
      }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-0 right-0 w-[320px] h-[400px] bg-primary-100 dark:bg-primary-900 rounded-t-2xl shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-primary-200 dark:border-primary-700">
        <h6 className="font-medium text-neutral-900 dark:text-neutral-100">Chat Bot</h6>
        <button className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100">
          <span className="sr-only">Close chat</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col h-[calc(100%-120px)] p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] p-3 mb-2 rounded-[12px] ${
              message.sender === 'user'
                ? 'ml-auto bg-primary-500 dark:bg-primary-600 text-neutral-900 dark:text-neutral-100'
                : 'bg-primary-200 dark:bg-primary-800 text-neutral-900 dark:text-neutral-100'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-primary-100 dark:bg-primary-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-[8px] bg-primary-200 dark:bg-primary-800 text-neutral-900 dark:text-neutral-100 placeholder:text-primary-500 dark:placeholder:text-primary-600 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-[8px] bg-primary-500 dark:bg-primary-600 text-neutral-900 dark:text-neutral-100 hover:bg-primary-300 dark:hover:bg-primary-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot; 
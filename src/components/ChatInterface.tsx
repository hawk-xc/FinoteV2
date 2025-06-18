'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
// firestore
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

// Floating particle component
const FloatingParticle = ({ delay = 0, duration = 20, size = 4 }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-sm"
      style={{
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [-20, -40, -20],
        x: [-10, 10, -10],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Animated background shapes
const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating orbs */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-xl"
        style={{ top: "20%", left: "10%" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"
        style={{ top: "60%", right: "15%" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 2}
          duration={15 + Math.random() * 10}
          size={2 + Math.random() * 4}
        />
      ))}

      {/* Subtle grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// Pulsing chat bubble animation
const PulsingChatBubble = () => {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        className="w-16 h-16 border-2 rounded-full border-blue-400/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-full h-full border-2 rounded-full border-purple-400/20"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'user_chat'), { message: inputValue });
    } catch (e) {
      console.error(e);
    }

    // Simulate assistant response after delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "This is a placeholder response. In the future, this will be connected to an AI financial assistant.",
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="relative flex flex-col w-full h-full overflow-hidden rounded-lg bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Animated background elements */}
      <BackgroundShapes />

      {/* Show pulsing chat bubble when no messages */}
      {messages.length === 0 && <PulsingChatBubble />}

      <div className="relative z-10 flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="pb-4 space-y-4">
            {/* Welcome message with animation when no messages */}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex justify-center items-center h-full min-h-[200px]"
              >
                <div className="space-y-4 text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <h3 className="mb-2 text-lg font-semibold text-white/80">
                      Selamat datang di Finotes Chat
                    </h3>
                    <p className="max-w-md text-sm text-white/60">
                      Tulis pengeluaranmu sesukamu kapanpun dimanapun, analisa keuangan mu kapanpun dimanapun juga, Finotes siap membantu
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Card
                      className={`max-w-[100%] p-3 ${message.sender === "user" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"} rounded-2xl backdrop-blur-sm border border-white/10`}
                    >
                      <div className="flex flex-col">
                        <p className="text-sm">{message.text}</p>
                        <span className="mt-1 text-xs text-right opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <Card className="p-4 border shadow-md bg-secondary text-secondary-foreground rounded-2xl backdrop-blur-sm border-white/10">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                    <motion.span
                      className="text-sm"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Thinking...
                    </motion.span>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Empty div for scrolling to bottom */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="relative z-10 p-4 border-t border-gray-700/50 bg-gray-900/70 backdrop-blur-sm">
        <motion.div
          className="flex space-x-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tulis pesanmu disini bray..."
              className="text-white transition-all duration-200 bg-gray-800/80 border-gray-700/50 focus:border-primary backdrop-blur-sm focus:shadow-lg focus:shadow-primary/20"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === "" || isLoading}
              className="transition-all duration-200 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatInterface;

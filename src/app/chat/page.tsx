"use client";

import { useState, useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import dynamic from "next/dynamic";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import OpenAI from "openai";

// Define proper types for message objects
type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

// Define proper type for the props
type ChatMessageProps = {
  message: ChatMessage;
};

// Define mock component with proper type annotation
const FallbackChatMessage = ({ message }: ChatMessageProps) => (
  <div className={`p-3 rounded-lg ${message.role === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}>
    {message.content}
  </div>
);

// Dynamically import ChatMessage with error handling and proper type
const ChatMessage = dynamic<ChatMessageProps>(
  () => import("@/components/ui/chat-message").catch(() => ({ default: FallbackChatMessage })),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

// This is a client-side only component that needs to be initialized with an API key entered by the user
export default function AIChatPage() {
  const [openaiClient, setOpenaiClient] = useState<OpenAI | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);

  // Initialize OpenAI client when API key is provided
  const initializeClient = () => {
    if (!apiKey.trim()) {
      setError("Please enter a valid API key");
      return;
    }

    try {
      const client = new OpenAI({
        apiKey: apiKey.trim(),
        dangerouslyAllowBrowser: true,
      });
      
      setOpenaiClient(client);
      setIsConfigured(true);
      setError("");
      console.log("OpenAI client initialized successfully");
    } catch (error) {
      console.error("Failed to initialize OpenAI client:", error);
      setError("Failed to initialize client. Please check your API key.");
      setIsConfigured(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!isConfigured) {
      setError("Please configure your API key first");
      return;
    }
    
    setError("");
    setDebugInfo(null);

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      if (!openaiClient) {
        throw new Error("OpenAI client not initialized");
      }

      // Make the API call
      console.log("Making API request to SambaNova...");
      
      const response = await openaiClient.chat.completions.create({
        model: "Meta-Llama-3.1-405B-Instruct",
        messages: [...messages, userMessage],
        temperature: 0.1,
        top_p: 0.1,
      });
      
      console.log("API response:", response);

      if (response.choices && response.choices.length > 0) {
        const aiMessage: ChatMessage = {
          role: "assistant",
          content: response.choices[0].message.content || "No response",
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (error: any) {
      console.error("Chat API Error:", error);
      
      // Extract and log detailed error information
      const errorInfo = {
        message: error.message || "Unknown error",
        status: error.status,
        statusText: error.statusText,
        response: null as any,
      };
      
      try {
        if (error.response) {
          errorInfo.response = await error.response.json();
        }
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      
      console.error("Detailed error info:", errorInfo);
      setDebugInfo(errorInfo);
      
      setError(`Failed to get response: ${errorInfo.message}`);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request. Please check the debug information below.",
        },
      ]);
    }

    setLoading(false);
  };

  // Handle enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-4">
      <BlurFade delay={0.04}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">AI Chat</h1>
      </BlurFade>

      {!isConfigured && (
        <div className="mb-6 p-4 border border-blue-300 rounded-lg bg-blue-50">
          <h2 className="font-medium mb-2">Configure API Key</h2>
          <p className="text-sm mb-3">Enter your SambaNova API key to connect to the service:</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <Button onClick={initializeClient}>
              Connect
            </Button>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden rounded-xl p-4 border border-gray-300">
        <BorderBeam
          duration={4}
          size={300}
          reverse
          className="from-transparent via-blue-500 to-transparent"
        />
        <div className="h-96 overflow-y-auto flex flex-col gap-4 p-4 mb-4">
          {messages.slice(1).map((msg, index) => (
            <div key={index} className={`p-3 rounded-lg ${msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}>
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="self-start bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="animate-pulse">Thinking...</div>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="text-red-500 mb-2 p-2 border border-red-300 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {debugInfo && (
          <div className="mb-2 p-2 border border-yellow-300 bg-yellow-50 rounded-lg text-xs overflow-auto max-h-40">
            <p className="font-medium">Debug Info:</p>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none"
            disabled={loading || !isConfigured}
          />
          <Button 
            onClick={sendMessage} 
            disabled={loading || !input.trim() || !isConfigured}
            className="px-4"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
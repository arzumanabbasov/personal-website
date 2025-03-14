"use client";

import React from "react";

export default function ChatMessage({ message }: { message: { role: string; content: string } }) {
  const isUser = message.role === "user";
  
  return (
    <div className={`p-2 rounded-lg ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
      <p>{message.content}</p>
    </div>
  );
}

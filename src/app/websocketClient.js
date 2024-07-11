// src/app/WebSocketClient.js
"use client";

import useWebSocket from "@/hooks/useWebSocket";
import { useState } from "react";

const WebSocketClient = () => {
  const { messages, setMessages, sendMessage } = useWebSocket(
    "ws://localhost:8000"
  );
  const [messageInput, setMessageInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketClient;

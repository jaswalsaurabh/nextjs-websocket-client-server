"use client";
import WebSocketClient from "./websocketClient";

export default function Home() {
  return (
    <main className="bg-slate-50 h-screen ">
      <WebSocketClient />
    </main>
  );
}

import React from "react";
import { useState } from "react";
import LoginGate from "../components/LoginGate";

export default function Home() {
  const [messages, setMessages] = useState([{ role: "system", content: "You are Quit Coach, a supportive recovery assistant..." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
  <LoginGate>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        padding: "2rem",
      }}
    >
      <img
        src="/logo.png"
        alt="Quit Coach Logo"
        style={{ maxWidth: "120px", marginBottom: "1.5rem" }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "0.5rem",
            backgroundColor: "#fafafa",
          }}
        >
          {messages.slice(1).map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: m.role === "user" ? "right" : "left",
                marginBottom: "0.5rem",
              }}
            >
              <strong>{m.role === "user" ? "You" : "Quit Coach"}:</strong>{" "}
              {m.content}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{
              backgroundColor: "#0670DB",
              color: "#fff",
              padding: "0.75rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: "bold",
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  </LoginGate>
);

}

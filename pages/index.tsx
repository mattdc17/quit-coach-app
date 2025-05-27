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
        justifyContent: "start",
        minHeight: "100vh",
        padding: "2rem 1rem",
        backgroundColor: "#F5F5F5",
      }}
    >
      <img
        src="/logo.png"
        alt="Quit Coach Logo"
        style={{ maxWidth: "100px", marginBottom: "1rem" }}
      />
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", textAlign: "center", marginBottom: "0.5rem" }}>
        Quit Coach
      </h1>
      <p style={{ textAlign: "center", maxWidth: "500px", marginBottom: "1.5rem", fontSize: "1rem", color: "#333" }}>
        For people quitting substances or healing afterward — quick, clear support to take back control of your life.
      </p>

      {/* Conversation Starters */}
      <div style={{ maxWidth: "600px", width: "100%", marginBottom: "1.5rem" }}>
        <h3 style={{ marginBottom: "0.5rem", fontWeight: "600" }}>Conversation Starters</h3>
        {[
          "I’m ready to quit kratom — where do I start?",
          "I keep relapsing at night. Can we talk about that?",
          "Why do I feel scared of quitting even though I hate using?",
          "I want to taper down, but I don’t know how fast to go.",
          "I'm afraid that if I quit, I won't be able to enjoy my life.",
          "Can you give me motivation to get through my day?",
          "I want to quit, but I just don't know where to start.",
        ].map((starter, idx) => (
          <div
            key={idx}
            onClick={() => {
              setInput(starter);
              setTimeout(() => sendMessage(), 100); // auto-send
            }}
            style={{
              backgroundColor: "#fff",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              marginBottom: "0.5rem",
              cursor: "pointer",
              border: "1px solid #ccc",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          >
            {starter}
          </div>
        ))}
      </div>

      {/* Chat Box */}
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

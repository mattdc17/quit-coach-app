import { useState } from "react";
import LoginGate from "../components/LoginGate";
import '../styles/globals.css';

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
      <div className="chat-container max-w-2xl mx-auto mt-10 p-4">
        <img src="/logo.png" alt="Quit Coach Logo" style={{ maxWidth: "150px", marginBottom: "1rem" }} />
        <div style={{ height: "300px", overflowY: "auto", marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "0.5rem" }}>
          {messages.slice(1).map((m, i) => (
            <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", marginBottom: "0.5rem" }}>
              <strong>{m.role === "user" ? "You" : "Quit Coach"}:</strong> {m.content}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem" }} />
          <button onClick={sendMessage} disabled={loading} style={{ backgroundColor: "#0670DB", color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </LoginGate>
  );
}

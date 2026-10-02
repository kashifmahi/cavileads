import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X, Send, Sparkles, ArrowRight } from "lucide-react";
import { useRatesModal } from "../context/RatesModalContext";
import { API } from "../App";

const SUGGESTIONS = [
  "If I deposit $50,000 for 12 months, how much could I earn?",
  "6-month vs 12-month CD — what's the difference?",
  "What happens when my CD matures?",
  "Can I withdraw my money early?",
];

const getSessionId = () => {
  let id = sessionStorage.getItem("cavicord_chat_session");
  if (!id) {
    id = (crypto.randomUUID && crypto.randomUUID()) || `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("cavicord_chat_session", id);
  }
  return id;
};

// Minimal renderer: newlines + **bold**
const renderText = (text) =>
  text.split("\n").map((line, i) => (
    <p key={i} className={i > 0 ? "mt-1.5" : ""}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
        seg.startsWith("**") && seg.endsWith("**") ? (
          <strong key={j} className="font-semibold">{seg.slice(2, -2)}</strong>
        ) : (
          seg
        )
      )}
    </p>
  ));

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const { openRatesModal } = useRatesModal();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending, open]);

  const send = async (text) => {
    const message = (text || input).trim();
    if (!message || sending) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: message }]);
    setSending(true);
    try {
      const res = await axios.post(`${API}/chat`, {
        session_id: getSessionId(),
        message,
      });
      setMessages((m) => [...m, { role: "model", content: res.data.reply }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "model",
          content: "Sorry — I'm temporarily unavailable. Please try again in a moment.",
          error: true,
        },
      ]);
    } finally {
      setSending(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const assistantReplied = messages.some((m) => m.role === "model" && !m.error);

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          data-testid="chat-widget-button"
          onClick={() => setOpen(true)}
          aria-label="Open CD assistant chat"
          className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          data-testid="chat-widget-panel"
          className="fixed bottom-5 right-5 z-50 flex flex-col w-[calc(100vw-2.5rem)] sm:w-[380px] h-[min(560px,calc(100vh-6rem))] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#16233d]">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">Cavicord Assistant</p>
                <p className="text-[10px] text-slate-400">AI · educational info, not financial advice</p>
              </div>
            </div>
            <button
              data-testid="chat-close-button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.length === 0 && (
              <div>
                <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 p-3 text-sm text-slate-700 leading-relaxed">
                  Hi! I'm Cavi. Ask me anything about CDs — rates on this site, how much
                  you could earn, maturity, penalties, and more.
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      data-testid="chat-suggestion"
                      onClick={() => send(s)}
                      className="text-left text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl px-3 py-2 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  data-testid={m.role === "user" ? "chat-user-message" : "chat-assistant-message"}
                  className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-emerald-600 text-white rounded-br-sm"
                      : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
                  }`}
                >
                  {renderText(m.content)}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start" data-testid="chat-typing-indicator">
                <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200 px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lead CTA after a helpful exchange */}
          {assistantReplied && (
            <div className="px-4 pt-2 bg-slate-50">
              <button
                data-testid="chat-lead-cta"
                onClick={() => {
                  setOpen(false);
                  openRatesModal();
                }}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#16233d] hover:bg-[#1e2f52] text-white text-sm font-semibold py-2.5 transition-colors"
              >
                See personalized CD options <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 p-3 bg-slate-50 border-t border-slate-200"
          >
            <input
              ref={inputRef}
              data-testid="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about CDs…"
              maxLength={2000}
              className="flex-1 h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 transition-colors"
            />
            <button
              type="submit"
              data-testid="chat-send-button"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

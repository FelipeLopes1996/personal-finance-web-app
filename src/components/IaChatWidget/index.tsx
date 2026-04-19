import { Button } from "@/components/Button";
import SpinnerLoading from "@/components/SpinnerLoading";
import { TextField } from "@/components/TextField";
import { useIaChat } from "@/hooks/useIaChat";
import { MessageSquare, Send, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function bubbleClasses(role: "user" | "assistant") {
  const base =
    "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed border";
  return role === "user"
    ? `${base} bg-teal-600 text-white border-teal-600 ml-auto`
    : `${base} bg-white text-[#1f1f1f] border-[#e5e5e5] mr-auto`;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full bg-[#666666] animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="inline-block w-1.5 h-1.5 rounded-full bg-[#666666] animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="inline-block w-1.5 h-1.5 rounded-full bg-[#666666] animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </span>
  );
}

export default function IaChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isSending, sendMessage } = useIaChat();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => {
    return !isSending && input.trim().length > 0;
  }, [input, isSending]);

  const scrollToBottom = useCallback(() => {
    const container = scrollRef.current;
    const anchor = bottomRef.current;
    if (!container || !anchor) return;
    anchor.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => scrollToBottom());
  }, [messages.length, open, scrollToBottom]);

  const onSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending) return;
    setInput("");
    await sendMessage(text);
  }, [input, isSending, sendMessage]);

  return (
    <div className="fixed bottom-16 md:bottom-4 right-4 z-50">
      {open ? (
        <div className="w-[22rem] max-w-[90vw] bg-white border border-[#e5e5e5] rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2  border-b border-[#e5e5e5]">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1f1f1f]">
              <MessageSquare size={18} />
              Consultor de Gastos
            </div>
            <button
              type="button"
              className="p-1 rounded hover:bg-white/60 cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Fechar chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-[20rem] bg-teal-50">
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto p-3 space-y-2"
            >
              {messages.length === 0 ? (
                <div className="text-sm text-[#666666]">
                  Escreva uma mensagem para começar.
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="flex">
                    <div className={bubbleClasses(m.role)}>
                      {m.isTyping ? <TypingDots /> : m.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          <form
            className="p-3 border-t border-[#e5e5e5] flex gap-2 items-end"
            onSubmit={(e) => {
              e.preventDefault();
              onSend();
            }}
          >
            <div className="flex-1">
              <TextField
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending}
              />
            </div>
            <Button type="submit" disabled={!canSend} className="p-4 w-max">
              {isSending ? (
                <span className="flex items-center justify-center gap-2">
                  <SpinnerLoading width="6" height="6" />
                </span>
              ) : (
                <Send className="m-auto" />
              )}
            </Button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          className="w-12 h-12 rounded-full bg-teal-600 text-white shadow-lg flex items-center justify-center hover:bg-teal-700 transition-colors cursor-pointer"
          onClick={() => setOpen(true)}
          aria-label="Abrir chat"
        >
          <MessageSquare />
        </button>
      )}
    </div>
  );
}

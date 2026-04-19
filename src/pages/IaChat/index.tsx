import { Button } from "@/components/Button";
import SpinnerLoading from "@/components/SpinnerLoading";
import { TextField } from "@/components/TextField";
import { useIaChat } from "@/hooks/useIaChat";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

function bubbleClasses(role: ChatRole) {
  const base =
    "max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed border";
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

export default function IaChat() {
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
    // Sempre que chegar mensagem nova, faz scroll suave no bloco de mensagens
    requestAnimationFrame(() => scrollToBottom());
  }, [messages.length, scrollToBottom]);

  const onSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isSending) return;
    setInput("");
    queueMicrotask(scrollToBottom);
    await sendMessage(text);
  }, [input, isSending, scrollToBottom, sendMessage]);

  return (
    <div className="container mx-auto h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-[2rem] mb-2">Consultor de Gastos</h1>
        <p className="text-sm text-[#666666]">
          Descreva uma situação e eu te ajudo a analisar seus gastos.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto bg-teal-50 border border-[#e5e5e5] rounded-lg p-4 space-y-3"
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

      <div className="mt-4 ">
        <form
          className="flex gap-3 items-end "
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
        >
          <div className="flex-1 ">
            <TextField
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />
          </div>
          <div className="w-[10rem]">
            <Button className="p-[1.1rem]" type="submit" disabled={!canSend}>
              {isSending ? (
                <span className="flex items-center justify-center gap-2">
                  <SpinnerLoading width="5" height="5" />
                  Enviando...
                </span>
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

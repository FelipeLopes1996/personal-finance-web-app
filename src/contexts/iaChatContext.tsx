import { api } from "@/api/axios";
import CustomToast from "@/components/CustomToast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { IaChatMessage } from "@/types/IIaChatMessage";
import { formatters } from "@/utils/formatters";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ApiError = { message?: string; error?: string };

interface IaChatContextValue {
  messages: IaChatMessage[];
  isSending: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

const IaChatContext = createContext<IaChatContextValue | null>(null);

const STORAGE_KEY = "@finance:ia-chat-messages";

type IaChatProviderProps = { children: ReactNode };

function IaChatProvider({ children }: IaChatProviderProps) {
  const { value: iaMessages, setValue: setIaChatMessages } = useLocalStorage<
    string | null
  >(STORAGE_KEY, null);
  const [messages, setMessages] = useState<IaChatMessage[]>(() =>
    formatters.safeParseMessages(iaMessages),
  );

  useEffect(() => {
    setIaChatMessages(JSON.stringify(messages));
  }, [messages, setIaChatMessages]);

  const assistantMutation = useMutation<unknown, AxiosError<ApiError>, string>({
    mutationFn: async (payload: string) => {
      const res = await api.post("/api/assistant", payload, {
        headers: { "Content-Type": "text/plain" },
      });
      return res.data;
    },
    onError: (errors) => {
      CustomToast({
        title:
          errors?.response?.data?.error ||
          errors?.response?.data?.message ||
          "Erro ao enviar mensagem",
        status: "error",
      });
    },
  });

  const sendMessage = useCallback(
    async (textRaw: string) => {
      const text = textRaw.trim();
      if (!text || assistantMutation.isPending) return;

      const typingId = crypto.randomUUID();

      const userMsg: IaChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
      };

      const typingMsg: IaChatMessage = {
        id: typingId,
        role: "assistant",
        isTyping: true,
      };

      setMessages((prev) => [...prev, userMsg, typingMsg]);

      try {
        const data = await assistantMutation.mutateAsync(text);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? {
                  ...m,
                  isTyping: false,
                  content: formatters.getAssistantText(data),
                }
              : m,
          ),
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? {
                  ...m,
                  isTyping: false,
                  content:
                    "Não consegui enviar sua mensagem agora. Tente novamente em instantes.",
                }
              : m,
          ),
        );
      }
    },
    [assistantMutation],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const value = useMemo<IaChatContextValue>(
    () => ({
      messages,
      isSending: assistantMutation.isPending,
      sendMessage,
      clearMessages,
    }),
    [assistantMutation.isPending, clearMessages, messages, sendMessage],
  );

  return (
    <IaChatContext.Provider value={value}>{children}</IaChatContext.Provider>
  );
}

export { IaChatContext, IaChatProvider };

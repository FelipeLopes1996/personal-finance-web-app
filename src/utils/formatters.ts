import type { IaChatMessage } from "@/types/IIaChatMessage";

export const formatters = {
  formatDateBR: (date: string) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  },
  safeParseMessages: (raw: string | null): IaChatMessage[] => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((m) => m && typeof m === "object")
        .map((m) => m as IaChatMessage)
        .filter(
          (m) =>
            typeof m.id === "string" &&
            (m.role === "user" || m.role === "assistant") &&
            (typeof m.content === "string" || m.content === undefined),
        );
    } catch {
      return [];
    }
  },
  getAssistantText: (data: unknown): string => {
    if (typeof data === "string") return data;
    if (data && typeof data === "object") {
      const anyData = data as Record<string, unknown>;
      if (typeof anyData.message === "string") return anyData.message;
      if (typeof anyData.text === "string") return anyData.text;
      if (typeof anyData.response === "string") return anyData.response;
    }
    try {
      return JSON.stringify(data);
    } catch {
      return "Não consegui interpretar a resposta do assistente.";
    }
  },
};

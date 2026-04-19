type ChatRole = "user" | "assistant";
export interface IaChatMessage {
  id: string;
  role: ChatRole;
  content?: string;
  isTyping?: boolean;
}

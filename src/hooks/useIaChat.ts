import { IaChatContext } from "@/contexts/iaChatContext";
import { useContext } from "react";

export function useIaChat() {
  const context = useContext(IaChatContext);

  if (!context) {
    throw new Error("useIaChat deve ser usado dentro de IaChatProvider");
  }

  return context;
}


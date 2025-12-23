import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Erro ao ler do localStorage", error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Erro ao salvar no localStorage", error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Erro ao remover do localStorage", error);
    }
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
  };
}

import { useCallback, useSyncExternalStore } from "react";
import type { Todo } from "../types";

const STORAGE_KEY = "todos";

let cachedSnapshot: Todo[] | null = null;

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  cachedSnapshot = todos;
  listeners.forEach((l) => l());
}

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): Todo[] {
  if (cachedSnapshot === null) {
    cachedSnapshot = loadTodos();
  }
  return cachedSnapshot;
}

export function useTodos() {
  const todos = useSyncExternalStore(subscribe, getSnapshot);

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const current = loadTodos();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    saveTodos([newTodo, ...current]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    const current = loadTodos();
    saveTodos(
      current.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    const current = loadTodos();
    saveTodos(current.filter((t) => t.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const current = loadTodos();
    saveTodos(current.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  }, []);

  const clearCompleted = useCallback(() => {
    const current = loadTodos();
    saveTodos(current.filter((t) => !t.completed));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted };
}

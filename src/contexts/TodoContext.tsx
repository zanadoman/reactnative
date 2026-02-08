import Todo from "../models/Todo";
import { createContext, JSX, ReactNode, useContext, useRef, useState } from "react";
import { Storage } from "../../Globals";

interface TodoContextType {
  todos: Map<number, Todo>;
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const key = "todos";
const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }): JSX.Element {
  const [todos, setTodos] = useState<Map<number, Todo>>(
    new Map(JSON.parse(Storage.getString(key) ?? "[]")),
  );
  const id = useRef(0);

  function addTodo(todo: Todo): void {
    const map = new Map(todos);
    map.set((todo.id = id.current += 1), { ...todo, done: false });
    Storage.set(key, JSON.stringify([...map]));
    setTodos(map);
  }

  function toggleTodo(id: number): void {
    const map = new Map(todos);
    map.get(id)!.done = !map.get(id)!.done;
    Storage.set(key, JSON.stringify([...map]));
    setTodos(map);
  }

  function removeTodo(id: number): void {
    const map = new Map(todos);
    map.delete(id);
    Storage.set(key, JSON.stringify([...map]));
    setTodos(map);
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) throw new Error();
  return context;
}

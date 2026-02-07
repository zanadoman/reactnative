import { Todo } from "../models/Todo";
import { createContext, JSX, ReactNode, useContext, useRef, useState } from "react";

interface TodoContextType {
  todos: Map<number, Todo>;
  addTodo: (todo: Todo) => void;
  doneTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }): JSX.Element {
  const [todos, setTodos] = useState<Map<number, Todo>>(new Map());
  const id = useRef(0);

  function addTodo(todo: Todo): void {
    const map = new Map(todos);
    map.set((todo.id = id.current += 1), { ...todo, done: false });
    setTodos(map);
  }

  function doneTodo(id: number): void {
    const map = new Map(todos);
    map.get(id)!.done = true;
    setTodos(map);
  }

  function removeTodo(id: number): void {
    const map = new Map(todos);
    map.delete(id);
    setTodos(map);
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, doneTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos(): TodoContextType {
  const context = useContext(TodoContext);
  if (!context) throw new Error();
  return context;
}

import { Todo } from "../models/Todo";
import { JSX } from "react";
import { useTodos } from "../contexts/TodoContext";
import { Avatar, Card, IconButton } from "react-native-paper";

export function TodoWidget({ todo }: { todo: Todo }): JSX.Element {
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <Card>
      <Card.Title
        title={todo.title}
        subtitle={todo.content}
        left={(props) => <Avatar.Icon {...props} icon="rocket" />}
      />
      <Card.Actions>
        <IconButton icon="delete" onPress={() => removeTodo(todo.id)} />
        <IconButton icon="check" onPress={() => toggleTodo(todo.id)} />
      </Card.Actions>
    </Card>
  );
}

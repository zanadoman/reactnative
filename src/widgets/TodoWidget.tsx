import { Todo } from "../models/Todo";
import { JSX, useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import { View } from "react-native";
import { Avatar, Button, Card, Dialog, IconButton, Portal, Text } from "react-native-paper";

export function TodoWidget({ todo }: { todo: Todo }): JSX.Element {
  const [dialog, setDialog] = useState(false);
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <View>
      <Card>
        <Card.Title
          title={todo.title}
          subtitle={todo.content}
          left={(props) => <Avatar.Icon {...props} icon="rocket" />}
        />
        <Card.Actions>
          <IconButton icon="delete" onPress={() => setDialog(true)} />
          <IconButton icon="check" onPress={() => toggleTodo(todo.id)} />
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to delete?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialog(false)}>Cancel</Button>
            <Button onPress={() => removeTodo(todo.id)}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

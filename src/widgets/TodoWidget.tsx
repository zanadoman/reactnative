import Todo from "../models/Todo";
import { JSX, useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import { View } from "react-native";
import { Avatar, Button, Card, Dialog, IconButton, Portal, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

export default function TodoWidget({ todo }: { todo: Todo }): JSX.Element {
  const [qrcode, showQrcode] = useState(false);
  const [remove, showRemove] = useState(false);
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <View>
      <Card onPress={() => showQrcode(true)}>
        <Card.Title
          title={todo.title}
          subtitle={todo.content}
          left={(props) => <Avatar.Icon {...props} icon="rocket" />}
        />
        <Card.Actions>
          <IconButton icon="delete" onPress={() => showRemove(true)} />
          <IconButton icon="check" onPress={() => toggleTodo(todo.id)} />
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog visible={qrcode} onDismiss={() => showQrcode(false)}>
          <Dialog.Title style={{ textAlign: "center" }}>{todo.title}</Dialog.Title>
          <Dialog.Content style={{ alignItems: "center" }}>
            <QRCode value={JSON.stringify(todo)} size={200} backgroundColor="transparent" />
          </Dialog.Content>
        </Dialog>
        <Dialog visible={remove} onDismiss={() => showRemove(false)}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to delete?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => showRemove(false)}>Cancel</Button>
            <Button onPress={() => removeTodo(todo.id)}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

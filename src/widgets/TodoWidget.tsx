import Todo from "../models/Todo";
import { JSX, useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import { View } from "react-native";
import { Avatar, Button, Card, Dialog, IconButton, Portal, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

export default function TodoWidget({ todo }: { todo: Todo }): JSX.Element {
  const { toggleTodo, removeTodo } = useTodos();
  const [qrcode, setQrcode] = useState(false);
  const [remove, setRemove] = useState(false);

  return (
    <View>
      <Card onPress={() => setQrcode(true)}>
        <Card.Title
          title={todo.title}
          subtitle={todo.content}
          left={(props) => <Avatar.Icon {...props} icon="rocket" />}
        />
        <Card.Actions>
          <IconButton icon="delete" onPress={() => setRemove(true)} />
          <IconButton icon="check" onPress={() => toggleTodo(todo.id)} />
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog visible={qrcode} onDismiss={() => setQrcode(false)}>
          <Dialog.Title style={{ textAlign: "center" }}>{todo.title}</Dialog.Title>
          <Dialog.Content style={{ alignItems: "center" }}>
            <QRCode value={JSON.stringify(todo)} size={200} backgroundColor="transparent" />
          </Dialog.Content>
        </Dialog>
        <Dialog visible={remove} onDismiss={() => setRemove(false)}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to delete?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setRemove(false)}>Cancel</Button>
            <Button onPress={() => removeTodo(todo.id)}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

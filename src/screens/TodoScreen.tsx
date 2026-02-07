import { JSX, useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { FlatList, View } from "react-native";
import { TodoWidget } from "../widgets/TodoWidget";

export function TodoScreen(): JSX.Element {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { todos, addTodo } = useTodos();

  return (
    <SafeAreaView style={{ flex: 1, gap: 20, padding: 20 }}>
      <Text variant="displaySmall">Todo App</Text>
      <Card>
        <Card.Content style={{ gap: 10 }}>
          <TextInput label="Title" onChangeText={setTitle} />
          <TextInput label="Content" onChangeText={setContent} />
          <Button
            mode="contained"
            onPress={() =>
              addTodo({
                id: NaN,
                title: title,
                content: content,
                done: false,
              })
            }
          >
            Add
          </Button>
        </Card.Content>
      </Card>
      <FlatList
        data={[...todos]}
        keyExtractor={(item) => item[0].toString()}
        renderItem={(item) => <TodoWidget todo={item.item[1]} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}

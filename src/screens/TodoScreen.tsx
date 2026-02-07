import { JSX, useState } from "react";
import { useTodos } from "../contexts/TodoContext";
import { ScrollView, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { TodoWidget } from "../widgets/TodoWidget";

export function TodoScreen(): JSX.Element {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { todos, addTodo } = useTodos();

  return (
    <View style={{ padding: 20, gap: 20 }}>
      <View style={{ gap: 20 }}>
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
      </View>
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {[...todos]
          .filter((todo) => !todo[1].done)
          .map((todo) => (
            <TodoWidget key={todo[0]} todo={todo[1]} />
          ))}
      </ScrollView>
    </View>
  );
}

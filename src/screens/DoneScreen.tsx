import { JSX } from "react";
import { useTodos } from "../contexts/TodoContext";
import { FlatList, View } from "react-native";
import TodoWidget from "../widgets/TodoWidget";
import ScanWidget from "../widgets/ScanWidget";

export default function DoneScreen(): JSX.Element {
  const { todos } = useTodos();

  return (
    <View style={{ flex: 1, gap: 20, padding: 20 }}>
      <FlatList
        data={[...todos].filter((todo) => todo[1].done)}
        keyExtractor={(item) => item[0].toString()}
        renderItem={(item) => <TodoWidget todo={item.item[1]} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <ScanWidget done={true} />
    </View>
  );
}

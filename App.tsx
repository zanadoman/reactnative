import { JSX } from "react";
import { PaperProvider } from "react-native-paper";
import { TodoProvider } from "./src/contexts/TodoContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <TodoProvider>
        <SafeAreaView>
          <TodoScreen />
        </SafeAreaView>
      </TodoProvider>
    </PaperProvider>
  );
}

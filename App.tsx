import { JSX } from "react";
import { PaperProvider } from "react-native-paper";
import { TodoProvider } from "./src/contexts/TodoContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <TodoProvider>
        <SafeAreaProvider>
          <TodoScreen />
        </SafeAreaProvider>
      </TodoProvider>
    </PaperProvider>
  );
}

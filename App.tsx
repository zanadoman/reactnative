import { JSX, useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { TodoScreen } from "./src/screens/TodoScreen";
import { DoneScreen } from "./src/screens/DoneScreen";
import { BottomNavigation, PaperProvider } from "react-native-paper";
import { TodoProvider } from "./src/contexts/TodoContext";

export default function App(): JSX.Element {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "todo", title: "Todos", focusedIcon: "home", unfocusedIcon: "home-outline" },
    { key: "done", title: "Done", focusedIcon: "check", unfocusedIcon: "check-outline" },
  ]);

  return (
    <PaperProvider>
      <TodoProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={BottomNavigation.SceneMap({
            todo: () => <TodoScreen />,
            done: () => <DoneScreen />,
          })}
        />
      </TodoProvider>
    </PaperProvider>
  );
}

import { JSX, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { FAB, Modal, Portal } from "react-native-paper";
import { View } from "react-native";
import { useTodos } from "../contexts/TodoContext";

export default function ScanWidget({ done }: { done: boolean }): JSX.Element | null {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scan, setScan] = useState(false);
  const { addTodo } = useTodos();

  return device ? (
    <>
      <FAB
        style={{ position: "absolute", right: 0, bottom: 0, margin: 15 }}
        icon="qrcode"
        onPress={() => requestPermission().then(setScan)}
      />
      <Portal>
        <Modal visible={hasPermission && scan} onDismiss={() => setScan(false)}>
          <View
            style={{
              alignSelf: "center",
              width: 300,
              height: 300,
              borderRadius: 30,
              overflow: "hidden",
            }}
          >
            <Camera
              style={{ flex: 1 }}
              device={device}
              isActive={hasPermission && scan}
              codeScanner={useCodeScanner({
                codeTypes: ["qr"],
                onCodeScanned: (codes) => {
                  if (scan) {
                    setScan(false);
                    addTodo({ ...JSON.parse((codes[0].value ?? "{}").toString()), done: done });
                  }
                },
              })}
            />
          </View>
        </Modal>
      </Portal>
    </>
  ) : null;
}

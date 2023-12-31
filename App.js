import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserDetails from "./User-Details";

export default function App() {
  return (
    <>
      <Text>Hello E-commerce</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

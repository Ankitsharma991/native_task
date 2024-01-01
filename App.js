import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import UserDetails from "./User-Details";

export default function App() {
  return (
    <>
      <UserDetails />
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

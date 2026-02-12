import { StyleSheet, Text, View } from "react-native";

export default function Initial() {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  hello: {
    color: "#fff",
  },
});

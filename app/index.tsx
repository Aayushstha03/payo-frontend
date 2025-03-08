import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "~/components/ui/button";

export default function LogInScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the login page</Text>
      <Link href="/register">Register new user {"\n"}</Link>
      <Button
        variant="default"
        onPress={() => console.log("Login button pressed")}
      >
        <Text>Login</Text>
      </Button>
      <Link href="/home">
        This is the homepage after successful login, pachi private authenticated
        link banaunu parcha
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

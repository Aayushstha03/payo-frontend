import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

export default function LogInScreen() {
  return (
    <View style={styles.container} className="bg-background text-primary">
      <Text>This is the login page</Text>
      <Link href="/register">Register new user {"\n"}</Link>
      <Button
        variant="default"
        onPress={() => console.log("Login button pressed")}
      >
        <Text>Login</Text>
      </Button>
      <Link href="/home">
        <Text>
          This is the homepage after successful login, pachi private
          authenticated link banaunu parcha
        </Text>
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

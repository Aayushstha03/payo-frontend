import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";

import Doodle from "~/components/Doodle";
import LoginForm from "~/components/forms/loginform";

import { Text } from "~/components/ui/text";

export default function RegisterScreen() {
  return (
    <View className="h-screen bg-background flex flex-col justify-between items-center text-primary p-lg">
      <Text className="text-3xl font-bold">PAYO</Text>
      <View className="w-full">
        <LoginForm />
      </View>

      <View className="pb-md">
        <Text>Not registered yet?{" \n"}</Text>
        <Link href="./register" className="mt-xs text-center ">
          <Text className="text-xl font-bold ">Register</Text>
        </Link>
      </View>
      <Doodle
        doodle="squarle"
        className="w-[75px] h-[100px] top-12 -right-6 "
      />

      <Doodle
        doodle="bline"
        className="w-[100px] h-[100px] bottom-12 -left-16 "
      />
    </View>
  );
}

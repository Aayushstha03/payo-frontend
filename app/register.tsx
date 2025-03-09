import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import Doodle from "~/components/Doodle";
import RegistrationForm from "~/components/forms/registrationform";
import { Text } from "~/components/ui/text";

export default function RegisterScreen() {
  return (
    <View className="h-screen bg-background flex flex-col justify-between items-center text-primary p-lg">
      <Text className="text-3xl font-bold">PAYO</Text>
      <View className="w-full">
        <RegistrationForm />
      </View>

      <View className="pb-md">
        <Text>Already have an account?{" \n"}</Text>
        <Link href="./" className="mt-xs text-center ">
          <Text className="text-xl font-bold ">Log in</Text>
        </Link>
      </View>
      <Doodle doodle="dots" className="w-[75px] h-[100px] top-12 -right-6 " />

      <Doodle doodle="log" className="w-[100px] h-[100px] bottom-12 -left-6 " />
    </View>
  );
}

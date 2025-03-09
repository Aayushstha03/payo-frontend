import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",

    password: "",
  });

  const handleChange = (name: keyof typeof form, value: String | Number) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Log in user:", form);
  };

  return (
    <View className="flex flex-col gap-sm items-center  bg-background text-primary w-full px-sm">
      <Text className="text-3xl font-bold text-primary mb-xl text-center">
        Log In
      </Text>

      <View className="w-full">
        <Text className="text-sm  mb-xs">Username</Text>
        <Input
          placeholder="Choose a username"
          value={form.username}
          onChangeText={(value) => handleChange("username", value)}
          className="mb-md"
        />
      </View>

      <View className="w-full">
        <Text className="text-sm  mb-xs">Password</Text>
        <Input
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
          className="mb-md"
        />
      </View>
      <View className="w-full">
        <Button
          onPress={handleSubmit}
          className="mt-md w-full bg-primary text-background  py-lg rounded-lg"
        >
          <Text className="text-lg font-semibold">Log In</Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginForm;

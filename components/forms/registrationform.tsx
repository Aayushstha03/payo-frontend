import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (name: keyof typeof form, value: String | Number) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Registering user:", form);
  };

  return (
    <View className="flex flex-col gap-sm items-center  bg-background text-primary w-full px-sm">
      <Text className="text-3xl font-bold text-primary mb-xl text-center">
        Register
      </Text>
      <View className="flex flex-row gap-sm w-full">
        <View className="flex-1">
          <Text className="text-sm  mb-xs">First Name</Text>
          <Input
            placeholder="Enter your first name"
            value={form.firstName}
            onChangeText={(value) => handleChange("firstName", value)}
            className="mb-md max-w-full"
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm  mb-xs">Last Name</Text>
          <Input
            placeholder="Enter your last name"
            value={form.lastName}
            onChangeText={(value) => handleChange("lastName", value)}
            className="mb-md max-w-full"
          />
        </View>
      </View>
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
        <Text className="text-sm  mb-xs">Email</Text>
        <Input
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
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
          <Text className="text-lg font-semibold">Register</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegistrationForm;

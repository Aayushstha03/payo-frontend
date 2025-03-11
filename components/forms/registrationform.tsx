import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { secureStoreGet, secureStoreSet } from "~/lib/utils";
import { router } from "expo-router";
import { base_api } from "~/constants";
import { alertContext } from "~/contexts";

const RegistrationForm = () => {
  const { pushAlert } = useContext(alertContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors when user types
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };

    if (!form.firstName.trim() || form.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      valid = false;
    }

    if (!form.lastName.trim() || form.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      valid = false;
    }

    if (!form.username.trim() || form.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!form.password.trim() || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    console.log("Submitting form:", form);

    try {
      const response = await fetch(`${base_api}/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Registering user:", data);
      if (data?.seed) {
        await secureStoreSet("seed", data.seed);
        console.log("Seed stored in secure store");
        pushAlert({
          duration: 2000,
          text: "Registration successful!",
          type: "success",
        });
        router.replace("./");
      } else {
        throw {};
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <View className="flex flex-col gap-sm items-center bg-background text-primary w-full px-sm">
      <Text className="text-3xl font-bold text-primary mb-xl text-center">
        Register
      </Text>

      <View className="flex flex-row gap-sm w-full">
        <View className="flex-1">
          <Text className="text-sm mb-xs">First Name</Text>
          <Input
            placeholder="Enter your first name"
            value={form.firstName}
            onChangeText={(value) => handleChange("firstName", value)}
            className="mb-xs max-w-full"
          />
          {errors.firstName ? (
            <Text className="text-red-500 text-xs">{errors.firstName}</Text>
          ) : null}
        </View>
        <View className="flex-1">
          <Text className="text-sm mb-xs">Last Name</Text>
          <Input
            placeholder="Enter your last name"
            value={form.lastName}
            onChangeText={(value) => handleChange("lastName", value)}
            className="mb-xs max-w-full"
          />
          {errors.lastName ? (
            <Text className="text-red-500 text-xs">{errors.lastName}</Text>
          ) : null}
        </View>
      </View>

      <View className="w-full">
        <Text className="text-sm mb-xs">Username</Text>
        <Input
          placeholder="Choose a username"
          value={form.username}
          onChangeText={(value) => handleChange("username", value)}
          className="mb-xs"
          autoCapitalize="none"
        />
        {errors.username ? (
          <Text className="text-red-500 text-xs">{errors.username}</Text>
        ) : null}
      </View>

      <View className="w-full">
        <Text className="text-sm mb-xs">Email</Text>
        <Input
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          className="mb-xs"
          autoCapitalize="none"
        />
        {errors.email ? (
          <Text className="text-red-500 text-xs">{errors.email}</Text>
        ) : null}
      </View>

      <View className="w-full">
        <Text className="text-sm mb-xs">Password</Text>
        <Input
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
          className="mb-xs"
          autoCapitalize="none"
        />
        {errors.password ? (
          <Text className="text-red-500 text-xs">{errors.password}</Text>
        ) : null}
      </View>

      <View className="w-full">
        <Button
          onPress={handleSubmit}
          className="mt-md w-full bg-primary text-background py-lg rounded-lg"
        >
          <Text className="text-lg font-semibold">Register</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegistrationForm;

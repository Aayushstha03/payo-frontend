import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { secureStoreGet, secureStoreSet } from "~/lib/utils";
import { router } from "expo-router";
import { base_api } from "~/constants";
import { alertContext } from "~/contexts";

const LoginForm = () => {
  const { pushAlert } = useContext(alertContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    form: "",
  });

  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    let valid = true;
    let newErrors = { username: "", password: "", form: "" };

    if (!form.username.trim()) {
      newErrors.username = "Username is required.";
      valid = false;
    }
    if (!form.username.trim() || form.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm({ ...form, [name]: value });

    // Clear errors while typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    console.log("Submitting form:", form);

    try {
      pushAlert({
        duration: 1000,
        text: "Logging in...",
        type: "default",
      });
      setIsSubmitting(true);
      const response = await fetch(`${base_api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Logging in user:", data);
      if (data?.jwt) {
        try {
          await secureStoreSet("jwt", data.jwt);
          await secureStoreSet("seed", data.seed.toString());
          console.log(data.seed);

          console.log("JWT stored in secure store");
        } catch {
          pushAlert({
            duration: 2000,
            text: "There was an error loging in.",
            type: "error",
          });
        }
        pushAlert({
          duration: 2000,
          text: "Successfully logged in!",
          type: "success",
        });
        router.replace("./home");
      } else {
        setErrors({ ...errors, form: data.error });
      }
    } catch (error: any) {
      pushAlert({
        duration: 2000,
        text: "There was an error loging in.",
        type: "error",
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <View className="flex flex-col gap-sm items-center bg-background text-primary w-full px-sm">
      <Text className="text-3xl font-bold text-primary mb-xl text-center">
        Log In
      </Text>

      <View className="w-full">
        <Text className="text-sm mb-xs">Username</Text>
        <Input
          placeholder="Enter your username"
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

      <View className="w-full mt-md">
        {errors.form ? (
          <Text className="text-red-500 text-xs">{errors.form}</Text>
        ) : null}
        <Button
          onPress={handleSubmit}
          className={`mt-md w-full py-lg rounded-lg ${"bg-primary text-background"}`}
          disabled={isSubmitting}
        >
          <Text className="text-lg font-semibold">Log In</Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginForm;

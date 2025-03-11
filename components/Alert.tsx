import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Text } from "./ui/text";
import { Button } from "./ui/button";

function Alert({
  onClose,
  visible,
  alert,
}: {
  onClose: any;
  visible: boolean;
  alert: any;
}) {
  const translateY = useSharedValue(100); // Start off-screen
  const opacity = useSharedValue(0); // Start invisible

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(100, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!alert) return null; // Prevent rendering if no alert

  return (
    <Animated.View
      style={[animatedStyle]}
      className={`absolute bottom-10 left-5 right-5 p-4 rounded-lg ${
        alert?.type === "success"
          ? "bg-green-600"
          : alert?.type === "error"
          ? "bg-red-500"
          : "bg-background"
      }`}
    >
      <View className="flex flex-row justify-between items-center">
        <Text className="text-white">{alert?.text}</Text>
        <Button onPress={onClose} className="bg-transparent border-0">
          <Text className="text-white">Close</Text>
        </Button>
      </View>
    </Animated.View>
  );
}

export default Alert;

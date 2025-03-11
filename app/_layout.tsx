import { View } from "react-native";
import "../global.css";
import { Stack } from "expo-router";
import Alert from "~/components/Alert";
import { alertContext } from "~/contexts";
import { useState, useEffect } from "react";

export default function RootLayout() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    // Show alert when a new one is added
    if (alerts.length > 0 && !isAlertVisible) {
      setIsAlertVisible(true);

      // Close after duration
      setTimeout(() => {
        onCloseAlert(alerts[0]);
      }, alerts[0]?.duration ?? 2000);
    }
  }, [alerts]);

  const pushAlert = (alert: any) => {
    setAlerts((prevAlerts) => [...prevAlerts, alert]);
  };

  const onCloseAlert = (alert: any) => {
    if (alert !== alerts[0]) return;

    setIsAlertVisible(false);

    // Remove alert after animation
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.slice(1));
    }, 200); // Adjust based on animation duration
  };
  return (
    <alertContext.Provider value={{ pushAlert: pushAlert }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>

      {alerts.length > 0 && (
        <Alert
          alert={alerts[0]}
          onClose={() => onCloseAlert(alerts[0])}
          visible={isAlertVisible}
        />
      )}
    </alertContext.Provider>
  );
}

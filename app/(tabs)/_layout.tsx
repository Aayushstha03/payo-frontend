import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useState, useEffect } from "react";
import { fetchData, getUser } from "~/lib/utils";
import { userContext } from "~/contexts";

export default function TabLayout() {
  const [username, setUsername] = useState(null);
  const [balance, setBalance] = useState(0);

  const initializeUser = async () => {
    const user = (await getUser()) as any;
    setUsername(user.username);
  };

  const updateBalance = async () => {
    try {
      const response = await fetchData("get-balance", "GET");
      const data = await response.json();
      setBalance(data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initializeUser();
    updateBalance();
  }, []);

  return (
    <userContext.Provider value={{ username, balance, updateBalance }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#000000", // Dark background for the tab bar
            borderColor: "#000000",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            color: "#FFFFFF", // Light text color for contrast
          },
          tabBarIconStyle: {
            color: "#FFFFFF", // Light icons to match the text
          },
          tabBarActiveTintColor: "#98c379", // Active tab color (e.g., gold)
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="file-text" color={color} size={size} />
            ),
            tabBarLabel: "Transactions",
          }}
        />
        <Tabs.Screen
          name="utilities"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="tool" color={color} size={size} />
            ),
            tabBarLabel: "Utilities",
          }}
        />
      </Tabs>
    </userContext.Provider>
  );
}

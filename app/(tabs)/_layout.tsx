import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather'

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: {
                backgroundColor: "#000000", // Dark background for the tab bar
                borderColor: "#000000"
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#FFFFFF', // Light text color for contrast
            },
            tabBarIconStyle: {
                color: '#FFFFFF', // Light icons to match the text
            },
            tabBarActiveTintColor: '#98c379', // Active tab color (e.g., gold)
        }}>
            <Tabs.Screen name="(home)"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" color={color} size={size} />
                    ),
                    tabBarLabel: "Home",
                }} />
            <Tabs.Screen name="history"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="file-text" color={color} size={size} />
                    ),
                    tabBarLabel: "Transactions",
                }} />
            <Tabs.Screen name="utilities"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="tool" color={color} size={size} />
                    ),
                    tabBarLabel: "Utilities",
                }} />
        </Tabs>
    );
}

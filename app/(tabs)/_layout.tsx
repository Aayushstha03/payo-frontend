import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather'

export default function TabLayout() {
    return (
        <Tabs>
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

import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="history" />
            <Tabs.Screen name="utilities" />
            <Tabs.Screen name="(home)" />
        </Tabs>
    );
}

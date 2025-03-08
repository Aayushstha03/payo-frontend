import { View, Text, StyleSheet } from 'react-native';

export default function SettingsPage() {
    return (
        <View style={styles.container}>
            <Text>This is the settings page</Text>
            {/* <Link href="/details">View details</Link> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

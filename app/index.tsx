import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function LogInScreen() {
    return (
        <View style={styles.container}>
            <Text>This is the login page</Text>
            <Link href="/register">Register new user</Link>
            <br />
            <Link href="/home">This is the homepage after successful login, pachi private authenticated link banaunu parcha</Link>
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
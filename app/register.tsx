import { View, Text, StyleSheet } from 'react-native';

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Text>This is the user registration screen</Text>
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
import { View, Text, StyleSheet } from 'react-native';

export default function Utilities() {
    return (
        <View style={styles.container}>
            <Text>Utilities Page</Text>
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

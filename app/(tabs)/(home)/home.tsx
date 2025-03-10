import { useState } from 'react';
import { View, Text, ScrollView, TextInput, Modal, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Card, CardDescription, CardTitle } from "components/ui/card";
import { Button } from '~/components/ui/button';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import QRCode from 'react-native-qrcode-svg';
import CryptoJS from 'crypto-js';

export default function HomeScreen() {
    const username = "JohnDoe"; // Replace with actual username from user state
    const [balance, setBalance] = useState(123456);
    const [transferModalVisible, setTransferModalVisible] = useState(false);
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [transferAmount, setTransferAmount] = useState('');
    const [error, setError] = useState('');
    const [qrData, setQrData] = useState('');

    // Function to generate the transaction QR code
    const generateTransactionQR = (amount: number) => {
        const timestamp = Date.now();

        const transactionData = { username, amount, timestamp, currentBalance: balance };
        const transactionHash = CryptoJS.SHA256(JSON.stringify(transactionData)).toString();

        return JSON.stringify({ ...transactionData, transactionHash });
    };

    const handleTransfer = () => {
        const amount = parseFloat(transferAmount);

        if (!amount || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        if (amount > balance) {
            setError('Insufficient balance.');
            return;
        }

        setBalance(balance - amount);
        setTransferModalVisible(false); // Close the first modal
        setQrData(generateTransactionQR(amount)); // Generate QR Code
        setTimeout(() => setQrModalVisible(true), 300); // Open QR modal after a slight delay

        setTransferAmount('');
        setError('');
    };

    return (
        <View className="flex-1 bg-background px-md">
            {/* Scrollable Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Header Section */}
                <Card className='w-full p-md'>
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-sm">
                            <Link href="/profile">
                                <Avatar alt="User's Avatar">
                                    <AvatarFallback>
                                        <Feather name="user" size={26} color="white" />
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                            <CardTitle>Hi, {username}</CardTitle>
                        </View>
                        <Feather name="eye" size={20} color="white" />
                    </View>
                    <CardDescription>Current Balance</CardDescription>
                    <Text className='text-primary text-2xl'>${balance.toLocaleString()}</Text>
                </Card>

                <View className="my-md" />

                {/* Recent Transactions */}
                <View className="space-y-md">
                    <Text className="text-xl font-bold text-primary">Recent Transactions</Text>
                    {[
                        { title: "HotWheels", amount: "-$9.99", color: "text-red-400" },
                        { title: "Pepe Pizza", amount: "-$4.50", color: "text-red-400" },
                        { title: "Load Wallet", amount: "+$200.00", color: "text-green-400" },
                    ].map((item, index) => (
                        <Card key={index} className="p-md flex-row justify-between items-center bg-card rounded-lg">
                            <Text className="text-lg text-primary">{item.title}</Text>
                            <Text className={`text-lg font-bold ${item.color}`}>{item.amount}</Text>
                        </Card>
                    ))}
                </View>
            </ScrollView>

            {/* Quick Actions */}
            <View className="flex-row gap-md py-md">
                <Button size={"lg"} className="flex-1 flex-row items-center bg-green-300">
                    <MaterialIcon name="line-scan" size={24} color="black" />
                    <Text className="text-lg ml-sm">Receive</Text>
                </Button>
                <Button
                    size={"lg"}
                    className="flex-1 flex-row items-center bg-yellow-300"
                    onPress={() => setTransferModalVisible(true)}
                >
                    <MaterialIcon name="qrcode-scan" size={24} color="black" />
                    <Text className="text-lg ml-sm">Send</Text>
                </Button>
            </View>

            {/* Transfer Modal */}
            <Modal visible={transferModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Enter Amount</Text>
                        <Text style={styles.balanceText}>Balance: ${balance.toLocaleString()}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            value={transferAmount}
                            onChangeText={(text) => {
                                setTransferAmount(text);
                                setError('');
                            }}
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        <View style={styles.buttonContainer}>
                            <Button className="bg-red-300 flex-1 mr-2" onPress={() => setTransferModalVisible(false)}>
                                <Text>Cancel</Text>
                            </Button>
                            <Button className="bg-green-300 flex-1" onPress={handleTransfer}>
                                <Text>Generate QR</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* QR Code Modal */}
            <Modal visible={qrModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Scan to Receive</Text>
                        {qrData ? <QRCode value={qrData} size={200} /> : null}
                        <Button className="bg-red-300 mt-md" onPress={() => setQrModalVisible(false)}>
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    balanceText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
        color: 'white',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
    },
});

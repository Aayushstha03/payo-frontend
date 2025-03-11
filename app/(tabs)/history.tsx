import { useState } from 'react';
import { View, ScrollView, Modal, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';

export default function TransactionHistory() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isStartDateModalVisible, setStartDateModalVisible] = useState(false);
    const [isEndDateModalVisible, setEndDateModalVisible] = useState(false);
    const [transactions, setTransactions] = useState([
        { id: 1, title: 'HotWheels', amount: -9.99, date: '2025-03-01' },
        { id: 2, title: 'Pepe Pizza', amount: -4.50, date: '2025-03-05' },
        { id: 3, title: 'Load Wallet', amount: 200.00, date: '2025-03-07' },
    ]);

    const filterTransactions = () => {
        // Logic to filter transactions based on selected start and end date
        console.log('Filtering transactions from:', startDate, 'to:', endDate);
    };

    return (
        <View className="flex-1 bg-background p-md">
            <Text className="text-2xl font-bold text-center my-md">Transaction History</Text>
            {/* Date Selection Buttons */}
            <View className="flex-row justify-between my-md">
                <Button
                    className="bg-blue-300 flex-1 mr-2"
                    onPress={() => setStartDateModalVisible(true)}
                >
                    <Text>Select Start Date</Text>
                </Button>
                <Button
                    className="bg-blue-300 flex-1"
                    onPress={() => setEndDateModalVisible(true)}
                >
                    <Text>Select End Date</Text>
                </Button>
            </View>

            {/* Filter Button */}
            <Button className="bg-green-300 w-full my-md" onPress={filterTransactions}>
                <Text>Filter Transactions</Text>
            </Button>

            {/* Transaction List */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                {transactions.map((txn) => (
                    <Card key={txn.id} className="mb-md">
                        <CardHeader>
                            <CardTitle className='text-xl'>{txn.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm text-gray-500">
                                    {txn.date}
                                </Text>
                                <Text className={`text-lg font-bold ${txn.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    ${txn.amount.toFixed(2)}
                                </Text>
                            </View>
                        </CardContent>
                    </Card>
                ))}
            </ScrollView>

            {/* Start Date Picker Modal */}
            <Modal visible={isStartDateModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text className="text-white text-lg mb-md">Select Start Date</Text>
                        <DatePicker date={startDate} mode="date" onDateChange={setStartDate} />
                        <Button className="bg-red-300 mt-md" onPress={() => setStartDateModalVisible(false)}>
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>
            </Modal>

            {/* End Date Picker Modal */}
            <Modal visible={isEndDateModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text className="text-white text-lg mb-md">Select End Date</Text>
                        <DatePicker date={endDate} mode="date" onDateChange={setEndDate} />
                        <Button className="bg-red-300 mt-md" onPress={() => setEndDateModalVisible(false)}>
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View >
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
});


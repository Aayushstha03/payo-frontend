import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardContent, CardDescription, CardTitle } from "components/ui/card"
import { Button } from '~/components/ui/button';
import Feather from '@expo/vector-icons/Feather'
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export default function HomeScreen() {
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
                            <CardTitle>Hi, $Username</CardTitle>
                        </View>
                        <Feather name="eye" size={20} color="white" />
                    </View>
                    <CardDescription>Current Balance</CardDescription>
                    <Text className='text-primary text-2xl'>$123,456</Text>
                </Card>

                <View className="my-md" />

                {/* Recent Transactions */}
                <View className="space-y-md">
                    <Text className="text-xl font-bold text-primary">Recent Transactions</Text>
                    {[
                        { title: "HotWheels", amount: "-$9.99", color: "text-red-500" },
                        { title: "Pepe Pizza", amount: "-$4.50", color: "text-red-500" },
                        { title: "Load Wallet", amount: "+$200.00", color: "text-green-500" },
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
                    <MaterialIcon name="qrcode-scan" size={24} color="black" />
                    <Text className="text-lg ml-sm">Receive</Text>
                </Button>
                <Button size={"lg"} className="flex-1 flex-row items-center bg-yellow-300">
                    <MaterialIcon name="qrcode-scan" size={24} color="black" />
                    <Text className="text-lg ml-sm">Send</Text>
                </Button>
            </View>
        </View>
    );
}

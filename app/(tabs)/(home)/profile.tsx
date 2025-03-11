import { View, ScrollView } from 'react-native';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import Feather from '@expo/vector-icons/Feather';

export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-background p-md">
            {/* Scrollable Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

                {/* Profile Header */}
                <Card className="w-full p-md items-center">
                    <Avatar alt="User Avatar">
                        <AvatarFallback>
                            <Feather name="user" size={48} color="white" />
                        </AvatarFallback>
                    </Avatar>
                    <CardHeader className="items-center">
                        <CardTitle>@Username</CardTitle>
                        <CardDescription>user@example.com</CardDescription>
                    </CardHeader>
                </Card>

                <View className="my-md" />

                {/* Account Details */}
                <Card className="w-full p-md">
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {[
                            { label: 'Full Name', value: 'John Doe' },
                            { label: 'Phone', value: '+977 9800000000' },
                            { label: 'Joined', value: 'Jan 2025' }
                        ].map((item, index) => (
                            <Text key={index} className="text-lg">{`${item.label}: ${item.value}`}</Text>
                        ))}
                    </CardContent>
                </Card>

                <View className="my-md" />

                {/* Settings and Actions */}
                <Card className="w-full p-md">
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className="bg-blue-300 w-full mb-sm">
                            <Text>Edit Profile</Text>
                        </Button>
                        <Button className="bg-gray-300 w-full mb-sm">
                            <Text>Change Password</Text>
                        </Button>
                        <Button className="bg-red-400 w-full">
                            <Text>Logout</Text>
                        </Button>
                    </CardContent>
                </Card>
            </ScrollView>
        </View>
    );
}

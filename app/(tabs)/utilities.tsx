import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcon from "@expo/vector-icons/MaterialCommunityIcons";

export default function UtilitiesPage() {
  return (
    <View className="flex-1 bg-background px-md">
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
        <View className="w-full p-md">
          <Text className="text-2xl text-white font-bold text-center mt-md">
            Utilities Payments
          </Text>
        </View>

        <View className="mb-md" />

        {/* Utilities Icons Row */}
        <View style={styles.utilitiesRow}>
          {/* Electricity */}
          <View style={styles.utilityItem}>
            <Feather name="zap" size={40} color="gray" />
            <Text style={styles.utilityLabel}>Electricity</Text>
          </View>

          {/* Water */}
          <View style={styles.utilityItem}>
            <Feather name="droplet" size={40} color="gray" />
            <Text style={styles.utilityLabel}>Water</Text>
          </View>

          {/* Internet */}
          <View style={styles.utilityItem}>
            <MaterialIcon name="router-wireless" size={40} color="gray" />
            <Text style={styles.utilityLabel}>Internet</Text>
          </View>

          {/* Internet */}
          <View style={styles.utilityItem}>
            <MaterialIcon name="cellphone" size={40} color="gray" />
            <Text style={styles.utilityLabel}>Internet</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  utilitiesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap", // Allow items to wrap in case of small screens
    gap: 20,
  },
  utilityItem: {
    justifyContent: "center",
    alignItems: "center",
    width: "22%", // You can adjust the width based on the number of items you want per row
    marginTop: 20,
  },
  utilityLabel: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
});

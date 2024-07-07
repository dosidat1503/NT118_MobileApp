import { Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ShopScreen from ".";
const Stack = createStackNavigator();
export default function SaleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShopScreen}
        name="index"
        options={{
          title: 'Shop Screen',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
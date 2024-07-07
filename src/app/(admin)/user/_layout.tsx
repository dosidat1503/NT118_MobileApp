import { Link, useNavigation } from "expo-router";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListVouchers from "./voucher/listVouchers";
import UserScreen from ".";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import EditVoucherScreen from "./voucher/editVoucher";
import { StackActions } from "@react-navigation/native";
import EditInfoScreen from "./shopInfo";
const Stack = createStackNavigator();
export default function MenuStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="userscreen"
        options={{ headerShown: false }}
        component={UserScreen}
      />
      <Stack.Screen
        name="listVouchers"
        options={{
          title: 'Danh sách khuyến mãi',
          headerShown: true,
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable onPress={() => { navigation.navigate('editVoucher', { id: null }) }}>
              {({ pressed }) => (
                <FontAwesome
                  name="plus-square-o"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
        component={ListVouchers}
      />
      <Stack.Screen
        name="editVoucher"
        options={{
          title: 'Khuyến mãi',
          headerShown: true,
          headerTitleAlign: "center",
        }}
        component={EditVoucherScreen}
      />
      <Stack.Screen
        name="editShop"
        options={{
          title: 'Cửa hàng',
          headerShown: true,
          headerTitleAlign: "center"
        }}
        component={EditInfoScreen}
      />
    </Stack.Navigator>
  )
}
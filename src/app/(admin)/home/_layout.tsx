import { Link, useNavigation } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import HomePageScreen from "."
import ShopScreen from "./shop"
import SaleScreen from "./sale"
import OrderManagement from "./order"
import MenuScreen from "./menu"
import EditMenu from "./menu/editMenu"
import CreateProductScreen from "./menu/editFAD"
import ListVouchers from "../user/voucher/listVouchers"
import EditVoucherScreen from "../user/voucher/editVoucher"

const Stack = createStackNavigator();

export default function MenuStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="homepage"
        options={{ headerShown: false }}
        component={HomePageScreen}
      />
      <Stack.Screen
        name="shop"
        options={{ headerShown: false }}
        component={ShopScreen}
      />
      <Stack.Screen name="order" options={{ headerShown: false }} component={OrderManagement} />
      <Stack.Screen name="menu" options={{ headerShown: false }} component={MenuScreen} />
      <Stack.Screen name="editMenu" options={{ headerShown: false }} component={EditMenu} />
      <Stack.Screen component={EditMenu}
        name="menuEdit"
        options={{
          title: 'Thiết lập thực đơn',
          headerShown: true,
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable onPress={() => { navigation.navigate("editFAD", { params: { id: null, refreshData: () => { } } }) }}>
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
        }} />
      <Stack.Screen
        component={CreateProductScreen}
        name="editFAD"
        options={{
          title: 'edit FAD',
          headerShown: false,
        }}
      ></Stack.Screen>
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
    </Stack.Navigator>
  )
}
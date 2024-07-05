import { Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react"
import ShopScreen from ".";
import editMenu from "./editMenu";
import CreateProductScreen from "./editFAD";
const Stack = createStackNavigator();

export default function SaleStack() {

  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShopScreen}
        name="index"
        options={{
          title: 'Shop',
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={editMenu}
        name="editMenu"
        options={{
          title: 'Thiết lập thực đơn',
          headerShown: true,
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable onPress={() => { navigation.navigate("editFAD") }}>
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
      >
      </Stack.Screen>
      <Stack.Screen
        component={CreateProductScreen}
        name="editFAD"
        options={{
          title: 'edit FAD',
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  )
}
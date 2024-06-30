import { Stack, Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import { useNavigation } from "@react-navigation/native"

export default function SaleStack() {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Shop',
          headerShown: false,
        }}
      />
      <Stack.Screen
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
        name="editFAD"
        options={{
          title: 'edit FAD',
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  )
}
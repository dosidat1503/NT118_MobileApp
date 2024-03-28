import { Stack, Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import DetailProduct from "./[id]"

export default function MenuStack(){
    return (
        <Stack>
          <Stack.Screen
            name="index" 
            options={{
                title: 'Đặt món', 
                headerRight: () => (
                    <Link href="/cart" asChild>
                      <Pressable>
                        {({ pressed }) => (
                          <FontAwesome
                            name="shopping-cart"
                            size={25}
                            color={Colors.light.tint}
                            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                          />
                        )}
                      </Pressable>
                    </Link>
                ),
            }}
          > 
            </Stack.Screen>
        </Stack>
    )
}
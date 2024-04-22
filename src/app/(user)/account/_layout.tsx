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
                title: 'Tài khoản',  
            }}
          > 
            </Stack.Screen>
        </Stack>
    )
}
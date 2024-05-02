import { Stack, Link } from "expo-router"
import { Pressable, View } from "react-native"
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
                headerLeft: () => (<View></View>),
                headerBackVisible: false,
                headerBackButtonMenuEnabled: false,  
                headerRight: () => (
                    <Link href="/(user)/orderFoodAndDrink/Cart" asChild>
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
          <Stack.Screen
            name="ShowFADSearchInfo" 
            options={{
                title: 'Tìm món',   
            }}
          > 
          </Stack.Screen>
          <Stack.Screen
            name="FoodStallShop" 
            options={{
                title: 'Trang thông tin quán',    
                headerRight: () => (
                  <Link href="/(user)/orderFoodAndDrink/Cart" asChild>
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
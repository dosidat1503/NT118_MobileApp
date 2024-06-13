import { Stack, Link } from "expo-router"
import { Pressable, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import DetailProduct from "./[id]"
import React, { useState } from "react"
import { useCartContext } from "@/providers.tsx/CartProvider"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuStack(){
  const { heightScreen, widthScreen, mainColor } = useCartContext();
  const [array_itemListInCart, setArray_itemListInCart] = useState<any[]>([]);
  
  const getitemListInCart = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('array_itemListInCart')
            setArray_itemListInCart(jsonValue != null ? JSON.parse(jsonValue) : null);
        } catch (error) {
            console.log(error)
        }
    }
    getitemListInCart();
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
                            style={{ 
                              marginRight: 15, 
                              opacity: pressed ? 0.5 : 1, 
                              borderRadius: widthScreen * 0.02, 
                              borderWidth: 1,
                              paddingHorizontal: widthScreen * 0.02,
                              paddingVertical: heightScreen * 0.006,
                              borderColor: mainColor
                            }}
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
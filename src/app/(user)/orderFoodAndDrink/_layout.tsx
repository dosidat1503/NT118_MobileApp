import { Stack, Link, useNavigation } from "expo-router"
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors" 
import React, { useState } from "react"
import { useCartContext } from "@/providers.tsx/CartProvider"
import AsyncStorage from '@react-native-async-storage/async-storage';

const FADLayout = React.memo(() => {
  // const { 
    // heightScreen, widthScreen, mainColor, 
    // setTextToSearchFAD, 
    // setSelectedItem,
    // RD 
  // } = useCartContext();
  const [array_itemListInCart, setArray_itemListInCart] = useState<any[]>([]);
  const widthScreen = Dimensions.get("window").width
  const heightScreen = Dimensions.get("window").height
  const RD = widthScreen * heightScreen 
  const mainColor = "#89CFF0" 

  const navigation = useNavigation();
  console.log("FADLayout")

  // const getitemListInCart = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('array_itemListInCart')
  //         setArray_itemListInCart(jsonValue != null ? JSON.parse(jsonValue) : null);
  //   } catch (error) {
  //       console.log(error)
  //   }
  // }
  // getitemListInCart();
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
              // headerLeft: () => (
              //   <TouchableOpacity
              //     onPress={() => {
              //       // setTextToSearchFAD(''); // Đặt setTextQuery về chuỗi rỗng
              //       // setSelectedItem({
              //       //   topicItem: [],
              //       //   sortByItem: '',
              //       //   startDate: "",
              //       //   endDate: "", 
              //       // }); 
              //       // Đặt setSelectedItem về object rỗng
              //       navigation.goBack(); // Điều hướng quay lại trang trước
              //       // navigation.navigate('index' as never);
              //     }} 
              //   >
              //     <FontAwesome
              //       name="chevron-left"
              //       size={RD * 0.00005}
              //       color={mainColor} 
              //       style={{ 
              //         marginRight: widthScreen * 0.02, 
              //         paddingTop: heightScreen * 0.003
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),   
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
})

export default FADLayout
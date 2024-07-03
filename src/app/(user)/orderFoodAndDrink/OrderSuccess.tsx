import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Response from "../Response";
import { Stack, useNavigation } from "expo-router";
import { useCartContext } from "@/providers.tsx/CartProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";


export default function OrderSuccess() {
    const {  heightScreen, setOrderInfo, userID } = useCartContext()
    const navigation = useNavigation();
    // let contentForOrderSuccess = "";
    // useEffect(() => {
    //     const loadContentForOrderSuccess = async () => {
    //         contentForOrderSuccess = await AsyncStorage.getItem('vnpURL') || ""; 
    //     }   
    //     loadContentForOrderSuccess()
    // })

    const route = useRoute();
    const {contentForOrderSuccess} = route.params ;
    console.log(contentForOrderSuccess, "contentForOrderSuccess")
    useEffect(() => {
        setOrderInfo({
            deliveryInfo: {
                id: 1,
                name: "Đỗ Phạm Hoàng Ân",
                phone: "0968795750",
                address: "Toà B4, KTX Khu B",
                isDefault: true,
                isChoose: true
            },
            productList: [
                {
                    id: 1,
                    name: "trà sữa ô long",
                    price: 30000,
                    size: "M",
                    toppings: [
                        { id: 1, name: 'Thạch', price: 5000, quantity: 0 },
                        { id: 2, name: 'Trân châu trắng', price: 5000, quantity: 0}, 
                    ], 
                    quantity: 1, 
                    totalOfItem: 30000
                } 
            ], 
            paymentMethod: "Tiền mặt",
            note: "",
            paymentStatus: 0,
            voucherCODE: "",
            discountValue: 0,
            paymentTotal: 0,
            userID: userID
        })
    }, [])
  
    return (
        <View>
            <Stack.Screen
                options={{ 
                    title: 'Đặt hàng thành công', 
                    headerBackVisible: false, 
                }}
            ></Stack.Screen>
            <View style={{ top: -(heightScreen * 0.15) }}>
                <Response
                    content={contentForOrderSuccess}
                    statusIcon="check-circle"
                    // href1="/(user)/account/order/OrderManagement"
                    // buttonIcon1="file-invoice"
                    // buttonName1="Xem đơn hàng"  
                    // buttonFunction1={() => { navigation.navigate('account/order/OrderManagement' as never)}}
                    // href2="/(user)/orderFoodAndDrink"
                    buttonIcon2="utensils"
                    buttonName2="Trang chủ"
                    buttonFunction2={() => { navigation.navigate('index' as never)}}
                ></Response>    
            </View>
        </View>
    )
}
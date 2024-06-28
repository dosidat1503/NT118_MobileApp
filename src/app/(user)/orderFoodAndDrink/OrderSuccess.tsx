import React from "react";
import { View, Text } from "react-native";
import Response from "../Response";
import { Stack, useNavigation } from "expo-router";


export default function OrderSuccess() {

    const navigation = useNavigation();

    return (
        <View>
            <Stack.Screen
                options={{ 
                    title: 'Đặt hàng thành công', 
                    headerBackVisible: false,
                    
                }}
            ></Stack.Screen>
            <Response
                content="Đơn hàng của bạn đã được đăng thành công."
                statusIcon="check-circle"
                href1="/(user)/account/order/OrderManagement"
                buttonIcon1="plus-square"
                buttonName1="Quản lý đơn hàng"  
                href2="/(user)/orderFoodAndDrink"
                buttonIcon2="eye"
                buttonName2="Tiếp tục đặt hàng"
                buttonFunction2={() => { navigation.navigate('index' as never)}}
            ></Response>
        </View>
    )
}
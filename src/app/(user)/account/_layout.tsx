import { Stack, Link } from "expo-router"
import { Pressable, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import DetailProduct from "./[id]"
import React from 'react';

export default function MenuStack(){

    return (
      <Stack>
        <Stack.Screen
          name="index" 
          options={{
            title: 'Tài khoản',  
            headerLeft: () => (<View></View>),
            headerBackVisible: false,
            headerBackButtonMenuEnabled: false,  
          }}
        /> 
        <Stack.Screen
          name="order/OrderManagement" 
          options={{
            title: 'Quản lý đơn hàng',    
          }}
        />
        <Stack.Screen
          name="order/OrderDetail" 
          options={{
            title: 'Chi tiết đơn hàng',    
          }}
        />
        <Stack.Screen
          name="AccountInfo" 
          options={{
            title: 'Thông tin tài khoản',    
          }}
        />
        <Stack.Screen
          name="Security" 
          options={{
            title: 'Bảo mật',    
          }}
        />
      </Stack>
    )
}
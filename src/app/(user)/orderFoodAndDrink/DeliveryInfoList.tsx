import { Link, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/ProductListItem";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors"
import { CheckBox } from 'react-native-elements'; 
import AdjustQuantity from "./AdjustQuantity";
import ItemInCartAndPayment from "@/components/orderFAD/Cart/ItemInCartAndPayment";
import Button from "./Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { color } from "react-native-elements/dist/helpers";
import { fonts } from "react-native-elements/dist/config";
import ItemType1 from "@/components/orderFAD/Payment/ItemType1";

// interface DeliveryInfo { 
//     name: string,
//     phone: string,
//     address: string,
//     isDefault: boolean,
//     isChoose: boolean 
// }

export default function DeliveryInfoList() {
    const [deliveryInfoList, setDeliveryInfoList] = useState([
        {
            name: "Đỗ Phạm Hoàng Ân",
            phone: "0968795750",
            address: "Toà B4, KTX Khu B",
            isDefault: true,
            isChoose: true
        },
        {
            name: "Đỗ Phạm Tri Ân",
            phone: "0968795751",
            address: "Toà B5, KTX Khu B",
            isDefault: true,
            isChoose: true
        }
    ]);
    const renderDeliveryInfoList = () => {
        return  deliveryInfoList.map((item, index) => {
            return (
                <ItemType1 deliveryInfo={item} isChangeAddress={true}></ItemType1>
            )
        })
    
    }
    return (
        <View>
            <ScrollView>
                {renderDeliveryInfoList()}
            </ScrollView>
        </View>
    )
}
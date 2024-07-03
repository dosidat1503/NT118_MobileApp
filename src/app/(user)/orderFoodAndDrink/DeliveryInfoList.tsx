import { Link, Stack, useNavigation } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import React, { useState, useEffect } from 'react'; 
import ItemType1 from "@/components/orderFAD/Payment/ItemType1";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"; 

interface DeliveryInfo { 
    address_id?: number,
    name: string,
    phone: string,
    address: string,
    isDefault: boolean,
    isChoose: boolean 
}

export default function DeliveryInfoList() {
    const { heightScreen, widthScreen, mainColor, baseURL, userID,  setOrderInfo, isUpdatedInfoDelivery, RD } = useCartContext();
    const [deliveryInfoList, setDeliveryInfoList] = useState<DeliveryInfo[]>([]);
    // let isUpdatedInfoDelivery = "";
    // useEffect(() => {
    //     const loadisUpdatedInfoDelivery = async () => {
    //       isUpdatedInfoDelivery = await AsyncStorage.getItem('isUpdatedInfoDelivery') || ""; 
    //     }
    //     loadisUpdatedInfoDelivery()
    // })
    let orderInfo = {};
    useEffect(() => {
        const loadorderInfo = async () => {
            orderInfo = parseInt(await AsyncStorage.getItem('orderInfo') || "1"); 
        }   
        loadorderInfo()
    })
  
    useEffect(() => {
        console.log(userID, "userIDâcsc")
        getDeliveryInfoList()
    }, [])

    useEffect( () => {
        getDeliveryInfoList()
        console.log(isUpdatedInfoDelivery, "isU2222pdatedInfoDelivery")
    }, [isUpdatedInfoDelivery])

    const getDeliveryInfoList = async () => {
        console.log(userID, "userIDâcsc")
        axios.get(baseURL + '/getDeliveryInfo', { params: { userID: userID == 0 ? 1 : userID } })
        .then( (res) => {
            console.log(res.data, "DeliveryInfo11")
            setDeliveryInfoList(res.data.deliveryInfo.map((item: any) => {
                if(item.IS_DEFAULT === 1)
                    setOrderInfo({
                        ...orderInfo,
                        deliveryInfo: {
                            id: item.ADDRESS_ID,
                            name: item.NAME,
                            phone: item.PHONE,
                            address: item.DETAIL,
                            isDefault: true,
                            isChoose: true
                        },
                    })
                return {
                    address_id: item.ADDRESS_ID,
                    name: item.NAME,
                    phone: item.PHONE,
                    address: item.DETAIL,
                    isDefault: item.IS_DEFAULT === 1 ? true : false,
                    isChoose: item.IS_DEFAULT === 1 ? true : false
                }
            })) 
        })
    } 

    const navigation = useNavigation();

    const handleChangeChoseDeliveryInfo = (itemParameter: any) => {
        // console.log(address_id, "handleChangeChoseDeliveryInfo")

        setDeliveryInfoList(
            deliveryInfoList.map((item) => {
                if (item.address_id === itemParameter.address_id) { 
                    setOrderInfo({
                        ...orderInfo,
                        deliveryInfo: {
                            id: item.address_id,
                            name: item.name,
                            phone: item.phone,
                            address: item.address,
                            isDefault: true,
                            isChoose: true
                        },
                    })
                    return {
                        ...item,
                        isChoose: true
                    }
                }
                return {
                    ...item,
                    isChoose: false
                }
            })
        )
    }

    const renderDeliveryInfoList = () => {
        return deliveryInfoList.map((item, index) => {
            return (
                <ItemType1 
                    deliveryInfo={item} 
                    isChangeAddress={true}  
                    handleChangeChoseDeliveryInfo={() => handleChangeChoseDeliveryInfo(item)}
                ></ItemType1>
            )
        }) 
    }
    let isUpdatedInfoDeliverys = "true"
    return (
        <View>
            <Stack.Screen
                options={{
                    title: "Thông tin giao hàng",
                    headerLeft(props) {
                        return (
                            <Pressable
                                onPress={() => { 
                                    navigation.navigate( "Payment", { deliveryInfoList }) ;
                                    // navigation.setParams({deliveryInfoList})
                                    // navigation.goBack(); 
                                }}
                            >
                                <FontAwesome5
                                    name="arrow-left"
                                    // size={RD * 0.00005} 
                                    style={{
                                        marginLeft: widthScreen * 0.02,
                                        marginRight: widthScreen * 0.06,
                                        fontweight: "bold",
                                        fontSize: RD * 0.00005
                                    }}
                                ></FontAwesome5>
                            </Pressable> 
                        );
                    },
                }}
            ></Stack.Screen>
            <ScrollView>
                {renderDeliveryInfoList()}
            </ScrollView>
        </View>
    )
}
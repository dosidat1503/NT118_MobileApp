import { Link, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, TouchableOpacity, Button } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/ProductListItem";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors"
import { CheckBox } from 'react-native-elements';  
import ItemInCartAndPayment from "@/components/orderFAD/Cart/ItemInCartAndPayment"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OrderManagement() {

    const {heightScreen, widthScreen, mainColor} = useCartContext();

    const avatarSize = widthScreen * 0.13;

    const styles = StyleSheet.create({
        headerContainer: {
            borderRadius: widthScreen * 0.05,
            borderWidth: 1,
            borderColor: mainColor,
            marginHorizontal: widthScreen * 0.02,
            marginVertical: heightScreen * 0.01,
            flexDirection: "row",
            justifyContent: "space-around",    
            paddingVertical: heightScreen * 0.005,
            paddingHorizontal: widthScreen * 0.003,                                                                                                                                                                              
        },
        itemStatusHeader: {
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.01,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#cdcdcd",
            borderRadius: widthScreen * 0.05, 
            //width: "100%"
        },
        itemTextInStatusHeader: {
            fontWeight: 'bold',
            color: mainColor,
            marginLeft: widthScreen * 0.01,
            fontSize: widthScreen * 0.03
        },
        itemOrderContainer: {
            marginHorizontal: widthScreen * 0.02,
            marginVertical: heightScreen * 0.006,
            borderRadius: widthScreen * 0.05,
            borderWidth: 0.7,
            borderColor: "#cdcdcd",
            paddingVertical: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.03,
            shadowColor: '#000',
            shadowOffset: { width: 5, height: 7 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 10,  
            elevation: 70
        }, 
        imgOfItem: { 
            height: avatarSize,
            width: avatarSize,
            borderRadius: avatarSize * 0.5,
            marginLeft: widthScreen * 0.01,
            marginRight: widthScreen * 0.02,
        },
        headerTitelOfItemOder: {
            fontSize: widthScreen * 0.05,
            fontWeight: 'bold' 
        },
        headerNormalTextOfItemOder: {
            //fontWeight: 'bold',
            color: "gray",
            //marginLeft: widthScreen * 0.03,
            fontSize: widthScreen * 0.042 
        },
        bodyOfItemOrder: {
            paddingVertical: heightScreen * 0.01,
        },
        NeceesaryInfoInBodyOfItemOrder: {
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
        },
        NeceesaryInfoInBodyOfItemOrder_row: {
            flexDirection: "row", 
            marginVertical: heightScreen * 0.007,
        }, 
        NeceesaryInfoInBodyOfItemOrder_row_item: {
            flexDirection: "row"
        },
        NeceesaryInfoInBodyOfItemOrder_row_item_mainText: {
            borderWidth: 1,
            borderRadius: widthScreen * 0.05, 
            borderColor: mainColor,
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.002,
            color: mainColor,
            fontSize: widthScreen * 0.04,
            fontWeight: '500',
            marginLeft: widthScreen * 0.02
        },
        headerOfItemOrder: {
            flexDirection: "row",
        },
        footerOfItemOder: {
            flexDirection: "row",
            justifyContent: "space-between",
            //paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.02,
        },
        footerTextMoneyOfItemOder: {
            fontWeight: 'bold',
            color: "red",
            fontSize: widthScreen * 0.05
        },
        detailInfoOfOderText: {
            fontWeight: 'bold',
            color: "gray",
        },
        detailInfoOfOderTextContainer: {
            flexDirection: "row", 
            justifyContent: "center", 
            paddingVertical: heightScreen * 0.008,
            borderBottomColor: "#cdcdcd",
            borderBottomWidth: 1,
            marginHorizontal: widthScreen * 0.02
        }
    });

    const orderStatus = [
        { name: "Đang chuẩn bị", icon: "clock" },
        { name: "Đang giao", icon: "motorcycle" },
        { name: "Đã nhận", icon: "clipboard-check" },
        { name: "Đã huỷ", icon: "window-close" },
    ]   

    const [orderList, setOrderList] = useState([
        {
            FADFirst: {
                imgURL: defaultPrizzaImage,
                name: "Pizza hải sản",
                quantity: 1,
                price: 100000,
            },
            necessaryInfo: {
                FADQuantityHaveOrder: 3,
                time: "2021-09-01 12:00:00",
                paymentMethod: "Thanh toán khi nhận hàng",
                voucherID: "C_NQ_D20"
            },
            paymentToTal: 300000
        },
        {
            FADFirst: {
                imgURL: defaultPrizzaImage,
                name: "Pizza hải sản",
                quantity: 1,
                price: 100000,
            },
            necessaryInfo: {
                FADQuantityHaveOrder: 3,
                time: "2021-09-01 12:00:00",
                paymentMethod: "Thanh toán khi nhận hàng",
                voucherID: "C_NQ_D20"
            },
            paymentToTal: 300000
        }
    ]);

    return (
        <ScrollView> 
            <Stack.Screen
                options={{
                    title: 'Quản lý đơn hàng',
                }}
            ></Stack.Screen>
            {/* header */}
            
            <View style={styles.headerContainer}>
                {
                    orderStatus.map((item, index) => { 
                        return(
                            <TouchableOpacity key={index}>
                                <View style={styles.itemStatusHeader}>
                                    <FontAwesome5 name={item.icon} style={{color: mainColor,}}></FontAwesome5>
                                    <Text style={styles.itemTextInStatusHeader}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={{borderBottomWidth: 1, marginHorizontal: widthScreen * 0.01, borderBottomColor: "#cdcdcd", marginBottom: heightScreen * 0.009}}>
            </View>
                
            {/* body */}
            <View>
                {
                    orderList.map((item, index) => {
                        return(
                            <View style={styles.itemOrderContainer}>
                                <View style={styles.headerOfItemOrder}>
                                    <Image source={{uri: item.FADFirst.imgURL}} style={styles.imgOfItem}/>
                                    <View style={{marginLeft: widthScreen * 0.02 }}>
                                        <Text style={styles.headerTitelOfItemOder}>{item.FADFirst.name}</Text>
                                        <Text style={styles.headerNormalTextOfItemOder}>Giá: {item.FADFirst.price} - Số lượng: {item.FADFirst.quantity}</Text>
                                    </View>
                                </View>

                                <View style={styles.bodyOfItemOrder}> 
                                    <View style={styles.NeceesaryInfoInBodyOfItemOrder}>
                                        <View style={styles.NeceesaryInfoInBodyOfItemOrder_row}>
                                            <View style={styles.NeceesaryInfoInBodyOfItemOrder_row_item}>
                                                <Text style={styles.headerNormalTextOfItemOder}>Thời gian:</Text>
                                                <Text style={styles.NeceesaryInfoInBodyOfItemOrder_row_item_mainText}>{item.necessaryInfo.time}</Text>
                                            </View> 
                                        </View>
                                        <View style={styles.NeceesaryInfoInBodyOfItemOrder_row}>
                                            <View style={styles.NeceesaryInfoInBodyOfItemOrder_row_item}>
                                                <Text style={styles.headerNormalTextOfItemOder}>Thanh toán:</Text>
                                                <Text style={styles.NeceesaryInfoInBodyOfItemOrder_row_item_mainText}>{item.necessaryInfo.paymentMethod}</Text>
                                            </View> 
                                        </View>
                                        <View style={styles.NeceesaryInfoInBodyOfItemOrder_row}>
                                            <View style={styles.NeceesaryInfoInBodyOfItemOrder_row_item}>
                                                <Text style={styles.headerNormalTextOfItemOder}>Số lượng món:</Text>
                                                <Text style={styles.NeceesaryInfoInBodyOfItemOrder_row_item_mainText}>{item.necessaryInfo.FADQuantityHaveOrder}</Text>
                                            </View> 
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.detailInfoOfOderTextContainer}>
                                        <Text style={styles.detailInfoOfOderText}>Thông tin chi tiết đơn hàng &gt;</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.footerOfItemOder}>
                                    <Button
                                        title="Hủy đơn"
                                        color={mainColor}
                                    ></Button>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.headerNormalTextOfItemOder}>Tổng tiền: </Text>
                                        <Text style={styles.footerTextMoneyOfItemOder}>{item.paymentToTal}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}
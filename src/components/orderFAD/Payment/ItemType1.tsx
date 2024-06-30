
import { Link, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; 
import { CheckBox } from 'react-native-elements';  
import React, { useState, useEffect } from 'react'; 
import { useNavigation } from "expo-router";
 
interface ItemType1Props {
    deliveryInfo: {
        id: number,
        name: string,
        phone: string,
        address: string,
        isDefault?: boolean,
        isChoose?: boolean
    },
    isChangeAddress?: boolean
}

export default function ItemType1({deliveryInfo, isChangeAddress = false}: ItemType1Props) {
    const { heightScreen, widthScreen, mainColor } = useCartContext();

    const styles = StyleSheet.create({
        titleContainer: {  
            width: widthScreen,
            flexDirection: 'row', 
            overflow: 'hidden',
            borderWidth: 1, 
            borderColor: "#89CFF0",
            backgroundColor: "white",  
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: widthScreen * 0.03,
            paddingVertical: heightScreen * 0.007,
            marginTop: heightScreen * 0.01
        }, 
        require: {
            height: "100%",
            width: "100%",  
            fontSize: widthScreen * 0.03, 
            alignSelf: "center",
            alignItems: "center",
            opacity: 0.5
        },
        titleText: {
            height: "100%",
            width: "100%", 
            fontWeight: "bold",
            fontSize: widthScreen * 0.05, 
            alignSelf: "center",
            alignItems: "center"
        },
        deliveryDivContainer: {
            flexDirection: 'column',
            justifyContent: 'center', 
            alignSelf: "center",
            overflow: "hidden",
            // backgroundColor: "white", 
            borderBottomWidth: isChangeAddress ? 1 : 0,
            borderBottomColor: "#89CFF0", 
        },
        titleTextForDeliveryContainer: {
            flexDirection: 'row',
            alignItems: "center",
            paddingVertical: heightScreen * 0.009,
            paddingHorizontal: widthScreen * 0.02,
            // width: widthScreen * 0.95,
            borderBottomWidth: 1,
            borderBottomColor: "#89CFF0", 
            // backgroundColor: "white",
            display: isChangeAddress ? "none" : "flex"
        },
        titleTextForDelivery: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.03, 
            opacity: 0.5,
            
        },
        deliveryItemContainer: {
            flexDirection: 'row',
            alignItems: "center", 
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.02,
            width: widthScreen * 0.95,
            // borderBottomWidth: 1,
            borderBottomColor: "#89CFF0",
            flex: 10
        },
        deliveryItemIcon: {
            height: "100%",
            width: "10%",
            // backgroundColor: "red",
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        deliveryItemInfoDetail: {
            height: "100%", 
            // backgroundColor: "blue",
            flex: 7,
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "center",
            textAlignVertical: "center", 
            alignContent: "center",
            textAlign: "center",
            // paddingVertical: heightScreen * 0.03,
            paddingHorizontal: widthScreen * 0.03
        },
        deliveryItemIconEdit: {
            height: "100%",
            width: "10%",
            // backgroundColor: "green",
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center'
        },
        subDeliveryText: {
            fontWeight: "600",
            fontSize: widthScreen * 0.035, 
            alignSelf: "flex-end",
            color: "#8c8e91"
        },
        mainDeliveryText: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.04,
            opacity: 0.7
        }
    })
    const navigation = useNavigation();

    return (
        <View style={[{flex: 0.4}, styles.deliveryDivContainer]}>
            {/* // có sử dụng display: none khi mà isChangeAddress = true thì sẽ ẩn đi */}
            <View style={styles.titleTextForDeliveryContainer}>
                <Text style={styles.titleTextForDelivery}>Địa chỉ giao hàng</Text>
                <FontAwesome5
                    name="map-marker-alt" 
                    style={{
                        opacity: 0.5,
                        marginLeft: widthScreen * 0.02
                    }}
                ></FontAwesome5>
            </View>
            <View style={styles.deliveryItemContainer}>
                <CheckBox
                    // checked={}
                    onPress={() =>  {}}
                    containerStyle={{
                        padding: 0,
                        margin: 0,
                        display: isChangeAddress ? "flex" : "none"
                    }}
                />
                <View style={styles.deliveryItemIcon}>
                    <FontAwesome5 
                        name="map-marker-alt" 
                        size={widthScreen * 0.13}
                        style={{
                            opacity: 1,
                            color: mainColor, 
                        }} 
                    />
                </View>
                <View style={[styles.deliveryItemInfoDetail]}>
                    <View style={{ justifyContent: "center", height: "100%" }}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.subDeliveryText}>Tên: </Text>
                            <Text style={styles.mainDeliveryText}>{deliveryInfo.name}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.subDeliveryText}>Sđt: </Text>
                            <Text style={styles.mainDeliveryText}>{deliveryInfo.phone}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.subDeliveryText}>Địa chỉ: </Text>
                            <Text style={styles.mainDeliveryText}>{deliveryInfo.address}</Text>
                        </View> 
                    </View>
                </View>
                <View style={styles.deliveryItemIconEdit}>
                    {/* <TouchableOpacity
                        onPress={}
                    > */}
                    {
                        isChangeAddress 
                        ? 
                        <Link href={"/(user)/orderFoodAndDrink/EditDeliveryAddress"}>
                            <FontAwesome5 
                                name="edit" 
                                size={widthScreen * 0.05}
                                style={{
                                    opacity: 1,
                                    color: mainColor,  
                                }} 
                            />
                        </Link>
                        : 
                        // <Link href={"/(user)/orderFoodAndDrink/DeliveryInfoList"}>
                        <TouchableOpacity onPress={() => navigation.navigate("DeliveryInfoList" as never)}>
                            <FontAwesome5 
                                name="chevron-right" 
                                size={widthScreen * 0.05}
                                style={{
                                    opacity: 1,
                                    color: mainColor,  
                                }} 
                            />
                        </TouchableOpacity>
                        // </Link>
                    }
                    {/* </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}
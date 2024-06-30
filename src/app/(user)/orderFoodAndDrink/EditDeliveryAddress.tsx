import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, TextInput } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { CheckBox } from "react-native-elements";
import Button from "./Button";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, useSearchParams } from "expo-router";
import axios from "axios";
import Loading from "@/components/Loading";

export default function EditDeliveryAddress() {
    const { heightScreen, widthScreen, mainColor, baseURL, setIsUpdatedInfoDelivery, isUpdatedInfoDelivery, userID, isLoading, setIsLoading } = useCartContext();

    const { name, phone, address, isDefault, address_id } = useSearchParams()
    const [deliveryInfo, setDeliveryInfo] = useState([
        {key: "name", title: "Họ và tên", value: name},
        {key: "phone", title: "Số điện thoại", value: phone},
        {key: "address", title: "Địa chỉ", value: address},
        {key: "isDefault", title: "Chọn làm địa chỉ mặc định", value: isDefault}
    ])

    const styles = StyleSheet.create({ 
        titleTextForDeliveryContainer: {
            flexDirection: 'row',
            alignItems: "center",
            paddingVertical: heightScreen * 0.009,
            paddingHorizontal: widthScreen * 0.02,
            // width: widthScreen * 0.95,
            borderBottomWidth: 1,
            borderBottomColor: "#89CFF0", 
            // backgroundColor: "white", 
        },
        titleTextForDelivery: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.03, 
            opacity: 0.5, 
        },
        inputTextDivContainer: {
            backgroundColor: "white",
            paddingVertical: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.05,
        },
        inputText: {
            borderWidth: 1,
            borderColor: '#89CFF0',
            borderRadius: widthScreen * 0.05,
            paddingHorizontal: widthScreen * 0.03,
            paddingVertical: heightScreen * 0.008, 
            marginVertical: heightScreen * 0.006,
            opacity: 0.7 
        }, 
    })

    const handleEditDeliveryInfo = useCallback((key: string, text: string) => {
        setDeliveryInfo(
            deliveryInfo.map((item) => { 
                if (item.key === key) return{
                    ...item,
                    value: text
                } 
                return item
            })
        )
    }, [deliveryInfo])

    const handleCheckDefault = useCallback(() => {
        setDeliveryInfo(
            deliveryInfo.map((item) => { 
                if (item.key === deliveryInfo[3].key) return{
                    ...item,
                    value: parseInt(item.value) === 1 ? "0" : "1"
                } 
                return item
            })
        )
    }, [deliveryInfo])

    const handleSaveInfo =  () => {
        setIsLoading(true)
        const dataSave = {
            userID: userID,
            address_id: parseInt(address_id),
            name: deliveryInfo[0].value,
            phone: deliveryInfo[1].value,
            address: deliveryInfo[2].value,
            isDefault: parseInt(deliveryInfo[3].value),
            isDefaultHasChanged: deliveryInfo[3].value !== isDefault
        }
        console.log("done save", dataSave)

        axios.post(baseURL + '/updateDeliveryInfo', dataSave)
        .then((res) => {
            setIsUpdatedInfoDelivery(true)
            console.log("done", res.data.afterSave)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    useEffect(() => {
        setIsUpdatedInfoDelivery(false) 
    }, [])

    return (
        <SafeAreaView >
            <Stack.Screen
                options={{
                    title: "Chỉnh sửa thông tin giao hàng",
                }}
            ></Stack.Screen>
            {
                isLoading 
                ? <View style={{ marginTop: heightScreen * 0.4 }}>
                    <Loading></Loading>
                </View>
                : <ScrollView>
                <View style={styles.titleTextForDeliveryContainer}>
                    <FontAwesome5
                        name="map-marker-alt" 
                        style={{
                            opacity: 0.5,
                            marginHorizontal: widthScreen * 0.02,
                            fontSize: widthScreen * 0.04,
                            color: mainColor
                        }}
                    ></FontAwesome5>
                    <Text style={styles.titleTextForDelivery}>Chỉnh sửa thông tin giao hàng</Text>
                </View>
                <View style={styles.inputTextDivContainer}> 
                    {
                        deliveryInfo.map((item, index) => {
                            return (
                                item.key === deliveryInfo[3].key 
                                ? <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={styles.titleTextForDelivery}>{item.title}</Text>
                                    <CheckBox
                                        checked={ parseInt(item.value) === 1 ? true : false}
                                        onPress={() => handleCheckDefault()}
                                        containerStyle={{
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    />
                                </View>
                                : <View key={index}>
                                    <Text style={styles.titleTextForDelivery}>{item.title}</Text>
                                    <TextInput 
                                        style={styles.inputText}
                                        value={item.value}
                                        onChangeText={(text) => handleEditDeliveryInfo(item.key, text)}
                                    ></TextInput>
                                </View>
                            )
                        })
                    } 
                    <View  style={{flexDirection: "row", flex: 10, justifyContent: "flex-end", alignSelf: "flex-end"}}>
                        <View style={{flexDirection: "row", flex: 3}}>
                            <Button 
                                iconName="save"
                                buttonName="Lưu"
                                handlePress={() => handleSaveInfo()}
                            ></Button>
                            {
                                isUpdatedInfoDelivery
                                ? <FontAwesome5
                                    name="check-circle"
                                    size={widthScreen * 0.05}
                                    style={{
                                        marginTop: heightScreen * 0.01,
                                        marginLeft: widthScreen * 0.02,
                                        color: "green"
                                    }}
                                ></FontAwesome5>
                                : ""
                            }
                        </View>
                    </View>
                    </View> 
                </ScrollView>
            }
        </SafeAreaView>
    )
}
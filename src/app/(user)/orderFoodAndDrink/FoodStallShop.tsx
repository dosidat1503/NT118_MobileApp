import { Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, FlatList } from "react-native"; 
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";  
import InfoShop from "@/components/orderFAD/FoodStallShop/InfoShop";
import { InfoFADofShop } from "@/components/orderFAD/FoodStallShop/InfoFADofShop";
import { BackHandler } from "react-native";
import { useEffect, useState } from "react"; 
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import { Link } from "expo-router"; 
import axios from "axios";
import Loading from "@/components/Loading";
import React from "react";
import VoucherScreen from "./VoucherScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

type InfoShopProp = {
    COVER_IMAGE_URL: string
}

export default function FoodStallShop() { 
    const {heightScreen, widthScreen, mainColor, baseURL } = useCartContext();
    let FADShop_ID = 0;
    useEffect(() => {
        const loadFADShop_ID = async () => {
            FADShop_ID = parseInt(await AsyncStorage.getItem('FADShop_ID') || "0");   
            getShopInfo();
        }   
        loadFADShop_ID()
    }, [])
    const [isLoadingFADShop, setIsLoadingFADShop] = useState(true)
    const [infoShop, setInfoShop] = useState<InfoShopProp | undefined>(undefined) 
    const getShopInfo = () => { 
        axios.get(baseURL + '/getFADShopDetailInfo', { params: { shop_id: FADShop_ID } })
        .then( (res) => {
            // console.log(res.data, "FADShopDetailInfo")
            console.log("FoodStallShop ham getShopInfo")
            setInfoShop(res.data.shop[0])
            setIsLoadingFADShop(false)
        })
    }

    useEffect(() => {
        const backHandle = BackHandler.addEventListener("hardwareBackPress", handleBackPress) 
        setIsLoadingFADShop(true)
        return backHandle.remove()
    }, []) 
 

    const handleBackPress = () => { 
        return true; // Trả về true để ngăn chặn việc thoát ứng dụng
    };

    const styles = StyleSheet.create({
        displayNone: {
            display: "none"
        },
        dotsWrapper: {
            width: widthScreen * 0.25,
            marginVertical: heightScreen * 0.4
        },
        loadingScreen: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: heightScreen
        },
        backIcon: { 
            backgroundColor: "white",
            // borderRadius: "50%"
        }, 
        touchableBack: { 
            position: "absolute",
            top: widthScreen * 0.07,
            left: widthScreen * 0.07,
        },
        touchableCart: {
            position: "absolute",
            top: heightScreen * 0.033,
            right: widthScreen * 0.07,
            backgroundColor: "white",
            borderRadius: widthScreen * 0.08,
            padding: widthScreen * 0.015
        },
        cover: {
            height: heightScreen * 0.3,
            width: widthScreen
        }
    })

    return ( 
        <FlatList
            data={[]}  // Không có dữ liệu cụ thể cho danh sách này
            renderItem={(item) => null}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
                <View>
                    <Stack.Screen 
                        options={{ 
                            headerRight: () => (
                                <Link href="/(user)/orderFoodAndDrink/Cart" asChild>
                                    <Pressable>
                                        {({ pressed }) => (
                                            <FontAwesome
                                                name="shopping-cart"
                                                size={25}
                                                color={mainColor}
                                                style={{ 
                                                    marginRight: widthScreen * 0.04, 
                                                    opacity: pressed ? 0.5 : 1, 
                                                    borderWidth: 1,
                                                    borderColor: mainColor,
                                                    borderRadius: widthScreen * 0.03,
                                                    paddingHorizontal: widthScreen * 0.015,
                                                    paddingVertical: heightScreen * 0.008
                                                }}
                                            />
                                        )}
                                    </Pressable>
                                </Link>
                            ), 
                        }}
                    ></Stack.Screen>  
                    {
                        isLoadingFADShop 
                        ? ""
                        :  <View> 
                            {/* Hiển thị ảnh cover */}
                            <Image
                                source={{ uri: infoShop?.COVER_IMAGE_URL }}
                                style={styles.cover}
                            ></Image>   
                            <InfoShop infoShop={infoShop}></InfoShop>

                            {/* Thông tin sản phẩm của shop */}
                            <InfoFADofShop></InfoFADofShop>

                            {/* Xoan code hiển thị thông tin voucher ở đây */}
                            

                            <VoucherScreen></VoucherScreen>
                        </View> 
                    } 
                </View>
            }
            // ListFooterComponent={} 
        />
    )
}
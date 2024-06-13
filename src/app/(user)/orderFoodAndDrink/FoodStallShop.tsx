import { Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable } from "react-native";
import SlideHeaderOrderFAD from "@/components/orderFAD/SlideHeaderOrderFAD";
import { defaultPrizzaImage } from "@/components/PostList"; 
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";  
import InfoShop from "@/components/orderFAD/FoodStallShop/InfoShop";
import { InfoFADofShop } from "@/components/orderFAD/FoodStallShop/InfoFADofShop";
import { BackHandler } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import { Link } from "expo-router"; 
import axios from "axios";
import LoadingDots from "react-native-loading-dots";
import Loading from "@/components/Loading";
import React from "react";


export default function FoodStallShop() { 
    const {heightScreen, widthScreen, mainColor, FADShop_ID, baseURL, isLoading, setIsLoading} = useCartContext();
 
    const [infoShop, setInfoShop] = useState({}) 
    useEffect(() => {
        const backHandle = BackHandler.addEventListener("hardwareBackPress", handleBackPress) 
        setIsLoading(true)
        getShopInfo();
        return backHandle.remove()
    }, [])

    const getShopInfo = () => { 
        axios.get(baseURL + '/getFADShopDetailInfo', { params: { shop_id: FADShop_ID } })
        .then( (res) => {
            console.log(res.data, "FADShopDetailInfo")
            setInfoShop(res.data.shop[0])
            setIsLoading(false)
        })
    }

    useEffect(() => {
        console.log(infoShop, "infoShop")
    }, [infoShop])

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
        <ScrollView>
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
                <View style={isLoading ? [styles.displayNone] : {} }> 
                    {/* Hiển thị ảnh cover */}
                    <Image
                        source={{ uri: infoShop.COVER_IMAGE_URL }}
                        style={styles.cover}
                    ></Image>  

                    {/* Nút back */}
                    {/* <TouchableOpacity 
                        onPress={handleBackPress}
                        style={styles.touchableBack}
                    >
                        <FontAwesome5 
                        name="arrow-circle-left"
                        color="#89CFF0"
                        size={30}
                        style={styles.backIcon}
                        />
                    </TouchableOpacity> */}

                    {/* Nút giỏ hàng */}
                        {/* <TouchableOpacity 
                            onPress={handleBackPress}
                            style={styles.touchableCart}
                        >
                            
                            <Link href="/(user)/orderFoodAndDrink/Cart"> 
                                <FontAwesome5 
                                name="shopping-cart"
                                color="#89CFF0"
                                size={30}
                                // style={styles.cartIcon}
                                />
                            </Link>
                        </TouchableOpacity> */}
                    {/* Thông tin shop */}
                    
                    <InfoShop infoShop={infoShop}></InfoShop>

                    {/* Thông tin sản phẩm của shop */}
                    <InfoFADofShop></InfoFADofShop>
                </View>
                <Loading></Loading>
            </View>
        </ScrollView>
    )
}
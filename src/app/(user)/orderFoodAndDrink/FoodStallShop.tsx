import { Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable } from "react-native";
import SlideHeaderOrderFAD from "@/components/orderFAD/SlideHeaderOrderFAD";
import { defaultPrizzaImage } from "@/components/PostList"; 
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";  
import InfoShop from "@/components/orderFAD/FoodStallShop/InfoShop";
import { InfoFADofShop } from "@/components/orderFAD/FoodStallShop/InfoFADofShop";
import { BackHandler } from "react-native";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import { Link } from "expo-router";

export default function FoodStallShop() { 
    const {heightScreen, widthScreen, mainColor} = useCartContext();
    const infoShop = {
        cover: defaultPrizzaImage ,
        avatar: defaultPrizzaImage,
        name: "LẨU CHAY HỮU DUYÊN",
        address: "18/3 Tô Vĩnh Diện, Đông Hoà, Dĩ An, Bình Dương"
    }
    const navigation = useNavigation();


    useEffect(() => {
        const backHandle = BackHandler.addEventListener("hardwareBackPress", handleBackPress)
        return backHandle.remove()
    }, [])

    const handleBackPress = () => {
        
        return true; // Trả về true để ngăn chặn việc thoát ứng dụng
    };

    const styles = StyleSheet.create({
        backIcon: { 
            backgroundColor: "white",
            borderRadius: "50%"
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

                {/* Hiển thị ảnh cover */}
                <Image
                    source={{uri: infoShop.cover}}
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
        </ScrollView>
    )
}
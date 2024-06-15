
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import Button from "./(user)/orderFoodAndDrink/Button";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import React from "react";

export default function SignUpSuccess() {

    const {heightScreen, widthScreen, mainColor, baseURL, emailPattern, phoneNumberPattern, fullNamePattern} = useCartContext();
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        divContainer: {
            width: widthScreen,
            height: heightScreen,
            justifyContent: "center",
            alignItems: "center", 
            // backgroundImage: "url('https://www.w3schools.com/css/img_lights.jpg')"
        },
        checkCircle: {
            color: "green",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: widthScreen * 0.07,
        }
    })

    return (
        <View style={ styles.divContainer }>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            /> 
            <ImageBackground
                source={require('@assets/images/backgroundBlue.jpg')}
                style={{
                width: widthScreen,
                height: heightScreen,
                justifyContent: "center",
                alignItems: "center",
                }}
            >
                <View style={{ 
                    flexDirection: "column", 
                    backgroundColor: "white", 
                    paddingHorizontal: widthScreen * 0.05,
                    paddingVertical: heightScreen * 0.05,
                    borderRadius: widthScreen * 0.1,
                    justifyContent: "center"
                }}> 
                        <FontAwesome5 
                            name="check-circle" 
                            size={20}
                            style={styles.checkCircle}
                        ></FontAwesome5>
                        <View style={{justifyContent: "center", alignItems: "center", marginBottom: heightScreen * 0.03}}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: widthScreen * 0.04,
                                    opacity: 1,
                                    alignSelf: "center",
                                    color: mainColor, 
                                    marginTop: heightScreen * 0.01,
                                    width: widthScreen * 0.7,
                                    textAlign: "center",
                                }}
                            >Chúc mừng bạn đã đăng ký thành công. Hãy tiến hành kiểm tra và xác nhận email, sau đó tiền hành đăng nhập</Text>
                        </View>
                    <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Link href={'/index'} asChild> 
                            <Button
                                iconName="sign-in-alt"
                                buttonName="Đăng nhập"
                                handlePress={() => { navigation.navigate('index' as never)}}
                            ></Button> 
                        </Link>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import Button from "./orderFoodAndDrink/Button";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import React from "react";

interface ResponseProps {
    content: string,
    statusIcon: string
    href1?: string,
    buttonIcon1?: string,
    buttonName1?: string,
    buttonFunction1?: () => void,
    href2?: string,
    buttonIcon2?: string,
    buttonName2?: string,
    buttonFunction2?: () => void,
}

export default function Response({content, statusIcon, href1, buttonIcon1, buttonFunction1, buttonName1, href2, buttonIcon2, buttonName2, buttonFunction2}: ResponseProps) {

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
            <View style={{ 
                flexDirection: "column", 
                backgroundColor: "white", 
                paddingHorizontal: widthScreen * 0.05,
                paddingVertical: heightScreen * 0.02,
                borderRadius: widthScreen * 0.1,
                justifyContent: "center",
                borderWidth: 1,
                borderColor: mainColor,
            }}> 
                <FontAwesome5 
                    name={statusIcon}
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
                    >
                        {content}
                    </Text>
                </View>
                <View 
                    style={{ 
                        justifyContent: "space-around", 
                        alignItems: "center", 
                        flexDirection: "row",

                    }}
                >
                    {
                        href1 && buttonName1 && buttonIcon1 &&
                        // <Link href={href1} asChild> 
                            <Button
                                iconName={buttonIcon1}
                                buttonName={buttonName1}
                                handlePress={buttonFunction1}
                            ></Button> 
                        //{/* </Link> */}
                    }
                    {
                        href2 && buttonName2 && buttonIcon2 &&
                        // <Link href={href2} asChild> 
                            <Button
                                iconName={buttonIcon2}
                                buttonName={buttonName2}
                                handlePress={buttonFunction2}
                            ></Button> 
                        //</Link>{/* </Link> */}
                    }
                    {/* <Link href={'/index'} asChild> 
                        <Button
                            iconName="sign-in-alt"
                            buttonName="Đăng nhập"
                            handlePress={() => { navigation.navigate('index', null)}}
                        ></Button> 
                    </Link> */}
                </View>
            </View> 
        </View>
    )
}
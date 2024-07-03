import { Link } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/PostList";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { rateProps } from "./DetailInfoOfFAD";

export default function ReviewShop( rateInfo: rateProps ) {
    const { heightScreen, widthScreen } = useCartContext();
    
    const heightReviewShop = heightScreen * 0.08; 
    const avatarSize = heightScreen * 0.05;
 
    const stars = []
    

    const styles = StyleSheet.create({  
        reviewShopDivContainer: {
            flexDirection: 'column',
            justifyContent: 'center', 
            alignSelf: "center", 
        },
        reviewShopContainer: { 
            flexDirection: 'column', 
            borderWidth: 1, 
            borderColor: "#89CFF0",
            backgroundColor: "white",   
            borderRadius: heightReviewShop * 0.1,
        },  
        reviewShopItem: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.04,
            width: widthScreen * 0.95,
            borderBottomWidth: 1,
            borderBottomColor: "#89CFF0"
        },
        avatar: {
            height: avatarSize,
            width: avatarSize,
            borderRadius: avatarSize * 0.5,
            marginLeft: widthScreen * 0.01
        },
        nameShopText: {
            fontWeight: "bold",
            fontSize: heightScreen * 0.018, 
        },
        star: {
            color: "yellow",
            fontSize: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.005
        },
        reviewText: {
            fontWeight: "500",
            fontSize: heightScreen * 0.019,
            paddingLeft: widthScreen * 0.02,
            opacity: 0.9
        },
        angleRight: {
            paddingLeft: widthScreen * 0.03,
            alignSelf: "center",
            opacity: 0.3,
            fontSize: widthScreen * 0.05
        },
        address: {
            marginHorizontal: widthScreen * 0.03
        },
        starContainer: {
            flexDirection: "row"
        },
        nameAndStarContainer: {
            marginLeft: widthScreen * 0.03
        }
    })
    for(let i = 0; i < rateInfo.STAR_QUANTITY_RATE; i++){
        stars.push(
            <FontAwesome
                name="star"
                style={styles.star}
            /> 
        )
    }  
    return(
        <View style={styles.reviewShopDivContainer}>
            <View style={styles.reviewShopContainer}>
                {/* avatar & name shop */}
                <View style={styles.reviewShopItem}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={{uri: rateInfo.USER_AVT_URL}}
                            style={styles.avatar}
                        />
                        <View style={styles.nameAndStarContainer}>
                            <Text
                                style={styles.nameShopText}
                            >
                                {rateInfo.NAME}
                            </Text>
                            <View style={styles.starContainer}>
                                {stars}
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>{rateInfo.DATE_RATE}</Text>
                    </View>
                </View> 

                {/* rate / review */} 
                <View style={styles.reviewShopItem}>
                    <Text
                        style={styles.reviewText}
                    >{rateInfo.CONTENT_RATE}</Text> 
                </View>   
            </View>
        </View>
    )
}
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";   
import { useNavigation } from '@react-navigation/native'; 
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors"
import React from "react";

export default function InfoListItemFADofShop({item}: {item: any}) {
        const {heightScreen, widthScreen} = useCartContext()
        const imageSize = widthScreen * 0.3;

        const navigation = useNavigation();
        const styles = StyleSheet.create({
        image: {
            height: imageSize,
            width: imageSize,
            borderRadius: imageSize * 0.1
        },
        itemContainer: {
            justifyContent: "center", 
            marginHorizontal: imageSize * 0.1,
            marginVertical: imageSize * 0.04, 
            overflow: "hidden",
            flexWrap: "wrap"
        },
        iconPlus: {
            position: "absolute",
            bottom: imageSize * 0.05,
            right: imageSize * 0.05,
            fontSize: imageSize * 0.2,
            color: "#89CFF0"
        }, 
        name: {
            fontWeight: "bold",
            fontSize: imageSize * 0.15
        },
        price: {
            fontWeight: "500",
            color: "red"
        },
        imageContainer: {
            marginBottom: imageSize * 0.05
        },
        textContainer: {
            width: imageSize
        }
    })


    return ( 
        <TouchableOpacity 
            onPress={() => navigation.navigate('DetailInfoOfFAD' as never)}
        >
            
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}> 
                    <Image
                        source={{uri: item.image}}
                        style={styles.image}
                    ></Image>
                    <FontAwesome5
                        name="plus-square"
                        style={styles.iconPlus}
                    ></FontAwesome5> 
                </View>
                <View style={styles.textContainer}>
                    <Text
                        style={styles.name}
                    >{item.name}</Text>
                    <Text
                        style={styles.price}
                    >{item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
        // </Link>
    )
}
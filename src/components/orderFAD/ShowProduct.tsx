import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image, Text } from "react-native";
import { useCartContext } from '@/providers.tsx/CartProvider';
import { Link } from "expo-router";

import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowProduct({products}: {products: any[]}) { 
    const { heightScreen, widthScreen, setDetailInfoOfFAD, baseURL, RD } = useCartContext();
    const navigation = useNavigation();   
    console.log( "products")
    const renderFADCategory = ({item, index}: {item: any, index: number}) => {
        return(  
            <TouchableOpacity 
                onPress={() => { 
                    setDetailInfoOfFAD(item)
                    // setIsLoading(true)
                    navigation.navigate('DetailInfoOfFAD' as never  , {item} )
                }}
                key={index}
            >   
                <View style={styles.FADCategoryContainer}>
                    <Image
                        source={{uri: item.FOOD_IMAGE_URL}}
                        style={styles.FADCategoryImage}
                    ></Image>
                    <View>
                        <Text
                            style={styles.FADCategoryTitle}
                        >
                            {item.FAD_NAME}
                        </Text>
                        <Text 
                            style={{
                                fontSize: RD * 0.00004,
                                fontWeight: 'bold',
                                color: 'red'
                            }}
                        >
                            Giá: {item.FAD_PRICE} k
                        </Text>
                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <Image
                                source={{uri: item.SHOP_IMAGE_URL}}
                                style={{
                                    width: RD * 0.00007,
                                    height: RD * 0.00007,
                                    borderRadius: RD * 0.000035,  
                                }}
                            /> 
                            <Text style={{ fontWeight: "bold", marginLeft: widthScreen * 0.01 }}>{item.SHOP_NAME}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity> 
        )
    }
    const styles = StyleSheet.create({ 
        FADCategoryImage: {
            height: heightScreen * 0.1, 
            width: heightScreen * 0.1,
            aspectRatio: 1,
            marginVertical: 5,
            marginHorizontal: 10,
            borderRadius: widthScreen * 0.04,
        },
        FADCategoryContainer: {
            flexDirection: 'row', 
            alignItems: 'center', 
            borderRadius: widthScreen * 0.04,
            paddingHorizontal: widthScreen * 0.01,
            backgroundColor: "#e6dedc", 
            marginVertical: heightScreen * 0.003
        },
        FADCategoryTitle: {
            fontWeight: 'bold', 
            fontSize: RD * 0.00005,
            // flex: 4, 
            // marginBottom: heightScreen * 0.009
        },
        FADCategoryDivContainer: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            // borderWidth: 1
            // marginTop: heightScreen * 0.03
        }
    })
    return(
        <View style={styles.FADCategoryDivContainer}>
            <FlatList
                data={products}
                renderItem={renderFADCategory} 
                showsVerticalScrollIndicator
                bounces={false}
                pagingEnabled 
                keyExtractor={(item, index) => index.toString()} 
            >
            </FlatList> 
        </View>
    )
}
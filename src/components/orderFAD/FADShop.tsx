import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image, Text } from "react-native";
import { useCartContext } from '@/providers.tsx/CartProvider';
import { ImageStyle } from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";


export default function FADShop({products}: {products: any}){
    const { heightScreen, widthScreen, baseURL, setFADShop_ID } = useCartContext();

    const [FADShopList, setFADShopList] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        axios.get(baseURL + '/getFADShop')
        .then((res) => {
            console.log(res.data.shop)
            setFADShopList(res.data.shop)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleClickFADShop = (id: number) => {
        navigation.navigate('FoodStallShop')
        setFADShop_ID(id)
    }
    
    const renderFADShop = ({item}: {item: any}) => {
        return( 
            <TouchableOpacity onPress={() => handleClickFADShop(item.SHOP_ID)}  style={styles.FADShopContainer}> 
                {/* <View> */}
                    <View style={{ flex: 4.5, width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <Image
                            source={{uri: item.IMAGE_URL}}
                            style={styles.FADShopImage as ImageStyle} // Cast the style to ImageStyle
                        ></Image>
                    </View>
                    <View  style={{ flex: 2, justifyContent: "center", alignItems: "center", width: "100%"}}>
                        <Text
                            style={styles.FADShopTitle}
                            // numberOfLines={2}
                            numberOfLines={2}
                            ellipsizeMode='tail'
                        >
                            {item.SHOP_NAME}
                        </Text> 
                    </View>
                {/* </View>  */}
            </TouchableOpacity>
        )
    }
    const styles = StyleSheet.create({ 
        FADShopImage: {
            height: "100%", 
            width: "100%",
            aspectRatio: 1,
            marginVertical: 5,
        },
        FADShopContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            alignContent: "center",
            borderRadius: "10%",
            marginHorizontal: widthScreen * 0.01,
            backgroundColor: "#e6dedc",
            height: heightScreen * 0.15,
            width: heightScreen * 0.13, 
            flex: 10,
            overflow: "hidden",
            // flexWrap: 'wrap'
        },
        FADShopTitle: {
            fontWeight: 'bold',
            textAlign: "center",
            paddingHorizontal: widthScreen * 0.01,
            paddingVertical: heightScreen * 0.004,
            // marginTop: 10,
            flex: 2,
            width: "80%"
            // flexDirection: 'row',
            // flexWrap: 'wrap'
        },
        FADShopDivContainer: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            // borderWidth: 1
        }
    })
    return(
        <View style={styles.FADShopDivContainer}>
            <FlatList
                data={FADShopList}
                renderItem={renderFADShop}
                horizontal
                showsHorizontalScrollIndicator
                bounces={false}
                pagingEnabled 
            >
            </FlatList> 
        </View>
    )
}
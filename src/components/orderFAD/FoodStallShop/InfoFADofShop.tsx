import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList  } from "react-native";
import Collapsible from 'react-native-collapsible'
import products from "@assets/data/products";
import InfoListFADofShop from "./InfoListFADofShop";
import { useCartContext } from "@/providers.tsx/CartProvider";
import React from "react";
import axios from "axios";
import ShowFADSearchInfo from "@/app/(user)/orderFoodAndDrink/ShowFADSearchInfo";
import ShowProduct from "../ShowProduct";


export function InfoFADofShop() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const {widthScreen, heightScreen, mainColor, RD, baseURL, FADShop_ID} = useCartContext()

    const [FADInfo, setFADInfo] = useState<any>({
        food: [],
        drink: [],
    })

    const [listFAD, setListFAD] = useState([
                        {
                            name: "Món ăn",
                            isCollapsed: false,
                            products: products
                        },
                        {
                            name: "Nước",
                            isCollapsed: false,
                            products: products
                        },
                        // {
                        //     name: "Topping",
                        //     isCollapsed: false,
                        //     products: products
                        // },
                    ])
    useEffect(() => {
        const getFADInfo = async () => {
            axios.get(
                baseURL + '/getFADInfo', 
                { params: { FADShop_ID: FADShop_ID } }
            )
            .then((res) => {
                console.log(res.data.FADInfo_eloquent.filter((item: any) => item.CATEGORY === 2), "getFADInfoAtHomeofShop") 
                setFADInfo({
                    food: res.data.FADInfo_eloquent.filter((item: any) => item.CATEGORY === 1),
                    drink: res.data.FADInfo_eloquent.filter((item: any) => item.CATEGORY === 2), 
                })
            })
        }
        getFADInfo()
    }, [])

    const toogleCollapse = (itemToToggle: { name: string; }) => {
        setListFAD(
            listFAD.map(item => 
                item.name === itemToToggle.name 
                ? { ...item, isCollapsed: !item.isCollapsed }
                : item
            )
        );
    } 

    const renderList = ({item}: {item: any}) => {
        return( 
            <View>
                <TouchableOpacity 
                    onPress={() => toogleCollapse(item)}
                >
                    <View style={styles.collapseBar}>
                        <Text
                            style={styles.collapseBarText}
                        >
                            {item.name}
                        </Text> 
                        <FontAwesome5
                            name="angle-down"
                            style={styles.collapseBarIcon}
                        />
                    </View> 
                </TouchableOpacity >
                <Collapsible
                    collapsed={item.isCollapsed}
                > 
                    {/* <InfoListFADofShop products={FADInfo.FADInfo_eloquent}></InfoListFADofShop>  */}
                    {
                        item.name === listFAD[0].name 
                        ? <ShowProduct products={FADInfo.food} />
                        : <ShowProduct products={FADInfo.drink} /> 
                    }
                </Collapsible>
            </View>
        )
    }

    const styles = StyleSheet.create({
        collapseBar: {
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "white",
            paddingHorizontal: widthScreen * 0.05,
            paddingVertical: heightScreen * 0.006,
            borderRadius: RD * 0.00002,
            marginBottom: heightScreen * 0.01,
            borderColor: mainColor,
            borderWidth: 1,
        },
        collapseBarText: {
            // fontWeight: "bold",
            fontSize: widthScreen * 0.05,
            opacity: 0.95,
            color: mainColor,
            fontWeight: "bold", 
        },
        collapseBarIcon: {
            opacity: 0.5,
            alignSelf: "center", 
            marginTop: heightScreen * 0.008,
            marginLeft: widthScreen * 0.03,
            color: mainColor,
            fontSize: RD * 0.00006,
        },
        test: {
            height: heightScreen
        }
    })

    return (
        <FlatList
            data={listFAD}
            renderItem={renderList}
        />
    )
}
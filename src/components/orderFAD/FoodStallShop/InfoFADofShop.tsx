import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList  } from "react-native";
import Collapsible from 'react-native-collapsible'
import products from "@assets/data/products";
import InfoListFADofShop from "./InfoListFADofShop";
import { useCartContext } from "@/providers.tsx/CartProvider";


export function InfoFADofShop() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const {widthScreen, heightScreen, mainColor} = useCartContext()
    const [listFAD, setListFAD] = useState([
                        {
                            name: "Đồ ăn",
                            isCollapsed: false,
                            products: products
                        },
                        {
                            name: "Nước",
                            isCollapsed: false,
                            products: products
                        },
                        {
                            name: "Topping",
                            isCollapsed: false,
                            products: products
                        },
                    ]) 

    const toogleCollapse = (itemToToggle) => {
        setListFAD(listFAD.map(item => 
                item.name === itemToToggle.name 
                ? { ...item, isCollapsed: !item.isCollapsed }
                : item
            )
        );
    } 

    const renderList = ({item}) => {
        return( 
            <View>
                <TouchableOpacity 
                    onPress={() => toogleCollapse(item)}
                >
                    <View style={styles.collapseBar}>
                        <Text
                            style={styles.collapseBarText}
                        >{item.name}</Text> 
                        <FontAwesome5
                            name="angle-down"
                            style={styles.collapseBarIcon}
                        />
                    </View> 
                </TouchableOpacity >
                <Collapsible
                    collapsed={item.isCollapsed}
                > 
                    <InfoListFADofShop products={item.products}></InfoListFADofShop> 
                </Collapsible>
            </View>
        )
    }

    const styles = StyleSheet.create({
        collapseBar: {
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center"
        },
        collapseBarText: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.05,
            opacity: 0.95,
            color: mainColor
        },
        collapseBarIcon: {
            opacity: 0.5,
            alignSelf: "center", 
            marginTop: heightScreen * 0.008,
            marginLeft: widthScreen * 0.01,
            color: mainColor
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
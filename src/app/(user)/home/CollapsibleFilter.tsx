import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions } from "react-native"; 
import Filter from "./filter";
import { useCartContext } from "@/providers.tsx/CartProvider";
import Collapsible from 'react-native-collapsible';

type CollapsibleFilterProps = {
    handleReloadPost: () => void,
    isShowFilter: boolean,
    setIsShowFilter: (value: boolean) => void,
}

export default function CollapsibleFilter({handleReloadPost, isShowFilter, setIsShowFilter}: CollapsibleFilterProps) {

    // const { heightScreen, widthScreen, mainColor, baseURL, setUserID, RD } = useCartContext();
    const widthScreen = Dimensions.get("window").width
    const heightScreen = Dimensions.get("window").height
    const RD = widthScreen * heightScreen 
    const mainColor = "#89CFF0" 

    const styles = StyleSheet.create({ 
    
        filterIcon: {
            width: RD * 0.00006,
            height: RD * 0.00006,
            // color: 'green', 
        },
        collapseBarText: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.04, 
            color: mainColor,
            marginLeft: widthScreen * 0.02,
    
        },
        collapseBar: {
            flexDirection: "row",
            alignItems: "center",
            // alignSelf: "center"
            width: widthScreen * 0.23,
            borderColor: 'green',
            borderWidth: 1,
            marginLeft: widthScreen * 0.05,
            borderRadius: RD * 0.00002,
            paddingVertical: heightScreen * 0.006,
            marginTop: heightScreen * 0.01,
        },
    })

    const toogleCollapseFilter = () => {
        setIsShowFilter(!isShowFilter)
    }
    return (
        <View>
            <TouchableOpacity 
                onPress={toogleCollapseFilter}
            >
                <View style={styles.collapseBar}>
                    <Text
                    style={styles.collapseBarText}
                    >Bộ lọc: </Text> 
                    <Image
                        source={require('@assets/images/filter_home_2.png')}
                        style={styles.filterIcon}
                    ></Image>
                </View> 
            </TouchableOpacity>

            <Collapsible collapsed={isShowFilter}> 
                <Filter handleReloadPost = {handleReloadPost}></Filter> 
            </Collapsible>
        </View>
    )
}
import { View, StyleSheet} from "react-native";
import LoadingDots from "react-native-loading-dots";
import { useCartContext } from "@/providers.tsx/CartProvider";
import React from "react";

export default function Loading() {
    const {heightScreen, widthScreen} = useCartContext();
    const styles = StyleSheet.create({
        displayNone: {
            display: "none"
        },
        dotsWrapper: {
            width: widthScreen * 0.25,
            marginVertical: heightScreen * 0.4,
            height: heightScreen * 0.06,
        },
        loadingScreen: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: heightScreen
        },
    })
    return(
        <View style={[styles.loadingScreen ]}>
            <View style={styles.dotsWrapper}>
                <LoadingDots />
            </View>
        </View>
    )
}
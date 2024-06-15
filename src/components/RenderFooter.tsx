import { useCartContext } from "@/providers.tsx/CartProvider";
import React from "react";
import { ActivityIndicator, View } from "react-native";


export default function RenderFooter ({isLoading}: { isLoading: boolean }) {

    const {heightScreen, mainColor} = useCartContext()

    return(
        isLoading &&
        <View style={{ marginTop: heightScreen * 0.002, marginBottom: heightScreen * 0.05, alignItems: "center" }}>
            <ActivityIndicator size="large" color={mainColor} />
        </View>
    )
}
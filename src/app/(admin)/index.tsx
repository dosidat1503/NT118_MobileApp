import React from "react";
import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabIndex() {
    return <Redirect href={'/(admin)/home'}></Redirect>
}

const styles = StyleSheet.create({
    divContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
    }
});
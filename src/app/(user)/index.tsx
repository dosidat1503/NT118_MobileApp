import { useRoute } from "@react-navigation/native";
import { Redirect } from "expo-router";
import React from "react";

export default function  TabIndex(){
     
    return <Redirect href={'/(user)/home'}></Redirect>
}
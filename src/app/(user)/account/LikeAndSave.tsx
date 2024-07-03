import { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native" 
import { useCartContext } from "@/providers.tsx/CartProvider";
import axios from "axios";
import React from "react"; 
import PostAtHome from "../home/PostAtHome";
import { ScrollView } from "react-native-gesture-handler";
import CollapsibleFilter from "../home/CollapsibleFilter";
import { Stack } from "expo-router";
import SearchPost from "../home/SearchPost";


export default function LikeAndSave() { 
    return (  
        <SearchPost isLikeAndSave={true} />
    )
}
 
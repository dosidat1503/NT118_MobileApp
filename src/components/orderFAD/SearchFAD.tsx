import { View, TextInput, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { Link, Stack, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SearchFAD() {
    const { heightScreen, widthScreen, mainColor,  setTagIDToGetFADInfo } = useCartContext();
    
    const heightSearchFAD = heightScreen * 0.06;
    const widthSearchFAD = widthScreen * 0.7;
    const widthPaddingSearchFAD = widthScreen * 0.04

    const styles = useMemo(() => StyleSheet.create({ 
        searchFADIcon: {
            // paddingVertical: "auto",
            alignSelf: 'center',
            paddingHorizontal: widthPaddingSearchFAD,
            backgroundColor: "#89CFF0",
            fontSize: heightScreen * 0.02,
        },
        searchFADContainer: {
            height: heightSearchFAD,
            width: widthSearchFAD,
            flexDirection: 'row',
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1, 
            borderColor: "#89CFF0",
            backgroundColor: "#89CFF0", 
            position: 'relative', 
            top: heightScreen * (-0.03)
        },
        searchFADInput: {
            height: "100%",
            width: "100%",
            backgroundColor: "#FBFFC8",
            color: mainColor,
            fontWeight: "bold",
            fontSize: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.02
        },
        searchFADDivContainer: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
    }), [])

    const [textToSearchFAD, setTextToSearchFAD] = useState("")
    useEffect(() => {
        AsyncStorage.setItem('textQueryPost', textToSearchFAD);
      }, [textToSearchFAD]);
    const navigation = useNavigation();

    const handleSearch = () => {
        setTagIDToGetFADInfo(0)
        navigation.navigate('ShowFADSearchInfo' as never)
    }
    return(
    // {/* input search bạn muốn ăn gì */}
        <View style={styles.searchFADDivContainer}> 
            <View style={styles.searchFADContainer}>
                <TouchableOpacity
                    onPress={handleSearch}
                    style={{
                        flexDirection: 'row', 
                        alignItems: "center"
                    }}
                >
                    <FontAwesome5 
                        name="search" 
                        style={styles.searchFADIcon}
                    ></FontAwesome5>
                </TouchableOpacity>
                <TextInput 
                    placeholder='Bạn muốn ăn gì?'
                    style={styles.searchFADInput}
                    value={ textToSearchFAD }
                    onChangeText={ (value) => setTextToSearchFAD(value) }
                ></TextInput>
            </View>
        </View>
    )
}
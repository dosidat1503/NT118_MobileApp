import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useCartContext } from "@/providers.tsx/CartProvider";


export default function SearchFAD() {
    const { heightScreen, widthScreen } = useCartContext();
    
    const heightSearchFAD = heightScreen * 0.06;
    const widthSearchFAD = widthScreen * 0.7;
    const widthPaddingSearchFAD = widthScreen * 0.04

    const styles = StyleSheet.create({ 
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
            color: "red",
            fontSize: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.02
        },
        searchFADDivContainer: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
    })
    return(
    // {/* input search bạn muốn ăn gì */}
        <View style={styles.searchFADDivContainer}>
            <View style={styles.searchFADContainer}>
                <FontAwesome5 
                name="search" 
                style={styles.searchFADIcon}
                ></FontAwesome5>
                <TextInput 
                placeholder='Bạn đang thèm gì nào?'
                style={styles.searchFADInput}
                ></TextInput>
            </View>
        </View>
    )
}
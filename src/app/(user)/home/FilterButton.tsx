import { useCartContext } from "@/providers.tsx/CartProvider";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"


export default function FilterButton({ handleReloadPost } : { handleReloadPost: () => void }){
    const { mainColor, heightScreen, widthScreen, RD, selectedItem, setSelectedItem } = useCartContext();

    const styles = StyleSheet.create({
        applyFilterButtonContainer: { 
            paddingBottom: heightScreen * 0.01, 
            alignItems: 'center',
            borderBottomWidth: 1,
            width: "80%",
            
            marginLeft: "10%",
            borderColor: mainColor, 
            justifyContent: 'space-around',
            flexDirection: 'row',
        },
        applyFilterButtonTouchable: {
            borderColor: mainColor,
            borderRadius: RD * 0.00003,
            borderWidth: 1, 
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: mainColor,
        },
        applyFilterButtonText: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: RD * 0.00004,
        },
    })

    return(
        <View style={ styles.applyFilterButtonContainer } >
            <TouchableOpacity 
                style={ styles.applyFilterButtonTouchable }
                onPress={() => {
                    handleReloadPost()
                }}
            > 
                <Text style={ styles.applyFilterButtonText } >Áp Dụng Bộ Lọc</Text>
                <FontAwesome
                    name="search"
                    size={RD * 0.00004} 
                    color={"yellow"}
                    style={{
                        marginLeft: widthScreen * 0.02,
                        opacity: 0.7
                    }}
                />
            </TouchableOpacity>

            <TouchableOpacity 
                style={ styles.applyFilterButtonTouchable }
                onPress={() => { 
                    setSelectedItem({
                        topicItem: [],
                        sortByItem: '',
                        startDate: "",
                        endDate: "", 
                    })
                    handleReloadPost()
                }}
            > 
                <Text style={ styles.applyFilterButtonText } >Đặt lại</Text>
                <FontAwesome5
                    name="sync-alt"
                    size={RD * 0.00004} 
                    color={"yellow"}
                    style={{
                        marginLeft: widthScreen * 0.02,
                        opacity: 0.7
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}
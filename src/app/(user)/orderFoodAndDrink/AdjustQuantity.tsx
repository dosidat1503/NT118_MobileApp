import { TextInput, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useCartContext } from "@/providers.tsx/CartProvider";

interface AdjustQuantityProps {
    quantity: number;
    handleAdjustQuantity: (index: any, type: any, quantity: number) => void;
    index: number;
}

export default function AdjustQuantity({index, handleAdjustQuantity, quantity}: AdjustQuantityProps) {

    const {widthScreen, heightScreen} = useCartContext();

    const styles = StyleSheet.create({
        quantityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        quantityButton: {
          paddingHorizontal: widthScreen * 0.008,
          paddingVertical: widthScreen * 0.003,
        //   fontSize: 42,
          fontWeight: "bold", 
          borderRadius: widthScreen * 0.2,
          alignSelf: "center", 
          borderColor: "#89CFF0",
          color: "#89CFF0",
          textAlignVertical: "center",
          alignItems: "center"  
        },
        iconQuantityButton: {
            fontSize: widthScreen * 0.05,
            opacity: 0.6 
        },
        quantityInput: {
            borderWidth: 1,
            borderColor: '#89CFF0',
            borderRadius: 5,
            paddingHorizontal: widthScreen * 0.007,
            paddingVertical: heightScreen * 0.003,
            width: widthScreen * 0.09,
            height: "100%",
            marginHorizontal: widthScreen * 0.01,
            textAlign: 'center',
            fontWeight: "bold",
            opacity: 0.7 
        },

    }) 

    return (  
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleAdjustQuantity(index, "decrease", 0)}>
                <Text style={styles.quantityButton}>
                    <FontAwesome5 name="minus-square"  style = {styles.iconQuantityButton}></FontAwesome5> 
                </Text>
            </TouchableOpacity>
            <TextInput
                style={styles.quantityInput}
                value={quantity.toString()}
                keyboardType="numeric"
                onChangeText={(text) => handleAdjustQuantity(index, "typeNumber", parseInt(text))}
            />
            <TouchableOpacity onPress={() => handleAdjustQuantity(index, "increase", 0)}>
                <Text style={styles.quantityButton}>
                    <FontAwesome5 name="plus-square" style = {styles.iconQuantityButton}></FontAwesome5> 
                </Text>
            </TouchableOpacity>
          </View> 
      );
}
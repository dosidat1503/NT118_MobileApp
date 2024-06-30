import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import React from "react";

interface ButtonProps {
    iconName?: string;
    buttonName?: string;
    handlePress?: () => void;
    color?: string;
}

export default function Button({iconName, buttonName, handlePress, color}: ButtonProps) { 

    const {widthScreen, heightScreen} = useCartContext();

    const styles = StyleSheet.create({
        button: {
            backgroundColor: color ? color : '#3498db',
            paddingVertical: heightScreen * 0.008,
            paddingHorizontal: widthScreen * 0.02,
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
            marginLeft: widthScreen * 0.01
        },
    });

  return (
    
    <TouchableOpacity 
        onPress={handlePress}
        style={styles.button}
    >
        <FontAwesome5 name={iconName} size={18} color="white" />
        <Text 
            style={styles.text}
        >{buttonName}</Text>
    </TouchableOpacity>
  );
}
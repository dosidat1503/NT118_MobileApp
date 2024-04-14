import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View, Image, Text } from "react-native";
import { useCartContext } from '@/providers.tsx/CartProvider';
import { Link } from "expo-router";

import { useNavigation } from '@react-navigation/native'; 

export default function ShowProduct({products}: {products: any[]}) { 
    const { heightScreen, widthScreen } = useCartContext();
    const navigation = useNavigation();
    
    const renderFADCategory = ({item}: {item: any}) => {
        return( 
            // <Link href="/(user)/orderFoodAndDrink/FoodStallShop" asChild> 
            <TouchableOpacity 
                onPress={() => navigation.navigate('FoodStallShop', { item })}
            >   
                <View style={styles.FADCategoryContainer}>
                    <Image
                    source={{uri: item.image}}
                    style={styles.FADCategoryImage}
                    ></Image>
                    <View>
                        <Text
                            style={styles.FADCategoryTitle}
                        >
                            {item.name}
                        </Text>
                        <Text 
                            // style={styles}
                        >
                            Giá: {item.price} k
                        </Text>
                    </View>
                </View> 
            </TouchableOpacity>
            // </Link>
        )
    }
    const styles = StyleSheet.create({ 
        FADCategoryImage: {
            height: heightScreen * 0.1, 
            width: heightScreen * 0.1,
            aspectRatio: 1,
            marginVertical: 5,
            marginHorizontal: 10
        },
        FADCategoryContainer: {
            flexDirection: 'row', 
            alignItems: 'center', 
            borderRadius: widthScreen * 0.04,
            paddingHorizontal: widthScreen * 0.01,
            backgroundColor: "#e6dedc", 
            marginVertical: heightScreen * 0.003
        },
        FADCategoryTitle: {
            fontWeight: 'bold', 
            flex: 4, 
            marginBottom: heightScreen * 0.009
        },
        FADCategoryDivContainer: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            // borderWidth: 1
            marginTop: heightScreen * 0.03
        }
    })
    return(
        <View style={styles.FADCategoryDivContainer}>
            <FlatList
            data={products}
            renderItem={renderFADCategory} 
            showsVerticalScrollIndicator
            bounces={false}
            pagingEnabled 
            >
            </FlatList> 
        </View>
    )
}
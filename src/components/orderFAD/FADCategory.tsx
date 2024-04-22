import { FlatList, StyleSheet } from "react-native";
import { View, Image, Text } from "react-native";
import { useCartContext } from '@/providers.tsx/CartProvider';
import { ImageStyle } from "react-native";


export default function FADCategory({products}: {products: any}){
    const { heightScreen, widthScreen } = useCartContext();
    
    const renderFADCategory = ({item}: {item: any}) => {
            return( 
                <View style={styles.FADCategoryContainer}>
                    <Image
                        source={{uri: item.image}}
                        style={styles.FADCategoryImage as ImageStyle} // Cast the style to ImageStyle
                    ></Image>
                    <Text
                        style={styles.FADCategoryTitle}
                        // numberOfLines={2}
                    >{item.name}</Text>
                </View>
            )
    }
    const styles = StyleSheet.create({ 
        FADCategoryImage: {
            // height: "80%",
            flex: 8,
            width: "100%",
            aspectRatio: 1,
            marginVertical: 5,
        },
        FADCategoryContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', 
            borderRadius: "10%",
            marginHorizontal: widthScreen * 0.01,
            backgroundColor: "#e6dedc",
            height: heightScreen * 0.15,
            width: heightScreen * 0.13, 
            // flexWrap: 'wrap'
        },
        FADCategoryTitle: {
            fontWeight: 'bold',
            // marginTop: 10,
            flex: 4,
            // flexDirection: 'row',
            // flexWrap: 'wrap'
        },
        FADCategoryDivContainer: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            // borderWidth: 1
        }
    })
    return(
        <View style={styles.FADCategoryDivContainer}>
            <FlatList
            data={products}
            renderItem={renderFADCategory}
            horizontal
            showsHorizontalScrollIndicator
            bounces={false}
            pagingEnabled 
            >
            </FlatList> 
        </View>
    )
}
import { FlatList, Touchable, TouchableOpacity } from "react-native";
import { View, Image } from "react-native";
import { useCartContext } from '@/providers.tsx/CartProvider';
import React from "react";
import { useNavigation } from "expo-router";
 
export default function  SlideHeaderOrderFAD({products}: { products: any[] }) {
    const { heightScreen, widthScreen, setTextToSearchFAD, setTagIDToGetFADInfo } = useCartContext();  
    const heightSlideProductImage = heightScreen * 0.3;
    const navigation = useNavigation();
 
    const renderCarouselProduct = ({item}: {item: any}) => {
        return (
          <View 
            // style={[styles.containerItemImage]}
          >
            <TouchableOpacity
              onPress={
                () => {
                  setTextToSearchFAD("")
                  setTagIDToGetFADInfo(item.tagID)
                  navigation.navigate('ShowFADSearchInfo' as never)
                }
              }
            >
              <Image
                source= {{uri: item.url}} 
                style={{
                  height: heightSlideProductImage,
                  width: widthScreen,
                  // flex: 1
                }}
              ></Image>
            </TouchableOpacity>
          </View>
        )
      }

    return (
        <FlatList
            data={products}
            renderItem={renderCarouselProduct}
            horizontal
            showsHorizontalScrollIndicator
            bounces={false}
            pagingEnabled 
        >
        </FlatList> 
    )
}
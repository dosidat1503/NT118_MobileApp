import { FlatList } from "react-native";
import { View, Image } from "react-native";
import { useCartContext } from '@/providers.tsx/CartProvider';
import React from "react";
 
export default function SlideHeaderOrderFAD({products}: { products: any[] }) {
    const { heightScreen, widthScreen } = useCartContext();  
    const heightSlideProductImage = heightScreen * 0.3;
 
    const renderCarouselProduct = ({item}: {item: any}) => {
        return (
          <View 
            // style={[styles.containerItemImage]}
          >
            <Image
              source= {{uri: item.url}} 
              style={{
                height: heightSlideProductImage,
                width: widthScreen,
                // flex: 1
              }}
            ></Image> 
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
import { FlatList, StyleSheet, View, Text, Image, Animated, Dimensions, TextInput  } from 'react-native';
import ProductListItem from '@components/ProductListItem'; 
import products from '@assets/data/products';
import { Product } from '@/types';
import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider';
import { useRef, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

const widthScreen = Dimensions.get("window").width
const heightScreen = Dimensions.get("window").height
const heightSlideProductImage = heightScreen * 0.3;
const heightSearchFAD = heightScreen * 0.08;
const widthSearchFAD = widthScreen * 0.7;
const widthPaddingSearchFAD = widthScreen * 0.04
export default function TabOneScreen() { 
  const renderItemProduct = ({item}) =>  <ProductListItem product={item}></ProductListItem>

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemChange = useRef(({viewItem}) => {
    setCurrentIndex(viewItem[0].index)
  }).current
  // const viewConfig = useRef({ viewAreaCoverpage})

  const renderCarouselProduct = ({item}) => {
    return (
      <View 
        // style={[styles.containerItemImage]}
      >
        <Image
          source= {{uri: item.image}}
          style={{
            height: heightSlideProductImage,
            width: widthScreen,
            // flex: 1
          }}
        ></Image>
      </View>
    )
  }

  //render FAD category
  const renderFADCategory = ({item}) => {
    return( 
      <View style={styles.FADCategoryContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.FADCategoryImage}
        ></Image>
        <Text
          style={styles.FADCategoryTitle}
        >{item.name}</Text>
      </View>
    )
  }
  
  return (  
    <View 
      // style={{ flex: 3}}
    >
      {/* hiển thị slide show hình ảnh FAD */}
      <FlatList
        data={products}
        renderItem={renderCarouselProduct}
        horizontal
        showsHorizontalScrollIndicator
        bounces={false}
        pagingEnabled
        // keyExtractor={(item) => item.id}
        // onViewableItemsChanged={viewableItemChange}
        // viewabilityConfig={}

        // onScroll={Animated.event([
        //   {
        //     nativeEvent: {
        //       contentOffset: {
        //         x: scrollX
        //       }
        //     }
        //   },
        //   {
        //     useNativeDriver: false
        //   }
        // ])}
        // numColumns={2}
        // contentContainerStyle={{gap: 10}}
        // columnWrapperStyle={{gap: 10}}
      >
      </FlatList> 

      {/* input search bạn muốn ăn gì */}
      <View style={styles.searchFADDivContainer}>
        <View style={styles.searchFADContainer}>
          <FontAwesome5 
            name="search" 
            style={styles.searchFADIcon}
          ></FontAwesome5>
          <TextInput 
            placeholder='Bạn đang thèm gì nào'
            style={styles.searchFADInput}
          ></TextInput>
        </View>
      </View>

      {/* hiển thị thông tin danh mục (category) FAD */}
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
    </View>
  );
}

const styles = StyleSheet.create({ 
    containerItemImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center"
    },
    imageProduct: {
      flex: 0.7,
      justifyContent: 'center',
      width: 100,
      height: 100
    },
    searchFADIcon: {
      // paddingVertical: "auto",
      alignSelf: 'center',
      paddingHorizontal: widthPaddingSearchFAD,
      backgroundColor: "#89CFF0"
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
      
    },
    searchFADDivContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    FADCategoryImage: {
      height: "80%",
      width: "100%",
      aspectRatio: 1
    },
    FADCategoryContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 1,
      
      borderRadius: "10%",
      marginHorizontal: widthScreen * 0.01,
      backgroundColor: "#e6dedc",
      height: heightScreen * 0.1,
      width: heightScreen * 0.1, 
    },
    FADCategoryTitle: {
      fontWeight: 'bold',
      marginTop: 10
    },
    FADCategoryDivContainer: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 1
    }
});

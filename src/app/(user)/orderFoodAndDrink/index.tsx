import { FlatList, StyleSheet, View, Text, Image, TextInput, ScrollView, Pressable, TouchableOpacity, Dimensions  } from 'react-native'; 
import products from '@assets/data/products';  
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import SlideHeaderOrderFAD from '@/components/orderFAD/SlideHeaderOrderFAD';
import { useCartContext } from '@/providers.tsx/CartProvider';
import SearchFAD from '@/components/orderFAD/SearchFAD';
import FADShop from '@/components/orderFAD/FADShop';
import ShowProduct from '@/components/orderFAD/ShowProduct';
import { Link, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LogBox } from 'react-native'; 
import Loading from '@/components/Loading';
// import Loading from '@/components/Loading';
// import LoadingDots from 'react-native-loading-dots';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

 
// const FADHome = React.memo(() => { 
export default function FADHome() {
  const { heightScreen, widthScreen, mainColor, baseURL, RD , userID } = useCartContext();
  const styles = StyleSheet.create({
      collapseBar: {
          flexDirection: "row",
          alignItems: "center",
          // alignSelf: "center",
          backgroundColor: "white",
          paddingHorizontal: widthScreen * 0.05,
          paddingVertical: heightScreen * 0.006,
          borderRadius: RD * 0.00002,
          marginBottom: heightScreen * 0.01,
          borderColor: mainColor,
          // borderWidth: 1,
          marginHorizontal: widthScreen * 0.05,
          width: widthScreen * 0.35,
          marginTop: heightScreen * 0.01,
      },
      collapseBarText: {
        // fontWeight: "bold",
        fontSize: widthScreen * 0.05,
        opacity: 0.95,
        color: "orange",
        fontWeight: "bold", 
      },
      collapseBarIcon: {
          opacity: 0.5,
          alignSelf: "center", 
          marginTop: heightScreen * 0.008,
          marginLeft: widthScreen * 0.03,
          color: mainColor,
          fontSize: RD * 0.00006,
      },
      test: {
          height: heightScreen
      }
  })
  // const widthScreen = Dimensions.get("window").width
  // const heightScreen = Dimensions.get("window").height
  // const RD = widthScreen * heightScreen 
  // const mainColor = "#89CFF0" 
  // const baseURL = "http://26.85.40.176:8000/api"
  const [homeInfo, setHomeInfo] = useState<any>({})
  const imageList = [ 
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Ftrasua.png?alt=media&token=6fcd7dd8-cec4-49e8-9353-754b3261afec",
      tagName: "Trà Sữa",
      tagID: 4,
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Fcomtam.jpg?alt=media&token=b249632b-4bc6-4ce2-8057-14c54d073123",
      tagName: "Cơm",
      tagID: 1,
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Ftrachanh.jpg?alt=media&token=ef8ecea0-2c84-4b53-a54c-8f16bc04bb89",
      tagName: "Trà Chanh",
      tagID: 5,
    }, 
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Fpho.jpg?alt=media&token=4aed833c-79e0-477e-b5df-4bff5c9aa858",
      tagName: "Phở, bún, đồ ăn loại nước",
      tagID: 2,
    },
  ] 
  const [isLoadingHome, setIsLoadingHome] = useState(true)

  useEffect(() => {  
    const getHomeInfo = async () => {
      axios.get(baseURL + '/getFADInfo', {params: {atHome: 1}})
      .then((res) => {
        // console.log(res.data, "getFADInfoAtHome") 
        setHomeInfo(res.data)
        setIsLoadingHome(false)
      })
    }
    getHomeInfo()
  }, [])
 
  console.log("orderFADH33ome", userID)
  
  return (    
    isLoadingHome 
    ? <Loading></Loading>
    : 
    <FlatList
      data={[]}  // Không có dữ liệu cụ thể cho danh sách này
      renderItem={(item) => null}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View>
          <SlideHeaderOrderFAD cateroty={imageList} />
          <SearchFAD/>
        </View>
      }
      ListFooterComponent={
        <View>
          <FADShop products={homeInfo.shopInfo} />
          <View style={styles.collapseBar}>
            <Text style={styles.collapseBarText}> Bán chạy </Text>  
          </View>     
          <ShowProduct products={homeInfo.FADInfo_eloquent} />
        </View>
      } 
    /> 
  ); 
}
// )

// export default FADHome;
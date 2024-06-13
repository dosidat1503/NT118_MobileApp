import { FlatList, StyleSheet, View, Text, Image, TextInput, ScrollView, Pressable  } from 'react-native'; 
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
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

 
export default function TabOneScreen() { 
  const { heightScreen, widthScreen, mainColor, baseURL } = useCartContext();
  
  const [homeInfo, setHomeInfo] = useState<any>({})
  const imageList = [ 
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Ftrasua.png?alt=media&token=6fcd7dd8-cec4-49e8-9353-754b3261afec",
      component: "trasua"
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Fcomtam.jpg?alt=media&token=b249632b-4bc6-4ce2-8057-14c54d073123",
      component: "com"
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Ftrachanh.jpg?alt=media&token=ef8ecea0-2c84-4b53-a54c-8f16bc04bb89",
      component: "trachanh"
    }, 
    {
      url: "https://firebasestorage.googleapis.com/v0/b/nt118-firebase-a9bb2.appspot.com/o/SlideHeaderFAD_FAD%2Fpho.jpg?alt=media&token=4aed833c-79e0-477e-b5df-4bff5c9aa858",
      component: "pho"
    },
  ]

  useEffect(() => {
    const getHomeInfo = async () => {
      axios.get(baseURL + '/getFADInfoAtHome')
      .then( (res) => {
        console.log(res.data, "getFADInfoAtHome") 
        setHomeInfo(res.data)
      })
    }
    getHomeInfo()
  }, [])
  
  return (  
        <ScrollView>  
    <View>
          {/* hiển thị slide show hình ảnh FAD */}
          <SlideHeaderOrderFAD products={imageList}></SlideHeaderOrderFAD> 

          {/* input search bạn muốn ăn gì */} 
          <SearchFAD></SearchFAD>

          {/* hiển thị thông tin của shop */}
          <FADShop products={homeInfo.shopInfo}></FADShop> 

          {/* hiển thị thông tin sản phẩm */}
          <ShowProduct products={homeInfo.FADInfo_eloquent}></ShowProduct> 
    </View>
        </ScrollView>
  );
  

}


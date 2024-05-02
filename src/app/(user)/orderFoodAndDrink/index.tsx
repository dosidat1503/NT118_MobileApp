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
 
export default function TabOneScreen() {   
  return (  
    <ScrollView>  
      <View>
          {/* hiển thị slide show hình ảnh FAD */}
          <SlideHeaderOrderFAD products={products}></SlideHeaderOrderFAD> 

          {/* input search bạn muốn ăn gì */} 
          <SearchFAD></SearchFAD>

          {/* hiển thị thông tin của shop */}
          <FADShop products={products}></FADShop> 

          {/* hiển thị thông tin sản phẩm */}
          <ShowProduct products={products}></ShowProduct> 
      </View>
    </ScrollView>
  );
  

}


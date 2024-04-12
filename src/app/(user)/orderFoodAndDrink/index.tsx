import { FlatList, StyleSheet, View, Text, Image, TextInput, ScrollView  } from 'react-native'; 
import products from '@assets/data/products';  
import { FontAwesome5 } from '@expo/vector-icons';
import SlideHeaderOrderFAD from '@/components/orderFAD/SlideHeaderOrderFAD';
import { useCartContext } from '@/providers.tsx/CartProvider';
import SearchFAD from '@/components/orderFAD/SearchFAD';
import FADCategory from '@/components/orderFAD/FADCategory';
import ShowProduct from '@/components/orderFAD/ShowProduct';
 
export default function TabOneScreen() {   
  return (  
    <ScrollView>
      <View>
          {/* hiển thị slide show hình ảnh FAD */}
          <SlideHeaderOrderFAD products={products}></SlideHeaderOrderFAD> 

          {/* input search bạn muốn ăn gì */} 
          <SearchFAD></SearchFAD>

          {/* hiển thị thông tin danh mục (category) FAD */}
          <FADCategory products={products}></FADCategory> 

          {/* hiển thị thông tin sản phẩm */}
          <ShowProduct products={products}></ShowProduct> 
      </View>
    </ScrollView>
  );
  

}


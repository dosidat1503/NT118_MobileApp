import { FlatList, StyleSheet, View, Text, ScrollView } from 'react-native';
import ProductListItem from '@components/ProductListItem'; 
import products from '@assets/data/products';
import { Product } from '@/types';
import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider';

export default function TabOneScreen() { 
  const renderItemProduct = ({item}) =>  <ProductListItem product={item}></ProductListItem>
  
  return (  
    <ScrollView>
      <View>Trang hẹn hò</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ 
});

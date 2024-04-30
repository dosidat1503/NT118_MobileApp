import { FlatList, StyleSheet, View, Text } from 'react-native';
import ProductListItem from '@/components/PostList'; 
import products from '@assets/data/products';
import { Product } from '@/types';
import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider';

export default function TabOneScreen() {  
  return (  
    <FlatList
      data={products}
      renderItem={renderItemProduct}
      numColumns={2}
      contentContainerStyle={{gap: 10}}
      columnWrapperStyle={{gap: 10}}
    >
    </FlatList> 
  );
}

const styles = StyleSheet.create({ 
});

import { FlatList, StyleSheet, View, Text } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import products from '@assets/data/products';
import { Product } from '@/types';
import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider';
import Avatar from '@/components/Avatar';

export default function TabOneScreen() {
  const renderItemProduct = ({ item }) => <ProductListItem product={item}></ProductListItem>

  return (
    <View>
      <Avatar />
      <FlatList
        data={products}
        renderItem={renderItemProduct}
        numColumns={1}
      // contentContainerStyle={{ gap: 10 }}
      // columnWrapperStyle={{ gap: 10 }}
      >
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
});

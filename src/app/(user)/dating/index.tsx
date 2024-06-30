import { FlatList, StyleSheet, View, Text, ScrollView } from 'react-native';
import ProductListItem from '@/components/PostList'; 
import products from '@assets/data/products';
import { Product } from '@/types';
import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider';
import React from 'react';

export default function TabOneScreen() {  
  return (  
    <ScrollView>
      <View>
        <Text>
          Trang hẹn hò
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ 
});

import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useContext } from 'react';
import { useCartContext } from '@/providers.tsx/CartProvider';
import { FlatList } from 'react-native-gesture-handler';
import CartEveryItem from '@/components/CartEveryItem';
import Button from '@/components/Button';import { Stack } from 'expo-router';
 ;

export default function CartScreen() {
 
  const { items, total } = useCartContext();
  return (
    <View>
      <Stack.Screen
        options={{
          title: "Bộ lọc"
        }}
      ></Stack.Screen>
      <FlatList
        data={items}
        renderItem={({item}) => <CartEveryItem cartItem={item}></CartEveryItem>}
        contentContainerStyle={{padding: 10, gap: 10}}
      >
      </FlatList>
      
      <Text>${total}</Text>
      
      <Button 
        text='Checkout' 
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

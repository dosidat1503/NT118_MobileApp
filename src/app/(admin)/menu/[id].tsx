import { FlatList, StyleSheet, View, Text, Image, Pressable } from 'react-native';
import ProductListItem from '@/components/PostList'; 
import products from '@assets/data/products';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { defaultPrizzaImage } from '@/components/PostList';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider';
import { PizzaSize } from '@/types';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

export default function DetailProduct() { 
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { items, addItem } = useCartContext();
  const router = useRouter();

  const product = products.find((item) => item.id.toString() === id)
  const addToCart = () => {
    if(!product) {
      return
    }
    addItem(product, selectedSize)
    router.push('/cart');
  }
  return ( 
    <View  style={styles.container}> 
        <Stack.Screen 
          options={{
            title: product?.name,
            headerRight: () => (
              <Link href="/cart" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
          ),
          }}
        />  
        <Image
          source={{uri: product?.image || defaultPrizzaImage}}
          style={styles.image_product}
        ></Image> 
        <Text style={styles.price}>${product?.price}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 10
  },
  size: {
    fontSize: 30,
    color: 'black',
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    textAlign: 'center'
  },
  image_product: {
    width: '100%',
    aspectRatio: 1,
  },
  containerSize: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  price: {
    fontSize: 18, 
    fontWeight: 'bold'
  }
});

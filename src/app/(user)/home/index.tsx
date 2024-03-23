import { FlatList, StyleSheet, View, Text, Image, TextInput, Button, ScrollView } from 'react-native';
import ProductListItem from '@components/ProductListItem'; 
import products from '@assets/data/products';
import { Product } from '@/types';
// import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider'; 
import { defaultPrizzaImage } from '@components/ProductListItem';
import FontAwesome from '@expo/vector-icons/FontAwesome'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react'; 
// import * as ImagePicker from 'expo-image-picker'
import ImagePicker from 'react-native-image-crop-picker';

export default function TabOneScreen() { 
  const renderItemProduct = ({item}) =>  <ProductListItem product={item}></ProductListItem>
  const [expandInputPostInfo, setExpandInputPostInfo] = useState(false)
  const toogleExpand = () => {
    setExpandInputPostInfo(!expandInputPostInfo)
  }
  const [image, setImage] = useState<string | null>(null)
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.openPicker({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (  
    <ScrollView>
    <View>
      <View style={ [styles.createPost, expandInputPostInfo && styles.expandInputPostInfoContainer]}> 
        <Image
          style={ styles.image }
          source={{ uri: defaultPrizzaImage}} 
        ></Image> 
        <View style={styles.createPostCenterContainer}>  
          <TextInput 
            placeholder='Bạn đang nghĩ gì?'
            style={[styles.whatAreYouThinking, expandInputPostInfo && styles.expandInputPostInfo]} 
            onBlur={toogleExpand}
            onFocus={toogleExpand}
            multiline={true}
          ></TextInput> 
          <ScrollView style={styles.scrollViewForPreviewImage}>
            <Image 
              source={{ uri: image || defaultPrizzaImage}}
              style={styles.imagePreview}
            ></Image> 
          </ScrollView>
        </View>
        <FontAwesome5 name='images' size={30} style={styles.choosePostImage} onPress={pickImage}></FontAwesome5>  
      </View> 
        {/* <Button>
        </Button> */}
      <FlatList
        data={products}
        renderItem={renderItemProduct}
        numColumns={1}
        // contentContainerStyle={{gap: 10}}
        // columnWrapperStyle={{gap: 10}}
      >
      </FlatList> 
    </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({ 
  image: {
    maxWidth: 40,
    height: 40,
    aspectRatio: 1,
    borderRadius: 20
  },
  whatAreYouThinking: {
    width: '95%',
    // height: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    borderColor: '#89CFF0',
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  createPost: { 
    flexDirection: 'row',
    width: '100%',
    // height: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  choosePostImage: {
    // width: '100%',
    // height: 100
    color: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
    marginVertical: 5
  },
  expandInputPostInfo: {
    height: 180,
    marginBottom: 20,
    paddingBottom: 20
  },
  expandInputPostInfoContainer: {
    height: 200,
  },
  imagePreview: {
    width: '95%',
    height: 140 ,
  },
  createPostCenterContainer: {
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewForPreviewImage: {
    height: 200,
    width: '100%',
    // alignItems: "center"
  },

});

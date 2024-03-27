import { FlatList, StyleSheet, View, Text, Image, TextInput, Button, ScrollView, Pressable, SectionList} from 'react-native';
import { Stack, Link } from 'expo-router';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker'; 
// import { AddPostNew } from '@/components/AddPostImage';
// import Carousel from 'react-native-snap-carousel';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';
import { filters } from './filter';

type renderItemProductProp = {
  item: any,
  segment?: any,
}

export default function TabOneScreen() { 
  const renderItemProduct = ({item}: renderItemProductProp) =>  <ProductListItem product={item}></ProductListItem>
  const [expandInputPostInfo, setExpandInputPostInfo] = useState(false)
  const [topicSelectedToPost, setTopicSelectedToPost] = useState("")
  
  const dataToSelectTopic = [
    {key:'1', value:'Chọn chủ đề', disabled:true},
    // {key:'2', value: filters[1].list[0].name},
    // {key:'3', value:'Cameras'},
    // {key:'4', value:'Computers', disabled:true},
    // {key:'5', value:'Vegetables'},
    // {key:'6', value:'Diary Products'},
    // {key:'7', value:'Drinks'},
  ]
  const importDataFromFilters = () => {
    
    filters[1].list.forEach((item, index) => {
        console.log(index, 'ok')
        return(
          dataToSelectTopic.push({
            key: `${index + 2}`,
            value: item.name
          })
        )
      }
    )
  }

  const toogleExpand = () => {
    setExpandInputPostInfo(!expandInputPostInfo)
  }
  const [image, setImage] = useState<object | null>(null)
  const listImage = [
    {
      path: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/362676453_1451519459020293_1570629234986068265_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE3_FTlymtML-F00eW_urEfdh2kYoB1fo12HaRigHV-jSqmOhj9Mw3Ovv8KLbvLhFwvDGbNssoAUWNdKjsaAJ_T&_nc_ohc=AhVsSSJg3a4AX85eiUg&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfC4vvM2qrnqrwZeg2Cv2h4XdJU45sg0LF_qj6iiNETfTA&oe=66042E7D'
    },
    {
      path: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/362676453_1451519459020293_1570629234986068265_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE3_FTlymtML-F00eW_urEfdh2kYoB1fo12HaRigHV-jSqmOhj9Mw3Ovv8KLbvLhFwvDGbNssoAUWNdKjsaAJ_T&_nc_ohc=AhVsSSJg3a4AX85eiUg&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfC4vvM2qrnqrwZeg2Cv2h4XdJU45sg0LF_qj6iiNETfTA&oe=66042E7D'
    },
    {
      path: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/362676453_1451519459020293_1570629234986068265_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE3_FTlymtML-F00eW_urEfdh2kYoB1fo12HaRigHV-jSqmOhj9Mw3Ovv8KLbvLhFwvDGbNssoAUWNdKjsaAJ_T&_nc_ohc=AhVsSSJg3a4AX85eiUg&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfC4vvM2qrnqrwZeg2Cv2h4XdJU45sg0LF_qj6iiNETfTA&oe=66042E7D'
    } 
  ]
  const pickImage = async () => {  
    console.log('ok123')
    // ImagePicker.openPicker({
    //   multiple: true,
    //   maxFiles: 10,
    //   mediaType: 'photo'
    // }).then(images => {
    //   images.forEach((image) => {
    //     console.log(image)
    //   });
    // }).catch(error => {
    //   alert(JSON.stringify(error));
    // });
    // for(let i = 0; i < 10; i++){
      const result = await launchImageLibrary({mediaType: 'photo'})
    // }
    // console.log(result, 'ok')
  }
  const renderItem = ({image, index}) => { 
    return (
      <View key={index}>
          <Image
              source={{uri: image.path}}
          ></Image>
      </View>
    )
  }  
  return (  
    <ScrollView> 
      <View> 
        <View style={ [styles.createPost, expandInputPostInfo && styles.expandInputPostInfoContainer]}> 
          <Image
            style={ styles.image }
            source={{ uri: defaultPrizzaImage}} 
          ></Image> 
          <View style={styles.createPostCenterContainer}>  
            {importDataFromFilters()}
            <View style={styles.selectTopicToPost}>
              <SelectList
                setSelected={setTopicSelectedToPost}
                data={dataToSelectTopic}
                placeholder='Chọn chủ đề'
                defaultOption={dataToSelectTopic[0]}
                boxStyles={{ 
                  paddingVertical: 2,
                  paddingHorizontal: 8,
                  borderColor: "#89CFF0",
                  marginBottom: 5, 
                }}
                dropdownItemStyles={{
                  paddingVertical: 2
                }}
                dropdownStyles={{
                  paddingTop: 0,
                  marginTop: 2, 
                }} 
              ></SelectList>
            </View>
            <TextInput 
              placeholder='Bạn đang nghĩ gì?'
              style={[styles.whatAreYouThinking, expandInputPostInfo && styles.expandInputPostInfo]} 
              onBlur={toogleExpand}
              onFocus={toogleExpand}
              multiline={true}
            ></TextInput> 
            <ScrollView style={styles.scrollViewForPreviewImage}>
              <View style={styles.scrollViewForPreviewImageCustomize}>
                <Image 
                  source={{ uri: image || defaultPrizzaImage}}
                  style={styles.imagePreview}
                ></Image> 
              </View>
              <View style={styles.scrollViewForPreviewImageCustomize}>
                <Image 
                  source={{ uri: image || defaultPrizzaImage}}
                  style={styles.imagePreview}
                ></Image> 
              </View>
              {/* <AddPostNew
                newImages={listImage} 
              ></AddPostNew> */}
              {/* <Carousel
                  data={listImage}
                  renderItem={renderItem}
                  onSnapToItem={(index) => console.log(index)}
                  sliderWidth={400}
                  itemWidth={400}
                  vertical={false}
              ></Carousel> */} 
              <FlatList
                data={listImage}
                renderItem={({item}) => {
                  console.log(item.path, 'ok')
                  return(
                    <View style={styles.scrollViewForPreviewImageCustomize}>
                      <Image 
                        source={{ uri: item.path || defaultPrizzaImage}}
                        style={styles.imagePreview}
                      ></Image> 
                    </View>
                  )
                }
                } 
                // snapToAlignment='center'
                // showsHorizontalScrollIndicator={false}
                horizontal
              ></FlatList>
            </ScrollView>
          </View>
          <View>
            <FontAwesome5 
              name='images' 
              size={30} 
              style={styles.choosePostImage} 
              onPress={pickImage}
            ></FontAwesome5>  
            <FontAwesome 
              name='paper-plane' 
              size={30} 
              style={styles.choosePostImage} 
              // onPress={pickImage}
            ></FontAwesome>  
          </View>
        </View>  
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
    marginVertical: 5,
  },
  choosePostImage: {
    // width: '100%',
    // height: '10%',
    color: 'green',
    // flexDirection: 'row',
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // marginHorizontal: 10,
    marginVertical: 5,
    
  },
  expandInputPostInfo: {
    height: 120,
    // marginBottom: 20,
    // paddingBottom: 20
  },
  expandInputPostInfoContainer: {
    // height: 200, 
  },
  imagePreview: {
    width: '95%',
    height: 200,
    borderRadius: 10,
    marginTop: 5
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
    marginTop: 5,
    borderRadius: 20
  },
  scrollViewForPreviewImageCustomize: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selectTopicToPost: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: '3%'
  }
});

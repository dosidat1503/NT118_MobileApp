import { FlatList, StyleSheet, View, Text, Image, TextInput, Button,  Pressable, SectionList, Linking } from 'react-native';
import { Stack, Link } from 'expo-router';
import ProductListItem from '@/components/PostList'; 
import products from '@assets/data/products';
import { Product } from '@/types';
// import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider'; 
import PostList, { defaultPrizzaImage } from '@/components/PostList';
import FontAwesome from '@expo/vector-icons/FontAwesome'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';  
// import { AddPostNew } from '@/components/AddPostImage';
// import Carousel from 'react-native-snap-carousel';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';
import Filter, { filters } from './filter';  
import { useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { renderItemPostProp } from '@/types';
import PostAtHome from './PostAtHome';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';
import CollapsibleFilter from './CollapsibleFilter';
import SearchPost from './SearchPost';

LogBox.ignoreLogs(['Warning: ...']);

// type renderItemPostProp = {
//   item: any,
//   segment?: any,
// }


export default function TabOneScreen() {  

  

  const { heightScreen, widthScreen, mainColor, baseURL, setUserID, RD } = useCartContext();

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
      width: '96%',
      // height: 50,
      paddingVertical: heightScreen * 0.008,
      paddingHorizontal: widthScreen * 0.02,
      backgroundColor: 'white',
      justifyContent: 'space-around',
      marginVertical: 5,
      borderWidth: 1,
      marginHorizontal: widthScreen * 0.02,
      borderRadius: RD * 0.00002,
      borderColor: 'rgba(0,0,0,0.1)',
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
    },
    filterIcon: {
      width: RD * 0.00006,
      height: RD * 0.00006,
      color: 'green', 
    },
    collapseBarText: {
      fontWeight: "bold",
      fontSize: widthScreen * 0.04, 
      color: mainColor,
      marginLeft: widthScreen * 0.02,

    },
    collapseBar: {
      flexDirection: "row",
      alignItems: "center",
      // alignSelf: "center"
      width: widthScreen * 0.23,
      borderColor: 'green',
      borderWidth: 1,
      marginLeft: widthScreen * 0.05,
      borderRadius: RD * 0.00002,
      paddingVertical: heightScreen * 0.006,
      marginTop: heightScreen * 0.01,
    },
  });

  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
 
  const [expandInputPostInfo, setExpandInputPostInfo] = useState(false)
  const [topicSelectedToPost, setTopicSelectedToPost] = useState("")

  const [isShowFilter, setIsShowFilter] = useState(false);
  
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
        // console.log(index, 'ok')
        return(
          dataToSelectTopic.push({
            key: `${index + 2}`,
            value: item.name,
            disabled: false
          })
        )
      }
    )
  }

  const toogleExpand = () => {
    navigation.navigate('AddPost' as never)
    // setExpandInputPostInfo(!expandInputPostInfo)
  }
  
  const toogleCollapseFilter = () => {
    setIsShowFilter(!isShowFilter)
  }
  
  importDataFromFilters(); // Call the function here

  return (   
      <View style={{backgroundColor: "white"}}>  
        {
          image 
          && <FlatList
                data={imageList}
                renderItem={({item}) => (<Image source={{ uri: item }} style={styles.image} />)}
            ></FlatList>
        }
        <View style={ [styles.createPost, expandInputPostInfo && styles.expandInputPostInfoContainer]}> 
          <Image
            style={ styles.image }
            source={require('@assets/images/avatar.jpg')}
          ></Image> 
          <View style={styles.createPostCenterContainer}>   
            <View style={styles.selectTopicToPost} >
               
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
          </View>
          <View>
            <FontAwesome5 
              name='images' 
              size={30} 
              style={styles.choosePostImage} 
              onPress={toogleExpand}
            ></FontAwesome5>  
            <FontAwesome 
              name='paper-plane' 
              size={30} 
              style={styles.choosePostImage} 
              onPress={toogleExpand}
            ></FontAwesome>  
          </View>
        </View>   
        <SearchPost></SearchPost>
      </View>  
  );
}



import { FlatList, StyleSheet, View, Text, Image, TextInput, Button, ScrollView, Pressable, SectionList, Linking } from 'react-native';
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
import { filters } from './filter';  
import { useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Warning: ...']);

type renderItemPostProp = {
  item: any,
  segment?: any,
}

interface itemInfoPost {
  LIKE_QUANTITY: number;
  CONTENT: string;
  POST_ID: number;
  NAME: string;
  IMG_URL: string;
  USER_ID: number; 
  TIME: string; 
  id: any; 
  body: any; 
}

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
    }
  });

  const navigation = useNavigation();
  const [image, setImage] = useState('');
  const [imageList, setImageList] = useState<string[]>([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
 
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

  const [infoPost, setInfoPost] = useState([{
    user: {
      ID:  0,
      avatarImage: '',
      Name: '',
    },
    post: {
      ID: 0,
      content: '',
      time: '',
      image: '',
      likeQuantity: 0,
    },
    interact: {
      isLiked: false,
      isSaved: false,
    }
  }])

  useEffect(() => { 
    const getUserID = async () => {
      const userID = await AsyncStorage.getItem("userID");
      return userID; 
    }

    setUserID(1)

    const getInforPost = () => {
      // axios.get(baseURL + '/getInfoPost')
      axios.get(baseURL + '/getInfoPost')
      .then((response) => {
        console.log(response.data, "getInforPost")
        const updateInfoPost = [...infoPost]
        console.log(
          response.data.infoPostImage, 
          'response.data.infoPostImage1', 
          response.data.infoUser[0].NAME,
          response.data.infoPostImage.filter((item: any) => {
            if(1 === item.POST_ID) return item.URL
          })
        )
        response.data.infoPost.map((item: itemInfoPost, index: any) => {
          const imageUrls: any = []; // Khởi tạo một mảng để chứa các URL
          response.data.infoPostImage.forEach((itemImage: any) => {
            if (itemImage.POST_ID === item.POST_ID) {
              imageUrls.push(itemImage.URL); // Thêm URL vào mảng nếu POST_ID khớp
            }
          });
          updateInfoPost.push({
            user: {
              ID:  item.USER_ID,
              avatarImage: response.data.infoAvatarImage[0].URL,
              Name: response.data.infoUser[0].NAME,
            },
            post: {
              ID: item.POST_ID,
              time: item.TIME,
              content: item.CONTENT,
              image: imageUrls,
              likeQuantity: response.data.infoPost[index].LIKE_QUANTITY,
            },
            interact: {
              isLiked: false,
              isSaved: false,
            }
          })
        })

        setInfoPost(updateInfoPost) 
        
        console.log(updateInfoPost[2].post.image, "setInfoPo1st")
      })
    }

    getInforPost()
 
  }, [])

  useEffect(() => {
    console.log(infoPost, 'infoPost')
  }, [infoPost])

  const importDataFromFilters = () => { 
    filters[1].list.forEach((item, index) => {
        console.log(index, 'ok')
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
    navigation.navigate('AddPost')
    // setExpandInputPostInfo(!expandInputPostInfo)
  }
  
 

  // useEffect(() => {
  //   const pickImageAfterPermission = async () => {
  //       // No permissions request is necessary for launching the image library
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All, 
  //       allowsMultipleSelection: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //       orderedSelection: true,
  //     });

  //     console.log(result, 'result');

  //     if (!result.canceled) {
  //       setImage(result.assets[0].uri as string); // Update the type of the value passed to setImage
  //     }
  //   }
  //   pickImageAfterPermission()
  // }, [hasGalleryPermission])

  const renderItemPost = ({item}: renderItemPostProp) => 
    (
      <PostList 
        infoPostItem = {item} 
        infoPostList = {infoPost} 
        setInfoPost = {setInfoPost} 
        segments={[]}
      ></PostList>
    )
  
  importDataFromFilters(); // Call the function here

  return (  
    // <ScrollView>  
      
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
        <FlatList
          data={infoPost}
          renderItem={renderItemPost}
          numColumns={1}
          contentContainerStyle={{gap: 10}}
          // columnWrapperStyle={{gap: 10}}
        />  
      </View> 
    // {/* </ScrollView> */}
  );
}



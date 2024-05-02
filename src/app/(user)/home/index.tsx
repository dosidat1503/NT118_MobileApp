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
// import * as ImagePicker from 'expo-image-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker'; 
// import { AddPostNew } from '@/components/AddPostImage';
// import Carousel from 'react-native-snap-carousel';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';
import { filters } from './filter'; 
import Filter from './filter';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const { heightScreen, widthScreen, mainColor, baseURL, setUserID } = useCartContext();
  const navigation = useNavigation();
 
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
      axios.get(baseURL + '/getInfoPost')
      .then((response) => {
        console.log(response.data, "getInforPost")
        const updateInfoPost = [...infoPost]
        response.data.infoPost.map((item: itemInfoPost, index: any) => {
          updateInfoPost.push({
            user: {
              ID:  item.USER_ID,
              avatarImage: response.data.infoAvatarImage[index].URL,
              Name: response.data.infoUser[index].NAME,
            },
            post: {
              ID: item.POST_ID,
              time: item.TIME,
              content: item.CONTENT,
              image: response.data.infoPostImage[index].URL,
              likeQuantity: response.data.infoPost[index].LIKE_QUANTITY,
            },
            interact: {
              isLiked: false,
              isSaved: false,
            }
          })
        })

        setInfoPost(updateInfoPost) 
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
 
  const pickImage = async () => {  
    console.log('ok123')
    navigation.navigate('AddPost')
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

  const renderItemPost = ({item}: renderItemPostProp) => (<PostList infoPostItem = {item} infoPostList = {infoPost} setInfoPost = {setInfoPost} segments={[]}></PostList>)
  
  return (  
    <ScrollView>  
      
      <View> 
        <View style={ [styles.createPost, expandInputPostInfo && styles.expandInputPostInfoContainer]}> 
          <Image
            style={ styles.image }
            source={require('@assets/images/avatar.jpg')}
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
              onPress={pickImage}
            ></FontAwesome>  
          </View>
        </View>  
        <FlatList
          data={infoPost}
          renderItem={renderItemPost}
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

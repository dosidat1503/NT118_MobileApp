import { FlatList, StyleSheet, View, Text, Image, TextInput, Button,  Pressable, SectionList, Linking } from 'react-native';
 
import { useCartContext } from '@/providers.tsx/CartProvider';  
import FontAwesome from '@expo/vector-icons/FontAwesome'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';   
import { SelectList } from 'react-native-dropdown-select-list';
import Filter, { filters } from './filter';  
import { useNavigation } from 'expo-router'; 
import { LogBox } from 'react-native';  
import React from 'react'; 
import SearchPost from './SearchPost';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs(['Warning: ...']);

// type renderItemPostProp = {
//   item: any,
//   segment?: any,
// }


const  Home = React.memo( () => {   
  const { heightScreen, widthScreen, mainColor, baseURL, RD, returnHome } = useCartContext();

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
  
  const [expandInputPostInfo, setExpandInputPostInfo] = useState(false)
  const [topicSelectedToPost, setTopicSelectedToPost] = useState("")
  
  
  const dataToSelectTopic = [
    {key:'1', value:'Chọn chủ đề', disabled:true}, 
  ]

  const [nameAndAVTURL, setNameAndAVTURL] = useState({name: '', url: ''})
  const getNameAndAVTURL = useCallback(async () => {
    const NameAndAVTURL = await AsyncStorage.getItem('NameAndAVTURL'); 
    if (NameAndAVTURL) {
      const JSONNameAndAVTURL = JSON.parse(NameAndAVTURL);
      setNameAndAVTURL({
        name: JSONNameAndAVTURL.NAME,
        url: JSONNameAndAVTURL.AVT_URL,
      });
      console.log(JSONNameAndAVTURL, 'JSONNameAndAVTURL');
    }
  }, []);
  useEffect(() => {
    getNameAndAVTURL() 
  }, [])
   
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
  }
   
  
  importDataFromFilters(); // Call the function here

  const renderAvatar = useCallback(() => {
    return ( 
        nameAndAVTURL.url && 
        <Image
          style={ styles.image }
          source={{ uri: nameAndAVTURL.url || "" }}
        ></Image>  
    )
  }, [nameAndAVTURL.url])

  const searchPost = useCallback(() => {
    return ( 
      <SearchPost 
        // backFromAddPost={backFromAddPost} 
        // setBackFromAddPost={setBackFromAddPost}
        isHome={true}
      ></SearchPost>
    )
  }, [])

  return (   
      <View style={{backgroundColor: "white"}}> 
        <View style={ [styles.createPost, expandInputPostInfo && styles.expandInputPostInfoContainer]}> 
          {
            renderAvatar()
          }
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
        {
          searchPost()
        }
      </View>  
  );
} )

export default Home;
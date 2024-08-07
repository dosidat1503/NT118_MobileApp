 
import { Stack, useNavigation } from "expo-router"
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, TextInput, FlatList, SafeAreaView } from "react-native"
  
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { filters } from "./filter";
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";  
import LoadingDots from "react-native-loading-dots";
import * as ImagePicker from 'expo-image-picker'; 
import { uploadToFirebase } from '../../../firebase/index'; 
import React, { useRef }  from "react";
import Response from "@/app/(user)/Response";
import { useRoute } from "@react-navigation/native";
import Loading from "@/components/Loading";

type dataToSelectTopic = {
    key: string,
    value: string,
    disabled: boolean 
}
 
export default function AddPost() {   

    const {widthScreen, heightScreen, baseURL  } = useCartContext();
    const widthAvatar = widthScreen * 0.12;
    const endContainer = widthScreen * 0.15;
    const widthCenterContainer = widthScreen - widthAvatar - endContainer;
    const [isSavingPost, setIsSavingPost] = useState(false);
    const [image, setImage] = useState('');
    const [response, setResponse] = useState('');
    const [imageList, setImageList] = useState<string[]>([]);
    const inputRef = useRef<TextInput>(null); 
    const [showWarning, setShowWarning] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const screen = "ReturnHome"

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap', 
            height: heightScreen,
        },
        displayNone: {
            display: "none"
        },
        loadingScreen: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        dotsWrapper: {
            width: 100,
        },
        createPost: { 
            flexDirection: 'row',
            width: widthScreen,
            // height: 50,
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: 'white',
            justifyContent: 'space-around',
            marginVertical: 5,
        },
        expandInputPostInfo: {
            // height: 120,
            // marginBottom: 20,
            // paddingBottom: 20
        },
        expandInputPostInfoContainer: {
          // height: 200, 
        },
        image: {
            width: widthAvatar,
            height: widthAvatar,
            aspectRatio: 1,
            borderRadius: 20
        },
        createPostCenterContainer: {
            width: widthCenterContainer,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        selectTopicToPost: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            paddingLeft: '3%'
        },
        whatAreYouThinking: {
            width: '95%',
            height: heightScreen * 0.2,
            backgroundColor: 'white',
            borderRadius: widthScreen * 0.03,
            padding: 10,
            marginHorizontal: 5,
            borderColor: '#89CFF0',
            borderCurve: 'continuous',
            borderWidth: 1,
            fontSize: widthScreen * heightScreen * 0.00005
        },
        scrollViewForPreviewImage: {
          height: heightScreen * 0.42,
          width: widthCenterContainer,
          // alignItems: "center"
          marginTop: 5,
          borderRadius: 20
        },
        scrollViewForPreviewImageCustomize: {
          flexDirection: 'row',
          justifyContent: 'center'
        },
        imagePreview: {
          width: widthCenterContainer,
          height: heightScreen * 0.4,
          borderRadius: 10,
          marginTop: 5,  
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
    })
    const navigation = useNavigation();
    useEffect(() => {
        const getUserID = async () => {
          const userID = await AsyncStorage.getItem('userID');
          if (userID) {
            setInfoAddPost({
                ...infoAddPost,
                userID: parseInt(userID) 
            });
          }
        }
        getUserID();
        
        if (inputRef.current) {
            inputRef.current.focus();
        }
        let arr_dataToSelectTopic = filters[1].list.map((item, index) => {
            return(
                {
                    key: `${index + 2}`,
                    value: item.name,
                    disabled: false
                }
            )
        })
        setDataToSelectTopic(arr_dataToSelectTopic)
    }, [])
 
    const [userID, setUserID] = useState(1)
    const [nameAndAVTURL, setNameAndAVTURL] = useState({name: '', url: ''})
    const getNameAndAVTURL = async () => {
        setIsLoading(true)
        const NameAndAVTURL = await AsyncStorage.getItem('NameAndAVTURL'); 
        const userID = await AsyncStorage.getItem('userID'); 
        if (NameAndAVTURL) {
            const JSONNameAndAVTURL = JSON.parse(NameAndAVTURL )
            const JSONuserID = JSON.parse(userID || "1")
            setNameAndAVTURL({
                name: JSONNameAndAVTURL.NAME,
                url: JSONNameAndAVTURL.AVT_URL
            })
            setUserID(JSONuserID)
            console.log(JSONNameAndAVTURL, 'JSONNameAndAV22TURL', JSONuserID, 'JSONuserID');
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getNameAndAVTURL() 
    }, [])
    console.log( 'addposst')
    
    const [expandInputPostInfo, setExpandInputPostInfo] = useState(false)
    const [topicSelectedToPost, setTopicSelectedToPost] = useState("")   
    const [dataToSelectTopic, setDataToSelectTopic] = useState<dataToSelectTopic[]>([])
    const [infoAddPost, setInfoAddPost] = useState({
        topic: topicSelectedToPost,
        content: '',
        imageList: [],
        userID: userID, 
    })
    // const route = useRoute();
    // console.log(route.params, 'route.params');
    // const { setBackFromAddPost } = route.params as any;
    
    const toogleExpand = () => {
        navigation.navigate('AddPost' as never)
        // setExpandInputPostInfo(!expandInputPostInfo)
    } 
    const pickImage = async () => {

        // let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // setHasGalleryPermission(permissionResult.status === 'granted'); 

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, 
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
            orderedSelection: true,
        });

        console.log(result, 'result', imageList, 'imageList');

        if (!result.canceled) {
            // let localUri = result.assets[0].uri as string;
            // let arrImage = [...image]
            // let newArrImage = arrImage.push(result)

            setImage(result.assets[0].uri as string); // Update the type of the value passed to setImage
            setImageList( result.assets.map((item: any) => item.uri) )
        }
    } 
 
    
    const uploadMultipleImagesToFirebaseStorage = async () => { 
        // sau khi upload hình ảnh thì sẽ sử dụng useEffect để gửi request lên server
        let listLink: never[] = [] 
        imageList.map(async (imageUri, index) => { 
            const fileName = imageUri.split("/").pop();
            const uploadResp = await uploadToFirebase(
                                                        imageUri, 
                                                        fileName, 
                                                        (progress) => { 
                                                            console.log(progress, 'progress') 
                                                        },
                                                        listLink
                                                    )
            console.log(uploadResp, 'uploadResp')
            console.log(listLink, 'listLink', listLink.length === imageList.length)
            if(listLink.length === imageList.length) {
                setInfoAddPost({...infoAddPost, imageList: listLink})  
            }
        });   
    };

    const handleAddNewPost = () => {
        // Kiểm tra xem nội dung và chủ đề đã được nhập chưa
        if(infoAddPost.content === "" || infoAddPost.topic === "") {
            console.log(infoAddPost.content, infoAddPost.topic, 'test infoAddPost')
            setShowWarning(true)
            return
        }

        // Nếu đăng có ảnh thì sẽ vào hàm uploadMultipleImagesToFirebaseStorage 
        // để upload ảnh lên firebase và lấy link về, sau đó chạy vào useEffect để gửi request lên server lưu bài viết
        if(imageList.length > 0) {
            setIsSavingPost(true)  
            uploadMultipleImagesToFirebaseStorage()
        } else{
            setIsSavingPost(true)  
            axios.post( baseURL + '/addPost', infoAddPost) 
            .then((response) => {   
                console.log(response.data, 'success')
                setIsSavingPost(false)
                setResponse(response.data.status)
            })
            .catch((error) => {
                console.log(error)
                setIsSavingPost(false) 
            })
            console.log('infoAddPost22', infoAddPost) 
        }
        
    }

    useEffect(() => {  
        console.log(infoAddPost.imageList.length, 'infoAddPost.imageList.length')
        if(infoAddPost.imageList.length > 0){
            axios.post( baseURL + '/addPost', infoAddPost) 
            .then((response) => {   
                console.log(response.data.status, 'success22f', response.data.imageList)
                setIsSavingPost(false)
                setResponse(response.data.status)
            })
            .catch((error) => {
                console.log(error)
                setIsSavingPost(false) 
            })
        }
        console.log('infoAddPost22', infoAddPost.imageList.length)
    }, [infoAddPost.imageList.length > 0])
    
    const renderCarouselProduct = ({item, index}: {item: any, index: number}) => {
        console.log("renderCarouselProduct")
        return (
            <View 
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: widthCenterContainer * 0.94,
                    marginHorizontal: widthScreen * 0.02,   
                }}
            >
            <TouchableOpacity
                style={{
                    position: "absolute",
                    zIndex: 1,
                    top: heightScreen * 0.05,
                    right: widthScreen * 0.02, 
                }}
                onPress={() => {
                    let newImageList = imageList.filter((value, indexDelete) => index !== indexDelete)
                    setImageList(newImageList)
                }}
            >
                <FontAwesome5
                    name="window-close"
                    style={{
                        color: "white",
                        fontSize: widthScreen * 0.05,
                        fontWeight: "bold", 
                    }}
                ></FontAwesome5>
            </TouchableOpacity>
            {
                item &&  <Image
                  source={{ uri: item || ""}}
                  style={{
                    borderRadius: widthScreen * 0.03,
                    width: "100%",
                    height: heightScreen * 0.4,
                    aspectRatio: 1, 
                  }}
                ></Image> 
            }
          </View>
        )
    }

    return (
        isLoading 
        ? <Loading></Loading>
        : <SafeAreaView style = {{ backgroundColor: "white"}}> 
            <View>
                {
                    response === "" && <View style={ styles.container }  >
                    <View style={[
                        styles.createPost, 
                        expandInputPostInfo && styles.expandInputPostInfoContainer,
                        isSavingPost ? { display: "none"} : {}
                    ]}> 
                        {
                            nameAndAVTURL.url && <Image
                                style={ styles.image }
                                source={{ uri: nameAndAVTURL.url || "" }}
                            ></Image> 
                        }
                        <View style={styles.createPostCenterContainer}> 
                            <View style={{ 
                                flexDirection: "row", 
                                width: "100%",
                                paddingHorizontal: widthScreen * 0.04,
                                paddingVertical: heightScreen * 0.008,
                                paddingRight: widthScreen * 0.04,
                                // alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <View style={{position: "relative"}}>
                                    <Text style={{
                                        fontWeight: '700',
                                        fontSize: 16,
                                        // position: "fixed"
                                    }}>
                                        { nameAndAVTURL.name }
                                    </Text>
                                </View> 
                                <View> 
                                    <View style={styles.selectTopicToPost}>
                                        <SelectList
                                            setSelected={(selectedItem: any) => {setInfoAddPost({...infoAddPost, topic: selectedItem})}}
                                            data={dataToSelectTopic}
                                            placeholder='Chọn chủ đề'
                                            defaultOption={{key:'1', value:'Chọn chủ đề' }}
                                            boxStyles={{ 
                                                paddingVertical: heightScreen * 0.006,
                                                paddingHorizontal: widthScreen * 0.04,
                                                borderColor: "#89CFF0",
                                                marginBottom: heightScreen * 0.0005,  
                                            }}
                                            dropdownItemStyles={{
                                                paddingVertical:  heightScreen * 0.001, 
                                            }}
                                            dropdownStyles={{
                                                paddingTop: 0,
                                                marginTop: 2, 
                                            }} 
                                            search={false}
                                        ></SelectList>
                                    </View>
                                </View>
                            </View> 
                            <TextInput 
                                ref={inputRef}
                                placeholder='Bạn đang nghĩ gì?'
                                style={[styles.whatAreYouThinking, expandInputPostInfo && styles.expandInputPostInfo]} 
                                onBlur={toogleExpand}
                                onFocus={toogleExpand}  
                                multiline={true}
                                onChangeText={(text) => { setInfoAddPost({...infoAddPost, content: text}) }}
                                textAlignVertical="top"
                            ></TextInput> 
                            {
                                showWarning && <Text style={{color: 'red', fontSize: 12}}>Bạn cần nhập nội dung và chọn chủ đề trước khi đăng bài</Text>
                            }
                            <View style={styles.scrollViewForPreviewImage}> 
                                <FlatList
                                    data={imageList}
                                    renderItem={renderCarouselProduct}  
                                    showsHorizontalScrollIndicator
                                    bounces={false}
                                    pagingEnabled 
                                    horizontal
                                    style={styles.imagePreview} 
                                    decelerationRate="fast" 
                                ></FlatList>
                            </View>
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
                                onPress={handleAddNewPost}
                            ></FontAwesome>  
                        </View>
                    </View>  
                    <View style={[styles.loadingScreen, isSavingPost ? {} : styles.displayNone]}>
                        <View style={styles.dotsWrapper}>
                            <LoadingDots />
                        </View>
                    </View>
                    </View>  
                }
                { 
                    response === 'success' 
                    ? <Response
                        content="Bài viết của bạn đã được đăng thành công."
                        statusIcon="check-circle"
                        href2="/(user)"
                        buttonIcon2="eye"
                        buttonName2="Bài Viết"
                        buttonFunction2={() => {   
                            navigation.navigate('index' as never) 
                        }}
                    ></Response>
                    : <Response
                        content="Đã có lỗi xảy ra khi đăng bài. Hãy đăng lại bài viết."
                        statusIcon="times-circle"
                        href1="(user)"
                        buttonIcon1="plus-square"
                        buttonName1="Đăng lại bài viết"  
                        buttonFunction1={() => { 
                            setResponse('') 
                            setInfoAddPost(
                                {
                                    topic: "",
                                    content: '',
                                    imageList: [],
                                    userID: userID, 
                                }
                            )
                        }}
                    ></Response> 
                }
            </View> 
        </SafeAreaView>
    )
}

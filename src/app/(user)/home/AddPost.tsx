import index from "@/app";
import { Stack, useNavigation } from "expo-router"
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Platform, Modal, TextInput, ScrollView, FlatList, PermissionsAndroid, SafeAreaView } from "react-native"
// import { View } from "@/components/Themed"
// import DatePicker from 'react-native-modern-datepicker' 
import DateTimePicker from '@react-native-community/datetimepicker'
import { FindFilterAtHome } from "@/types";
import { defaultPrizzaImage } from "@/components/PostList";
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { filters } from './filter'; 
import CartProvider, { useCartContext } from "@/providers.tsx/CartProvider";
// import ImagePicker from "react-native-customized-image-picker";
import { launchImageLibrary } from "react-native-image-picker";
// import { CameraRoll } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
// import { ImagePickerIOS } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";  
import LoadingDots from "react-native-loading-dots";

type changeIntervalTimeProps = {
    item: Date,
}
type chooseFilterItemProps = {
    item: never,
    filterType: string,
} 
type renderFiltersListProps = {
    item: FindFilterAtHome
}
 
export default function AddPost() {   

    const {widthScreen, heightScreen} = useCartContext();
    const widthAvatar = widthScreen * 0.12;
    const endContainer = widthScreen * 0.15;
    const widthCenterContainer = widthScreen - widthAvatar - endContainer;
    const [isSavingPost, setIsSavingPost] = useState(false);

    const styles = StyleSheet.create({
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
            height: 120,
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
        },
        scrollViewForPreviewImage: {
          height: heightScreen * 0.42,
          width: '100%',
          // alignItems: "center"
          marginTop: 5,
          borderRadius: 20
        },
        scrollViewForPreviewImageCustomize: {
          flexDirection: 'row',
          justifyContent: 'center'
        },
        imagePreview: {
          width: '100%',
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
    }, [])
    
    const [expandInputPostInfo, setExpandInputPostInfo] = useState(false)
    const [topicSelectedToPost, setTopicSelectedToPost] = useState("") 
    const [image, setImage] = useState<object | null>(null)
    const listImage = [ 
      {
        path: defaultPrizzaImage
      },
      {
        path: defaultPrizzaImage
      } 
    ] 
    const dataToSelectTopic = [
        // {key:'1', value:'Chọn chủ đề', disabled:true},
        // {key:'2', value: filters[1].list[0].name},
        // {key:'3', value:'Cameras'},
        // {key:'4', value:'Computers', disabled:true},
        // {key:'5', value:'Vegetables'},
        // {key:'6', value:'Diary Products'},
        // {key:'7', value:'Drinks'},
    ]
    const [infoAddPost, setInfoAddPost] = useState({
        topic: topicSelectedToPost,
        content: '',
        imageID: "1_6_1702549349",
        userID: 5, 
    })
 
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
        // CameraRoll.getPhotos({
        //     first: 20,
        //     assetType: 'Photos',
        // })
        // .then(r => {
        //   this.setState({ photos: r.edges });
        // })
        // .catch((err) => {
        //    console.log(err)
        // });
        // let getImage = await ImagePickerIOS.openPicker({
        //   multiple: true,
        //   maxFiles: 10,
        //   mediaType: 'photo'
        // })
        // .then((images: any[]) => {
        //   images.forEach((image) => {
        //     console.log(image)
        // });



        // }).catch((error: any) => {
        //   alert(JSON.stringify(error));
        // });
        // for(let i = 0; i < 10; i++){ 
        // const result = await launchImageLibrary({
        //     mediaType: "photo"
        // });
        // }
        // console.log(result, 'ok')

        // try {
        //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //       console.log("Camera permission given");
        //       const result:any = await launchImageLibrary({mediaType:'photo'})
        //       setImg(result.assets[0].uri);
        //     } else {
        //       console.log("Camera permission denied");
        //     }
        //   } catch (err) {
        //     console.warn(err);
        //   }

        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    } 

    const handleAddPost = () => {
        console.log(infoAddPost, 'infoAddPost')
        setIsSavingPost(true)
        axios.post('http://localhost:8000/api/addPost', infoAddPost)
        .then((response) => {
            console.log(response.data)
            setIsSavingPost(false)
        })
        .catch((error) => {
            console.log(error)
            setIsSavingPost(false)
        })
    } 
    
    const renderCarouselProduct = ({item}: {item: any}) => {
        return (
          <View 
            // style={[styles.containerItemImage]}
          >
            <Image
              source={{ uri: item.path}}
              style={{
                width: widthCenterContainer,
                height: heightScreen * 0.4,
              }}
            ></Image> 
          </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={ styles.container }  >
                <View style={[
                    styles.createPost, 
                    expandInputPostInfo && styles.expandInputPostInfoContainer,
                    isSavingPost ? { display: "none"} : {}
                ]}> 
                    <Image
                        style={ styles.image }
                        source={require('@assets/images/avatar.jpg')}
                    ></Image> 
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
                                    Đỗ Sĩ Đạt
                                </Text>
                            </View> 
                            <View>
                                {importDataFromFilters()}
                                <View style={styles.selectTopicToPost}>
                                    <SelectList
                                        setSelected={() => {setInfoAddPost({...infoAddPost, topic: topicSelectedToPost})}}
                                        data={dataToSelectTopic}
                                        placeholder='Chọn chủ đề'
                                        defaultOption={{key:'1', value:'Chọn chủ đề', disabled:true}}
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
                            placeholder='Bạn đang nghĩ gì?'
                            style={[styles.whatAreYouThinking, expandInputPostInfo && styles.expandInputPostInfo]} 
                            onBlur={toogleExpand}
                            onFocus={toogleExpand}
                            multiline={true}
                            onChangeText={(text) => { setInfoAddPost({...infoAddPost, content: text}) }}
                        ></TextInput> 
                        <ScrollView style={styles.scrollViewForPreviewImage}> 
                            <FlatList
                                data={listImage}
                                renderItem={renderCarouselProduct}  
                                showsHorizontalScrollIndicator
                                bounces={false}
                                pagingEnabled 
                                horizontal
                                style={styles.imagePreview} 
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
                            onPress={handleAddPost}
                        ></FontAwesome>  
                    </View>
                </View>  
                <View style={[styles.loadingScreen, isSavingPost ? {} : styles.displayNone]}>
                    <View style={styles.dotsWrapper}>
                        <LoadingDots />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    sortBy: {
        width: '50%'
    },
    chooseTopic: {
        width: '50%',
        flexDirection: 'column',
        alignItems: "center"
    },
    topicIsSelected: {
        borderColor: 'green',
        borderWidth: 1,
    },
    topicIcon: {
        width: 20,
        height: 20,
    },
    chooseTopicItem: {
        flexDirection: 'row',
        paddingHorizontal: '6%',
        paddingVertical: 10,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#6495ED',
        width: '70%',
        marginVertical: 5,
        maxWidth: 300,
        elevation: 40, 

    },
    topicText: {
        fontWeight: 'bold',
        marginLeft: '10%',
        opacity: 0.7
    },
    titleChooseTopic: {
        fontWeight: 'bold',
        opacity: 0.5,
        marginTop: 20,
        marginBottom: 5,
        textAlign: "center"
    },
    sortByIcon: {
        color: '#6495ED',
        width: 20,
        height: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
 
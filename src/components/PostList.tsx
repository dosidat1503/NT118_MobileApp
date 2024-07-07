import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, FlatList, Dimensions, TextInput } from 'react-native';  
import { Link, useSegments } from 'expo-router'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { color } from 'react-native-elements/dist/helpers';
import React from 'react';
import { useCartContext } from '@/providers.tsx/CartProvider';
import axios from 'axios';
import Button from '@/app/(user)/orderFoodAndDrink/Button';
import Response from '@/app/(user)/Response';


export const defaultPrizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png'

type PostListProps = {
      infoPostItem: {
        user: {
            ID:  number,
            avatarImage: string,
            Name: string,
        },
        post: {
            time: string;
            ID: number,
            content: string,
            image: [],
            likeQuantity: number,
        },
        interact: {
            isLiked: boolean,
            isSaved: boolean,
        }
      },
      segments: [],
      setInfoPost: (infoPostItem: any) => void,
      infoPostList: any,
      isManagePost?: boolean,
}
type type = any

const PostList = ({infoPostItem, infoPostList, setInfoPost, isManagePost } : PostListProps) => {

  // const {widthScreen, heightScreen, userID, baseURL, RD} = useCartContext(); 
  const widthScreen = Dimensions.get("window").width
  const heightScreen = Dimensions.get("window").height
  const RD =  widthScreen * heightScreen  
  let userID = 1;
  const baseURL = "http://26.85.40.176:8000/api"

  const mainColor = "#89CFF0" 
  const widthCenterContainer = widthScreen;
  const segments = useSegments() 
  
  const styles = StyleSheet.create({
    
    imagePreview: {
      width: widthScreen,
      height: heightScreen * 0.4,
      borderRadius: 10,
      marginTop: 5,   
    },
    container: {
      backgroundColor: 'white',
      borderRadius: 10,
      flex: 1,
      marginHorizontal: widthScreen * 0.02,
      marginVertical: 5,
      overflow: 'hidden', 
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      paddingHorizontal: widthScreen * 0.02,
      paddingVertical: heightScreen * 0.002,
    },
    title: { 
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 10,
    }, 
    postContentImage: {
      maxWidth: '100%',
      maxHeight: 500,
      aspectRatio: 1,
    }, 
    createPost: { 
      flexDirection: 'row',
      width: '100%',
      height: 50,
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: 'white',
      justifyContent: 'flex-start' 
    },
    image_avatar: {
      maxWidth: '80%',
      maxHeight: '100%',
      aspectRatio: 1,
      borderRadius: 100, 
    },
    postHeaderCenter: {
      flexDirection: "column",
      justifyContent: 'flex-start',
      paddingLeft: widthScreen * 0.02,
      // borderWidth: 1
    },
    postHeaderLeft: {
      flexDirection: 'row',
      width: '50%',
      justifyContent: 'space-around'
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 10
    },
    postHeaderCenterName: {
      fontWeight: '700', 
      fontSize: RD * 0.00004, 
    },
    postHeaderCenterTime: {
      opacity: 0.7
    },
    postContent: {
      // height: 500, 
      // marginHorizontal: widthScreen * 0.02,
      overflow: 'hidden',
    },
    postContentText: {
      paddingHorizontal: 15,
      paddingVertical: 5, 
    },
    postContentContainImage: {
      // marginRight: widthScreen * 0.08,
    },
    postFooter: {
      paddingVertical: 10,
      paddingHorizontal: 15, 
      flexDirection: "row",
      alignItems: "center",
      // marginTop: 45,
    },
    postFooterIcon: {
      fontSize: 30
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


  });

  const [isEditing, setIsEditing] = useState(false)
  const [postContent, setPostContent] = useState(infoPostItem.post.content) 
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);

  console.log('PostList')
  const handleInteractPost = (type: type) => {
    console.log("handleInteractPost", type)
    let postID = 0;
    let likeQuantity = 0;
    setInfoPost(infoPostList.map((item: PostListProps["infoPostItem"]) => {
      if(item.post.ID === infoPostItem.post.ID){
        postID = item.post.ID
        likeQuantity = item.post.likeQuantity
        return {
          ...item,
          interact: {
            ...item.interact,
            [type]: type === "isLiked" ? !item.interact.isLiked : !item.interact.isSaved
          },
          post: {
            ...item.post,
            likeQuantity: type === "isLiked" ? item.interact.isLiked ? likeQuantity - 1 : likeQuantity + 1 : likeQuantity
          }
        }
      }
      return item
    }))

    // let yesOrNo = 0;
    // if(type === "isLiked"){
    //   yesOrNo = infoPostItem.interact.isLiked ? 0 : 1
    // }
    // else{
    //   yesOrNo = infoPostItem.interact.isSaved ? 1 : 0
    // }

    const dataSendRequest = {
      userID: userID,
      postID: postID,
      type: type,  
      // yes hay no này có nghĩa là like or dislike, save or disSave [1: tương đương với like, save, 2: tương đương với dislike, disSave]
      yesOrNo: type === "isLiked" 
              ? infoPostItem.interact.isLiked  // lúc đầu isLiked = false
                ? 0 
                : 1
              : infoPostItem.interact.isSaved
                ? 0
                : 1
    }
    console.log("dataSendRequest", dataSendRequest)
    axios.post(baseURL + '/interactPost', dataSendRequest)
    .then((response) => {
      console.log("handleInteractPost", response.data.statusCode)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleEditPost = () => {
    setIsEditing(!isEditing)
  }

  const handleDeletePost = () => {
    console.log(infoPostItem.post.ID, "aksncajkinsc")
    axios.post(baseURL + '/deletePost', {postID: infoPostItem.post.ID})
    .then((response) => {
      console.log("handleDeletePost", response.data.statusCode)
      setInfoPost(infoPostList.filter((item: PostListProps["infoPostItem"]) => item.post.ID !== infoPostItem.post.ID))
      setIsShowConfirmPopup(false)
      alert("Xoá bài viết thành công")
    })
    .catch((error) => {
      console.log(error)
      alert("Có lỗi xảy ra, vui lòng thử lại sau")
    })
  }

  const handleSave = (postID: number ) => { 
    const dataSendRequest = {
      userID: userID === 0 ? 1 : userID,
      postID: postID,
      content: postContent
    }
    console.log("dataSendRequest", dataSendRequest)
    axios.post(baseURL + '/editPost', dataSendRequest)
    .then((response) => {
      console.log("handleSave", response.data.statusCode)
      setIsEditing(!isEditing) 
      setInfoPost(infoPostList.map((item: PostListProps["infoPostItem"]) => {
        if(item.post.ID === postID){ 
          return {
            ...item,
            post: {
              ...item.post,
              content: postContent
            }
          }
        }
        return item
      }))
      alert("Chỉnh sửa bài viết thành công")
    })
    .catch((error) => {
      console.log(error)
      alert("Có lỗi xảy ra, vui lòng thử lại sau")
    })
  }

  const renderCarouselProduct = ({item, index}: {item: any, index: number}) => {
    console.log("renderCarouselProduct")
    return (
      <View 
        style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: widthScreen * 0.96,
            marginHorizontal: widthScreen * 0.015,    
        }}
        > 
        <Image
          source={{ uri: item || ""}}
          style={{
            borderRadius: widthScreen * 0.03,
            width: widthScreen - (widthScreen * 0.02) * 2,
            height: heightScreen * 0.4,
            aspectRatio: 1, 
          }}
        ></Image> 
      </View>
    )
  }

  const renderShowConfirmPopup = () => {
    // isShowConfirmPopup && (
    //     <Response 
    //         content="Bạn chắc chắn huỷ đơn hàng này chứ"
    //         buttonIcon1="check-circle"
    //         buttonFunction1={() => handleChangeOrderStatus(orderStatusCode, item, itemStatus)}
    //         buttonName1="Huỷ"
    //         buttonIcon2="window-close"
    //         buttonFunction2={() => setIsShowConfirmPopup(false)}
    //         buttonName2="Thoát"
    //     ></Response>
    // )
      return (
          <View style={{ position: "absolute", top: -(heightScreen * 0.1), width: widthScreen, height: heightScreen }}>
              
              <Response 
                  content="Bạn hãy xác nhận xoá bài viết!!"
                  buttonIcon1="check-circle"
                  buttonFunction1={() => handleDeletePost()}
                  buttonName1="Xoá"
                  buttonColor1="red"
                  buttonIcon2="window-close"
                  buttonFunction2={() => setIsShowConfirmPopup(false)}
                  buttonName2="Thoát"
                  buttonColor2="green"
                  confirmPopup={true}
              ></Response> 
          </View>
      )
  }
 
  return ( 
      infoPostItem.user.ID === 0 ? null :
      <View style={styles.container}>
        <View style={ styles.postHeader }> 
          <View style={ styles.postHeaderLeft }>
            <Image
              style={ styles.image_avatar }
              source={{ uri: infoPostItem.user.avatarImage || ""}} 
            ></Image>  
            <View style={styles.postHeaderCenter}>
              <Text style={styles.postHeaderCenterName} >{infoPostItem.user.Name}</Text>
              <Text style={styles.postHeaderCenterTime} >{infoPostItem.post.time}</Text>
            </View>
          </View> 
          <TouchableOpacity onPress={() => handleInteractPost("isSaved")}>
            {
              isManagePost
              ? <View style={{ flexDirection: "row", width: widthScreen * 0.2, justifyContent: "space-around"}}>
                <TouchableOpacity onPress={() => { setIsShowConfirmPopup(true) }}>
                  <FontAwesome5 name='trash-alt' style={styles.postFooterIcon}></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditPost()}>
                  <FontAwesome5 name='edit' style={styles.postFooterIcon}></FontAwesome5>
                </TouchableOpacity>
              </View>
              : infoPostItem.interact.isSaved 
                ? <FontAwesome name='bookmark' style={[styles.postFooterIcon, {color: "red"}]}></FontAwesome>
                : <FontAwesome5 name='bookmark' style={styles.postFooterIcon}></FontAwesome5> 
            } 
          </TouchableOpacity> 
        </View> 
        <View style={styles.postContent}>
          <View style={styles.postContentText}>
            {
              isEditing  
              ? <TextInput  
                style={[styles.whatAreYouThinking ]}  
                multiline={true}
                onChangeText={(text) => { setPostContent( text ) }}
                textAlignVertical="top"
                value={postContent}
              ></TextInput> 
              : <Text style={{fontWeight: "500", fontSize: RD * 0.00004}}> 
                {infoPostItem.post.content}
              </Text>
            }
          </View>
          <View style={styles.postContentContainImage}> 
            {
              infoPostItem.post.image.length !== 0 
              && <FlatList
                  data={infoPostItem.post.image}
                  renderItem={renderCarouselProduct}  
                  showsHorizontalScrollIndicator
                  bounces={true}
                  pagingEnabled 
                  horizontal
                  style={styles.imagePreview} 
                  decelerationRate="fast" 
                ></FlatList>
            }
            
          </View>
        </View> 
        <View style={styles.postFooter}>
          { 
            isManagePost && isEditing
            ? <View>
              <Button
                buttonName="Lưu"
                iconName="save"
                color={mainColor}
                handlePress={() => handleSave(infoPostItem.post.ID)}
              ></Button>
            </View>
            : isManagePost 
            ? <></>
            : <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => handleInteractPost("isLiked")}>
                { 
                  infoPostItem.interact.isLiked 
                    ? <FontAwesome name='heart' style={[styles.postFooterIcon, {color: "red"}]}></FontAwesome>
                    : <FontAwesome5 name='heart' style={styles.postFooterIcon}></FontAwesome5> 
                } 
              </TouchableOpacity>
              { isManagePost ? <></> :  <Text style={{ fontWeight: "bold", opacity: 0.5, marginLeft: widthScreen * 0.01, fontSize: RD * 0.00005 }}>{infoPostItem.post.likeQuantity}</Text> }
            </View>
          }
        </View>  
        {
            isShowConfirmPopup && ( 
                <View style={{ position: "absolute", top: 0, height: heightScreen, width: widthScreen, backgroundColor: "gray" , opacity: 0.6 }}>
                    
                </View>
            )
        }
        {
            isShowConfirmPopup && renderShowConfirmPopup()
        }
      </View>  
  );
}

export default PostList;


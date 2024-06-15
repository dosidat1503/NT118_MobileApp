import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, FlatList } from 'react-native';  
import { Link, useSegments } from 'expo-router'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { color } from 'react-native-elements/dist/helpers';
import React from 'react';
import { useCartContext } from '@/providers.tsx/CartProvider';


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
            ID: string,
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
      infoPostList: any
}
type type = any

const PostList = ({infoPostItem, infoPostList, setInfoPost } : PostListProps) => {

  const {widthScreen, heightScreen, userID, baseURL, RD} = useCartContext(); 
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
      maxWidth: '100%',
      maxHeight: '100%',
      aspectRatio: 1,
      borderRadius: 100, 
    },
    postHeaderCenter: {
      flexDirection: "column",
      justifyContent: 'flex-start',
      paddingLeft: widthScreen * 0.057,
    },
    postHeaderLeft: {
      flexDirection: 'row',
      width: '40%',
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
      // marginTop: 45,
    },
    postFooterIcon: {
      fontSize: 30
    },

  });

  
  const handleInteractPost = (type: type) => {
    console.log("handleInteractPost", type)
    setInfoPost(infoPostList.map((item: PostListProps["infoPostItem"]) => {
      if(item.post.ID === infoPostItem.post.ID){
        return {
          ...item,
          interact: {
            ...item.interact,
            [type]: type === "isLiked" ? !item.interact.isLiked : !item.interact.isSaved
          }
        }
      }
      return item
    }))
    // axios.post(baseURL + '/interactPost', {
    //   postID: postID,
    //   type: type
    // })
    // .then((response) => {
    //   console.log(response.data, "handleInteractPost")
    // })
  }
  const renderCarouselProduct = ({item, index}: {item: any, index: number}) => {
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
          source={{ uri: item}}
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
 
  return ( 
      infoPostItem.user.ID === 0 ? null :
      <View style={styles.container}>
        <View style={ styles.postHeader }> 
          <View style={ styles.postHeaderLeft }>
            <Image
              style={ styles.image_avatar }
              source={{ uri: infoPostItem.user.avatarImage}} 
            ></Image>  
            <View style={styles.postHeaderCenter}>
              <Text style={styles.postHeaderCenterName} >{infoPostItem.user.Name}</Text>
              <Text style={styles.postHeaderCenterTime} >{infoPostItem.post.time}</Text>
            </View>
          </View> 
          <TouchableOpacity onPress={() => handleInteractPost("isSaved")}>
            {
              infoPostItem.interact.isSaved 
              ? <FontAwesome name='bookmark' style={[styles.postFooterIcon, {color: "red"}]}></FontAwesome>
              : <FontAwesome5 name='bookmark' style={styles.postFooterIcon}></FontAwesome5> 
            } 
          </TouchableOpacity> 
        </View> 
        <View style={styles.postContent}>
          <View style={styles.postContentText}>
            <Text style={{fontWeight: "500", fontSize: RD * 0.00004}}> 
              {infoPostItem.post.content}
            </Text>
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
          <TouchableOpacity onPress={() => handleInteractPost("isLiked")}>
            {
              infoPostItem.interact.isLiked 
              ? <FontAwesome name='heart' style={[styles.postFooterIcon, {color: "red"}]}></FontAwesome>
              : <FontAwesome5 name='heart' style={styles.postFooterIcon}></FontAwesome5> 
            } 
          </TouchableOpacity>
        </View>
      </View>  
  );
}

export default PostList;


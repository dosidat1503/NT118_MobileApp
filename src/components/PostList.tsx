import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native';  
import { Link, useSegments } from 'expo-router'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { color } from 'react-native-elements/dist/helpers';


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
            image: string,
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
  const segments = useSegments() 
  
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
 
  return ( 
      infoPostItem.user.ID === 0 ? null :
      <View style={styles.container}>
        <View style={ styles.postHeader }> 
          <View style={ styles.postHeaderLeft }>
            <Image
              style={ styles.image_avatar }
              source={{ uri: defaultPrizzaImage}} 
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
        {/* <Link 
          href={`${segments[0]}/menu/${post.id}`}  
          asChild
        >
          <Pressable style={styles.container}> */}
        <View style={styles.postContent}>
          <View style={styles.postContentText}>
            <Text>
              {/* Mùa thu hoa nở, hạ tàn. 
              Lòng anh nao nức đợi nàng đến chơi, 
              Làm việc chăm chỉ chẳng nghỉ ngơi,  */}
              {infoPostItem.post.content}
            </Text>
          </View>
          <View style={styles.postContentContainImage}>
            <Image 
              style={styles.postContentImage} 
              source={{uri: infoPostItem.post.image }} 
            ></Image>
          </View>
        </View>
          {/* </Pressable>
        </Link> */}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden'
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
    paddingLeft: 20
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
    fontSize: 16
  },
  postHeaderCenterTime: {
    opacity: 0.7
  },
  postContent: {
    height: 500,
    
  },
  postContentText: {
    paddingHorizontal: 15,
    paddingVertical: 5,

  },
  postContentContainImage: {
    
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

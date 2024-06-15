import axios from "axios";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import PostList from "@/components/PostList";
import { renderItemPostProp } from "@/types";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { itemInfoPost } from "@/types";
import { View, Text } from "react-native";
import RenderFooter from "@/components/RenderFooter";

type PostAtHomeProp = {
    reloadPost: boolean

}

export default function PostAtHome({reloadPost}: PostAtHomeProp) {
    const [queryNotHaveResult, setQueryNotHaveResult] = useState("")
    const itemQuantityEveryLoad = 15;
    let pageNumber = 0;

    const {     
        heightScreen, widthScreen, mainColor, 
        baseURL, setUserID, RD, textQueryPost, 
        setTextQueryPost, selectedItem, 
        setIsLoading, isLoading,
    } = useCartContext();

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

    const styles = StyleSheet.create({
        queryNotHaveResultText: { 
            opacity: 0.5,
            fontWeight: "bold",
            fontSize: RD * 0.00004,
            textAlign: "center",
            marginTop: heightScreen * 0.03,
        }
    })
    const getInforPost = () => { 
        setIsLoading(true)
        let pathAPI;
        textQueryPost === '' ? pathAPI = '/getInfoPost' : pathAPI = '/getInfoPost'

        const dataSendRequest = {
            textQueryPost: textQueryPost,
            topic: selectedItem.topicItem,
            sortBy: selectedItem.sortByItem,
            startDate: selectedItem.startDate,
            endDate: selectedItem.endDate,
            startIndex: pageNumber * itemQuantityEveryLoad,
            itemQuantityEveryLoad: itemQuantityEveryLoad, 
        }

        // console.log(dataSendRequest, "dataSendRequest")
        
        axios.get(baseURL + pathAPI, {params: dataSendRequest})
        .then((response) => {
            // console.log(response.data, "getInforPost2", pathAPI, textQueryPost)
            let updateInfoPost = [...infoPost]
            if(
                selectedItem.topicItem.length !== 0 
                || selectedItem.sortByItem !== '' 
                || selectedItem.startDate !== '' 
                || selectedItem.endDate !== ''
            ) {
                updateInfoPost = []
            }
            if(response.data.infoPost.length === 0 && textQueryPost === ''){
                setQueryNotHaveResult("Không có kết quả tìm kiếm phù hợp")
                setInfoPost([])
                setIsLoading(false)
                pageNumber = 0;
                return
            }
            if(response.data.infoPost.length === 0){
                setQueryNotHaveResult("Không có kết quả tìm kiếm phù hợp")
                setIsLoading(false)
                pageNumber = 0;
                return
            } 
            
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
            setIsLoading(false)
            ++pageNumber;
            // console.log(updateInfoPost[2].post.image, "setInfoPo1st")
        })
    }
    
    useEffect(() => { 
        const getUserID = async () => {
            const userID = await AsyncStorage.getItem("userID");
            return userID;
        }
    
        setUserID(1)
    
    
        getInforPost() 
        // console.log(infoPost, "đã chạy infoPost")
    }, [textQueryPost, reloadPost])

    const renderItemPost = ({item}: renderItemPostProp) => (
        <PostList 
            infoPostItem = {item} 
            infoPostList = {infoPost} 
            setInfoPost = {setInfoPost} 
            segments={[]}
        ></PostList>
    )

    return (
        <ScrollView style={{ 
            marginBottom: heightScreen * 0.14,  
        }}>
            <FlatList
                data={infoPost}
                renderItem={renderItemPost}
                numColumns={1}
                contentContainerStyle={{gap: 10}} 
                ListFooterComponent={ <RenderFooter isLoading={isLoading}></RenderFooter> } 
                onEndReached={() => getInforPost()}
                onEndReachedThreshold={0.01}
            />
            {
                queryNotHaveResult && <Text style={ styles.queryNotHaveResultText }>{queryNotHaveResult}</Text>
            } 
        </ScrollView>
    )
}
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import PostList from "@/components/PostList";
import { renderItemPostProp } from "@/types";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { itemInfoPost } from "@/types";
import { View, Text } from "react-native";
import RenderFooter from "@/components/RenderFooter";
import { useSearchPostContext } from "./SearchPostContext";
import { LogBox } from 'react-native';  
LogBox.ignoreLogs(['Warning: ...']);

type PostAtHomeProp = {
    reloadPost: boolean,
    isLikeAndSave?: boolean, 
    isManagePost?: boolean,
    isHome?: boolean
}

export default function PostAtHome({reloadPost, isLikeAndSave, isManagePost, isHome}: PostAtHomeProp) {
    const [queryNotHaveResult, setQueryNotHaveResult] = useState("")
    const itemQuantityEveryLoad = 15;
    const [pageNumber, setPageNumber] = useState(0)
 
    

    const {selectedItem} = useSearchPostContext()
    const [isLoading, setIsLoading] = useState(false) 
    const [prepareForReloadPost, setPrepareForReloadPost] = useState(false)
    const widthScreen = Dimensions.get("window").width
    const heightScreen = Dimensions.get("window").height
    const RD = widthScreen * heightScreen 
    const mainColor = "#89CFF0" 
    const baseURL = "http://26.85.40.176:8000/api"
    const userID = 1 
    let [textQueryPost, setTextQueryPost] = useState('')
 

    const loadTextQueryPost = async () => {
        textQueryPost = await AsyncStorage.getItem('textQueryPost') || "";
        if (textQueryPost !== null) {
            setTextQueryPost(textQueryPost);
            getInforPost(); 
        }
    };

    useEffect(() => {
        setInfoPost([]) 
        console.log("setPageNumber", pageNumber)
        console.log( "đã chạy infoPost") 
        if(pageNumber === 0){ 
            loadTextQueryPost();
        }
        else{ 
            setPageNumber(0) 
            setPrepareForReloadPost(true)
        }
    }, [reloadPost]);

    useEffect(() => {
        if(prepareForReloadPost){
            loadTextQueryPost()
            setPrepareForReloadPost(false)
        }
    }, [prepareForReloadPost])
 

    const [endPost, setEndPost] = useState(false)
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
        setQueryNotHaveResult("")
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
            isLikeAndSave: isLikeAndSave,
            isManagePost: isManagePost,
            isHome: isHome,
            userID: userID,
        }

        console.log(dataSendRequest, "dataSendRequest", pageNumber, endPost, isLoading)
        
        axios.get(baseURL + pathAPI, {params: dataSendRequest})
        .then((response) => {
            console.log(response.data, "getInforPost2", pathAPI, textQueryPost, "d", response.data.postIDLikeAndSave, 'postIDLikeAndSave')
            let updateInfoPost = [...infoPost]
            if(
                selectedItem.topicItem.length !== 0 
                || selectedItem.sortByItem !== 0 
                || selectedItem.startDate !== '' 
                || selectedItem.endDate !== ''
            ) {
                updateInfoPost = []
            }
            if(response.data.infoPost.length === 0 && textQueryPost === '' && pageNumber === 0){
                setQueryNotHaveResult("Không có kết quả tìm kiếm phù hợp")
                setInfoPost([])
                setIsLoading(false)
                setEndPost(true)
                setPageNumber(pageNumber + 1);
                // setPageNumber(0);
                return
            }
            else if(response.data.infoPost.length === 0){
                setQueryNotHaveResult("End")
                setIsLoading(false)
                setEndPost(true)
                setPageNumber(pageNumber + 1);
                // setPageNumber(0);
                return
            } 
            if(response.data.infoPost.length === 0 && response.data.infoPostImage.length === 0 && response.data.usersInfo.length === 0){
                setEndPost(true)
                setIsLoading(false)
                console.log("endPost")
            }
            if(response.data.infoPost.length + infoPost.length < itemQuantityEveryLoad * (pageNumber + 1)){
                setEndPost(true)
                setQueryNotHaveResult("End")
                setIsLoading(false)
                console.log("endPost")
            }
            
            
            response.data.infoPost.map((item: itemInfoPost, index: any) => {
                const imageUrls: any = []; // Khởi tạo một mảng để chứa các URL
                let name = ""
                let avatarURL = ""

                response.data.infoPostImage.forEach((itemImage: any) => {
                    if (itemImage.POST_ID === item.POST_ID) {
                        imageUrls.push(itemImage.URL); // Thêm URL vào mảng nếu POST_ID khớp
                    }
                });

                response.data.usersInfo.forEach((itemUser: any) => {
                    if(itemUser.USER_ID === item.USER_ID){
                        name = itemUser.NAME
                        avatarURL = itemUser.AVT_URL
                    }
                })

                updateInfoPost.push({
                    user: {
                        ID:  item.USER_ID,
                        avatarImage: avatarURL,
                        Name: name,
                    },
                    post: {
                        ID: item.POST_ID,
                        time: item.TIME,
                        content: item.CONTENT,
                        image: imageUrls,
                        likeQuantity: response.data.infoPost[index].LIKE_QUANTITY,
                    },
                    interact: {
                        isLiked: item.IS_LIKE === 1 ? true : false,
                        isSaved: item.IS_SAVE === 1 ? true : false,
                    }
                }) 
            })  

            setInfoPost(updateInfoPost) 
            setIsLoading(false)
            setPageNumber(pageNumber + 1);
            // console.log(updateInfoPost[2].post.image, "setInfoPo1st")
        })
    } 
    
    // useEffect(() => {  
        
    //     setInfoPost([])

    //     getInforPost() 
    //     console.log( "đã chạy infoPost")
    // }, [reloadPost])
 

    const renderItemPost = ({item}: renderItemPostProp) => {
        console.log("renderItemPost")
        return (
            <PostList 
                infoPostItem = {item} 
                infoPostList = {infoPost} 
                setInfoPost = {setInfoPost} 
                segments={[]}
                isManagePost={isManagePost}
            ></PostList>
        )
    }

    const renderPostList =  () => {
        return (
            <FlatList
                data={infoPost}
                renderItem={renderItemPost}
                numColumns={1}
                contentContainerStyle={{gap: 10}} 
                ListFooterComponent={ <RenderFooter isLoading={isLoading}></RenderFooter> } 
                onEndReached={() => {
                    if(infoPost.length > 0 && endPost === false) {
                        console.log("continue")
                        getInforPost()
                    }
                }}
                onEndReachedThreshold={0.005}
            />
        )
    }

    return (
        <View style={{ 
            marginBottom: heightScreen * 0.14,  
        }}>
            {renderPostList()}
            {
                queryNotHaveResult && <Text style={ styles.queryNotHaveResultText }>{queryNotHaveResult}</Text>
            } 
        </View>
    )
}
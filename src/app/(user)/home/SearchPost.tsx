import { useCallback, useEffect, useState } from "react";
import { StyleSheet,  FlatList } from "react-native"  
import React from "react"; 
import PostAtHome from "./PostAtHome";  
import CollapsibleFilter from "./CollapsibleFilter";  
import { useSearchPostContext } from "./SearchPostContext";
import { useCartContext } from "@/providers.tsx/CartProvider";
import SearchPostProvider from "./SearchPostContext";

const PostAtHomeMemo = React.memo(PostAtHome);
const CollapsibleFilterMemo = React.memo(CollapsibleFilter);


export default function SearchPost(
    // {backFromAddPost, setBackFromAddPost} : {backFromAddPost: boolean, setBackFromAddPost: any}
    {isLikeAndSave, isManagePost } : {isLikeAndSave? : boolean, isManagePost? : boolean}
) {

    const { setSelectedItem } = useSearchPostContext()
    
    const [isShowFilter, setIsShowFilter] = useState(true);
    const [reloadPost, setReloadPost] = useState(false)   
    const handleReloadPost = useCallback(() => {
        setReloadPost(!reloadPost);
        setIsShowFilter(true);
        console.log("handleReloadPost");
    }, [reloadPost]);

    // useEffect(() => {
    //     console.log("backFromAddPost", backFromAddPost)
    //     if(backFromAddPost){ 
    //         setReloadPost(!reloadPost);
    //         setBackFromAddPost(false)
    //     }
    // }, [backFromAddPost])

    useEffect(() => {
        setSelectedItem({
            topicItem: [],
            sortByItem: '',
            startDate: "",
            endDate: "", 
        })
    }, [])

    const renderPostAtHome = useCallback(() => {
        console.log("reloadPost", reloadPost)
        return <PostAtHomeMemo reloadPost={reloadPost} isLikeAndSave={isLikeAndSave} isManagePost = {isManagePost}/>
    }, [reloadPost, handleReloadPost])

    return ( 
        <SearchPostProvider>
            <FlatList
                data={[]}  // Nếu không có dữ liệu cụ thể, bạn có thể để trống hoặc truyền dữ liệu phù hợp
                renderItem={({ item }) => null}
                keyExtractor={(item, index) => index.toString()}
                // sử dụng listHeaderComponent và ListFooterComponent để thêm các thành phần vào đầu và cuối danh sách
                ListHeaderComponent={
                    isManagePost ? <></> : <CollapsibleFilterMemo handleReloadPost={handleReloadPost} isShowFilter={isShowFilter} setIsShowFilter={setIsShowFilter}/>
                }
                ListFooterComponent={
                    renderPostAtHome()
                } 
            />
        </SearchPostProvider> 
    )
}
 
 
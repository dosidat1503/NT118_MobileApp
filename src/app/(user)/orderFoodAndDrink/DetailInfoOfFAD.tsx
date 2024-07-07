
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable, FlatList, SafeAreaView } from "react-native";
import { CheckBox } from 'react-native-elements'; 
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SlideHeaderOrderFAD from "@/components/orderFAD/SlideHeaderOrderFAD";
import { useCallback, useState } from "react";
import Button from "./Button";
import AdjustQuantity from "./AdjustQuantity"; 
import { useRoute, RouteProp } from '@react-navigation/native'; 
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react"; 
import React from "react";
import axios from "axios";
// import Loading from "@/components/Loading"; 
import ReviewShop from "./ReviewShop";
import Loading from "@/components/Loading"; 

type RootStackParamList = {
    DetailInfoOfFAD: { item: any }; // Replace 'any' with the actual type of 'item'
};
interface Size {
    label: string;
    checked: boolean;
    price: number;
}

interface Topping {
    label: string;
    quantity: number;
    price: number;
    id: number;
    uri: string
}

interface toppingItemFromSever {
    FAD_PRICE: any; 
    FAD_NAME: any; 
    label: string; 
    price: number;  
    FAD_ID: number;
    TOPPING_URL: string
}

interface OrderInfo {
    id: number;
    name: string;
    uri: string;
    price: number;
    sizes: Size[];
    toppings: Topping[];
    note: string;
    description: string;
    quantity: number;
    isCheckedForPayment: boolean;
    totalOfItem: number;    
    moneyWhenQuantityIsOne: number;
    shopName: string;
    shopID: number;
    shopAvatarURL: string;
}

export type rateProps = {
    STAR_QUANTITY_RATE: number,
    CONTENT_RATE: string,
    DATE_RATE: string,
    NAME: string,
    USER_AVT_URL: string
}


export default function DetailInfoOfFAD() {
    const { heightScreen, widthScreen, mainColor, baseURL } = useCartContext();
    const heightNameFAD = heightScreen * 0.08; 
    const widthPaddingNameFAD = widthScreen * 0.04 
    const  [DetailInfoOfFAD, setDetailInfoOfFAD] = useState<any>({});
    const route = useRoute();
    const { item } = route.params;
    useEffect(() => {
        console.log(item, "it22em")
    }, [])
    useEffect(() => {
        const loadDetailInfoOfFAD = async () => {
            let DetailInfoOfFAD_temp = await AsyncStorage.getItem('DetailInfoOfFAD') || "";  
            let parsedValue  = DetailInfoOfFAD_temp != "" ? JSON.parse(DetailInfoOfFAD_temp) : {}  
            parsedValue.FAD_ID = parseInt(parsedValue.FAD_ID, 10) || 0;
            parsedValue.FAD_PRICE = parseInt(parsedValue.FAD_PRICE, 10) || 0;
            setDetailInfoOfFAD(parsedValue) 
        }   
        loadDetailInfoOfFAD()
    }, [])
    useEffect(() => {
        if(DetailInfoOfFAD.FAD_ID !== undefined){  
            console.log("fai2lt", typeof(DetailInfoOfFAD.FAD_PRICE)) 
            getDetailInfoOfFAD()
        }
        console.log("useEffect DetailInfoOfFAD", DetailInfoOfFAD.FAD_PRICE, orderInfoOfItem)  
        if (DetailInfoOfFAD.FAD_ID !== undefined) {
            setOrderInfoOfItem({
                id: DetailInfoOfFAD.FAD_ID,
                name: DetailInfoOfFAD.FAD_NAME,
                price: DetailInfoOfFAD.FAD_PRICE,
                uri: DetailInfoOfFAD.FOOD_IMAGE_URL,
                shopName: DetailInfoOfFAD.SHOP_NAME,
                shopID: 0,
                shopAvatarURL: "",
                sizes: [],
                toppings: [],
                note: "",
                description: DetailInfoOfFAD.DESCRIPTION,
                quantity: 1,
                isCheckedForPayment: true,
                totalOfItem: 0,
                moneyWhenQuantityIsOne: 0
            });
        }
    }, [DetailInfoOfFAD])

     
    const [isLoadingDetailInfoOfFAD, setIsLoadingDetailInfoOfFAD] = useState(true)
    const [isAdding, setIsAdding] = useState(false);
    const [rateInfo, setRateInfo] = useState<rateProps[]>([]);

    const styles = StyleSheet.create({ 
        nameFADIcon: {
            // paddingVertical: "auto",
            alignSelf: 'center',
            paddingHorizontal: widthPaddingNameFAD,
            backgroundColor: "#89CFF0"
        },
        nameFADContainer: {
            height: heightNameFAD,
            width: widthScreen,
            flexDirection: 'row', 
            overflow: 'hidden', 
            backgroundColor: "white", 
            position: 'relative', 
            top: heightScreen * (-0.03), 
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: widthScreen * 0.03,
            borderRadius: widthScreen * 0.03
        },
        nameFADText: {
            // height: "100%",
            // width: "100%", 
            fontWeight: "bold",
            fontSize: widthScreen * 0.05, 
            alignSelf: "center",
            alignItems: "center"
        },
        nameFADDivContainer: {
            flexDirection: 'column',
            justifyContent: 'center', 
        },
        titleFADContainer: {  
            width: widthScreen,
            flexDirection: 'row', 
            overflow: 'hidden',
            borderWidth: 1, 
            borderColor: "#89CFF0",
            backgroundColor: "white",  
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: widthScreen * 0.03,
            paddingVertical: heightScreen * 0.007,
            marginTop: heightScreen * 0.01
        }, 
        require: {
            // height: "100%",
            // width: "100%",  
            fontSize: widthScreen * 0.03, 
            alignSelf: "center",
            alignItems: "center",
            opacity: 0.5
        },
        selectItemContainer: {
            flexDirection: "column"
        },
        sizeItem: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "space-between",
            paddingHorizontal: widthScreen * 0.06,
            borderTopWidth: 1, 
            paddingVertical: heightScreen * 0.009
        },
        subTextSelect: { 
            fontWeight: "bold",
            fontSize: widthScreen * 0.03, 
            alignSelf: "center",
            alignItems: "center",
            opacity: 0.7
        },
        quantityContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        quantityInput: {
          borderWidth: 1,
          borderColor: '#89CFF0',
          borderRadius: 5,
          paddingHorizontal: widthScreen * 0.007,
          paddingVertical: heightScreen * 0.003,
          width: widthScreen * 0.09,
          height: "100%",
          marginHorizontal: widthScreen * 0.01,
          textAlign: 'center',
          fontWeight: "bold",
          opacity: 0.7 
        },
        quantityButton: {
          paddingHorizontal: widthScreen * 0.008,
          paddingVertical: widthScreen * 0.003,
        //   fontSize: 42,
          fontWeight: "bold", 
          borderRadius: widthScreen * 0.2,
          alignSelf: "center", 
          borderColor: "#89CFF0",
          color: "#89CFF0",
          textAlignVertical: "center",
          alignItems: "center"  
        },
        iconQuantityButton: {
            fontSize: widthScreen * 0.05,
            opacity: 0.6
        },
        inputNote:{
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.01,
            fontSize: widthScreen * 0.035,
            fontWeight: "bold",
            color: "#787877",
            borderWidth: 1,
            borderColor: '#b3b3a8',
            backgroundColor: "white",
        },  
        inputFADQuantityContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "space-around",
            paddingHorizontal: widthScreen * 0.06,
            borderTopWidth: 1, 
            borderColor: "#89CFF0",
            paddingVertical: heightScreen * 0.009,
            marginTop: heightScreen * 0.01,
            // width: widthScreen * 0.7
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: widthScreen * 0.05,
            marginTop: widthScreen * 0.03,
        },
        button: {
            backgroundColor: '#3498db',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
        },
        text: {
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        descriptionShopDivContainer: {
            flexDirection: 'column',
            justifyContent: 'center', 
            alignSelf: "center", 
            marginTop: heightScreen * 0.01,
        },
        descriptionShopContainer: { 
            flexDirection: 'column', 
            borderWidth: 1, 
            borderColor: "#89CFF0",
            backgroundColor: "white",   
            borderRadius: heightScreen * 0.1,
        },  
        descriptionShopItem: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.04,
            width: widthScreen * 0.95,
            // borderBottomWidth: 1,
            // borderBottomColor: "#89CFF0"
        },
        descriptionText: {
            fontWeight: "500",
            fontSize: heightScreen * 0.019,
            paddingLeft: widthScreen * 0.02,
            opacity: 0.9
        },
    }) 

    const [orderInfoOfItem, setOrderInfoOfItem] = useState<OrderInfo>({
        id: item.FAD_ID,
        name: item.FAD_NAME,
        price: item.FAD_PRICE,
        uri: item.FOOD_IMAGE_URL,
        shopName: item.SHOP_NAME,
        shopID: 0,
        shopAvatarURL: "",
        sizes: [],
        toppings: [],
        note: "",
        description: "",
        quantity: 1,
        isCheckedForPayment: true,
        totalOfItem: 0,
        moneyWhenQuantityIsOne: 0
    })
    useEffect(() => {
        console.log(orderInfoOfItem, "orderI22nfoO1fItem")
    }, [orderInfoOfItem])

    const getDetailInfoOfFAD = () => {
        console.log(DetailInfoOfFAD.FOOD_IMAGE_URL, "DetailIn2foOfFAD1")
        axios.get(baseURL + '/getFADDetailInfo', {params: {FAD_ID: parseInt(DetailInfoOfFAD.FAD_ID)}})
        .then( (res) => {
            console.log(res.data, "DetailInfoOfFAD2S") 
            setRateInfo(res.data.rateInfo)
            setOrderInfoOfItem({
                ...orderInfoOfItem, 
                toppings: res.data.topping.map(( item: toppingItemFromSever  ) => { 
                    return { 
                        id: item.FAD_ID,
                        label: item.FAD_NAME, 
                        price: item.FAD_PRICE,
                        quantity: 0, 
                        uri: item.TOPPING_URL
                    }
                }),
                sizes: res.data.size.map((item: toppingItemFromSever, index: number) => {
                    return {
                        label: item.FAD_NAME,
                        price: item.FAD_PRICE,
                        checked: index === 0 ? true : false
                    }
                }),
                shopAvatarURL: res.data.shopInfo.SHOP_AVT_URL,
                shopID: res.data.shopInfo.SHOP_ID,
                totalOfItem: orderInfoOfItem.price * orderInfoOfItem.quantity, 
            })
            console.log( orderInfoOfItem.price , ' orderInfoOfItem.price * orderInfoOfItem.quantity')
            setIsLoadingDetailInfoOfFAD(false)
        })
    }
 
    const handleCheckBoxChange = useCallback((index: number) => { 
        const selecteditemBefore = orderInfoOfItem.sizes.find(item => item.checked === true);
        const priceOfSelectedSizeBefore = selecteditemBefore?.price || 0;
        setOrderInfoOfItem( 
            {
                ...orderInfoOfItem,
                sizes: orderInfoOfItem.sizes.map((size, idx) => {
                    if (idx === index) {
                        return { ...size, checked: true };
                    } else {
                        return { ...size, checked: false };
                    } 
                }),
                totalOfItem: (
                    orderInfoOfItem.sizes[index].price 
                    * orderInfoOfItem.quantity 
                    + orderInfoOfItem.totalOfItem
                ) - priceOfSelectedSizeBefore * orderInfoOfItem.quantity 
            }
        ) 
    }, [orderInfoOfItem.sizes, orderInfoOfItem.quantity, orderInfoOfItem.totalOfItem])

    const handleAdjustQuantityTopping = useCallback((index: number, type: string, quantityFromInput: OrderInfo["quantity"]) => {  
        let addTotal = 0;
        let quantityAdjust = 0;
        setOrderInfoOfItem( 
            {
                ...orderInfoOfItem,
                toppings: orderInfoOfItem.toppings.map((item, idx) => {
                    if (idx === index) {
                        quantityAdjust = type === "increase" ? item.quantity + 1  : 
                                type === "decrease" ? (item.quantity !== 0 ? item.quantity - 1 : 0) : 
                                    quantityFromInput || 0
                        addTotal = item.price * (quantityAdjust - item.quantity) * orderInfoOfItem.quantity;

                        return { 
                            ...item, 
                            quantity: quantityAdjust
                        };
                    }  else {
                        return item;
                    }
                }), 
                totalOfItem: orderInfoOfItem.totalOfItem + addTotal
            }
        ) 
        console.log(orderInfoOfItem.totalOfItem, "totalOfItem")
    }, [orderInfoOfItem.toppings, orderInfoOfItem.quantity, orderInfoOfItem.totalOfItem])
    
    const handleAdjustQuantityItem = useCallback((index: number, type: string, quantityFromInput: OrderInfo["quantity"]) => {
        let newQuantity = 0;
        
        newQuantity = type === "increase" 
        ? orderInfoOfItem.quantity + 1
        : type === "decrease" 
            ? (
                orderInfoOfItem.quantity !== 0 
                ? orderInfoOfItem.quantity - 1
                : 0
            ) 
            :  quantityFromInput || 0

        let newTotalOfItem = orderInfoOfItem.moneyWhenQuantityIsOne * newQuantity;

        newTotalOfItem = orderInfoOfItem.quantity > 1 ? (orderInfoOfItem.totalOfItem / orderInfoOfItem.quantity) * newQuantity : orderInfoOfItem.totalOfItem * newQuantity;

        
        setOrderInfoOfItem( 
            {
                ...orderInfoOfItem,
                quantity: newQuantity,  
                totalOfItem: newTotalOfItem
            }
        )
        console.log(orderInfoOfItem.totalOfItem, "totalOfItem")
    }, [orderInfoOfItem.quantity, orderInfoOfItem.totalOfItem, orderInfoOfItem.moneyWhenQuantityIsOne])

    const renderListSizes = orderInfoOfItem.sizes.map(useCallback((item, index) => {
        return ( 
            <View 
                style={styles.sizeItem}
                key={index}
            > 
                <View>
                    <Text style={styles.subTextSelect}>{item.label}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View>
                        <Text style={[styles.subTextSelect,  { color: "green" }]}>+{item.price}</Text>
                    </View>
                    <View >
                        <CheckBox
                            checked={item.checked}
                            onPress={() => handleCheckBoxChange(index)}
                            containerStyle={{
                                padding: 0,
                                margin: 0,
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }, [handleCheckBoxChange]))
 
    const renderListTopping = orderInfoOfItem.toppings.map(useCallback((item, index) => {
        return ( 
            <View 
                key={index} 
                style={styles.sizeItem}
            > 
                <View>
                    <Text style={styles.subTextSelect}>{item.label}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    // alignItems: 'space-between',
                    justifyContent: "space-between",
                    width: "40%"
                }}>
                    <Text style={[styles.subTextSelect,  { color: "green" }]}>+{item.price}</Text>
                    <AdjustQuantity
                        index={index}
                        quantity={item.quantity}
                        handleAdjustQuantity={handleAdjustQuantityTopping}
                    ></AdjustQuantity>
                </View>
            </View>
        );
    }, [handleAdjustQuantityTopping]));

    const addToCart = useCallback(async () => { 
        setIsAdding(true);
        setTimeout(() => {
          setIsAdding(false);
        }, 2000);
        try { 
            // Lấy mảng item đã có trong giỏ hàng lên để kiểm tra xem item đã tồn tại trong mảng chưa
            let array_itemListInCart = await AsyncStorage.getItem('array_itemListInCart')
            array_itemListInCart = array_itemListInCart !== null 
                ? JSON.parse(array_itemListInCart)
                : [];
            
            // await AsyncStorage.setItem('item', JSON.stringify(orderInfoOfItem));
            console.log("done asyncStorage", array_itemListInCart);
    
            // const getItem = await AsyncStorage.getItem('item');
            // const getItemParsed = await JSON.parse(getItem || "");
            // console.log("getItemParsed", getItemParsed, getItem, 'getItem');
    
            if (array_itemListInCart !== null && Array.isArray(array_itemListInCart)) {
                //Kiểm tra xem FAD chuẩn bị thêm vào có tồn tại trong giỏ hàng hay chưa 
                const existingItemIndex = array_itemListInCart.findIndex(item => {
 
                    return  (
                        item.id === orderInfoOfItem.id   
                        && (
                                item.sizes.length === 0 || 
                                item.sizes.findIndex((size: { checked: any; label: any; }, index: string | number) => {
                                return (
                                    orderInfoOfItem.sizes[index].checked === size.checked && 
                                    orderInfoOfItem.sizes[index].label === size.label
                                );
                                }) !== -1 // có nghĩa là size giống nhau
                            ) 
                        && (
                                item.toppings.length === 0 ||
                                item.toppings.every((item: { label: any; quantity: any; price: any; }, index: string | number) => {
                                    return orderInfoOfItem.toppings.some((item2: { label: any; quantity: any; price: any; }) => {
                                        return (item2.label === item.label && item2.quantity === item.quantity && item2.price === item.price)
                                    })
                                }) === true // có nghĩa là topping đều giống nhau
                            ) 
                    )
                });
                console.log("existingItemIndex existingItemIndex", existingItemIndex, array_itemListInCart[0]);
                // Nếu item đã tồn tại trong mảng thì chạy vào if, chưa thì chạy vào else
                if (existingItemIndex !== -1) {
                    console.log("tăng quantity")
                    array_itemListInCart[existingItemIndex].quantity = array_itemListInCart[existingItemIndex].quantity + orderInfoOfItem.quantity; // Tăng quantity
                } else {
                    // Nếu item chưa tồn tại trong mảng
                    console.log("thêm item")
                    array_itemListInCart.push(orderInfoOfItem); // Thêm item mới vào mảng
                }
            } else {
                console.log("failt");
            }

            await AsyncStorage.setItem('array_itemListInCart', JSON.stringify(array_itemListInCart));
    
            console.log(await AsyncStorage.getItem('array_itemListInCart'), "test");
        } catch(err){
            console.log(err)
        }
    }, [orderInfoOfItem])

    useEffect(() => {
        const sizePrice = orderInfoOfItem.sizes.find(item => item.checked === true)?.price || 0
        console.log(orderInfoOfItem.price, "useeffect orderInfoOfItem.totalOfItem", sizePrice, orderInfoOfItem.totalOfItem, orderInfoOfItem.moneyWhenQuantityIsOne)
        const totalOfTopping = orderInfoOfItem.toppings.reduce((acc, item) => {
            return acc + item.price * item.quantity
        }, 0)
        setOrderInfoOfItem({
            ...orderInfoOfItem,
            moneyWhenQuantityIsOne: orderInfoOfItem.price + sizePrice + totalOfTopping,
        })
        
    }, [orderInfoOfItem.totalOfItem])
 
    return(
        isLoadingDetailInfoOfFAD 
        ? <Loading></Loading>
        : <SafeAreaView style={[{flex: 10}]}> 
            <Stack.Screen 
                options={{ 
                    title: "Thông tin sản phẩm",
                    headerRight: () => (
                        <Link href="/(user)/orderFoodAndDrink/Cart" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="shopping-cart"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ 
                                            marginRight: widthScreen * 0.04, 
                                            opacity: pressed ? 0.5 : 1, 
                                            borderWidth: 1,
                                            borderColor: mainColor,
                                            borderRadius: widthScreen * 0.03,
                                            paddingHorizontal: widthScreen * 0.015,
                                            paddingVertical: heightScreen * 0.008
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ), 
                }}
            ></Stack.Screen>  
            <View style={{
                height: heightScreen * 0.86,
            }}>
                <View style={{ flex: 3 }}>
                    <SlideHeaderOrderFAD
                        cateroty={[{
                            url: DetailInfoOfFAD.FOOD_IMAGE_URL,
                        }]}
                    ></SlideHeaderOrderFAD>
                </View>
                {/* tên và giá của sản phẩm */}
                <View style={[styles.nameFADDivContainer, {flex: 1}]}>
                    <View style={styles.nameFADContainer}> 
                        <View>
                            <Text  
                                style={styles.nameFADText}
                            >{DetailInfoOfFAD.FAD_NAME}</Text>
                        </View>
                        <View>
                            <Text  
                                style={[styles.nameFADText, {color: "red"}]}
                            >{DetailInfoOfFAD.FAD_PRICE}</Text>
                        </View>
                    </View>
                </View>
                {/* chọn size và topping và mô tả sản phẩm */}
                <View style={{ flex: 5 }}>
                        <FlatList
                            data={[]}
                            renderItem={(value) => <></>}
                            ListHeaderComponent={
                                <View style={{
                                    flexDirection: "column",
                                    paddingVertical: heightScreen * 0.01, 
                                }}> 
                                    {
                                        orderInfoOfItem.sizes.length !== 0 
                                            ? <View style={styles.titleFADContainer}> 
                                                <View>
                                                    <Text  
                                                        style={styles.nameFADText}
                                                    >Chọn size</Text>
                                                </View>
                                                <View>
                                                    <Text  
                                                        style={[styles.require]}
                                                    >Bắt buộc</Text>
                                                </View>
                                            </View>
                                            : ""
                                    }
                                    <View style={styles.selectItemContainer}>
                                        {renderListSizes}
                                    </View> 
                                    {
                                        orderInfoOfItem.toppings.length !== 0 
                                            ? <View style={styles.titleFADContainer}> 
                                                <View>
                                                    <Text  
                                                        style={styles.nameFADText}
                                                    >Topping</Text>
                                                </View>
                                                <View>
                                                    <Text  
                                                        style={[styles.require]}
                                                    >Không bắt buộc</Text>
                                                </View>
                                            </View>
                                            : ""
                                    }
                                    <View style={styles.selectItemContainer}>
                                        {renderListTopping}
                                    </View> 
                                    <View style={styles.titleFADContainer}> 
                                        <View>
                                            <Text  
                                                style={styles.nameFADText}
                                            >Mô tả</Text>
                                        </View> 
                                    </View>
                                    
                                    <View style={styles.descriptionShopDivContainer}>
                                        <View style={styles.descriptionShopContainer}>
                                            <View style={styles.descriptionShopItem}>
                                                <Text
                                                    style={styles.descriptionText}
                                                >
                                                    {DetailInfoOfFAD.DESCRIPTION}
                                                </Text> 
                                            </View>   
                                        </View>
                                    </View>
                                     
                                    <View style={styles.titleFADContainer}> 
                                        <View>
                                            <Text  
                                                style={styles.nameFADText}
                                            >Đánh giá</Text>
                                        </View> 
                                    </View>
                                    
                                    <View style={{ marginTop: heightScreen * 0.01 }}>
                                        {
                                            rateInfo.map((item: rateProps, index) => {
                                                return (
                                                    <ReviewShop 
                                                        key={index}
                                                        STAR_QUANTITY_RATE={item.STAR_QUANTITY_RATE}
                                                        CONTENT_RATE={item.CONTENT_RATE}
                                                        DATE_RATE={item.DATE_RATE}
                                                        NAME={item.NAME}
                                                        USER_AVT_URL={item.USER_AVT_URL}
                                                    ></ReviewShop>
                                                )
                                            })
                                        }
                                    </View>
                                    <View style={styles.selectItemContainer}> 
                                    </View>
                                </View>
                            }
                        ></FlatList>
                </View> 
                {/* input số lượng */}
                <View style={[styles.inputFADQuantityContainer, {flex: 0.6}]} > 
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View>
                            <Text style={styles.subTextSelect}>Số lượng: </Text>
                        </View>
                        <AdjustQuantity
                            index={0}
                            quantity={orderInfoOfItem.quantity}
                            handleAdjustQuantity={handleAdjustQuantityItem}
                        ></AdjustQuantity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View>
                            <Text style={styles.subTextSelect}>Tổng tiền: </Text>
                        </View>
                        <Text>{orderInfoOfItem.totalOfItem}</Text>
                    </View>
                </View> 
                {/* button */}
                <View style={[styles.buttonContainer, {flex: 0.5}]}> 
                {
                    isAdding 
                    ? <Button
                        iconName="check-circle"
                        buttonName="Đã thêm vào giỏ" 
                        color="green" 
                    ></Button>
                    : <Button
                        iconName="shopping-cart"
                        buttonName="THÊM VÀO GIỎ"
                        handlePress={addToCart}
                    ></Button>
                }
                    {/* <Button
                        iconName="money-bill-alt"
                        buttonName="THANH TOÁN"
                        handlePress={() => {}}
                    ></Button> */}
                </View>
            </View>
        </SafeAreaView> 
    )
}
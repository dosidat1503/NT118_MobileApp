import { Link, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, TextInput, Linking  } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { CheckBox } from 'react-native-elements'; 
import ItemInCartAndPayment from "@/components/orderFAD/Cart/ItemInCartAndPayment";
import Button from "./Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react'; 
import ItemType1 from "@/components/orderFAD/Payment/ItemType1";
import axios from "axios";
import Loading from "@/components/Loading";
import { useNavigation } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
// import * as Linking from 'expo-linking';


type toppingType = {
    id: number,
    name: string,
    price: number,
    quantity: number
}

type productListType = {
    id: number,
    name: string,
    price: number,
    size: string,
    toppings: toppingType[], 
    quantity: number,
    totalOfItem: number 
}

type orderInforType = {
    deliveryInfo: { 
        id: number,
        name: string,
        phone: string,
        address: string,
        isDefault: boolean,
        isChoose: boolean
    },
    productList: productListType[],
    paymentMethod: string,
    paymentStatus: number,
    voucherID: number,
    paymentAmount: number,
    userID: number 
}

export default function Payment() {
    const { heightScreen, widthScreen, 
        mainColor, baseURL, userID, 
        setIsLoading, isLoading, 
        setVnpURL, vnpURL, orderInfo, 
        setOrderInfo 
    } = useCartContext(); 
    const avatarSize = widthScreen * 0.13;

    const styles = StyleSheet.create({
        titleContainer: {  
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
            height: "100%",
            width: "100%",  
            fontSize: widthScreen * 0.03, 
            alignSelf: "center",
            alignItems: "center",
            opacity: 0.5
        },
        titleText: { 
            fontWeight: "bold",
            fontSize: widthScreen * 0.05, 
            alignSelf: "center",
            alignItems: "center"
        },
        deliveryDivContainer: {
            flexDirection: 'column',
            justifyContent: 'center', 
            alignSelf: "center",
            overflow: "hidden"
        },
        titleTextForDeliveryContainer: {
            flexDirection: 'row',
            alignItems: "center",
            paddingVertical: heightScreen * 0.009,
            paddingHorizontal: widthScreen * 0.02,
            // width: widthScreen * 0.95,
            borderBottomWidth: 1,
            borderBottomColor: "#89CFF0", 
        },
        titleTextForDelivery: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.03, 
            opacity: 0.5
        },
        deliveryItemContainer: {
            flexDirection: 'row',
            alignItems: "center", 
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.02,
            width: widthScreen * 0.95,
            // borderBottomWidth: 1,
            borderBottomColor: "#89CFF0",
            flex: 10
        },
        deliveryItemIcon: {
            height: "100%",
            width: "10%",
            // backgroundColor: "red",
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        deliveryItemInfoDetail: {
            height: "100%", 
            // backgroundColor: "blue",
            flex: 7,
            flexDirection: "column",
            alignItems: "flex-start",
            alignSelf: "center",
            textAlignVertical: "center", 
            alignContent: "center",
            textAlign: "center",
            // paddingVertical: heightScreen * 0.03,
            paddingHorizontal: widthScreen * 0.03
        },
        deliveryItemIconEdit: {
            height: "100%",
            width: "10%",
            // backgroundColor: "green",
            flex: 1.5,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center'
        },
        subDeliveryText: {
            fontWeight: "600",
            fontSize: widthScreen * 0.035, 
            alignSelf: "flex-end",
            color: "#8c8e91"
        },
        mainDeliveryText: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.04,
            opacity: 0.7
        },
        avatar: {
            height: avatarSize,
            width: avatarSize,
            borderRadius: avatarSize * 0.5,
            marginLeft: widthScreen * 0.01,
            marginRight: widthScreen * 0.02,
        }, 
        nameShopText: {
            fontWeight: "bold",
            fontSize: heightScreen * 0.018,   
        },
        itemContainer: {
            flexDirection: 'column', 
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.01,
            width: "90%",
            // borderBottomWidth: 1,
            // borderBottomColor: "#89CFF0",
            justifyContent: "space-around", 
        },
        item: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
        },
        taskbarForCart: {
            position: "absolute",
            bottom: 0, 
            backgroundColor: "white",
            width: widthScreen,
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.00001,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#ccdded", 
        },
        textInCart: {
            fontWeight: "bold", 
            marginRight: widthScreen * 0.04,
            opacity: 0.7,
            paddingTop: heightScreen * 0.01,
            paddingBottom: heightScreen * 0.004
        },
        itemDivContainer: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%", 
            backgroundColor: "white",
            marginBottom: heightScreen * 0.009, 
        },
        taskBarPayment: {
            flex: 1, 
            flexDirection: "row", 
            backgroundColor: "white",
            alignSelf: "flex-end",
            paddingHorizontal: widthScreen * 0.03, 
            alignItems: "center",
        }
    })
    const [array_itemListInCart, setArray_itemListInCart] = useState<any[]>([]);  
    const paymentType = {
        cash: "Tiền mặt",
        paymentOnline: "Chuyển khoản"
    }
    // const [orderInfo, setOrderInfo] = useState<orderInforType>({
    //     deliveryInfo: {
    //         id: 1,
    //         name: "Đỗ Phạm Hoàng Ân",
    //         phone: "0968795750",
    //         address: "Toà B4, KTX Khu B",
    //         isDefault: true,
    //         isChoose: true
    //     },
    //     productList: [
    //         {
    //             id: 1,
    //             name: "trà sữa ô long",
    //             price: 30000,
    //             size: "M",
    //             toppings: [
    //                 { id: 1, name: 'Thạch', price: 5000, quantity: 0 },
    //                 { id: 2, name: 'Trân châu trắng', price: 5000, quantity: 0}, 
    //             ], 
    //             quantity: 1, 
    //             totalOfItem: 30000
    //         } 
    //     ], 
    //     paymentMethod: "Tiền mặt",
    //     paymentStatus: 0,
    //     voucherID: 1,
    //     paymentAmount: 0,
    //     userID: userID
    // }) 

    const navigation = useNavigation();

    // const handleDeepLink = (event: any) => {
    //     let data = Linking.parse(event.url);
    //     // Xử lý URL và lấy dữ liệu từ event.url nếu cần
    //     console.log(data);
    //     // Thực hiện hành động sau khi trở về từ thanh toán
    // };
    

    useEffect(() => {
        // const subscription = Linking.addEventListener('url', handleDeepLink);

        const getitemListInCart = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('array_itemListInCart')
                setArray_itemListInCart(jsonValue != null ? JSON.parse(jsonValue) : null); 
                // console.log(JSON.parse(jsonValue || null)[0], 'JSON.parse(jsonValue)');
            } catch (error) {
                console.log(error)
            }
        } 

        getitemListInCart();  
        
        // return () => {
        //     subscription.remove();
        // };    
    }, []) 
    
    useEffect(() => {  
        
        const getAdress = async () => {
            const totalChecked = array_itemListInCart.reduce(((total, item) => item.isCheckedForPayment === true ? total += item.totalOfItem : total), 0);
            
            axios.get(baseURL + "/getDefaultDeliveryInfo", {params: { userID: userID}})
            .then((response) => {
                // console.log(response.data, "delivcccc222eryInfo", totalChecked, orderInfo)
                // setDeliveryInfo(response.data.defaultAddress); 
                setOrderInfo({  
                    ...orderInfo,
                    deliveryInfo: {
                        id: response.data.defaultAddress.ADDRESS_ID,
                        name: response.data.defaultAddress.NAME,
                        phone: response.data.defaultAddress.PHONE,
                        address: response.data.defaultAddress.DETAIL,
                        isDefault: true,
                        isChoose: true,
                    }, 
                    productList: array_itemListInCart,
                    paymentAmount: totalChecked,
                    userID: userID
                })
                setIsLoading(false);
            })
        }
        getAdress(); 
    }, [array_itemListInCart])

    const openInBrowser = async () => {
        // Linking.openURL(vnpURL)
        // .catch(err => {
        //     console.error("An error occurred", err); 
        // })
        await WebBrowser.openBrowserAsync(vnpURL );
    };

    useEffect(() => {
        if(vnpURL != "")
            openInBrowser();
    }, [vnpURL])

    const saveOrder = useCallback(() => {
        setIsLoading(true)
        console.log(orderInfo.productList[0].toppings, 'toppings22', orderInfo)
        axios.post(baseURL + "/saveOrder", orderInfo)
        .then((response) => {
            // xoan navigation đến trang thanh toán thành công
            orderInfo.paymentMethod === paymentType.paymentOnline ? setVnpURL(response.data.data.vnp_Url) : {};    
            setIsLoading(false);
            navigation.navigate("OrderSuccess" as never);
            console.log(response.data, 'kksks')
            // openInBrowser();
        })
        .catch((error) => {
            console.log(error)
        })
        // navigation.navigate("OrderSuccess" as never);
    }, [orderInfo])
   
    const renderTopping = (toppings: any[], indexItem: number) => {
        return toppings.map((item, index) => { 
            return (
                <ItemInCartAndPayment
                    isCart={false}
                    isTopping={true}
                    isHaveAdjusting={true} 
                    quantity={0}           
                    item={item}
                    index={index}                     
                    setArray_itemListInCart={setArray_itemListInCart}
                    indexItem={indexItem}
                ></ItemInCartAndPayment>  
            ) 
        })
    }

    const renderItemListInCart = () => {
        if(array_itemListInCart != null){ 
            return array_itemListInCart.map((item, index) => {  
                console.log(item.isCheckedForPayment, "checked")
                if(item.isCheckedForPayment)
                    return (
                        <View style={styles.itemDivContainer} key={index}> 
                            {/* checkbox */}
                            <View style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <CheckBox
                                    checked={item.isCheckedForPayment}
                                    disabled={true}
                                    onPress={() => {}}
                                    containerStyle={{
                                        padding: 0,
                                        margin: 0,
                                        opacity: 0
                                    }}
                                />
                            </View>
                            {/* itemInfo */}
                            <View style={styles.itemContainer}>
                                {/* view đầu này là của item chính */} 
                                <ItemInCartAndPayment
                                    isCart={false}
                                    isTopping={false}
                                    isHaveAdjusting={true}
                                    quantity={0}
                                    item={item}
                                    index={index}
                                    setArray_itemListInCart={setArray_itemListInCart} indexItem={0}                                // indexItem={indexItem}       
                                ></ItemInCartAndPayment>
                                <Text style={styles.textInCart}>
                                    Topping
                                </Text>
                                {/* view này là của item topping */} 
                                { renderTopping(item.toppings , index) } 
                                <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Text style={styles.textInCart}>
                                        Tổng cộng
                                    </Text>
                                    <Text style={styles.textInCart}>
                                        {item.totalOfItem}
                                    </Text>
                                </View>
                            </View> 
                        </View>
                    )
            })
        }
    }

    return(  
        isLoading 
        ? <Loading/>
        : <SafeAreaView style={[{flex: 10}]}  >    
            <Stack.Screen
                options={{
                    title: "Thanh toán",
                }}
            ></Stack.Screen>
            <ItemType1 deliveryInfo={orderInfo.deliveryInfo}></ItemType1>   
            <View style={styles.titleContainer}> 
                <View>
                    <Text  
                        style={styles.titleText}
                    >Sản phẩm mua</Text>
                </View> 
            </View>
            <ScrollView style={{flex: 7}} > 
                {/* <View> */}
                    {renderItemListInCart()} 
                {/* </View> */}
            </ScrollView>
            <View style={{flex: 0.45}}>
                <View style={styles.titleContainer}> 
                    <View style={{flexDirection: "row"}}>
                        <Text  
                            style={styles.titleText}
                        >Voucher</Text>
                        <TextInput  
                            style={{
                                // height: "100%",
                                // width: "100%", 
                                // fontWeight: "bold",
                                fontSize: widthScreen * 0.04, 
                                alignSelf: "center",
                                alignItems: "center",
                                opacity: 0.7,
                                paddingHorizontal: widthScreen * 0.02,
                                paddingVertical: heightScreen * 0.006,
                                borderWidth: 1,
                                borderRadius: widthScreen * 0.02,
                                borderColor: "#89CFF0",
                                marginLeft: widthScreen * 0.28
                            }}
                            placeholder="Nhập mã voucher"
                        ></TextInput>
                        <FontAwesome
                            name="ticket"
                            style={{
                                opacity: 0.5,
                                marginLeft: widthScreen * 0.02,
                                backgroundColor: "#5288d9",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: widthScreen * 0.05,
                                alignItems: "center",
                                alignContent: "center", 
                                paddingHorizontal: widthScreen * 0.016,
                                borderRadius: widthScreen * 0.02,
                                justifyContent: "center",
                                paddingVertical: heightScreen * 0.009
                            }}
                        ></FontAwesome>
                    </View>  
                </View> 
                <View>
                    <View style={styles.titleContainer}>  
                        <Text  
                            style={styles.titleText}
                        >Phương thức thanh toán</Text> 
                    </View>   
                    <View 
                        style={{
                            flexDirection: "row",
                            width: widthScreen * 0.8,
                            justifyContent: "space-around", 
                            alignSelf: "center",
                            paddingVertical: heightScreen * 0.009
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                checked={orderInfo.paymentMethod === paymentType.cash} 
                                onPress={
                                    () => { setOrderInfo({...orderInfo, paymentMethod: paymentType.cash}) }
                                }
                                containerStyle={{
                                    padding: 0,
                                    margin: 0, 
                                }}
                            />
                            <Text 
                                style={{
                                    fontWeight: "bold",
                                    fontSize: widthScreen * 0.04,
                                    opacity: 0.5,
                                    alignSelf: "center"
                                }}
                            >
                                { paymentType.cash }
                            </Text>
                        </View> 
                        <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                checked={orderInfo.paymentMethod === paymentType.paymentOnline} 
                                onPress={
                                    () => { setOrderInfo({...orderInfo, paymentMethod: paymentType.paymentOnline}) }
                                }
                                containerStyle={{
                                    padding: 0,
                                    margin: 0, 
                                }}
                            />
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: widthScreen * 0.04,
                                    opacity: 0.5,
                                    alignSelf: "center"
                                }}
                            >{paymentType.paymentOnline}</Text>
                        </View> 
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: "white", flex: 0.16 }}>
                <View 
                    style={styles.taskBarPayment}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: widthScreen * 0.03,
                            opacity: 0.5
                        }}
                    >Tổng tiền thanh toán: </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: widthScreen * 0.06,
                            opacity: 0.5,
                            color: "#e87823"
                        }}
                    >{orderInfo.paymentAmount} </Text>
                    <Button
                        iconName="money-bill"
                        buttonName="Đặt hàng"
                        handlePress={saveOrder} 
                    ></Button> 
                </View>
            </View>  
        </SafeAreaView>
    )
}
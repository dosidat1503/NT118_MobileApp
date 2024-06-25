 
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, TextInput } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider"; 
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; 
import { CheckBox } from 'react-native-elements';  
import ItemInCartAndPayment from "@/components/orderFAD/Cart/ItemInCartAndPayment";
import Button from "../../orderFoodAndDrink/Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'; 
import ItemType1 from "@/components/orderFAD/Payment/ItemType1";
import axios from "axios";
import Loading from "@/components/Loading";

interface ItemProductProps {
    PRICE: any;
    QUANTITY: any; 
    ID_PARENT_OD_OF_THIS_OD: any, 
    ORDER_DETAIL_ID: any; 
    fad: { FAD_NAME: any; FAD_PRICE: any; IMAGE_ID: any }; 
}

interface ItemToppingProps {
    sizes: string,
    label: string,
    name: string, 
    price: number, 
    quantity: number,
}

export default function Payment() {
    const { heightScreen, widthScreen, mainColor, baseURL, userID, setIsLoading, isLoading, orderID } = useCartContext(); 
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
    const [deliveryInfo, setDeliveryInfo] = useState<any>({}); 
    const [isCash, setIsCash] = useState(true);
    const [orderInfo, setOrderInfo] = useState({
        deliveryInfo: {
            id: 1,
            name: "Đỗ Phạm Hoàng Ân",
            phone: "0968795750",
            address: "Toà B4, KTX Khu B", 
        },
        productList: [
            {
                id: 1,
                name: "trà sữa ô long",
                price: 30000,
                uri: "",
                sizes: [
                    { label: 'M', checked: true },
                    { label: 'L', checked: false }, 
                ],
                toppings: [
                    { name: 'Thạch', price: 5000, quantity: 0 },
                    { name: 'Trân châu trắng', price: 5000, quantity: 0}, 
                ],
                note: "",
                quantity: 1, 
                totalOfItem: 30000
            } 
        ], 
        paymentMethod: "COD",
        voucherID: 1,
        paymentAmount: 0,
        userID: userID
    }) 
    
    useEffect(() => {   
        const getAdress = async () => {
            const totalChecked = array_itemListInCart.reduce(((total, item) => item.isCheckedForPayment === true ? total += item.totalOfItem : total), 0);
            console.log(orderID, "orderID")
            axios.get(baseURL + "/getOrderDetailInfo", {params: { orderID: orderID}})
            .then((response) => {  
                console.log(response.data.imagesURL, 'imagesURL')
                let indexURL = 0;
                setOrderInfo({  
                    ...orderInfo,
                    deliveryInfo: {
                        id: response.data.orderDetailInfo[0].ORDER_ID,
                        name: response.data.deliveryInfo[0].NAME,
                        phone: response.data.deliveryInfo[0].PHONE,
                        address: response.data.deliveryInfo[0].DETAIL, 
                    }, 
                    productList: response.data.orderDetailInfo[0].order_details.map((itemMainFAD: ItemProductProps) => {
                        let totalOfItem = 0;
                        totalOfItem += itemMainFAD.fad.FAD_PRICE * itemMainFAD.QUANTITY;
                        if(itemMainFAD.ID_PARENT_OD_OF_THIS_OD === null)
                        {
                            console.log(
                                itemMainFAD.ORDER_DETAIL_ID, 
                                itemMainFAD, 
                                'itemMainFAD.ORDER_DETAddIL_ID', 
                                response.data.imagesURL,
                                itemMainFAD.fad.IMAGE_ID
                            )
                            let imageObject = response.data.imagesURL.find((item: { IMAGE_ID: any; URL: any; }) => item.IMAGE_ID === itemMainFAD.fad.IMAGE_ID);
                            console.log(imageObject, 'imageObject')
                            return {
                                id: itemMainFAD.ORDER_DETAIL_ID, 
                                name: itemMainFAD.fad.FAD_NAME,
                                price: itemMainFAD.fad.FAD_PRICE,
                                uri: imageObject.URL || "",
                                sizes: [
                                    { label: 'M', checked: true },
                                    { label: 'L', checked: false }, 
                                ],
                                quantity: itemMainFAD.QUANTITY,
                                note: "",
                                toppings: response.data.orderDetailInfo[0].order_details.filter((itemSubFAD: ItemProductProps) => {
                                        return itemMainFAD.ORDER_DETAIL_ID === itemSubFAD.ID_PARENT_OD_OF_THIS_OD && itemMainFAD.ORDER_DETAIL_ID !== null;
                                    }).map((itemSubFAD: ItemProductProps) => {
                                        console.log(itemMainFAD.ORDER_DETAIL_ID, itemSubFAD.fad.FAD_NAME, 'itemSubFAD.ID_PARENT_OD_OF_THIS_OD', itemSubFAD, 'total', totalOfItem);
                                        totalOfItem += itemSubFAD.PRICE * itemSubFAD.QUANTITY;
                                        return {
                                            name: itemSubFAD.fad.FAD_NAME,
                                            price: itemSubFAD.PRICE,
                                            quantity: itemSubFAD.QUANTITY 
                                        };
                                    }),
                                totalOfItem: totalOfItem, 
                            } 
                        }
                    }),
                    paymentAmount:  response.data.orderDetailInfo[0].order_details.reduce(((total: number, item: { PRICE: number; QUANTITY: number; }) => 
                        total += item.PRICE * item.QUANTITY
                    ), 0)
                })
                // setIsLoading(false);
                console.log(response.data.imagesURL, response.data.deliveryInfo[0].NAME, "orderDetailI22nfo")
            })
        }
        getAdress(); 
    }, [])

    useEffect(() => { console.log(orderInfo.productList, 'orderInfo') }, [orderInfo.productList])
 
    const renderTopping = (itemProductList: any, indexItem: number) => {
        console.log( '2222211dc1', itemProductList.toppings[0], 'cscsc222', itemProductList)
        return itemProductList.toppings.map((item: ItemToppingProps, index: number) => { 
            
            // bởi vì trong list, khi axios trả dữ liệu về và set dữ liệu thì sẽ có một vài phần tử bị undefined 
            // nên phải kiểm tra xem item có phải là undefined không
            return (
                item !== undefined &&
                <ItemInCartAndPayment
                    isCart={false}
                    isTopping={true}
                    isHaveAdjusting={true} 
                    isOrderDetail={true}
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
        if(orderInfo.productList != null){ 
            return orderInfo.productList.map((item, index) => {   
                console.log(orderInfo.productList[0].toppings[0], 'orderInfo.productList111', item)
                return (
                    // bởi vì trong list, khi axios trả dữ liệu về và set dữ liệu thì sẽ có một vài phần tử bị undefined 
                    // nên phải kiểm tra xem item có phải là undefined không
                    item !== undefined &&
                    <View style={styles.itemDivContainer} key={index}> 
                        {/* checkbox */}
                        <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <CheckBox
                                // checked={item.isCheckedForPayment}
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
                                {
                    // bởi vì trong list, khi axios trả dữ liệu về và set dữ liệu thì sẽ có một vài phần tử bị undefined 
                    // nên phải kiểm tra xem item có phải là undefined không
                                    item !== undefined && 
                                    <ItemInCartAndPayment
                                        isCart={false}
                                        isTopping={false}
                                        isHaveAdjusting={true}
                                        quantity={0}
                                        item={item}
                                        index={index}
                                        setArray_itemListInCart={setArray_itemListInCart} indexItem={0}                                // indexItem={indexItem}       
                                    ></ItemInCartAndPayment>
                                }
                            <Text style={[styles.textInCart, item.toppings.length === 0 ? {display: "none"} : {} ]}>
                                Topping
                            </Text>
                            {/* view này là của item topping */} 
                            
                            { item !== undefined && renderTopping(item , index) } 
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
        <SafeAreaView style={[{flex: 10}]}  >  
        
            {
                isLoading
                ? <View style={{marginVertical: heightScreen * 0.045}}>
                    <Loading></Loading>
                </View> 
                : <ItemType1 
                    deliveryInfo={orderInfo.deliveryInfo}
                    isWatchOrderDetail={true}
                ></ItemType1>  
            } 
            <View style={styles.titleContainer}> 
                <View>
                    <Text  
                        style={styles.titleText}
                    >Sản phẩm mua</Text>
                </View> 
            </View>
            <ScrollView style={{flex: 7}} >  
                { renderItemListInCart() }  
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
                                checked={isCash} 
                                onPress={() => { setIsCash(!isCash) }}
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
                            >Tiền mặt</Text>
                        </View> 
                        <View style={{ flexDirection: "row" }}>
                            <CheckBox
                                checked={!isCash} 
                                onPress={() => {setIsCash(!isCash)}}
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
                            >Chuyển khoản</Text>
                        </View> 
                    </View>
                </View>
            </View>
            {/* <View style={{backgroundColor: "white", flex: 0.16 }}>
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
                </View>
            </View>   */}
        </SafeAreaView>
    )
}
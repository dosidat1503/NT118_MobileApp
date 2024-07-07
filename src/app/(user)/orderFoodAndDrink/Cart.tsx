import { Link, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/PostList";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors"
import { CheckBox } from 'react-native-elements'; 
import AdjustQuantity from "./AdjustQuantity";
import ItemInCartAndPayment from "@/components/orderFAD/Cart/ItemInCartAndPayment";
import Button from "./Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Cart() {
    const { heightScreen, widthScreen, mainColor, RD, setDetailInfoOfFAD, setShopID } = useCartContext(); 
    const avatarSize = widthScreen * 0.13; 

    const styles = StyleSheet.create({   
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
            marginBottom: heightScreen * 0.009
        }
    })
    const navigation = useNavigation();
    const [array_itemListInCart, setArray_itemListInCart] = useState<any[]>([]);
    const [isCheckedForPaymentAll, setIsCheckedForPaymentAll] = useState(false); 

    useEffect(() => {
        const getitemListInCart = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('array_itemListInCart')
                setArray_itemListInCart(jsonValue != null ? JSON.parse(jsonValue) : null);
            } catch (error) {
                console.log(error)
            }
        }
        getitemListInCart();
        
        // console.log( "totalCh2ecked" , array_itemListInCart.every((item) => item.isCheckedForPayment === true))
        // array_itemListInCart.map((item) => { console.log(item.isCheckedForPayment, "scjdjcdc") })
        // totalChecked === array_itemListInCart.length ? setIsCheckedForPaymentAll(true) : setIsCheckedForPaymentAll(false); 
    }, []) 
 
    useEffect(() => {
        const updateArray_itemListInCart = async () => {
            try {  
                await AsyncStorage.setItem('array_itemListInCart', JSON.stringify(array_itemListInCart));
            } catch(err){
                console.log(err)
            } 
        }
        updateArray_itemListInCart();
        array_itemListInCart.every((item) => item.isCheckedForPayment === true) ? setIsCheckedForPaymentAll(true) : setIsCheckedForPaymentAll(false);
    }, [array_itemListInCart])

    const handleCheckedForPayment = useCallback((item: any) => {
        // setArray_itemListInCart((prevArray_itemListInCart) => {
        //     const newArray_itemListInCart = [...prevArray_itemListInCart];
        //     newArray_itemListInCart[item.index].isCheckedForPayment = !newArray_itemListInCart[item.index].isCheckedForPayment;
        //     return newArray_itemListInCart;
        // });
        setArray_itemListInCart(
            array_itemListInCart.map((itemNeedFind) => {
                console.log(itemNeedFind.id, item.id, "ok")
                if(item.id === itemNeedFind.id) 
                {
                    console.log(itemNeedFind.isCheckedForPayment, "ok")
                    if(itemNeedFind.isCheckedForPayment === true) setIsCheckedForPaymentAll(false)
                    else{
                        const totalChecked = array_itemListInCart.reduce(((total, item) => item.isCheckedForPayment === true ? ++total : total), 0);
                        console.log(totalChecked)
                        totalChecked === array_itemListInCart.length - 1  ? setIsCheckedForPaymentAll(true) : setIsCheckedForPaymentAll(false);
                    }
                    return {
                        ...item,
                        isCheckedForPayment: !item.isCheckedForPayment
                    }
                }
                else
                    return itemNeedFind
            }
        ))
    }, [array_itemListInCart])

    const handleCheckedForPaymentAll = useCallback(() => { 
        setArray_itemListInCart(
            array_itemListInCart.map((itemNeedFind) => { 
                return {
                    ...itemNeedFind,
                    isCheckedForPayment: !isCheckedForPaymentAll
                } 
            }
        ))
        setIsCheckedForPaymentAll(!isCheckedForPaymentAll)
    }, [array_itemListInCart])

    const handleDeleteAllItemInCart = useCallback(async () => {
        setArray_itemListInCart([])
        try {
            // Remove the item from AsyncStorage
            await AsyncStorage.removeItem('array_itemListInCart'); // Replace 'key' with the key of the value you want to remove
            console.log('Value removed from AsyncStorage');
        } catch (error) {
            console.error('Error removing value from AsyncStorage:', error);
        }
        setIsCheckedForPaymentAll(false)
    } , [array_itemListInCart])

    const handlePayment = () => { 
        if(array_itemListInCart.every((item) => item.isCheckedForPayment === false) )
        {
            alert("Vui lòng chọn ít nhất một món ăn")
        }
        else {
            const firstCheckedItemShopID = array_itemListInCart.find(item => item.isCheckedForPayment)?.shopID;
            const allItemsHaveSameShopID = array_itemListInCart.every(item =>  !item.isCheckedForPayment || item.shopID === firstCheckedItemShopID);
            if(allItemsHaveSameShopID){ 
                setShopID(firstCheckedItemShopID);
                // setIsLoading(true);
                navigation.navigate('Payment' as never, {array_itemListInCart: array_itemListInCart, shopID: firstCheckedItemShopID}); 
            }
            else{
                alert("Vui lòng chọn món ăn trong cùng một cửa hàng")
            }
        } 
        
    }
    
    const renderTopping = (toppings: any[], indexItem: number) => {
        return toppings.map((item, index) => { 
            console.log(item, "caksncksa2")
            return (
                <ItemInCartAndPayment
                    isCart={true}
                    isTopping={true}
                    isHaveAdjusting={true} 
                    quantity={0}           
                    item={item}
                    index={index}                     
                    setArray_itemListInCart={setArray_itemListInCart}
                    indexItem={indexItem}
                    key={index}
                ></ItemInCartAndPayment>  
            ) 
        })
    }

    const renderItemListInCart = () => {
        if(array_itemListInCart != null){
            return array_itemListInCart.map((item, index) => { 
                return (
                    <View style={styles.itemDivContainer} key={index} >
                        {/* checkbox */}
                        <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <CheckBox
                                checked={item.isCheckedForPayment}
                                onPress={() => handleCheckedForPayment(item)}
                                containerStyle={{
                                    padding: 0,
                                    margin: 0,
                                }}
                            />
                        </View>
                        {/* itemInfo */}
                        <View style={styles.itemContainer}>
                            {/* view đầu này là của item chính */} 
                            <View 
                                style={{ 
                                    flexDirection: "row", 
                                    borderWidth: 1,
                                    borderColor: mainColor,
                                    borderRadius: RD * 0.00003,
                                    paddingHorizontal: widthScreen * 0.02,
                                    paddingVertical: heightScreen  * 0.005,
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    alignSelf: 'flex-start',
                                    backgroundColor: "#FFFCE8",
                                    flexShrink: 1, 
                                    opacity: 0.7
                                }}
                            >
                                {
                                    item.shopAvatarURL && 
                                    <Image
                                        source={{uri: item.shopAvatarURL || ""}}
                                        style={{
                                            height: RD * 0.00005,
                                            width: RD * 0.00005,
                                            borderRadius: avatarSize * 0.5,
                                            // marginLeft: widthScreen * 0.01,
                                            marginRight: widthScreen * 0.02, 
                                        }}
                                    ></Image>
                                }
                                <Text style={[styles.nameShopText, { opacity: 0.8 }]}>
                                    {item.shopName || ""}
                                </Text>
                            </View>
                                <ItemInCartAndPayment
                                    isCart={true}
                                    isTopping={false}
                                    isHaveAdjusting={true} 
                                    quantity={0}        
                                    item={item}
                                    index={index}             
                                    setArray_itemListInCart={setArray_itemListInCart}
                                    indexItem={index}       
                                ></ItemInCartAndPayment> 
                            <Text style={[
                                styles.textInCart,
                                item.toppings.length === 0 ? {display: "none"} : {display: "flex"}
                            ]}>
                                Topping
                            </Text>
                            {/* view này là của item topping */} 
                            {
                                renderTopping(item.toppings , index) 
                            } 
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
        <SafeAreaView style={{flex: 1}}>  
            <Stack.Screen
                options={{
                    title: "Giỏ hàng",
                }}
            >
            </Stack.Screen>
            <ScrollView style={{flex: 1, marginBottom: heightScreen * 0.05}}> 
                {/* đây là view của một item */} 
                {renderItemListInCart()} 
            </ScrollView>
            <View style={styles.taskbarForCart} >
                <View style={{ flexDirection: "row"}}>
                    <CheckBox
                        checked={isCheckedForPaymentAll}
                        onPress={() => handleCheckedForPaymentAll()}
                        containerStyle={{
                            padding: 0,
                            margin: 0,
                            alignSelf: "center"
                        }}
                    />
                    <Button
                        iconName="trash-alt"
                        buttonName=""
                        handlePress={() => handleDeleteAllItemInCart()}
                    ></Button>
                </View>
                <View style={{
                        paddingRight: widthScreen * 0.04,
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.textInCart} >
                        {array_itemListInCart.reduce((total, item) => item.isCheckedForPayment === true ? total + item.totalOfItem : total, 0)}
                    </Text>
                    {/* <Link href={'/(user)/orderFoodAndDrink/Payment'}> */}
                        <Button
                            iconName="money-bill-alt"
                            buttonName="THANH TOÁN"
                            handlePress={() => handlePayment()}
                        ></Button>
                    {/* </Link> */}
                </View>
            </View>
        </SafeAreaView>
    )
}
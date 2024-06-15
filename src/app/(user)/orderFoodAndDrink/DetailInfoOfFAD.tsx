
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable } from "react-native";
import { CheckBox } from 'react-native-elements'; 
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/PostList";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import SlideHeaderOrderFAD from "@/components/orderFAD/SlideHeaderOrderFAD";
import { useState } from "react";
import Button from "./Button";
import AdjustQuantity from "./AdjustQuantity";
import products from "@assets/data/products"; 
import { useRoute, RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react"; 
import React from "react";
import axios from "axios";


type RootStackParamList = {
    DetailInfoOfFAD: { item: any }; // Replace 'any' with the actual type of 'item'
};
interface Size {
    label: string;
    checked: boolean;
}

interface Topping {
    label: string;
    quantity: number;
    price: number;
    id: number;
}

interface toppingItem {
    FAD_PRICE: any; 
    FAD_NAME: any; 
    label: string; 
    price: number;  
    FAD_ID: number;
}

interface OrderInfo {
    id: number;
    name: string;
    price: number;
    sizes: Size[];
    toppings: Topping[];
    note: string;
    quantity: number;
    isCheckedForPayment: boolean;
    totalOfItem: number;
}


export default function DetailInfoOfFAD() {
    const { heightScreen, widthScreen, mainColor, DetailInfoOfFAD, baseURL } = useCartContext();
    const heightNameFAD = heightScreen * 0.08;
    const widthNameFAD = widthScreen * 0.95;
    const widthPaddingNameFAD = widthScreen * 0.04 
      
    const route = useRoute<RouteProp<RootStackParamList, 'DetailInfoOfFAD'>>();
    const product = route.params?.item;  

    const [isAdding, setIsAdding] = useState(false);

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
            justifyContent: "center",
            paddingHorizontal: widthScreen * 0.06,
            borderTopWidth: 1, 
            borderColor: "#89CFF0",
            paddingVertical: heightScreen * 0.009,
            marginTop: heightScreen * 0.01
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
    }) 

    const [orderInfoOfItem, setOrderInfoOfItem] = useState<OrderInfo>({
        id: DetailInfoOfFAD.FAD_ID,
        name: DetailInfoOfFAD.FAD_NAME,
        price: DetailInfoOfFAD.FAD_PRICE,
        sizes: [
            { label: 'M', checked: false },
            { label: 'L', checked: false }, 
        ],
        toppings: [
            { id: 1, label: 'Thạch', price: 5000, quantity: 0 },
            { id: 2, label: 'Trân châu trắng', price: 5000, quantity: 0}, 
        ],
        note: "",
        quantity: 1,
        isCheckedForPayment: true,
        totalOfItem: 0
    })

    useEffect(() => { 
        console.log(DetailInfoOfFAD, "DetailInfoOfFAD1", product)
        axios.get(baseURL + '/getFADDetailInfo', {params: {FAD_ID: DetailInfoOfFAD.FAD_ID}})
        .then( (res) => {
            console.log(res.data, "DetailInfoOfFAD2") 
            setOrderInfoOfItem({
                ...orderInfoOfItem, 
                toppings: res.data.topping.map(( item: toppingItem  ) => { 
                    return { 
                        id: item.FAD_ID,
                        label: item.FAD_NAME, 
                        price: item.FAD_PRICE,
                        quantity: 0 
                    }
                })
            })
        })
    }, [])

    useEffect(() => {
        const totalOfTopping = orderInfoOfItem.toppings.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalOfItem = orderInfoOfItem.price * orderInfoOfItem.quantity;
        setOrderInfoOfItem({
            ...orderInfoOfItem,
            totalOfItem: totalOfTopping + totalOfItem, 
        })
    }, [orderInfoOfItem.toppings])
 
    const handleCheckBoxChange = (index: number) => { 
        setOrderInfoOfItem( 
            {
                ...orderInfoOfItem,
                sizes: orderInfoOfItem.sizes.map((size, idx) => {
                    if (idx === index) {
                        return { ...size, checked: true };
                    } else {
                        return { ...size, checked: false };
                    }
                })
            }
        ) 
    };

    const handleAdjustQuantityTopping = (index: number, type: string, quantityFromInput: OrderInfo["quantity"]) => {  
        setOrderInfoOfItem( 
            {
                ...orderInfoOfItem,
                toppings: orderInfoOfItem.toppings.map((item, idx) => {
                    if (idx === index) {
                        return { 
                            ...item, 
                            quantity: 
                                type === "increase" ? ++item.quantity : 
                                    type === "decrease" ? (item.quantity !== 0 ? --item.quantity : 0) : 
                                        quantityFromInput || 0
                        };
                    }  else {
                        return item;
                    }
                }), 
            }
        ) 
        console.log(orderInfoOfItem.totalOfItem, "totalOfItem")
    };
    
    const handleAdjustQuantityItem = (index: number, type: string, quantityFromInput: OrderInfo["quantity"]) => {
        setOrderInfoOfItem( 
            {
                ...orderInfoOfItem,
                quantity: 
                    type === "increase" ? ++orderInfoOfItem.quantity : 
                        type === "decrease" ? (orderInfoOfItem.quantity !== 0 ? --orderInfoOfItem.quantity : 0) : 
                            quantityFromInput || 0,  
            }
        )
        console.log(orderInfoOfItem.totalOfItem, "totalOfItem")
    }

    const renderListSizes = orderInfoOfItem.sizes.map((item, index) => {
        return ( 
            <View 
                style={styles.sizeItem}
            > 
                <View>
                    <Text style={styles.subTextSelect}>{item.label}</Text>
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
        )
    })
 
    const renderListTopping = orderInfoOfItem.toppings.map((item, index) => {
    return ( 
        <View 
        key={index} 
        style={styles.sizeItem}
        > 
            <View>
                <Text style={styles.subTextSelect}>{item.label}</Text>
            </View>
            <AdjustQuantity
                index={index}
                quantity={item.quantity}
                handleAdjustQuantity={handleAdjustQuantityTopping}
            ></AdjustQuantity>
        </View>
    );
    });

    const addToCart = async () => { 
        setIsAdding(true);
        setTimeout(() => {
          setIsAdding(false);
        }, 2000);
        try { 
            let array_a = [];
            let array_itemListInCart = await AsyncStorage.getItem('array_itemListInCart')
            array_itemListInCart = array_itemListInCart !== null 
                ? JSON.parse(array_itemListInCart)
                : [];
    
            await AsyncStorage.setItem('item', JSON.stringify(orderInfoOfItem));
            console.log("done asyncStorage", array_itemListInCart);
    
            const getItem = await AsyncStorage.getItem('item');
            const getItemParsed = await JSON.parse(getItem);
    
            if (array_itemListInCart !== null && Array.isArray(array_itemListInCart)) {
                const existingItemIndex = array_itemListInCart.findIndex(item => {
                    return  (
                        item.id === getItemParsed.id   
                        && item.sizes.findIndex((item: { checked: any; label: any; }, index: string | number) => {
                                return (
                                    getItemParsed.sizes[index].checked === item.checked 
                                    && getItemParsed.sizes[index].label === item.label
                                )
                            }) !== -1 // có nghĩa là size giống nhau
                        && item.toppings.every((item: { label: any; quantity: any; price: any; }, index: string | number) => {
                                return getItemParsed.toppings.some((item2: { label: any; quantity: any; price: any; }) => {
                                    return (item2.label === item.label && item2.quantity === item.quantity && item2.price === item.price)
                                })
                            }) === true // có nghĩa là topping đều giống nhau
                    )
                });
                console.log("existingItemIndex existingItemIndex", existingItemIndex, array_itemListInCart[0]);
                if (existingItemIndex !== -1) {
                    // Nếu item đã tồn tại trong mảng
                    console.log("tăng quantity")
                    array_itemListInCart[existingItemIndex].quantity++; // Tăng quantity
                } else {
                    // Nếu item chưa tồn tại trong mảng
                    console.log("thêm item")
                    array_itemListInCart.push(getItemParsed); // Thêm item mới vào mảng
                }
            } else {
                console.log("failt");
            }

            await AsyncStorage.setItem('array_itemListInCart', JSON.stringify(array_itemListInCart));
    
            console.log(await AsyncStorage.getItem('array_itemListInCart'), "test");
        } catch(err){
            console.log(err)
        }
    }

    return(
            <ScrollView> 
        <View>
                <Stack.Screen 
                    options={{ 
                        title: "Chi tiết sản phẩm",
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
                <SlideHeaderOrderFAD
                    products={[{
                        url: DetailInfoOfFAD.FOOD_IMAGE_URL,
                    }]}
                ></SlideHeaderOrderFAD>
                <View style={styles.nameFADDivContainer}>
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
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center', 
                }}>
                    <View style={styles.titleFADContainer}> 
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
                    <View style={styles.selectItemContainer}>
                        {renderListSizes}
                    </View> 
                    <View style={styles.titleFADContainer}> 
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
                    <View style={styles.selectItemContainer}>
                        {renderListTopping}
                    </View> 
                    <View style={styles.titleFADContainer}> 
                        <View>
                            <Text  
                                style={styles.nameFADText}
                            >Thêm ghi chú</Text>
                        </View>
                        <View>
                            <Text  
                                style={[styles.require]}
                            >Không bắt buộc</Text>
                        </View>
                    </View>
                    <View style={styles.selectItemContainer}>
                        <TextInput
                            placeholder="Nhập yêu cầu của bạn"
                            multiline={true}
                            style={styles.inputNote}  
                            value={orderInfoOfItem.note}
                            onChangeText={(text) => setOrderInfoOfItem({...orderInfoOfItem, note: text})}
                        > 
                        </TextInput>
                    </View>
                </View>
                <View  
                    style={styles.inputFADQuantityContainer}
                > 
                    <View>
                        <Text style={styles.subTextSelect}>Số lượng</Text>
                    </View>
                    <AdjustQuantity
                        index={0}
                        quantity={orderInfoOfItem.quantity}
                        handleAdjustQuantity={handleAdjustQuantityItem}
                    ></AdjustQuantity>
                </View> 
                <View style={styles.buttonContainer}> 
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
                    <Button
                        iconName="money-bill-alt"
                        buttonName="THANH TOÁN"
                        handlePress={() => {}}
                    ></Button>
                </View>
        </View>
            </ScrollView> 
    )
}
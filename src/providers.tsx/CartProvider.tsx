import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { CartItem, Product } from "@/types";
import {randomUUID} from 'expo-crypto' 
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

type productsProp = {
    id: number,
    name: string,
    image: string,
    price: number 
}

type selectedItemProp = {
    topicItem: any[],
    sortByItem: number, 
    startDate: string,
    endDate: string 
}

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
    note: string,
    discountValue: number,
    paymentStatus: number,
    voucherCODE: string,
    paymentTotal: number,
    userID: number 
}

type CartType = {
    // items: CartItem[],
    // addItem: (product: Product, size: CartItem['size']) => void,
    // updateQuantity: (itemId: string, amount: -1 | 1) => void,
    // total: number,
    widthScreen: number,
    heightScreen: number,
    mainColor: string,
    products: productsProp[], 
    baseURL: string,
    emailPattern: RegExp,
    phoneNumberPattern: RegExp,
    fullNamePattern: RegExp, 
    defaultImageID: number,
    // textQueryPost: string,
    // setTextQueryPost: any,
    orderStatusList: any,
    userID: number,
    setUserID: any, 
    setFADShop_ID: any,  
    setDetailInfoOfFAD: any, 
    RD: number, //rectangular diagonal  
    setOrderID: any,   
    setTextToSearchFAD: any,  
    setTagIDToGetFADInfo: any, 
    setVnpURL: any,
    // deliveryInfoItem: any,
    // setDeliveryInfoItem: any, 
    isUpdatedInfoDelivery: boolean,
    setIsUpdatedInfoDelivery: any, 
    setOrderInfo: any, 
    setShopID: any, 
    setContentForOrderSuccess: any,
    returnHome: boolean,
    setReturnHome: any
}

const CartContext = createContext<CartType>({
    // items: [],
    // addItem: () => {},
    // updateQuantity: () => {},
    // total: 0,
    widthScreen: 0,
    heightScreen: 0,
    mainColor: "#89CFF0",
    products: [],  
    baseURL: "http://26.85.40.176:8000/api",
    emailPattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    phoneNumberPattern: /^0\d{9}$/,
    fullNamePattern: /^[\p{L}\s]+$/u, 
    defaultImageID: 1,
    // textQueryPost: "",
    // setTextQueryPost: () => {},
    orderStatusList: [],
    userID: 0,
    setUserID: () => {}, 
    setFADShop_ID: () => {},  
    setDetailInfoOfFAD: () => {}, 
    RD: 0, 
    setOrderID: () => {},    
    setTextToSearchFAD: ()=> {},  
    setTagIDToGetFADInfo: () => {}, 
    setVnpURL: () => {},
    // deliveryInfoItem: {},
    // setDeliveryInfoItem: () => {}, 
    isUpdatedInfoDelivery: false,
    setIsUpdatedInfoDelivery: () => {},
    // orderInfo: {
    //     deliveryInfo: {
    //         id: 0,
    //         name: "",
    //         phone: "",
    //         address: "",
    //         isDefault: false,
    //         isChoose: false
    //     },
    //     productList: [],
    //     paymentMethod: "",
    //     note: "",
    //     discountValue: 0,
    //     paymentStatus: 1,
    //     voucherCODE: "",
    //     paymentTotal: 0,
    //     userID: 0,
    // },
    setOrderInfo: () => {},  
    setShopID: () => {}, 
    setContentForOrderSuccess: () => {},
    returnHome: false,
    setReturnHome: () => {}
});

const CartProvider = ({children} : PropsWithChildren) => {
    // const [items, setItems] = useState<CartItem[]>([])
    // const addItem = (product: Product, size: CartItem['size']) => {
    //     const existingItem = items.find(item => item.product === product && size === item.size)

    //     if(existingItem){
    //         updateQuantity(existingItem.id, 1);
    //         return;
    //     }

    //     const newCartItem: CartItem = {
    //         id: randomUUID(),
    //         product,
    //         product_id: product.id,
    //         size,
    //         quantity: 1
    //     }
    //     setItems([newCartItem, ...items]);
    // }
    // const updateQuantity = (itemId: string, amount: -1 | 1) => {
    //     const updateItems = items.map((item) => item.id === itemId ? {...item, quantity: item.quantity + amount} : item)
    //     setItems(updateItems);
    // }
    // const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);
    const widthScreen = Dimensions.get("window").width
    const heightScreen = Dimensions.get("window").height
    const mainColor = "#89CFF0"
    const baseURL = "http://26.85.40.176:8000/api"
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const phoneNumberPattern = /^0\d{9}$/
    const fullNamePattern = /^[\p{L}\s]+$/u
    const defaultImageID = 1
    // const [textQueryPost, setTextQueryPost] = useState("") 
    const [userID, setUserID] = useState(1)
    // const [FADShop_ID, setFADShop_ID] = useState(0) 
    const setFADShop_ID = (id: number) => {
        AsyncStorage.setItem('FADShop_ID', id.toString());
    } 
    // const [DetailInfoOfFAD, setDetailInfoOfFAD] = useState({} as any) // Fix: Update the type of DetailInfoOfFAD to any
    const setDetailInfoOfFAD = (data: any) => {
        AsyncStorage.setItem('DetailInfoOfFAD', JSON.stringify(data));
    }  
    const setOrderID = (id: number) => {
        AsyncStorage.setItem('orderID', id.toString());
    } 
    const setTextToSearchFAD = (text: string) => {
        AsyncStorage.setItem('textToSearchFAD', text);
    }

    const setVnpURL = (url: string) => {
        AsyncStorage.setItem('vnpURL', url);
    }
    // const setIsUpdatedInfoDelivery = (value: boolean) => {
    //     AsyncStorage.setItem('isUpdatedInfoDelivery', value.toString());
    // }
    const [isUpdatedInfoDelivery, setIsUpdatedInfoDelivery] = useState(false) // Fix: Update the type of isUpdatedInfoDelivery to boolean
    const setShopID = (id: number) => {
        AsyncStorage.setItem('shopID', id.toString());
    }
    const setContentForOrderSuccess = (content: string) => {
        AsyncStorage.setItem('contentForOrderSuccess', content);
    }
    const setTagIDToGetFADInfo = (id: number) => {
        AsyncStorage.setItem('tagIDToGetFADInfo', id.toString());
    }
    const RD = widthScreen * heightScreen;//rectangular diagonal      
    const [returnHome, setReturnHome] = useState(false) // Fix: Update the type of returnHome to boolean
    
    const products = [
        {
            id: 1,
            name: 'Ultimate Pepperoni',
            image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png',
            price: 12.99,
        },
        {
            id: 2,
            name: 'ExtravaganZZa',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png',
            price: 14.99,
        },
        {
            id: 3,
            name: 'MeatZZa',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png',
            price: 13.47,
        },
        {
            id: 4,
            name: 'Margarita',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/margarita.png',
            price: 9.9,
        },
        {
            id: 5,
            name: 'Pacific Veggie',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png',
            price: 12.99,
        },
        {
            id: 6,
            name: 'Hawaiian',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/hawaiin.png',
            price: 10.49,
        },
        {
            id: 7,
            name: 'Deluxe',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/deluxe.png',
            price: 16.99,
        },
        {
            id: 8,
            name: 'BBQ Chicken',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/veggie.png',
            price: 12.89,
        },
        {
            id: 9,
            name: 'Chicken Bacon Ranch',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png',
            price: 13.99,
        },
        {
            id: 10,
            name: '6 Cheese',
            image:
                'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/6cheese.png',
            price: 13.29,
        },
    ];

    const orderStatusList = [
        { id: 1, name: "Chờ xác nhận", icon: "clock"},
        { id: 2, name: "Đang chuẩn bị", icon: "clock" },
        { id: 3, name: "Đang giao", icon: "motorcycle" },
        { id: 4, name: "Đã giao", icon: "clipboard-check" },
        { id: 5, name: "Đã hủy", icon: "window-close" }
    ]
     
    // const [deliveryInfoItem, setDeliveryInfoItem] = useState({ 
    //     name: "",
    //     phone: 0,
    //     address: "",
    // })

    const setOrderInfo = (orderInfo: orderInforType) => {
        AsyncStorage.setItem('orderInfo', JSON.stringify(orderInfo));
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
    //     note: "",
    //     paymentStatus: 0,
    //     voucherCODE: "",
    //     discountValue: 0,
    //     paymentTotal: 0,
    //     userID: userID
    // }) 
 
    return (
        <CartContext.Provider value={{
            // items, addItem, updateQuantity, total, 
            heightScreen, widthScreen, mainColor, products,  
            baseURL, emailPattern, phoneNumberPattern, fullNamePattern, // Fix: Update the type of emailPattern to string
            defaultImageID, 
            // textQueryPost, setTextQueryPost,
            orderStatusList, userID, setUserID,
            setFADShop_ID, 
            setDetailInfoOfFAD, RD,  setOrderID,
            setTextToSearchFAD,  setTagIDToGetFADInfo,
            setVnpURL,
            // deliveryInfoItem, setDeliveryInfoItem,
            setIsUpdatedInfoDelivery,  setOrderInfo, setShopID,
            setContentForOrderSuccess,  
            returnHome, setReturnHome,
            isUpdatedInfoDelivery,
        }}> 
            {children}
        </CartContext.Provider>
    )   
}

export default CartProvider;
export const useCartContext = () => useContext(CartContext);
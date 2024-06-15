import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { CartItem, Product } from "@/types";
import {randomUUID} from 'expo-crypto' 
import React from 'react';

type productsProp = {
    id: number,
    name: string,
    image: string,
    price: number 
}

type selectedItemProp = {
    topicItem: any[],
    sortByItem: string,
    startDate: string,
    endDate: string 
}

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number,
    widthScreen: number,
    heightScreen: number,
    mainColor: string,
    products: productsProp[],
    itemListInCart: any,
    setItemListInCart: any,
    baseURL: string,
    emailPattern: RegExp,
    phoneNumberPattern: RegExp,
    fullNamePattern: RegExp, 
    defaultImageID: number,
    textQueryPost: string,
    setTextQueryPost: any,
    orderStatusList: any,
    userID: number,
    setUserID: any,
    FADShop_ID: number,
    setFADShop_ID: any,
    DetailInfoOfFAD: any,
    setDetailInfoOfFAD: any,
    isLoading: boolean,
    setIsLoading: any,
    RD: number, //rectangular diagonal 
    orderID: number,
    setOrderID: any, 
    selectedItem: selectedItemProp,
    setSelectedItem: any,
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
    widthScreen: 0,
    heightScreen: 0,
    mainColor: "#89CFF0",
    products: [],
    itemListInCart: [],
    setItemListInCart: () => {},
    baseURL: "http://tcp.ap.ngrok.io:16026/api",
    emailPattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    phoneNumberPattern: /^0\d{9}$/,
    fullNamePattern: /^[\p{L}\s]+$/u, 
    defaultImageID: 1,
    textQueryPost: "",
    setTextQueryPost: () => {},
    orderStatusList: [],
    userID: 0,
    setUserID: () => {},
    FADShop_ID: 0, 
    setFADShop_ID: () => {},
    DetailInfoOfFAD: {},
    setDetailInfoOfFAD: () => {},
    isLoading: false,
    setIsLoading: () => {},
    RD: 0,
    orderID: 1,
    setOrderID: () => {},  
    selectedItem: {
        topicItem: [],
        sortByItem: "",
        startDate: "",
        endDate: "" 
    },
    setSelectedItem: () => {},
});

const CartProvider = ({children} : PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])
    const addItem = (product: Product, size: CartItem['size']) => {
        const existingItem = items.find(item => item.product === product && size === item.size)

        if(existingItem){
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }
        setItems([newCartItem, ...items]);
    }
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updateItems = items.map((item) => item.id === itemId ? {...item, quantity: item.quantity + amount} : item)
        setItems(updateItems);
    }
    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);
    const widthScreen = Dimensions.get("window").width
    const heightScreen = Dimensions.get("window").height
    const mainColor = "#89CFF0"
    const baseURL = "http://tcp.ap.ngrok.io:16026/api"
    const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const phoneNumberPattern = /^0\d{9}$/
    const fullNamePattern = /^[\p{L}\s]+$/u
    const defaultImageID = 1
    const [textQueryPost, setTextQueryPost] = useState("") 
    const [userID, setUserID] = useState(0)
    const [FADShop_ID, setFADShop_ID] = useState(0)
    const [DetailInfoOfFAD, setDetailInfoOfFAD] = useState({} as any) // Fix: Update the type of DetailInfoOfFAD to any
    const [isLoading, setIsLoading] = useState(false)
    const RD = widthScreen * heightScreen;//rectangular diagonal
    const [orderID, setOrderID] = useState(1) // Fix: Update the type of orderDetailID to number 
    
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

    const [itemListInCart, setItemListInCart] =  useState([
        {
            name: "Cơm sườn",
            price: 45000,
            sizes: [
                { label: 'M', checked: false },
                { label: 'L', checked: false }, 
            ],
            toppings: [
                { label: 'Thạch', quantity: 0 },
                { label: 'Trân châu trắng', quantity: 0}, 
            ],
            note: "",
            quantity: 1
        }
    ])

    const orderStatusList = [
        { id: 1, name: "Chờ xác nhận", icon: "clock"},
        { id: 2, name: "Đang chuẩn bị", icon: "clock" },
        { id: 3, name: "Đang giao", icon: "motorcycle" },
        { id: 4, name: "Đã giao", icon: "clipboard-check" },
        { id: 5, name: "Đã hủy", icon: "window-close" }
    ]
    
    
    const [selectedItem, setSelectedItem] = useState({
        topicItem: [],
        sortByItem: '',
        startDate: "",
        endDate: "", 
    }) 
 
    return (
        <CartContext.Provider value={{
            items, addItem, updateQuantity, total, 
            heightScreen, widthScreen, mainColor, products, 
            itemListInCart, setItemListInCart,
            baseURL, emailPattern, phoneNumberPattern, fullNamePattern, // Fix: Update the type of emailPattern to string
            defaultImageID, textQueryPost, setTextQueryPost,
            orderStatusList, userID, setUserID,
            setFADShop_ID, FADShop_ID,
            DetailInfoOfFAD, setDetailInfoOfFAD,
            isLoading, setIsLoading, RD, 
            selectedItem, setSelectedItem, orderID, setOrderID
        }}> 
            {children}
        </CartContext.Provider>
    )  

}

export default CartProvider;
export const useCartContext = () => useContext(CartContext);
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { CartItem, Product } from "@/types";
import {randomUUID} from 'expo-crypto'

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    total: number,
    widthScreen: number,
    heightScreen: number,
    mainColor: string,
    products: [],
    itemListInCart: any,
    setItemListInCrart: any
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
    setItemListInCrart: () => {}
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

    const [itemListInCart, setItemListInCrart] =  useState([
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
  
 
    return (
        <CartContext.Provider value={{
            items, addItem, updateQuantity, total, heightScreen, widthScreen, mainColor, products, itemListInCart, setItemListInCrart
        }}> 
            {children}
        </CartContext.Provider>
    )  

}

export default CartProvider;
export const useCartContext = () => useContext(CartContext);
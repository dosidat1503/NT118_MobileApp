import { View, Text, Image, StyleSheet, ScrollView, Pressable, TouchableOpacity } from "react-native"; 
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/PostList";
import AdjustQuantity from "../../../app/(user)/orderFoodAndDrink/AdjustQuantity";
import { FontAwesome5 } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import { useNavigation } from '@react-navigation/native';

interface Topping {
    label: string;
    quantity: number;
    price: number;
}
interface ItemInCartAndPaymentProps {
    isCart: boolean,
    isTopping: boolean,
    isRating?: boolean,
    isHaveAdjusting: boolean,
    isOrderDetail?: boolean,
    quantity: number,
    item: {
        sizes: any;
        label: string,
        name: string,
        price: number,
        quantity: number,
        uri?: string
    },
    index: number,// index này thì có thể là indexItem hoặc indexTopping tuỳ thuộc vào câu lệnh gọi ItemInCartAndPayment là ở Item hay Topping
    indexItem: number,// cái này luôn là indexItem nó sẽ được gọi ở câu lệnh gọi ItemInCartAndPayment ở Topping, dùng để xác định index của Item
    setArray_itemListInCart?: (value: any) => void // Add the missing property
}

export default function ItemInCartAndPayment({ isCart, isTopping, isHaveAdjusting, quantity, item, index, setArray_itemListInCart, indexItem, isOrderDetail, isRating = false}: ItemInCartAndPaymentProps){
    const { heightScreen, widthScreen, mainColor, setDetailInfoOfFAD } = useCartContext();

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
            borderBottomWidth: 1,
            borderBottomColor: "#89CFF0",
            justifyContent: "space-around", 
        },
        item: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: heightScreen * 0.0045 ,
            borderBottomWidth: 1,
            borderBottomColor: "#cbd0d6",

        },
        hidden: {
            display: "none"
        }
    })
    const navigation = useNavigation();
    
    const saveToAssyncStorage = async (value: any) => { 
        console.log(value, "value", AsyncStorage.getAllKeys())
        await AsyncStorage.setItem('array_itemListInCart', JSON.stringify(value));
    }

    const handleAdjustQuantity = (indexIgnore: number, type: string, quantityFromInput: ItemInCartAndPaymentProps["quantity"]) => {  
        console.log(isTopping, "topping", index, indexItem, "ôkok", item)
        isTopping
        ? setArray_itemListInCart( (prevArray_itemListInCart: any) => {
            const newArray_itemListInCart = [...prevArray_itemListInCart];

            type === "increase" 
                ? ++newArray_itemListInCart[indexItem].toppings[index].quantity 
                : type === "decrease" 
                    ? (
                        newArray_itemListInCart[indexItem].toppings[index].quantity !== 0 
                            ? --newArray_itemListInCart[indexItem].toppings[index].quantity 
                            : 0
                    ) 
                    : newArray_itemListInCart[indexItem].toppings[index].quantity = quantityFromInput || 0 
            
            const totalOfTopping = newArray_itemListInCart[indexItem].toppings.length !== 0 
                                    ? newArray_itemListInCart[indexItem].toppings.reduce((total: number, item : Topping) => total + item.price * item.quantity, 0) * newArray_itemListInCart[indexItem].quantity 
                                    : 0;
             
            const checkedSize = newArray_itemListInCart[indexItem].sizes.length !== 0 
                                ? newArray_itemListInCart[indexItem].sizes.find((size: any) => size.checked === true) 
                                : 0;

            // console.log(checkedSize, "checkedS22ize",  newArray_itemListInCart[indexItem])
            // console.log(newArray_itemListInCart[indexItem].price, "pri22ce", newArray_itemListInCart[indexItem].price + checkedSize.price)

            const checkedSizePrice =  checkedSize !== 0 ? checkedSize.price : 0
            const totalOfItem = (newArray_itemListInCart[indexItem].price + checkedSizePrice) * newArray_itemListInCart[indexItem].quantity;

            newArray_itemListInCart[indexItem].totalOfItem = totalOfTopping + totalOfItem;
            saveToAssyncStorage(newArray_itemListInCart)// phải để đúng vị trí này thì nó mới đúng được
            return newArray_itemListInCart;
        }) 
        : (setArray_itemListInCart( (prevArray_itemListInCart: any) => {
            const newArray_itemListInCart = [...prevArray_itemListInCart];
            console.log(isTopping, "toppwing", item.price )

            type === "increase" 
                ? ++newArray_itemListInCart[index].quantity 
                : type === "decrease" 
                    ? (
                        newArray_itemListInCart[index].quantity !== 0 
                            ? --newArray_itemListInCart[index].quantity 
                            : 0
                    ) 
                    : newArray_itemListInCart[index].quantity = quantityFromInput || 0 

            const totalOfTopping =  newArray_itemListInCart[index].toppings.length !== 0
                                    ? newArray_itemListInCart[index].toppings.reduce((total: number, item : Topping) => total + (item.price * item.quantity), 0) * newArray_itemListInCart[index].quantity
                                    : 0;

            const checkedSize = newArray_itemListInCart[index].sizes.length !== 0 
                                ? newArray_itemListInCart[index].sizes.find((size: any) => size.checked === true)
                                : 0;
            console.log(totalOfTopping, checkedSize, "totalofTopping and checkedsize")
            const checkedSizePrice =  checkedSize !== 0 ? checkedSize.price : 0
            const totalOfItem = (newArray_itemListInCart[index].price + checkedSizePrice) * newArray_itemListInCart[index].quantity;
            console.log(totalOfItem, "totalOfI22tem", checkedSizePrice )
            newArray_itemListInCart[index].totalOfItem = totalOfTopping + totalOfItem;
            saveToAssyncStorage(newArray_itemListInCart)
            return newArray_itemListInCart;
        })) 
    };

    const handleDeleteItem = (itemDelete: ItemInCartAndPaymentProps["item"]) => {
        isTopping
        ? setArray_itemListInCart( (prevArray_itemListInCart: any) => {
            const newArray_itemListInCart = [...prevArray_itemListInCart];
            newArray_itemListInCart[indexItem].toppings = newArray_itemListInCart[indexItem].toppings.filter((item: any) => item !== itemDelete);

            const totalOfTopping = newArray_itemListInCart[indexItem].toppings.reduce((total: number, item : Topping) => total + item.price * item.quantity, 0);
            const totalOfItem = newArray_itemListInCart[indexItem].price * newArray_itemListInCart[indexItem].quantity;
            newArray_itemListInCart[indexItem].totalOfItem = totalOfTopping + totalOfItem;

            saveToAssyncStorage(newArray_itemListInCart)

            return newArray_itemListInCart;
        })
        : setArray_itemListInCart( (prevArray_itemListInCart: any) => {
            const newArray_itemListInCart = [...prevArray_itemListInCart];

            newArray_itemListInCart.splice(index, 1);
            saveToAssyncStorage(newArray_itemListInCart)

            return newArray_itemListInCart;
        })
    }

    const handlePressMainItem = (item: any) => {
        setDetailInfoOfFAD({
            FAD_ID: item.id,
            FAD_NAME: item.name,
            FAD_PRICE: item.price,
            FOOD_IMAGE_URL: item.uri,
            SHOP_NAME: item.shopName,
        }) 
        navigation.navigate('DetailInfoOfFAD' as never, {item})
        console.log(item, "itemsdvd")
    }

    const renderAdjustQuantity = () => {
        return isOrderDetail
        ? null
        : <AdjustQuantity 
            quantity={isTopping ? item.quantity : item.quantity} 
            handleAdjustQuantity={handleAdjustQuantity} 
            index={isTopping ? index : indexItem}
        />
    }

    const renderSize = () => {
        if(item.sizes)
        {
            let size = !isTopping 
                    ? item.sizes.length === 0 
                        ? ""
                        : item.sizes.find((itemSize: { checked: any; }) => itemSize.checked)?.label 
                    : ""
                    
            return (
                size !== ""
                ? <Text>
                    Size: {size}
                </Text>
                : ""
            )
        }
    }
 
    return (
        <View 
            style={[
                styles.item, 
                isTopping && item.quantity === 0 ? styles.hidden : {}
            ]}
        >
            
            <TouchableOpacity onPress={() => isTopping === false ? handlePressMainItem(item) : {}}>
                <View 
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginLeft: isTopping ? widthScreen * 0.03 : 0
                    }}
                >
                    <Image
                        source={{uri: item.uri || ""}}
                        style={styles.avatar}
                    /> 
                    <View style={{
                        marginLeft: widthScreen * 0.03 
                    }}>
                        <Text
                            style={styles.nameShopText}
                        >
                            {item.name || item.label}
                        </Text>
                        <View style={{
                            flexDirection: "row" 
                        }}>
                            <Text
                                style={{ marginRight: widthScreen * 0.02}}
                            >
                                Giá: {item.price}
                            </Text>
                            {
                                renderSize()
                            }
                        </View>
                    </View> 
                </View>
            </TouchableOpacity>
            <View
                style={{ 
                    alignSelf: "flex-end",
                    alignItems: "flex-end",
                    // alignContent: "flex-end",
                    display: isCart && isRating === false ? "flex" : "none"
                }}
            >
                <TouchableOpacity
                    onPress={() => handleDeleteItem(item)}
                >
                    <FontAwesome5 
                        name="trash-alt"
                        style={{
                            marginBottom: heightScreen * 0.013,
                            marginRight: widthScreen * 0.03,
                            color: mainColor
                        }}
                    ></FontAwesome5>
                </TouchableOpacity>
                {
                    renderAdjustQuantity()
                }
                
            </View>
            <View
                style={{ 
                    alignSelf: "center",
                    alignItems: "flex-start",
                    // alignContent: "flex-end",
                    display: isCart ? "none" : "flex",
                    width: "23%"
                }}
            > 
                <Text>Số lượng: {item.quantity}</Text>
                <Text>Tổng: {item.quantity * item.price}</Text>
            </View>
        </View>
    )
}
import ItemInCartAndPayment from "@/components/orderFAD/Cart/ItemInCartAndPayment"
import { useCartContext } from "@/providers.tsx/CartProvider"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { View, Text, Touchable, TouchableOpacity, TextInput } from "react-native" 
import Button from "../../orderFoodAndDrink/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRoute } from "@react-navigation/native"

type product = {
    name: string,
    uri: string,
    price: number,
    orderDetailID: number,
}

export default function Rate(){

    const { heightScreen, baseURL,  widthScreen, RD, mainColor } = useCartContext()
    const [productList, setProductList] = useState<product[] | undefined>(undefined)
    const [starQuantity, setStarQuantity] = useState<number>(0)
    const [rateContent, setRateContent] = useState<string>("")
     
    const route = useRoute();
    const { orderID } = route.params as { orderID: number };

    const getInfoProductToRate = () => {
        axios.get(baseURL + '/getInfoProductToRate', {params: { orderID: orderID }})
        .then(res => {
            let arr_productList = res.data.infoFAD.map((item: any) => {
                console.log(res.data.infoFAD[0], 'kskcscssss22', item)
                return {
                    name: item.FAD_NAME,
                    uri: item.URL,
                    price: item.FAD_PRICE,
                    orderDetailID: item.ORDER_DETAIL_ID
                }
            })
            setProductList(arr_productList)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSaveRate = (item: product) => {
        if(starQuantity === 0 || rateContent === ""){
            alert("Vui lòng chọn mức độ hài lòng và nhập đánh giá.")
        }
        else{ 
            console.log(item, 'item')
            const dataSaveRate = { 
                starQuantity: starQuantity,
                rateContent: rateContent,
                orderDetailID: item.orderDetailID
            }
            console.log(dataSaveRate, 'dataSaveRate')
            axios.post(baseURL + '/saveRate', dataSaveRate)
            .then(res => {
                console.log(res.data)
                setProductList(productList?.filter((item) => item.orderDetailID !== item.orderDetailID))
                alert("Đánh giá thành công")
            })
            .catch(err => {
                console.log(err)
                alert("Không thể lưu đánh giá, vui lòng thử lại")
            })
        }
    }

    useState(() => {
        getInfoProductToRate()  
    })

    return (
        <View>
            <View>
                <View style={{
                    paddingHorizontal: widthScreen * 0.02,
                    paddingVertical: heightScreen * 0.007,
                    borderWidth: 1,
                    borderRadius: RD * 0.00005,
                    borderColor: mainColor,
                    alignItems: "center",
                    alignSelf: "center",
                    marginTop: heightScreen * 0.02
                }}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: widthScreen * 0.05,
                        color: mainColor
                    }}>Đánh giá sản phẩm</Text>
                </View>
                {
                    productList?.map((item, index) => (
                        <View style={{
                            paddingHorizontal: widthScreen * 0.02,
                            paddingVertical: heightScreen * 0.007,
                            marginHorizontal: widthScreen * 0.02,
                            borderWidth: 1,
                            borderRadius: RD * 0.00002,
                            borderColor: mainColor,
                            // alignItems: "center",
                            // alignSelf: "center",
                            marginTop: heightScreen * 0.02
                        }}>
                            <ItemInCartAndPayment 
                                isCart={true} 
                                isTopping={false} 
                                isRating={true}
                                isHaveAdjusting={false} 
                                quantity={0} 
                                item={{
                                    sizes: undefined,
                                    label: "",
                                    name: item.name,
                                    price: item.price,
                                    quantity: 0,
                                    uri: item.uri
                                }} 
                                index={0} 
                                indexItem={index} 
                                isOrderDetail={true}
                                setArray_itemListInCart={() => {}}
                                key={index} 
                            > 
                            </ItemInCartAndPayment>
                            <View style={{ flexDirection: "row", marginTop: heightScreen * 0.01 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: RD * 0.00004,
                                    color: "gray"
                                }}>Mức độ hài lòng: </Text>
                                <View style={{ flexDirection: "row", marginLeft: widthScreen * 0.01 }}>
                                    {
                                        [1, 2, 3, 4, 5].map((item, index) => (
                                            <TouchableOpacity key={index} onPress={() => setStarQuantity(item)}>
                                                <FontAwesome name="star" size={20} color= { index < starQuantity ? "yellow" : "gray"} />
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </View>
                            <View>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: RD * 0.00004,
                                    color: "gray"
                                }}>Đánh giá: </Text>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    style={{ 
                                        borderWidth: 1, 
                                        borderColor: "gray", 
                                        borderRadius: RD * 0.00002, 
                                        paddingHorizontal: widthScreen * 0.02, 
                                        marginTop: heightScreen * 0.01,
                                        paddingVertical: heightScreen * 0.01,
                                    }}
                                    value={rateContent}
                                    onChangeText={(text) => setRateContent(text)}
                                ></TextInput>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: heightScreen * 0.009 }}>
                                <Button
                                    buttonName="Đánh giá"
                                    iconName="paper-plane"
                                    color={mainColor}
                                    handlePress={() => handleSaveRate(item)}
                                ></Button>
                            </View>
                        </View>
                        
                    ))
                }  
            </View>
        </View>
    )
}
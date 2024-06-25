import { Link, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/PostList";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; 
import React, { useState, useEffect } from 'react'; 
import axios from "axios"; 
import Button from "@/app/(user)/orderFoodAndDrink/Button";
import { useNavigation } from "expo-router";
import RenderFooter from "@/components/RenderFooter";

interface orderItem {
    ORDER_ID: number;
    TOTAL_PAYMENT: string;
    FAD_QUANTITY: number;
    PAYMENT_METHOD: string;
    DATE: string;
    FAD_INFO: {
        IMAGE_URL: string,
        FAD_NAME: string,
        FAD_ID: number,
        FAD_PRICE: number
    };
    FADFirst: { imgURL: string; name: string; quantity: number; price: number; }; 
    necessaryInfo: { FADQuantityHaveOrder: number; time: string; paymentMethod: string; voucherID: string; };
    paymentToTal: number; 
}

interface infoManagementEveryOrderStatus { 
    orderStatusName: string,
    orderStatusCode: number,
    orderStatusIcon: string,
    orderItemList: orderItem[],
    pageNumber: number, 
    isActive: boolean
} 

export default function OrderManagement() {

    const {heightScreen, widthScreen, mainColor, orderStatusList, baseURL, userID, setOrderID} = useCartContext();

    const avatarSize = widthScreen * 0.13;

    const styles = StyleSheet.create({
        headerContainer: {
            borderRadius: widthScreen * 0.05,
            borderWidth: 1,
            borderColor: mainColor,
            marginHorizontal: widthScreen * 0.02,
            marginVertical: heightScreen * 0.01,
            flexDirection: "row",
            justifyContent: "space-around",    
            paddingVertical: heightScreen * 0.005,
            paddingHorizontal: widthScreen * 0.003,      
            flexWrap: "wrap",
            backgroundColor: "white",
            position: "absolute",                                                                                                                                      
        },
        itemStatusHeader: {
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.01,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#cdcdcd",
            borderRadius: widthScreen * 0.05, 
            //width: "100%"
        },
        itemTextInStatusHeader: {
            fontWeight: 'bold',
            color: mainColor,
            marginLeft: widthScreen * 0.01,
            fontSize: widthScreen * 0.04
        },
        itemOrderContainer: {
            marginHorizontal: widthScreen * 0.02,
            marginVertical: heightScreen * 0.006,
            borderRadius: widthScreen * 0.05,
            borderWidth: 0.7,
            borderColor: "#cdcdcd",
            paddingVertical: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.03,
            shadowColor: '#000',
            shadowOffset: { width: 5, height: 7 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 10,  
            elevation: 70,
            backgroundColor: "white"
        }, 
        imgOfItem: { 
            height: avatarSize,
            width: avatarSize,
            borderRadius: avatarSize * 0.5,
            marginLeft: widthScreen * 0.01,
            marginRight: widthScreen * 0.02,
        },
        headerTitelOfItemOder: {
            fontSize: widthScreen * 0.05,
            fontWeight: 'bold' 
        },
        headerNormalTextOfItemOder: {
            //fontWeight: 'bold',
            color: "gray",
            //marginLeft: widthScreen * 0.03,
            fontSize: widthScreen * 0.042 
        },
        bodyOfItemOrder: {
            paddingVertical: heightScreen * 0.01,
        },
        NeceesaryInfoInBodyOfItemOrder: {
            borderBottomWidth: 1,
            borderBottomColor: "#cdcdcd",
        },
        NeceesaryInfoInBodyOfItemOrder_row: {
            flexDirection: "row", 
            marginVertical: heightScreen * 0.007,
        }, 
        NeceesaryInfoInBodyOfItemOrder_row_item: {
            flexDirection: "row"
        },
        NeceesaryInfoInBodyOfItemOrder_row_item_mainText: {
            borderWidth: 1,
            borderRadius: widthScreen * 0.05, 
            borderColor: mainColor,
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.002,
            color: mainColor,
            fontSize: widthScreen * 0.04,
            fontWeight: '500',
            marginLeft: widthScreen * 0.02
        },
        headerOfItemOrder: {
            flexDirection: "row",
        },
        footerOfItemOder: {
            flexDirection: "row",
            justifyContent: "space-between",
            //paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.02,
        },
        footerTextMoneyOfItemOder: {
            fontWeight: 'bold',
            color: "red",
            fontSize: widthScreen * 0.05
        },
        detailInfoOfOderText: {
            fontWeight: 'bold',
            color: "gray",
        },
        detailInfoOfOderTextContainer: {
            flexDirection: "row", 
            justifyContent: "center", 
            paddingVertical: heightScreen * 0.008,
            borderBottomColor: "#cdcdcd",
            borderBottomWidth: 1,
            marginHorizontal: widthScreen * 0.02
        }
    });

    const orderStatus = [
        { name: "Đang chuẩn bị", icon: "clock" },
        { name: "Đang giao", icon: "motorcycle" },
        { name: "Đã nhận", icon: "clipboard-check" },
        { name: "Đã huỷ", icon: "window-close" },
    ]   

    const [orderList, setOrderList] = useState([
        {
            FADFirst: {
                imgURL: defaultPrizzaImage,
                name: "Pizza hải sản",
                quantity: 1,
                price: 100000,
            },
            necessaryInfo: {
                FADQuantityHaveOrder: 3,
                time: "2021-09-01 12:00:00",
                paymentMethod: "Thanh toán khi nhận hàng",
                voucherID: "C_NQ_D20"
            },
            paymentToTal: 300000
        } 
    ]); 

    const [infoManagementEveryOrderStatus, setInfoManagementEveryOrderStatus] = useState<infoManagementEveryOrderStatus[]>([]);
    const [dataLoadFromServe, setDataLoadFromServe] = useState([]);

    const itemQuantityEveryLoad = 4;
    const [initialLoad, setInitialLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {   
        let newInfoManagementEveryOrderStatus: infoManagementEveryOrderStatus[] = []
        orderStatusList.map((item: any, index: any) => { 
            console.log(dataLoadFromServe, "dataLoadFromServe", item.id, orderStatusList[0].id)
            newInfoManagementEveryOrderStatus.push(
                {
                    orderStatusName: item.name,
                    orderStatusIcon: item.icon,
                    orderStatusCode: item.id,
                    orderItemList: item.id === orderStatusList[0].id ? dataLoadFromServe : [],
                    pageNumber: 1,
                    isActive: item.name === orderStatusList[0].name ? true : false
                } 
            )
        })  
        setInfoManagementEveryOrderStatus(newInfoManagementEveryOrderStatus)
        setInitialLoad(true);
    }, []);

    useEffect(() => {
        getOrderListFromServe(orderStatusList[0].id, 1);
        // console.log(infoManagementEveryOrderStatus, "newInfoManagementEveryOrderStatus useeffect")
    }, [initialLoad])

    //orderStatusName = "" thì có nghĩa là load lần đầu. mà load lần đầu thì load 10 trạng thái đơn hàng đầu tiên của mỗi trạng thái đơn hàng
    //orderStatusName = "Đang chuẩn bị" (có thể là tên các trạng thái khác) thì load 10 trạng thái đơn hàng tiếp theo của trạng thái đơn hàng "Đang chuẩn bị"
    const getOrderListFromServe = (orderStatusCode: number, pageNumber: number) => { 

        // nếu mà load theo một trạng thái thì startIndexLoadOneStatus = số lượng đơn hàng muốn load thêm * (số trang - 1) + 1
        // ví dụ load thêm 10 đơn hàng của trạng thái "Đang chuẩn bị" thì startIndexLoadOneStatus = 10 * (2 - 1) + 1 = 11 
        setIsLoading(true);
        const requestData = {
            orderStatusCode: orderStatusCode,
            startIndex: (itemQuantityEveryLoad * ( pageNumber - 1 )),
            itemQuantityEveryLoad: itemQuantityEveryLoad, 
            userID: userID === 0 ? 1 : userID
        }

        // console.log(requestData, "requestData", orderStatusCode)

        axios.get( baseURL + "/getOrderInfoOfUser", { params: requestData })
        .then((response) => {
            console.log(response.data.infoOrder, "response.data âccs")
            if(response.data.infoOrder.length !== 0) {
                const newInfoManagementEveryOrderStatus =  infoManagementEveryOrderStatus.map((itemInList) => {
                    if (itemInList.orderStatusCode === orderStatusCode) {
                        return {
                            ...itemInList,
                            orderItemList: itemInList.orderItemList.concat(response.data.infoOrder),
                            pageNumber: ++pageNumber,
                            isActive: true
                        };
                    }
                    return {
                        ...itemInList, 
                        isActive: false
                    };
                }) 
                setInfoManagementEveryOrderStatus(newInfoManagementEveryOrderStatus)
                // console.log(newInfoManagementEveryOrderStatus, "newInfoManagementEveryOrderStatus")
            }
            setIsLoading(false);
        })
    }

    const getOrderInfo = (item: infoManagementEveryOrderStatus) => {
        getOrderListFromServe(item.orderStatusCode, item.pageNumber);
        // console.log(item, "item") 
    }
    const navigation = useNavigation();

    const renderOrderList = (item: orderItem, itemStatus: infoManagementEveryOrderStatus) =>  (
        <View  style={styles.itemOrderContainer} key={item.ORDER_ID}>
            <View style={styles.headerOfItemOrder}>
                <Image source={{ uri: item.FAD_INFO.IMAGE_URL }} style={styles.imgOfItem}/>
                <View style={{marginLeft: widthScreen * 0.02 }}>
                    <Text style={styles.headerTitelOfItemOder}>{item.FAD_INFO.FAD_NAME}</Text>
                    <Text style={styles.headerNormalTextOfItemOder}>Giá: {item.FAD_INFO.FAD_PRICE} - id: {item.ORDER_ID}</Text>
                </View>
            </View>

            <View style={styles.bodyOfItemOrder}> 
                <View style={styles.NeceesaryInfoInBodyOfItemOrder}>
                    <View style={styles.NeceesaryInfoInBodyOfItemOrder_row}>
                        <View style={styles.NeceesaryInfoInBodyOfItemOrder_row_item}>
                            <Text style={styles.headerNormalTextOfItemOder}>Thời gian:</Text>
                            <Text style={styles.NeceesaryInfoInBodyOfItemOrder_row_item_mainText}>{item.DATE}</Text>
                        </View> 
                    </View>
                    <View style={styles.NeceesaryInfoInBodyOfItemOrder_row}>
                        <View style={styles.NeceesaryInfoInBodyOfItemOrder_row_item}>
                            <Text style={styles.headerNormalTextOfItemOder}>Thanh toán:</Text>
                            <Text style={styles.NeceesaryInfoInBodyOfItemOrder_row_item_mainText}>{item.PAYMENT_METHOD}</Text>
                        </View> 
                    </View>
                    <View style={styles.NeceesaryInfoInBodyOfItemOrder_row}>
                        <View style={styles.NeceesaryInfoInBodyOfItemOrder_row_item}>
                            <Text style={styles.headerNormalTextOfItemOder}>Số lượng món:</Text>
                            <Text style={styles.NeceesaryInfoInBodyOfItemOrder_row_item_mainText}>{item.FAD_QUANTITY}</Text>
                        </View> 
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.detailInfoOfOderTextContainer} 
                    onPress={() => {
                        setOrderID(item.ORDER_ID)
                        navigation.navigate("order/OrderDetail" as never)
                    }}
                >
                    <Text style={styles.detailInfoOfOderText}>Thông tin chi tiết đơn hàng &gt;</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footerOfItemOder}>
                {/* <Button
                    title=
                    color={mainColor}
                > 
                </Button>  */}
                <Button
                    iconName={
                        itemStatus.orderStatusName === "Chờ xác nhận" 
                        ? "window-close" 
                        : itemStatus.orderStatusName === "Đang chuẩn bị" || itemStatus.orderStatusName === "Đang giao"
                            ? "phone-square-alt"
                            :  itemStatus.orderStatusName === "Đã giao" 
                                ? "star"
                                :  "undo-alt"
                    }
                    buttonName={
                        itemStatus.orderStatusName === "Chờ xác nhận" 
                        ? "Huỷ đơn" 
                        : itemStatus.orderStatusName === "Đang chuẩn bị" || itemStatus.orderStatusName === "Đang giao"
                            ? "Liên hệ"
                            : itemStatus.orderStatusName === "Đã giao" 
                                ? "Đánh giá"
                                :  "Đặt lại"
                    }
                    handlePress={() => {}}
                ></Button> 
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.headerNormalTextOfItemOder}>Tổng tiền: </Text>
                    <Text style={styles.footerTextMoneyOfItemOder}>{item.TOTAL_PAYMENT}</Text>
                </View>
            </View>
        </View>
    )  
 
    const renderEveryStatus = () => {
        return infoManagementEveryOrderStatus.map((itemStatus, index) => {
            console.log(itemStatus.orderStatusName, itemStatus.isActive, "isActive");
            if (itemStatus.isActive && itemStatus.orderItemList.length !== 0) {
                console.log(itemStatus.orderItemList, "itemStatus.orderItemList2f2ss")
                return (
                    <FlatList
                        data={itemStatus.orderItemList}
                        renderItem={({item}) => renderOrderList(item, itemStatus) } 
                        ListFooterComponent={ <RenderFooter isLoading={isLoading}></RenderFooter> }
                        onEndReached={() => getOrderInfo(itemStatus)}
                        onEndReachedThreshold={0.01} 
                        key={index}
                    ></FlatList>
                );
            } 
            else return null;
        });
 
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen
                options={{
                    title: 'Quản lý đơn hàng',
                }}
            ></Stack.Screen>  
            <View style={styles.headerContainer}>
                {/* <View style={{paddingTop: heightScreen * 0.2}}></View> */}
                {
                    infoManagementEveryOrderStatus.map((item, index) => { 
                        return(
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => getOrderListFromServe(item.orderStatusCode, item.pageNumber)}
                                style={{ marginVertical: heightScreen * 0.005}}
                            >
                                <View style={[styles.itemStatusHeader, item.isActive && { backgroundColor: "yellow" }]}>
                                    <FontAwesome5 name={item.orderStatusIcon} style={{color: mainColor, fontWeight: "bold"}}></FontAwesome5>
                                    <Text style={styles.itemTextInStatusHeader}>{item.orderStatusName}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={{borderBottomWidth: 1, marginHorizontal: widthScreen * 0.01, borderBottomColor: "#cdcdcd", marginBottom: heightScreen * 0.009}}/>
            {/* <ScrollView >   */}
                {/* body */}
                <View style={{ marginTop: heightScreen * 0.128}}>
                    { renderEveryStatus() }
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}
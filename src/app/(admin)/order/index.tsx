import { Link, Stack } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from "axios";
import Button from "@/app/(user)/orderFoodAndDrink/Button";
import { useNavigation } from "expo-router";
import RenderFooter from "@/components/RenderFooter";
import Response from "../home/Response";
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "@/components/Loading";


interface orderItem {
  ORDER_ID: number;
  TOTAL_PAYMENT: string;
  FAD_QUANTITY: number;
  PAYMENT_METHOD: string;
  PAYMENT_STATUS: string;
  DATE: string;
  FAD_INFO: {
    IMAGE_URL: string,
    FAD_NAME: string,
    FAD_ID: number,
    FAD_PRICE: number
  };
  FADFirst: { imgURL: string; name: string; quantity: number; price: number; };
  necessaryInfo: { FADQuantityHaveOrder: number; time: string; paymentMethod: string; voucherCODE: string; };
  paymentToTal: number;
}

interface Order {
  ORDER_ID: number;
  TOTAL_PAYMENT: string;
  FAD_QUANTITY: number;
  PAYMENT_METHOD: string;
  PAYMENT_STATUS: string;
  DATE: string;
  FADS_INFO: [
    FAD: {
      IMAGE_URL: string,
      FAD_NAME: string,
      FAD_ID: number,
      FAD_PRICE: number,
      FAD_QUANTITY: number
    }
  ];
  FAD_FIRST: {
    IMAGE_URL: string,
    FAD_NAME: string,
    FAD_ID: number,
    FAD_PRICE: number,
    FAD_QUANTITY: number
  };
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

  const { heightScreen, widthScreen, mainColor, orderStatusList, baseURL, userID, setOrderID, RD } = useCartContext();

  const avatarSize = widthScreen * 0.13;

  const navigation = useNavigation();

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
      // shadowColor: '#000',
      // shadowOffset: { width: 5, height: 7 }, 
      // shadowOpacity: 0.1, 
      // shadowRadius: 10,  
      // elevation: 70,
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


  let vnpURL = "";
  useEffect(() => {
    const loadvnpURL = async () => {
      vnpURL = await AsyncStorage.getItem('vnpURL') || "";
    }
    loadvnpURL()
  })

  const itemButtonList = [
    { orderStatusCode: 1, icon: "window-close", name: "Huỷ đơn" },
    { orderStatusCode: 1, icon: "check-circle", name: "Xác nhận" },
    { orderStatusCode: 2, icon: "biking", name: "Vận chuyển" }
    // { orderStatusCode: 5, icon: "undo-alt", name: "Đặt lại" },
  ]
  const [parameterForChangeOrderStatus, setParameterForChangeOrderStatus] = useState({ orderStatusCode: 0, item: {}, itemStatus: {} });

  const [infoManagementEveryOrderStatus, setInfoManagementEveryOrderStatus] = useState<infoManagementEveryOrderStatus[]>([]);
  const [dataLoadFromServe, setDataLoadFromServe] = useState([]);

  const itemQuantityEveryLoad = 4;
  const [initialLoad, setInitialLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
  const [isShowAcceptPopup, setIsShowAcceptPopup] = useState(false);
  const [isShowDeliveryPopup, setIsShowDeliveryPopup] = useState(false);
  const [isShowPopupAfterCancelOrder, setIsShowPopupAfterCancelOrder] = useState(false);
  // const [isStatusChange, setIsStatusChange] = useState(false);


  // Thiết lập mảng để chứa dữ liệu
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
  const getOrderListFromServe = useCallback((orderStatusCode: number, pageNumber: number) => {

    // nếu mà load theo một trạng thái thì startIndexLoadOneStatus = số lượng đơn hàng muốn load thêm * (số trang - 1) + 1
    // ví dụ load thêm 10 đơn hàng của trạng thái "Đang chuẩn bị" thì startIndexLoadOneStatus = 10 * (2 - 1) + 1 = 11 
    setIsLoading(true);
    const requestData = {
      orderStatusCode: orderStatusCode,
      startIndex: (itemQuantityEveryLoad * (pageNumber - 1)),
      itemQuantityEveryLoad: itemQuantityEveryLoad,
      userID: userID === 0 ? 1 : userID
    }

    // console.log(requestData, "requestData", orderStatusCode)

    axios.get(baseURL + "/getOrderInfoOfUser", { params: requestData })
      .then((response) => {
        console.log(response.data.infoOrder, "response.data âccs")
        if (response.data.infoOrder.length !== 0) {
          const newInfoManagementEveryOrderStatus = infoManagementEveryOrderStatus.map((itemInList) => {
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
          setInfoManagementEveryOrderStatus(newInfoManagementEveryOrderStatus);
          // console.log(newInfoManagementEveryOrderStatus, "newInfoManagementEveryOrderStatus")
          // }
          setIsLoading(false);
        }
      })
  }, [infoManagementEveryOrderStatus])

  const getOrderInfo = (item: infoManagementEveryOrderStatus) => {
    getOrderListFromServe(item.orderStatusCode, item.pageNumber);
    // console.log(item, "item") 
  }


  const handleChangeOrderStatus = useCallback((name: string) => {
    console.log("orderStatusCode")
    if (parameterForChangeOrderStatus.orderStatusCode === itemButtonList[0].orderStatusCode && name === 'Huỷ đơn') {
      let newOrderItemList = parameterForChangeOrderStatus.itemStatus.orderItemList.filter((itemInList) => itemInList.ORDER_ID !== parameterForChangeOrderStatus.item.ORDER_ID)
      setInfoManagementEveryOrderStatus(
        infoManagementEveryOrderStatus.map((itemInList) => {
          if (itemInList.orderStatusCode === parameterForChangeOrderStatus.itemStatus.orderStatusCode) {
            return {
              ...itemInList,
              orderItemList: newOrderItemList
            };
          }
          return itemInList;
        })
      )
      setIsShowConfirmPopup(false)
      setIsShowPopupAfterCancelOrder(true)
      setParameterForChangeOrderStatus({ orderStatusCode: 0, item: {}, itemStatus: {} })
      axios.post(baseURL + "/changeOrderStatusToCancel", { orderID: parameterForChangeOrderStatus.item.ORDER_ID })
        .then((response) => {
          console.log(response.data.statusCode, "response.data.statusCode")
        })
        .catch((error) => {
          console.log(error)
        })
    }

    if (parameterForChangeOrderStatus.orderStatusCode === itemButtonList[1].orderStatusCode && name === 'Xác nhận') {
      let newOrderItemList = parameterForChangeOrderStatus.itemStatus.orderItemList.filter((itemInList) => itemInList.ORDER_ID !== parameterForChangeOrderStatus.item.ORDER_ID)
      setInfoManagementEveryOrderStatus(
        infoManagementEveryOrderStatus.map((itemInList) => {
          if (itemInList.orderStatusCode === parameterForChangeOrderStatus.itemStatus.orderStatusCode) {
            return {
              ...itemInList,
              orderItemList: newOrderItemList
            };
          }
          return itemInList;
        })
      )
      setIsShowAcceptPopup(false)
      setIsShowPopupAfterCancelOrder(true)
      setParameterForChangeOrderStatus({ orderStatusCode: 0, item: {}, itemStatus: {} })
      axios.post(baseURL + "/changeOrderStatusToAccept", { orderID: parameterForChangeOrderStatus.item.ORDER_ID })
        .then((response) => {
          console.log(response.data.statusCode, "response.data.statusCode")
        })
        .catch((error) => {
          console.log(error)
        })
    }

    if (parameterForChangeOrderStatus.orderStatusCode === itemButtonList[2].orderStatusCode && name === 'Vận chuyển') {
      let newOrderItemList = parameterForChangeOrderStatus.itemStatus.orderItemList.filter((itemInList) => itemInList.ORDER_ID !== parameterForChangeOrderStatus.item.ORDER_ID)
      setInfoManagementEveryOrderStatus(
        infoManagementEveryOrderStatus.map((itemInList) => {
          if (itemInList.orderStatusCode === parameterForChangeOrderStatus.itemStatus.orderStatusCode) {
            return {
              ...itemInList,
              orderItemList: newOrderItemList
            };
          }
          return itemInList;
        })
      )
      setIsShowDeliveryPopup(false)
      setIsShowPopupAfterCancelOrder(true)
      setParameterForChangeOrderStatus({ orderStatusCode: 0, item: {}, itemStatus: {} })
      axios.post(baseURL + "/changeOrderStatusToDelivery", { orderID: parameterForChangeOrderStatus.item.ORDER_ID })
        .then((response) => {
          console.log(response.data.statusCode, "response.data.statusCode")
        })
        .catch((error) => {
          console.log(error)
        })
    }

  }, [parameterForChangeOrderStatus])

  const openInBrowser = async () => {
    await WebBrowser.openBrowserAsync(vnpURL);
  };

  useEffect(() => {
    if (vnpURL != "")
      openInBrowser();
  }, [vnpURL])

  const buttonPressCaseInEveryOrderStatus = (item: orderItem, itemButton: any, itemStatus: infoManagementEveryOrderStatus) => {
    if (itemStatus.orderStatusCode === itemButtonList[0].orderStatusCode && itemButton.name === 'Huỷ đơn') {
      setIsShowConfirmPopup(true)
      setParameterForChangeOrderStatus({
        orderStatusCode: itemButton.orderStatusCode,
        item: item,
        itemStatus: itemStatus
      })
    }
    if (itemStatus.orderStatusCode === itemButtonList[1].orderStatusCode && itemButton.name === 'Xác nhận') {
      setIsShowAcceptPopup(true)
      setParameterForChangeOrderStatus({
        orderStatusCode: itemButton.orderStatusCode,
        item: item,
        itemStatus: itemStatus
      })
    }

    if (itemStatus.orderStatusCode === itemButtonList[2].orderStatusCode && itemButton.name === 'Vận chuyển') {
      setIsShowDeliveryPopup(true)
      setParameterForChangeOrderStatus({
        orderStatusCode: itemButton.orderStatusCode,
        item: item,
        itemStatus: itemStatus
      })
    }
  }

  const renderShowConfirmPopup = () => {
    return (
      <View style={{ position: "absolute", top: -(heightScreen * 0.1), width: widthScreen, height: heightScreen }}>

        <Response
          content="Bạn chắc chắn huỷ đơn hàng này không?"
          buttonIcon1="check-circle"
          buttonFunction1={() => handleChangeOrderStatus('Huỷ đơn')}
          buttonName1="Huỷ đơn"
          buttonColor1="red"
          buttonIcon2="window-close"
          buttonFunction2={() => setIsShowConfirmPopup(false)}
          buttonName2="Thoát"
          buttonColor2="green"
          confirmPopup={true}
        ></Response>
      </View>
    )
  }

  const renderShowAcceptPopup = () => {
    return (
      <View style={{ position: "absolute", top: -(heightScreen * 0.1), width: widthScreen, height: heightScreen }}>

        <Response
          content="Bạn muốn xác nhận nhận đơn đặt hàng này?"
          buttonIcon1="check-circle"
          buttonFunction1={() => handleChangeOrderStatus('Xác nhận')}
          buttonName1="Xác nhận"
          buttonColor1="red"
          buttonIcon2="window-close"
          buttonFunction2={() => setIsShowAcceptPopup(false)}
          buttonName2="Không"
          buttonColor2="green"
          confirmPopup={true}
        ></Response>
      </View>
    )
  }

  const renderShowDeliveryPopup = () => {
    return (
      <View style={{ position: "absolute", top: -(heightScreen * 0.1), width: widthScreen, height: heightScreen }}>

        <Response
          content="Bạn muốn xác nhận vận chuyển đơn này?"
          buttonIcon1="check-circle"
          buttonFunction1={() => handleChangeOrderStatus('Vận chuyển')}
          buttonName1="Xác nhận"
          buttonColor1="red"
          buttonIcon2="window-close"
          buttonFunction2={() => setIsShowAcceptPopup(false)}
          buttonName2="Không"
          buttonColor2="green"
          confirmPopup={true}
        ></Response>
      </View>
    )
  }


  const renderOrderList = (item: orderItem, itemStatus: infoManagementEveryOrderStatus) => (
    <View style={styles.itemOrderContainer} key={item.ORDER_ID}>
      <View style={styles.headerOfItemOrder}>
        <Image source={{ uri: item.FAD_INFO.IMAGE_URL }} style={styles.imgOfItem} />
        <View style={{ marginLeft: widthScreen * 0.02 }}>
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
              <Text style={styles.headerNormalTextOfItemOder}>Trạng thái thanh toán:</Text>
              <Text style={styles.NeceesaryInfoInBodyOfItemOrder_row_item_mainText}>{parseInt(item.PAYMENT_STATUS) === 1 ? "Đã thanh toán" : "Chưa thanh toán"}</Text>
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
            setIsLoading(true)
            const orderID = item.ORDER_ID
            navigation.navigate("OrderDetail" as never, { orderID })
          }}
        >
          <Text style={styles.detailInfoOfOderText}>Thông tin chi tiết đơn hàng &gt;</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerOfItemOder}>
        {
          itemButtonList.map((itemButton, index) => {
            // Điều kiện để hiển thị nút "Huỷ đơn"
            if (itemButton.orderStatusCode === itemStatus.orderStatusCode && itemButton.name === "Huỷ đơn") {
              return (
                <View key={index}>
                  <Button
                    iconName={itemButton.icon}
                    buttonName={itemButton.name}
                    handlePress={() => buttonPressCaseInEveryOrderStatus(item, itemButton, itemStatus)}
                  />
                </View>
              );
            }
            if (itemButton.orderStatusCode === itemStatus.orderStatusCode && itemButton.name === "Xác nhận") {
              return (
                <View key={index}>
                  <Button
                    iconName={itemButton.icon}
                    buttonName={itemButton.name}
                    handlePress={() => buttonPressCaseInEveryOrderStatus(item, itemButton, itemStatus)}
                  />
                </View>
              );
            }
            if (itemButton.orderStatusCode === itemStatus.orderStatusCode && itemButton.name === "Vận chuyển") {
              return (
                <View key={index}>
                  <Button
                    iconName={itemButton.icon}
                    buttonName={itemButton.name}
                    handlePress={() => buttonPressCaseInEveryOrderStatus(item, itemButton, itemStatus)}
                  />
                </View>
              );
            }
          })
        }

        <View style={{ flexDirection: "row" }}>
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
        console.log(itemStatus.orderItemList, "itemStatus.orderItemList")
        return (
          <FlatList
            data={itemStatus.orderItemList}
            renderItem={({ item }) => renderOrderList(item, itemStatus)}
            ListFooterComponent={<RenderFooter isLoading={isLoading}></RenderFooter>}
            onEndReached={() => getOrderInfo(itemStatus)}
            onEndReachedThreshold={0.01}
            key={index}
          ></FlatList>
        );
      }
      else return null;
    });
  }

  useEffect(() => {
    let timer: any;
    if (isShowPopupAfterCancelOrder) {
      timer = setTimeout(() => {
        setIsShowPopupAfterCancelOrder(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isShowPopupAfterCancelOrder]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Quản lý đơn hàng',
        }}
      ></Stack.Screen>
      <View style={styles.headerContainer}>
        {
          infoManagementEveryOrderStatus.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => getOrderListFromServe(item.orderStatusCode, item.pageNumber)}
                style={{ marginVertical: heightScreen * 0.005 }}
              >
                <View style={[styles.itemStatusHeader, item.isActive && { backgroundColor: "yellow" }]}>
                  <FontAwesome5 name={item.orderStatusIcon} style={{ color: mainColor, fontWeight: "bold" }}></FontAwesome5>
                  <Text style={styles.itemTextInStatusHeader}>{item.orderStatusName}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <View style={{
        borderBottomWidth: 1,
        marginHorizontal: widthScreen * 0.01,
        borderBottomColor: "#cdcdcd",
        marginBottom: heightScreen * 0.03
      }} />
      <View style={{ marginTop: heightScreen * 0.128 }}>
        {
          isShowPopupAfterCancelOrder && (
            <View style={{
              backgroundColor: "red",
              paddingHorizontal: widthScreen * 0.02,
              paddingVertical: heightScreen * 0.02,
              marginTop: heightScreen * 0.01,
              width: widthScreen * 0.95,
              borderRadius: RD * 0.05,
              marginHorizontal: widthScreen * 0.025,
            }}>
              <Text style={{ color: "white", fontWeight: "bold", alignItems: "center", textAlign: "center" }} >Trạng thái đơn hàng đã được cập nhật</Text>
            </View>
          )
        }
        {renderEveryStatus()}
      </View>
      {
        isShowConfirmPopup && (
          <View style={{ position: "absolute", top: 0, height: heightScreen, width: widthScreen, backgroundColor: "gray", opacity: 0.6 }}>

          </View>
        )
      }
      {
        isShowAcceptPopup && (
          <View style={{ position: "absolute", top: 0, height: heightScreen, width: widthScreen, backgroundColor: "gray", opacity: 0.6 }}>

          </View>
        )
      }
      {
        isShowDeliveryPopup && (
          <View style={{ position: "absolute", top: 0, height: heightScreen, width: widthScreen, backgroundColor: "gray", opacity: 0.6 }}>

          </View>
        )
      }
      {
        isShowConfirmPopup && renderShowConfirmPopup()
      }
      {
        isShowAcceptPopup && renderShowAcceptPopup()
      }
      {
        isShowDeliveryPopup && renderShowDeliveryPopup()
      }
      {
        isLoading ? <View style={{ height: heightScreen * 0.5 }}>
          <Loading></Loading>
        </View> : renderEveryStatus()
      }
    </SafeAreaView>
  )
}


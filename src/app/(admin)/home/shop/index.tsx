import { FlatList, StyleSheet, View, Text, Pressable, Image, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native';
// import ProductListItem from '@components/ProductListItem';
import { FontAwesome, FontAwesome5, Entypo, Feather, EvilIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-native-feather';
import { themeColors } from 'theme';
import globalApi from '@/services/globalApi';
import Response from '../Response';
import { useCartContext } from '@/providers.tsx/CartProvider';

const screenWidth = Dimensions.get('window').width; // Get the screen width
const screenHeight = Dimensions.get('window').height; // Get the screen height

const activeSchedule = [
  {
    day: "Thứ 2",
    time: "10:00 - 22:00",
  },
  {
    day: "Thứ 3",
    time: "10:00 - 22:00",
  },
  {
    day: "Thứ 4",
    time: "10:00 - 22:00",
  },
  {
    day: "Thứ 5",
    time: "10:00 - 22:00",
  }, {
    day: "Thứ 6",
    time: "10:00 - 22:00",
  }
  , {
    day: "Thứ 7",
    time: "10:00 - 22:00",
  }
  , {
    day: "Chủ nhật",
    time: "10:00 - 22:00",
  }
]

interface fadShop {
  SHOP_ID: number,
  SHOP_NAME: string,
  PHONE: string,
  OPENTIME: string,
  CLOSETIME: string,
  AVT_IMAGE_ID: number,
  AVATAR_IMAGE_URL: string,
  COVER_IMAGE_ID: number,
  COVER_IMAGE_URL: string,
  SHOP_OWNER_ID: number,
  EMAIL: string,
  ADDRESS_ID: number,
  ADDRESS: string,
  DESCRIPTION: string,
  IS_DELETED: number,
  created_at: string
}

export default function ShopScreen({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const { heightScreen, widthScreen, mainColor, orderStatusList, baseURL, userID, setOrderID, RD } = useCartContext();

  const [shopInfo, setShopInfo] = useState<fadShop | null>(null);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [emailInfo, setEmailInfo] = useState('');
  const [addressInfo, setAddressInfo] = useState('');
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);

  const fetchShop = async (id: any) => {
    try {
      const response = await globalApi.getShopDetail(id);
      console.log(response);
      if (response.data !== null && response.statusCode === 200) {
        const newShop = {
          SHOP_ID: response.data.SHOP_ID,
          SHOP_NAME: response.data.SHOP_NAME,
          PHONE: response.data.PHONE,
          OPENTIME: response.data.OPENTIME,
          CLOSETIME: response.data.CLOSETIME,
          AVT_IMAGE_ID: response.data.AVT_IMAGE_ID,
          AVATAR_IMAGE_URL: response.data.AVATAR_IMAGE_URL,
          COVER_IMAGE_ID: response.data.COVER_IMAGE_ID,
          COVER_IMAGE_URL: response.data.COVER_IMAGE_URL,
          SHOP_OWNER_ID: response.data.SHOP_OWNER_ID,
          EMAIL: response.data.EMAIL,
          ADDRESS_ID: response.data.ADDRESS_ID,
          ADDRESS: response.data.ADDRESS,
          DESCRIPTION: response.data.DESCRIPTION,
          IS_DELETED: response.data.IS_DELETED,
          created_at: response.data.created_at
        };
        setShopInfo(newShop);
      } else {

      }
    } catch (e) {
      console.error("Lỗi lấy thông tin cửa hàng", e);

    }
  }

  useEffect(() => {
    fetchShop(1);
  }, [])

  useEffect(() => {
    if (shopInfo) {
      setEmailInfo(shopInfo.EMAIL);
      setAddressInfo(shopInfo.ADDRESS);
      setContactInfo(shopInfo.PHONE);
    }
  }, [shopInfo])



  const renderShowConfirmPopup = () => {
    return (
      <View style={{ position: "absolute", top: -(heightScreen * 0.1), width: widthScreen, height: heightScreen }}>
        <Response
          content="Xác nhận cập nhật thông tin?"
          buttonIcon1="check-circle"
          buttonFunction1={() => hanldeChangeShopDetail()}
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

  return (
    <View>
      <ScrollView>
        <View style={styles.relative}>
          <Image style={[styles.coverImage]} source={shopInfo ? { uri: shopInfo.COVER_IMAGE_URL } : require('../../../../../assets/images/shopImage.jpg')} />
          <TouchableOpacity style={styles.absolute} onPress={() => {
            navigation.replace("homepage");
          }
          }>
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View style={[styles.borderTopRadius, styles.bgWhite, styles.negativeMarginTop, styles.paddingTop]}>
          <View style={styles.paddingHorizontal}>
            <Text style={styles.textLarge}>{shopInfo?.SHOP_NAME}</Text>
            <View style={[styles.flexRow, styles.marginVerticalSmall]}>
              <View style={[styles.flexRow, styles.alignCenter, styles.marginRightSmall]}>
                <Icon.MapPin color={'gray'} width={15} height={15} />
                <Text style={[styles.textGray, styles.textSmall]}>{shopInfo ? shopInfo.ADDRESS : "Loading..."}</Text>
              </View>
            </View>
          </View>

        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Thời gian hoạt động</Text>
          <View style={{ backgroundColor: "white", padding: 6, marginTop: 6, paddingLeft: 10, borderRadius: 10, elevation: 10, display: "flex" }}>
            <FlatList
              data={activeSchedule}
              style={{ alignSelf: "center" }}
              renderItem={({ item }) => <Text style={{ fontSize: 16 }}>{item.day} - {item.time}</Text>}
            />
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <View style={styles.informationContainer}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 10, alignItems: "center", borderRadius: 10 }}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}>
                <Image source={require('../../../../../assets/images/id-card.png')} style={{ resizeMode: "cover", aspectRatio: 1, width: 40, height: 40 }} />
                <Text style={{ fontSize: 20, fontWeight: "600", color: "red" }}>Thông tin liên lạc</Text>
              </View>
              {/* <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={() => setIsEditingContact(!isEditingContact)}>
                  <Ionicons name={isEditingContact ? "ion-checkmark-circled" : "pencil"} size={24} color="black" />
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={styles.infoRow}>
              <View style={{ padding: 5 }}>
                <FontAwesome name="phone" size={24} color="black" />
              </View>
              {isEditingContact ? (
                <TextInput
                  style={styles.textInput}
                  value={contactInfo ? contactInfo : ""}
                  onChangeText={setContactInfo}
                />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: "500" }}>{contactInfo}</Text>
              )}

              {
                isShowConfirmPopup && (
                  <View style={{ position: "absolute", top: 0, height: heightScreen, width: widthScreen, backgroundColor: "gray", opacity: 0.6 }}>

                  </View>
                )
              }
              {
                isShowConfirmPopup && renderShowConfirmPopup()
              }
            </View>
            <View style={styles.infoRow}>
              <View style={{ padding: 2 }}>
                <FontAwesome name="envelope" size={24} color="black" />
              </View>
              {isEditingContact ? (
                <TextInput
                  style={styles.textInput}
                  value={emailInfo ? emailInfo : ""}
                  onChangeText={setEmailInfo}
                />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: "500" }}>{emailInfo}</Text>
              )}
            </View>
          </View>
          <View style={[styles.informationContainer, { marginBottom: 15 }]}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 10, marginTop: 10, borderRadius: 10, alignItems: "center" }}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}><Image source={require('../../../../../assets/images/location.png')} style={{ resizeMode: "cover", aspectRatio: 1, width: 40, height: 40 }} />
                <Text style={{ fontSize: 20, fontWeight: "600", color: "red" }}>Địa chỉ</Text></View>
              {/* <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={() => setIsEditingAddress(!isEditingAddress)}>
                  <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={styles.infoRow}>
              <FontAwesome name="road" size={24} color="black" />
              {isEditingAddress ? (
                <TextInput
                  style={styles.textInput}
                  value={addressInfo}
                  onChangeText={setAddressInfo}
                />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: "500" }}>{addressInfo}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 288,
  },
  absolute: {
    position: 'absolute',
    top: 56, // 14 * 4
    left: 16, // 4 * 4
    backgroundColor: 'rgba(255,255,255,1)', // bg-gray-50
    padding: 8, // p-2
    borderRadius: 9999, // rounded-full
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  borderTopRadius: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  negativeMarginTop: {
    marginTop: -48, // -mt-12
  },
  paddingTop: {
    paddingTop: 24, // pt-6
  },
  paddingHorizontal: {
    paddingHorizontal: 20, // px-5
  },
  textLarge: {
    fontSize: 30, // text-3xl
    fontWeight: 'bold',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  marginVerticalSmall: {
    marginVertical: 4, // my-1
  },
  alignCenter: {
    alignItems: 'center',
  },
  marginRightSmall: {
    marginRight: 4, // space-x-1
  },
  smallIcon: {
    height: 16, // h-4
    width: 16, // w-4
  },
  textSmall: {
    fontSize: 12, // text-xs
  },
  textGreen: {
    color: 'green',
  },
  textGray: {
    color: 'gray',
  },
  fontSemiBold: {
    fontWeight: '600', // font-semibold
  },
  homeContainer: {
    backgroundColor: "#e0effa",
    // marginHorizontal: "2%",
    gap: 5,
    flex: 1,
  },
  primaryHeader: {

  },
  fullWidthImage: {
    width: screenWidth, // Set the image width to full screen width
    resizeMode: 'cover', // This ensures the image covers the specified dimensions
    height: 170,
  }
  ,
  backButton: {
    position: 'absolute',
    top: -(170 * 3 / 4) - 5, // Adjusted to be near the top
    left: 10, // Adjusted to be near the left corner
    backgroundColor: '#6495ed',
    width: 30,
    height: 30,
    borderRadius: 15, // Makes the circle perfectly round
    borderCurve: "continuous",
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8, // A bit more opaque to ensure visibility
  },
  plusButton: {
    position: 'absolute',
    bottom: 50, // Positioned at the bottom
    right: 10, // Positioned at the right corner
    backgroundColor: '#6495ed',
    width: 30,
    height: 30,
    borderRadius: 20, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  informationContainer: { backgroundColor: "white", marginTop: 10, borderRadius: 10, marginBottom: 5 },
  infoRow: { width: "100%", display: 'flex', padding: 10, paddingLeft: 40, borderRadius: 10, alignItems: "center", flexDirection: "row", gap: 10 }
  ,
  textInput: {
    width: "80%",
    height: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  }
});

// <ScrollView>
//   <View style={styles.homeContainer}>
//     <StatusBar hidden />
//     <View style={{
//       display: "flex",
//     }}>
//       <Image source={require('../../../../../assets/images/shopImage.jpg')} style={styles.fullWidthImage} />
//       <Pressable
//         onPress={() => router.back()} // Navigate back to the previous screen
//         style={{ padding: 10 }} // Add padding to make the button easier to press
//       >
//         <View style={styles.backButton}>
//           <FontAwesome name="angle-left" size={24} color="white" />
//         </View>
//       </Pressable>
//       <Pressable
//         onPress={() => router.back()} // Navigate back to the previous screen
//         style={{ padding: 10 }} // Add padding to make the button easier to press
//       >
//         <View style={styles.plusButton}>
//           <Entypo name="plus" size={24} color="rgba(255, 255, 255, 0.5)" // Transparent color
//           />
//         </View>
//       </Pressable>
//     </View>
//     <View style={{ marginHorizontal: 10 }}>
//       <Text style={{ fontSize: 20, fontWeight: "600" }}>Lẩu chay Hữu Duyên</Text>
//       <View style={[styles.row]}>
//         <View style={[styles.row, { alignItems: "center" }]}>
//           <Entypo name="star" size={24} color="#fccc51" />
//           <Text style={{ fontSize: 16 }}>4.8 (32)</Text>
//         </View>
//         <View style={[styles.row, { alignItems: "center" }]}>
//           <Entypo name="location-pin" size={24} color="black" />
//           <Text style={{ fontSize: 16 }}>KTX khu B DHQG</Text>
//         </View>
//         <View style={[styles.row, { alignItems: "center", justifyContent: "center" }]}>
//           <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
//           <Text style={{ fontSize: 16 }}>Đang mở cửa</Text>
//         </View>
//       </View>
//       <View style={{ marginTop: 10 }}>
//         <Text style={{ fontSize: 20, fontWeight: "600" }}>Thời gian hoạt động</Text>
//         <View style={{ backgroundColor: "white", padding: 6, marginTop: 6, paddingLeft: 10, borderRadius: 10, elevation: 10, display: "flex" }}>
//           <FlatList
//             data={activeSchedule}
//             style={{ alignSelf: "center" }}
//             renderItem={({ item }) => <Text style={{ fontSize: 16 }}>{item.day} - {item.time}</Text>}
//           />
//         </View>
//       </View>
//       <View style={{ marginTop: 15 }}>
//         <View style={styles.informationContainer}>
//           <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 10, alignItems: "center", borderRadius: 10 }}>
//             <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}>
//               <Image source={require('../../../../../assets/images/id-card.png')} style={{ resizeMode: "cover", aspectRatio: 1, width: 40, height: 40 }} />
//               <Text style={{ fontSize: 20, fontWeight: "600", color: "red" }}>Thông tin liên lạc</Text>
//             </View>
//             <View style={{ justifyContent: "flex-end" }}>
//               <Ionicons name="pencil" size={24} color="black" />
//             </View>
//           </View>
//           <View style={styles.infoRow}>
//             <FontAwesome name="phone" size={24} color="black" />
//             <Text style={{ fontSize: 16, fontWeight: "500" }}>+84 775197200</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <FontAwesome name="envelope" size={24} color="black" />
//             <Text style={{ fontSize: 16, fontWeight: "500" }}>buihuubang@gmail.com</Text>
//           </View>
//         </View>
//         <View style={[styles.informationContainer, { marginBottom: 15 }]}>
//           <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 10, marginTop: 10, borderRadius: 10, alignItems: "center" }}>
//             <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}><Image source={require('../../../../../assets/images/location.png')} style={{ resizeMode: "cover", aspectRatio: 1, width: 40, height: 40 }} />
//               <Text style={{ fontSize: 20, fontWeight: "600", color: "red" }}>Địa chỉ</Text></View>
//             <Ionicons name="pencil" size={24} color="black" />
//           </View>
//           <View style={styles.infoRow}>
//             <FontAwesome name="road" size={24} color="black" />
//             <Text style={{ fontSize: 16, fontWeight: "500" }}>Ký túc xá khu B Đại học Quốc gia</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   </View >
// </ScrollView>
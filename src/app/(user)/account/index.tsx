import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity  } from 'react-native'; 
import { useCartContext } from '@/providers.tsx/CartProvider';
import { ScrollView } from 'react-native-gesture-handler'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatarURL = "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/362676453_1451519459020293_1570629234986068265_n.jpg?stp=c0.30.240.240a_dst-jpg_p240x240&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dwCMZ2ID2tEAb4UI6PA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD5X581vPOeaXTvdTKPAI9lGW6a_0-zTXvAZsumWT4_XQ&oe=6621AE3F"

export default function AccountHome() {  
  const { heightScreen, widthScreen, mainColor, baseURL } = useCartContext();
  const styles = StyleSheet.create({
    headerInfoContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: widthScreen * 0.04,
      paddingVertical: heightScreen * 0.02,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    avatarImage: {
      height: widthScreen * 0.2,
      width: widthScreen * 0.2,
      aspectRatio: 1,
      borderRadius: widthScreen * 0.1,
      borderWidth: 1,
      borderColor: mainColor
    },
    textHeaderContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: heightScreen * 0.01
    },
    nameText: {
      fontSize: widthScreen * 0.05,
      fontWeight: 'bold',
      color: 'gray'
    }, 
    bodyContainer: {
      paddingVertical: heightScreen * 0.015,
      borderBottomWidth: 1,
      borderBottomColor: '#d1cfcf',
      marginHorizontal: widthScreen * 0.04,
    },
    itemContainerInBody: { 
      flexDirection:"row", 
      paddingVertical: heightScreen * 0.006, 
      marginHorizontal: widthScreen * 0.04,
      paddingHorizontal: widthScreen * 0.03,
      alignItems: 'center',
      // borderBottomWidth: 1, 
      borderBottomColor: '#d1cfcf', 
    },
    itemTextInBody: {
      fontWeight: 'bold',
      color: "gray",
      marginLeft: widthScreen * 0.03,
      fontSize: widthScreen * 0.042
    }
  })
  const navigation = useNavigation();

  const listItem = {
    account: [
      { icon: "user", title: "Thông tin tài khoản", size: widthScreen * 0.07, linkHref: "AccountInfo"}, 
      // { icon: "lock", title: "Quyền riêng tư", size: widthScreen * 0.06,  linkHref: "/(user)/account/privacy"},
      { icon: "shield-alt", title: "Bảo mật", size: widthScreen * 0.055,  linkHref: "Security"}
    ],
    featureManagement: [
      { icon: "file-invoice", title: "Đơn hàng", size: widthScreen * 0.06, linkHref: "order/OrderManagement"},
      { icon: "store", title: "Cửa hàng", size: widthScreen * 0.05,  linkHref: "/(user)/account/shop/ShopManagement"},
      // { icon: "bookmark", title: "Đã lưu", size: widthScreen * 0.06, linkHref: "/(user)/account/saved"},
      { icon: "heart", title: "Đã thích, Đã lưu", size: widthScreen * 0.06, linkHref: "LikeAndSave"},
      { icon: "edit", title: "Quản lý bài viết", size: widthScreen * 0.055, linkHref: "ManagePost"},
    ],
    logOut: { icon: "sign-out-alt", title: "Đăng xuất", size: widthScreen * 0.06}
  }
  console.log("acocunt")

  const [nameAndAVTURL, setNameAndAVTURL] = useState({name: '', url: ''})
  const getNameAndAVTURL = async () => {
    const NameAndAVTURL = await AsyncStorage.getItem('NameAndAVTURL'); 
    if (NameAndAVTURL) {
      const JSONNameAndAVTURL = JSON.parse(NameAndAVTURL )
      setNameAndAVTURL({
        name: JSONNameAndAVTURL.NAME,
        url: JSONNameAndAVTURL.AVT_URL
      })
      console.log(JSONNameAndAVTURL, 'JSONNameAndAVTURL');
    }
  }
  useEffect(() => {
    getNameAndAVTURL() 
  }, [])

  return (  
    <ScrollView> 
      {/* header */}
      <View style={styles.headerInfoContainer}>
        <View>
          {
            nameAndAVTURL.url &&
            <Image
              source={{uri: nameAndAVTURL.url || "" }}
              style={styles.avatarImage}
            ></Image>
          }
        </View>
        <View style={styles.textHeaderContainer}>
          <Text style={styles.nameText}>{ nameAndAVTURL.name }</Text>
          {/* <Text>@id: dosidat1503</Text> */}
        </View>
      </View>

      {/* body */}
      {/* Thông tin tài khoản */}
      <View style={styles.bodyContainer}>   
          {
            listItem.account.map((item, index) => {
              return(
                <TouchableOpacity
                  key={index}
                  onPress={ () => {  
                    navigation.navigate(item.linkHref as never) 
                  }}
                >
                  <View style={styles.itemContainerInBody}>
                    <View style={{width: widthScreen * 0.06, flexDirection: 'row', justifyContent: 'center'}}>
                      <FontAwesome5 name={item.icon} size={item.size} color={mainColor} />
                    </View>
                    <Text  style={styles.itemTextInBody}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            } )
          }  
      </View>
      {/* quản lý tính năng */}
      <View style={styles.bodyContainer}> 
          {
            listItem.featureManagement.map((item, index) => {
              return(
                <TouchableOpacity
                  onPress={() => { navigation.navigate( item.linkHref as never)} }
                  key={index}
                >
                  {/* <Link href={item.linkHref} > */}
                    <View style={styles.itemContainerInBody}>
                      <View style={{width: widthScreen * 0.06, flexDirection: 'row', justifyContent: 'center'}}>
                        <FontAwesome5 name={item.icon} size={item.size} color={mainColor} />
                      </View>
                      <Text style={styles.itemTextInBody}>{item.title}</Text>
                    </View>
                  {/* </Link> */}
                </TouchableOpacity>
              )
            } )
          } 
      </View>
      <View style={styles.bodyContainer}>  
        <TouchableOpacity
          onPress={() => {  
            axios.get(baseURL + '/logout')
            navigation.navigate('index' as never)
          }}
        >
          <View style={styles.itemContainerInBody}>
            <View style={{width: widthScreen * 0.06, flexDirection: 'row', justifyContent: 'center'}}>
              <FontAwesome5 name={listItem.logOut.icon} size={listItem.logOut.size} color={mainColor} />
            </View>
            <Text  style={styles.itemTextInBody}>{listItem.logOut.title}</Text>
          </View>
        </TouchableOpacity> 
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({ 
});

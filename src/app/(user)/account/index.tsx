import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity  } from 'react-native';
import ProductListItem from '@components/ProductListItem'; 
import products from '@assets/data/products';
import { Product } from '@/types';
import Button from '@/components/Button';
import { useCartContext } from '@/providers.tsx/CartProvider';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, Stack } from 'expo-router'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const avatarURL = "https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/362676453_1451519459020293_1570629234986068265_n.jpg?stp=c0.30.240.240a_dst-jpg_p240x240&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dwCMZ2ID2tEAb4UI6PA&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfD5X581vPOeaXTvdTKPAI9lGW6a_0-zTXvAZsumWT4_XQ&oe=6621AE3F"

export default function TabOneScreen() {  
  const { heightScreen, widthScreen, mainColor } = useCartContext();
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
      borderRadius: widthScreen * 0.1
    },
    textHeaderContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: heightScreen * 0.01
    },
    nameText: {
      fontSize: widthScreen * 0.05,
      fontWeight: 'bold'
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
      { icon: "user", title: "Thông tin tài khoản", size: widthScreen * 0.07, linkHref: "/(user)/account/accountInfo"}, 
      { icon: "lock", title: "Quyền riêng tư", size: widthScreen * 0.06,  linkHref: "/(user)/account/privacy"},
      { icon: "shield-alt", title: "Bảo mật", size: widthScreen * 0.055,  linkHref: "/(user)/account/security"}
    ],
    featureManagement: [
      { icon: "file-invoice", title: "Đơn hàng", size: widthScreen * 0.06, linkHref: "/(user)/account/order/OrderManagement"},
      { icon: "store", title: "Cửa hàng", size: widthScreen * 0.055,  linkHref: "/(user)/account/shop/ShopManagement"},
      { icon: "bookmark", title: "Đã lưu", size: widthScreen * 0.06, linkHref: "/(user)/account/saved"},
      { icon: "heart", title: "Đã thích", size: widthScreen * 0.06, linkHref: "/(user)/account/liked"},
    ],
    logOut: { icon: "sign-out-alt", title: "Đăng xuất", size: widthScreen * 0.06}
  }

  return (  
    <ScrollView> 
      {/* header */}
      <View style={styles.headerInfoContainer}>
        <View>
          <Image
            source={{uri: avatarURL}}
            style={styles.avatarImage}
          ></Image>
        </View>
        <View style={styles.textHeaderContainer}>
          <Text style={styles.nameText}>Đỗ Sĩ Đạt</Text>
          <Text>@id: dosidat1503</Text>
        </View>
      </View>

      {/* body */}
      {/* Thông tin tài khoản */}
      <View style={styles.bodyContainer}>   
          {
            listItem.account.map((item, index) => {
              return(
                <TouchableOpacity>
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
                  // onPress={() => { navigation.navigate('OrderManagement', null)} }
                >
                  <Link href={item.linkHref} >
                    <View style={styles.itemContainerInBody}>
                      <View style={{width: widthScreen * 0.06, flexDirection: 'row', justifyContent: 'center'}}>
                        <FontAwesome5 name={item.icon} size={item.size} color={mainColor} />
                      </View>
                      <Text style={styles.itemTextInBody}>{item.title}</Text>
                    </View>
                  </Link>
                </TouchableOpacity>
              )
            } )
          } 
      </View>
      <View style={styles.bodyContainer}>  
          <TouchableOpacity>
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

import { FlatList, StyleSheet, View, Text, Pressable, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Link, useNavigation, useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width; // Get the screen width
const screenHeight = Dimensions.get('window').height; // Get the screen height

export default function UserSc({ navigation, route }) {
  const router = useRouter();
  return (
    <View style={styles.homeContainer}>
      <ScrollView>
        <View style={styles.homeContainer}>
          <Pressable onPress={() => { navigation.navigate("shop", { screen: "shop" }) }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "white", paddingVertical: 10, paddingTop: 40 }}>
              <Image source={require('../../../../assets/images/shopImage.jpg')} style={{ height: 50, width: 60, borderRadius: 15 }} />
              <View>
                <Text style={{ fontSize: 16, fontWeight: "800" }}>Hồ sơ quán</Text>
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#868686" }}>Xem thông tin quán</Text>
              </View>
              <FontAwesome name="angle-right" size={50} color="blue" />
            </View>
          </Pressable>
          <View style={{ backgroundColor: "white", paddingVertical: 10, marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>Thông tin cá nhân</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('editShop') }}>
              <View style={styles.row}>
                <Image source={require('../../../../assets/images/person.png')} style={{ height: 40, width: 40 }} />
                <Text style={{ fontSize: 18 }}>Hồ sơ cửa hàng</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.row}>
              <Image source={require('../../../../assets/images/payment-method.png')} style={{ height: 40, width: 40 }} />
              <Text style={{ fontSize: 18 }}>Cài đặt thanh toán</Text>
            </View>
          </View>

          <View style={{ backgroundColor: "white", paddingVertical: 10, marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>Quản lý cửa hàng</Text>
            <View style={styles.row}>
              <Image source={require('../../../../assets/images/bar-chart.png')} style={{ height: 40, width: 40 }} />
              <Text style={{ fontSize: 18 }}>Thống kê</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate("listVouchers") }}>
              <View style={styles.row}>
                <Image source={require('../../../../assets/images/voucher.png')} style={{ height: 40, width: 40 }} />
                <Text style={{ fontSize: 18 }}>Voucher</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.row, { backgroundColor: "white", marginTop: 10, marginBottom: 10, justifyContent: "center", paddingHorizontal: 10 }]}>
            <Link href={"/(user)/account"} asChild>
              <TouchableOpacity style={styles.row}>
                <Image source={require('../../../../assets/images/logout.png')} style={{ height: 40, width: 40 }} />
                <Text style={{ fontSize: 18, color: "blue" }}>Trở lại</Text>
              </TouchableOpacity></Link>
          </View>
        </View>
      </ScrollView >
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#e0effa",
    height: "100%",
    gap: 5,
    marginBottom: 5,
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10
  }
});

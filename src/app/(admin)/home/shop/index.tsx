import { FlatList, StyleSheet, View, Text, Pressable, Image, StatusBar, ScrollView } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { FontAwesome, FontAwesome5, Entypo, Feather, EvilIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import React from 'react';

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
export default function ShopScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const router = useRouter();
  return (
    <ScrollView>
      <View style={styles.homeContainer}>
        <StatusBar hidden />
        <View style={{
          display: "flex",
        }}>
          <Image source={require('../../../../../assets/images/shopImage.jpg')} style={styles.fullWidthImage} />
          <Pressable
            onPress={() => router.back()} // Navigate back to the previous screen
            style={{ padding: 10 }} // Add padding to make the button easier to press
          >
            <View style={styles.backButton}>
              <FontAwesome name="angle-left" size={24} color="white" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => router.back()} // Navigate back to the previous screen
            style={{ padding: 10 }} // Add padding to make the button easier to press
          >
            <View style={styles.plusButton}>
              <Entypo name="plus" size={24} color="rgba(255, 255, 255, 0.5)" // Transparent color
              />
            </View>
          </Pressable>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Lẩu chay Hữu Duyên</Text>
          <View style={[styles.row]}>
            <View style={[styles.row, { alignItems: "center" }]}>
              <Entypo name="star" size={24} color="#fccc51" />
              <Text style={{ fontSize: 16 }}>4.8 (32)</Text>
            </View>
            <View style={[styles.row, { alignItems: "center" }]}>
              <Entypo name="location-pin" size={24} color="black" />
              <Text style={{ fontSize: 16 }}>KTX khu B DHQG</Text>
            </View>
            <View style={[styles.row, { alignItems: "center", justifyContent: "center" }]}>
              <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
              <Text style={{ fontSize: 16 }}>Đang mở cửa</Text>
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
                <View style={{ justifyContent: "flex-end" }}>
                  <Ionicons name="pencil" size={24} color="black" />
                </View>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="phone" size={24} color="black" />
                <Text style={{ fontSize: 16, fontWeight: "500" }}>+84 775197200</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="envelope" size={24} color="black" />
                <Text style={{ fontSize: 16, fontWeight: "500" }}>buihuubang@gmail.com</Text>
              </View>
            </View>
            <View style={[styles.informationContainer, { marginBottom: 15 }]}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 10, marginTop: 10, borderRadius: 10, alignItems: "center" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}><Image source={require('../../../../../assets/images/location.png')} style={{ resizeMode: "cover", aspectRatio: 1, width: 40, height: 40 }} />
                  <Text style={{ fontSize: 20, fontWeight: "600", color: "red" }}>Địa chỉ</Text></View>
                <Ionicons name="pencil" size={24} color="black" />
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="road" size={24} color="black" />
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Ký túc xá khu B Đại học Quốc gia</Text>
              </View>
            </View>
          </View>
        </View>
      </View >
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  infoRow: { width: "100%", display: 'flex', padding: 10, paddingLeft: 40, borderRadius: 10, alignItems: "center", flexDirection: "row", gap: 12 }
});

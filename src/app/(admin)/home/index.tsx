import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AvatarExample from "@/components/Avatar";
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Colors from "@/constants/Colors";
import { useFonts } from "expo-font";
import { Link, useNavigation } from "expo-router";
import HeaderBar from "@/components/HeaderBar";
import globalApi from "@/services/globalApi";
import { formatCurrency } from "@/utils/formatter";

// front end coded by BangBui
export default function HomePageScreen() {
  // const renderItemProduct = ({ item }) => <ProductListItem product={item}></ProductListItem>
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const [revenues, setRevenues] = useState({});
  const [currentDateRevenue, setCurrentDateRevenue] = useState(0);

  const fetchRevenue = async (shopId: number) => {
    try {
      const response = await globalApi.getDailyRevenue(shopId);
      console.log(response);
      if (response.dailyRevenues !== null && response.statusCode === 200) {
        setRevenues(response.dailyRevenues);
      }
    } catch (e) {
      console.error("Lỗi lấy thông tin doanh thu", e);
    }
  }
  useEffect(() => {
    fetchRevenue(1);
  }, [])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại ở định dạng YYYY-MM-DD
    if (revenues[today] !== undefined) {
      setCurrentDateRevenue(revenues[today]);
    } else {
      setCurrentDateRevenue(0);
    }
  }, [revenues]);

  return (
    <View style={styles.homeContainer}>
      <HeaderBar />
      <View style={styles.summaryContainer}>
        <Text style={{ fontSize: 30, fontWeight: "800" }}>Doanh thu</Text>
        <View style={styles.income}>
          <Text style={{ color: Colors.light.background }}>
            Ngày {new Date().getDate()}, tháng {new Date().getMonth() + 1} Năm {new Date().getFullYear()}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: Colors.light.background,
              }}
            >
              {currentDateRevenue && formatCurrency(currentDateRevenue)}
            </Text>
            <Text style={{ fontSize: 15, color: Colors.light.background }}>
              0%{" "}
              <FontAwesome
                name="arrow-up"
                size={15}
                color={Colors.light.background}
                style={{ marginRight: 15 }}
              />
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.serviceContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          Chức năng
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={styles.category}>
            <Pressable
              onPress={() => {
                navigation.navigate("shop");
              }}
            >
              <View
                style={{
                  backgroundColor: "#f1f3f2",
                  width: 70,
                  height: 70,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/images/restaurant.png")}
                  style={{ height: 40, width: 40 }}
                />
              </View>
            </Pressable>
            <Text style={styles.categoryText}>Cửa hàng</Text>
          </View>
          <View style={styles.category}>
            <Pressable
              onPress={() => {
                navigation.navigate("menu");
              }}
            >
              <View
                style={{
                  backgroundColor: "#f1f3f2",
                  width: 70,
                  height: 70,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/images/bar.png")}
                  style={{ height: 40, width: 40 }}
                />
              </View>
            </Pressable>
            <Text style={styles.categoryText}>Thực đơn</Text>
          </View>
          <View style={styles.category}>
            <View
              style={{
                backgroundColor: "#f1f3f2",
                width: 70,
                height: 70,
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => { navigation.navigate("listVouchers") }}>
                <Image
                  source={require("../../../../assets/images/discount.png")}
                  style={{ height: 40, width: 40 }}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.categoryText}>Giảm giá</Text>
          </View>
          <View style={styles.category}>
            <Pressable onPress={() => {
              navigation.navigate("order");
            }}>
              <View
                style={{
                  backgroundColor: "#f1f3f2",
                  width: 70,
                  height: 70,
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/images/checklist.png")}
                  style={{ height: 40, width: 40 }}
                />
              </View>
              <Text style={styles.categoryText}>Đơn hàng</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

// Reformat css by LeXuan
const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#e0effa",
    paddingHorizontal: 10,
    gap: 10,
    width: "100%",
    height: "100%",
  },
  homeTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  summaryContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  serviceContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 20 }, // iOS shadow
    shadowOpacity: 0.5, // iOS shadow
    shadowRadius: 4, // iOS shadow
    elevation: 20, // Android shadow
  },
  text: {
    fontFamily: "Helvetica",
  },
  income: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 10,
    borderRadius: 25,
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 20,
  },
  category: { display: "flex", flexDirection: "column", alignItems: "center" },
  categoryText: {
    fontFamily: "Roboto_400Medium",
  },
});

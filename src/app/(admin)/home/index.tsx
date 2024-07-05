import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import AvatarExample from "@/components/Avartar";
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

// front end coded by BangBui
export default function TabOneScreen() {
  // const renderItemProduct = ({ item }) => <ProductListItem product={item}></ProductListItem>
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  return (
    <View style={styles.homeContainer}>
      <HeaderBar />
      <View style={styles.summaryContainer}>
        <Text style={{ fontSize: 30, fontWeight: "800" }}>Doanh thu</Text>
        <View style={styles.income}>
          <Text style={{ color: Colors.light.background }}>
            Ngày 22, tháng 4 Năm 2024
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
              900,000Đ
            </Text>
            <Text style={{ fontSize: 15, color: Colors.light.background }}>
              15%{" "}
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
              <Image
                source={require("../../../../assets/images/discount.png")}
                style={{ height: 40, width: 40 }}
              />
            </View>
            <Text style={styles.categoryText}>Giảm giá</Text>
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
              <Image
                source={require("../../../../assets/images/checklist.png")}
                style={{ height: 40, width: 40 }}
              />
            </View>
            <Text style={styles.categoryText}>Đơn hàng</Text>
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

import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function ShopScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const navigation = useNavigation();
  return (
    <View style={styles.homeContainer}>
      <View style={styles.headerBar}>
        <Pressable
          onPress={() => router.back()} // Navigate back to the previous screen
          style={{ padding: 10 }} // Add padding to make the button easier to press
        >
          <View style={styles.backButton}>
            <FontAwesome name="angle-left" size={24} color="white" />
          </View>
        </Pressable>
        <View style={styles.header}>
          <Text style={styles.headerUsername}>Chào Xoan</Text>
          <Text style={styles.headerResname}>Lẩu chay Hữu Duyên</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <Image
          source={require("../../../../../assets/images/wine-menu.png")}
          style={{ width: 40, height: 40 }}
        />

        <Text style={styles.filterRowText}>Thiết lập thực đơn</Text>

        <Pressable
          onPress={() => navigation.navigate("editMenu")}
          style={{ padding: 10 }}
        >
          <View style={[styles.backButton, { opacity: 1 }]}>
            <FontAwesome name="angle-right" size={24} color="white" />
          </View>
        </Pressable>
      </View>

      <View style={styles.whiteContainer}>
        <View style={styles.containerItem}>
          <Text style={styles.buttonText}>Các món chính</Text>
        </View>
        <View style={styles.containerItem}>
          <Text style={styles.buttonText}>Tuỳ chọn nhóm</Text>
        </View>
      </View>

      <View>
        <View style={(styles.paddingTotal, styles.pickMenuHeader)}>
          <Text style={{ color: "black", fontWeight: "700" }}>
            Menu{" "}
            <Text style={{ marginLeft: 10, color: "gray", fontSize: 12 }}>
              (2 danh mục)
            </Text>
          </Text>

          <Pressable>
            <Text style={{ color: "#709dee" }}>Chọn</Text>
          </Pressable>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <Text>Lẩu</Text>
            <View style={styles.mealCount}>
              <Text>3 Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          <View style={styles.menuRow}>
            <Text>Ăn vặt</Text>
            <View style={styles.mealCount}>
              <Text>3 Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          <View style={styles.menuRow}>
            <Text>Thức uống</Text>
            <View style={styles.mealCount}>
              <Text>3 Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#e0effa",
    gap: 10,
    width: "100%",
    height: "100%",
    // padding: 10,
  },
  headerBar: {
    height: "16%",
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    shadowColor: "#000",
    width: "100%",
  },
  backButton: {
    backgroundColor: "#6495ed",
    width: 30,
    height: 30,
    borderRadius: 15, // Makes the circle perfectly round
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8, // A bit more opaque to ensure visibility
  },
  header: {
    display: "flex",
    marginTop: 18,
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 100,
  },
  headerUsername: {
    fontWeight: "800",
    color: "black",
    fontSize: 20,
  },
  paddingTotal: {
    padding: 10,
  },
  headerResname: {
    color: "black",
    marginTop: 10,
  },
  filterRow: {
    height: "10%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 20,
  },
  filterRowText: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 100,
  },
  pickMenuHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  whiteContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  containerItem: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  menuRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 10,
  },
  mealCount: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  menuContainer: {
    display: "flex",
    gap: 10,
  },
  activeFilter: {},
});

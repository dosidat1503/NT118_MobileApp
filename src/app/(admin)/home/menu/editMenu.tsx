import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router';

export default function editMenu() {
  return (
    <View style={styles.homeContainer}>
      {/* <View style={styles.headerBar}>
        <Pressable
          onPress={() => router.back()} // Navigate back to the previous screen
          style={{ padding: 10 }} // Add padding to make the button easier to press
        >
          <View style={styles.backButton}>
            <FontAwesome name="angle-left" size={24} color="white" />
          </View>
        </Pressable>
        <Text style={{
          textAlign: 'center',
          flex: 1, // This allows it to expand to take full width
          fontSize: 18,
          fontWeight: 'bold',
        }}>Thiết lập thực đơn</Text>
        <Pressable
          onPress={() => router.back()} // Navigate back to the previous screen
          style={{ padding: 10 }} // Add padding to make the button easier to press
        >
          <View style={styles.backButton}>
            <FontAwesome name="angle-left" size={24} color="white" />
          </View>
        </Pressable>
      </View> */}

      <View style={styles.whiteContainer}>
        <View style={styles.containerItem}>
          <Text style={styles.buttonText}>Các món chính</Text>
        </View ><View style={styles.containerItem}>
          <Text style={styles.buttonText}>Tuỳ chọn nhóm</Text>
        </View>
      </View>


      <View>
        <View style={(styles.paddingTotal, styles.pickMenuHeader)}>
          <Text style={{ color: "black", fontWeight: "700" }}>
            Menu{" "}
            <Text style={{ marginLeft: 10, color: "gray", fontSize: 12 }}>
              (3 danh mục)
            </Text>
          </Text>

          <Pressable>
            <Text style={{ color: "#709dee" }}>Chọn</Text>
          </Pressable>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "700" }}>Lẩu</Text>
              <Text style={{ color: "#6495ED" }}>Chỉnh sửa danh mục</Text>
            </View>
            <View style={styles.mealCount}>

              <Text>3 Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          <View style={styles.menuRow}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "700" }}>Ăn vặt</Text>
              <Text style={{ color: "#6495ED" }}>Chỉnh sửa danh mục</Text>
            </View>
            <View style={styles.mealCount}>
              <Text>3 Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          <View style={styles.menuRow}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "700" }}>Thức uống</Text>
              <Text style={{ color: "#6495ED" }}>Chỉnh sửa danh mục</Text>
            </View>
            <View style={styles.mealCount}>
              <Text>3 Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#e0effa",
    gap: 10,
    width: "100%",
    height: "100%"
  },
  headerBar: {
    height: "12%",
    backgroundColor: "white",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    shadowColor: "#000",
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
  pickMenuHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  paddingTotal: {
    padding: 10,
  }
  ,
  backButton: {
    backgroundColor: '#6495ed',
    width: 30,
    height: 30,
    borderRadius: 15, // Makes the circle perfectly round
    borderCurve: "continuous",
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8, // A bit more opaque to ensure visibility
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
});

import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router';

export default function editMenu() {
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
        <Text>Thiết lập thực đơn</Text>
      </View>

      <View style={styles.whiteContainer}>
        <View style={styles.containerItem}>
          <Text style={styles.buttonText}>Các món chính</Text>
        </View ><View style={styles.containerItem}>
          <Text style={styles.buttonText}>Tuỳ chọn nhóm</Text>
        </View>
      </View>


      <View style={styles.menuList}>
        <View style={styles.row}>
          <Text>Menu <Text style={{ marginLeft: 10, color: "gray", fontSize: 12 }}>(2 danh mục)</Text></Text>

          <Pressable>
            <Text>Chọn</Text>
          </Pressable>
        </View>
        <View style={styles.menuRow}>
          <Text>Lẩu</Text>
          <View>
            <Text>
              3 Món
            </Text>
            <FontAwesome name="angle-down" size={24} color="black" />
          </View>
        </View>
        <View style={styles.menuRow}>
          <Text>Ăn vặt</Text>
          <View>
            <Text>
              3 Món
            </Text>
            <FontAwesome name="angle-down" size={24} color="black" />
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
  menuList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 20,
    justifyContent: "space-between",
    width: "100%",
  }
  ,
  menuRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

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

      <View>
        <View>
          <Text>Menu <Text style={{ marginLeft: 10, color: "gray", fontSize: 12 }}>(2 danh mục)</Text></Text>

          <Pressable>
            <Text>Chọn</Text>
          </Pressable>
        </View>

        <View>
          <View>
            <Text>Các món chính</Text>
          </View><View>
            <Text>Tuỳ chọn nhóm</Text>
          </View>
        </View>

        <View>
          <View>
            <Text>Lẩu</Text>
            <View>
              <Text>
                3 Món
              </Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          <View>
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
  backButton: {
    backgroundColor: '#6495ed',
    width: 30,
    height: 30,
    borderRadius: 15, // Makes the circle perfectly round
    borderCurve: "continuous",
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8, // A bit more opaque to ensure visibility
  }
});

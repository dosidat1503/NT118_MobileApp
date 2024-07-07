import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const AvatarExample = () => {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={40} icon="coffee" />
      <View style={styles.textContainer}>
        <Text style={styles.avatarSmallTitle}>Chào mừng quay trở lại</Text>
        <Text style={styles.avatarLargeTitle}>Xin chào, Lẩu chay Hữu Duyên!</Text>
      </View>
    </View>
  );
};

export default AvatarExample;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    flexDirection: "column", // Stack text elements vertically
    marginLeft: 10, // Add space between avatar and text
  },
  avatarSmallTitle: {
    fontSize: 13,
  },
  avatarLargeTitle: {
    fontSize: 15,
    fontWeight: "bold"
  },
});
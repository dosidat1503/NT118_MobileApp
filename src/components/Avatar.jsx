import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const AvatarExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Avatar Image example</Text>
      <Avatar.Image
        size={30}
        source={{
          uri: `https://media.geeksforgeeks.org/wp-content/uploads/20220305133853/gfglogo-300x300.png`,
        }}
      />
    </View>
  );
};

export default AvatarExample;

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  text: {
    marginBottom: 20,
    fontSize: 30,
  },
});

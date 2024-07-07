import { Stack, Link, useNavigation } from "expo-router"
import { Pressable, View, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { LogBox } from 'react-native';
import React from "react";
import SearchPost from "./SearchPost";
import AsyncStorage from '@react-native-async-storage/async-storage';


LogBox.ignoreLogs(['Warning: ...']);

export default function HomeLayout() {
  const navigation = useNavigation();
  // const { baseURL, setTextQueryPost, textQueryPost, mainColor, RD, widthScreen, heightScreen, selectedItem, setSelectedItem, returnHome, setReturnHome } = useCartContext();
  const [textQueryPost, setTextQueryPost] = useState('');
  useEffect(() => {
    AsyncStorage.setItem('textQueryPost', textQueryPost);
  }, [textQueryPost]);
  const widthScreen = Dimensions.get("window").width
  const heightScreen = Dimensions.get("window").height
  const RD = widthScreen * heightScreen
  const mainColor = "#89CFF0"
  const baseURL = "http://10.20.7.112:8000/api"
  console.log("HomeLayout")
  const renderHeaderRight = () => (
    <View style={{
      flexDirection: 'row',
      marginRight: 15,
      justifyContent: "center",
      alignItems: "center",
      // paddingBottom: 20
    }}>
      <View style={styles.comboSearch}>
        <TextInput
          placeholder="Tìm kiếm"
          style={styles.inputSearch}
          // value={textQueryPost}
          onChangeText={(text) => setTextQueryPost(text)}
        />
        {/* <TouchableOpacity onPress={() => handleSearch}>    */}
        <Link href="/home/SearchPost" asChild>
          <FontAwesome
            name="search"
            size={25}
            color={Colors.light.tint}
          />
        </Link>
        {/* </TouchableOpacity> */}
      </View>
      {/* <Link href="/home/filter" asChild>
        <Pressable>
          {({ pressed }) => ( 
            <Image
              source={require('@assets/images/filter_home_2.png')}
              style={styles.filterIcon}
            ></Image>
          )}
        </Pressable>
      </Link>   */}
    </View>
  )

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          headerLeft: () => (<View></View>),
          headerBackVisible: false,
          headerBackButtonMenuEnabled: false,
          headerRight: renderHeaderRight,
        }}

      />
      <Stack.Screen
        name="AddPost"
        options={{
          title: 'Thêm bài viết',
        }}
      />
      <Stack.Screen
        name="SearchPost"
        // component={SearchPost}
        options={{
          title: 'Tìm kiếm',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                // setTextQueryPost(''); // Đặt setTextQuery về chuỗi rỗng
                // setSelectedItem({
                //   topicItem: [],
                //   sortByItem: '',
                //   startDate: "",
                //   endDate: "", 
                // });
                // Đặt setSelectedItem về object rỗng
                // navigation.goBack(); // Điều hướng quay lại trang trước
                // setReturnHome(!returnHome); // Đặt returnHome về giá trị ngược lại
                navigation.navigate('index' as never);
              }}
            >
              <FontAwesome
                name="chevron-left"
                size={RD * 0.00005}
                color={mainColor}
                style={{
                  marginRight: widthScreen * 0.02,
                  paddingTop: heightScreen * 0.003
                }}
              />
            </TouchableOpacity>
          ),
        }}
      // initialParams={{ textQueryPost: textQueryPost }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  filterIcon: {
    width: 30,
    height: 30,
    color: 'green',
  },
  comboSearch: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#FBFFC8",
    borderColor: '#89CFF0',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 15,
    width: 200
  },
  inputSearch: {
    // height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    // marginHorizontal: 5,
    marginRight: 5,
    borderColor: "white",
    borderCurve: 'continuous',
    borderRightColor: "#89CFF0",
    borderWidth: 1,
    width: "80%"
  },
})
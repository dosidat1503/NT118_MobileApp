import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, Redirect, Stack, useNavigation } from "expo-router";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

const index = () => {
  const { heightScreen, widthScreen, mainColor, baseURL } = useCartContext();
  const styles = StyleSheet.create({
    divContainer: {
      width: widthScreen,
      height: heightScreen,
      justifyContent: "center",
      alignItems: "center",
      // backgroundImage: "url('https://www.w3schools.com/css/img_lights.jpg')"
    },
    input: {
      width: "90%",
      height: heightScreen * 0.06,
      borderRadius: widthScreen * 0.02,
      borderColor: "gray",
      borderWidth: 1,
      marginTop: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
    },
  });
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });
  // const [signInInfo, setSignInInfo] = useState({
  //   email: "",
  //   password: "",
  // });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [rememberPassword, setRememberPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getRememberPassword = async () => {
      const rememberPassword = await AsyncStorage.getItem("rememberPassword");
      if (rememberPassword) {
        setRememberPassword(true);
      }
    };
    getRememberPassword();
  }, []);

  const handleInputInfo = (key: string, value: string) => {
    setSignInInfo({
      ...signInInfo,
      [key]: value,
    });
  };

  const handleRememberPassword = () => {
    AsyncStorage.setItem("rememberPassword", JSON.stringify(!rememberPassword));
    setRememberPassword(!rememberPassword);
  };

  const handleLogin = () => {
    axios
      .post(baseURL + "/signin", signInInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          AsyncStorage.setItem("token", response.data.token);
          AsyncStorage.setItem("user", JSON.stringify(response.data.user));
          setIsLoggedIn(true);
          navigation.navigate("(user)", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // return (
  // <View style={{ flex: 1, justifyContent: 'center'}}>
  {
    /* <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link> */
  }
  {
    /* <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link> 
      <Link href={'/(authentication)'} asChild>
        <Button text="Authentication" />
      </Link>  */
  }
  {
    /* <View>Trang đăng nhập</View>
    </View> */
  }
  // );
  return (
    <Redirect href={"/(admin)"}></Redirect>
    // <View style={styles.divContainer}>
    //   <Stack.Screen options={{ headerShown: false }} />
    //   <ImageBackground
    //     source={require('@assets/images/backgroundBlue.jpg')}
    //     style={{
    //       width: widthScreen,
    //       height: heightScreen,
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <View style={{ marginBottom: heightScreen * 0.04 }}>
    //       <Text
    //         style={{
    //           fontWeight: "bold",
    //           fontSize: widthScreen * 0.07,
    //           color: "white",
    //         }}
    //       >ĐĂNG NHẬP</Text>
    //     </View>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Email hoặc sđt"
    //       onChangeText={text => handleInputInfo('email', text)}
    //       value={signInInfo.email}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Mật khẩu"
    //       onChangeText={text => handleInputInfo('password', text)}
    //       value={signInInfo.password}
    //     />
    //     <View style={{ flexDirection: 'row', justifyContent: "space-between", width: widthScreen * 0.9, marginVertical: heightScreen * 0.008 }}>
    //       <View style={{ flexDirection: 'row', alignItems: "center" }}>
    //         <CheckBox
    //           checked={rememberPassword}
    //           onPress={() => handleRememberPassword()}
    //           containerStyle={{
    //             padding: 0,
    //             margin: 0,
    //             opacity: 1,
    //             borderColor: "white",
    //           }}
    //           checkedColor="white"
    //         />
    //         <Text
    //           style={{
    //             fontWeight: "bold",
    //             fontSize: widthScreen * 0.04,
    //             opacity: 1,
    //             alignSelf: "center",
    //             color: "white",
    //             marginLeft: widthScreen * -0.02
    //           }}
    //         >Ghi nhớ mật khẩu</Text>
    //       </View>
    //       <View style={{ flexDirection: 'row' }}>
    //         <Text
    //           style={{ textDecorationLine: 'underline', color: 'white', fontSize: widthScreen * 0.04 }}
    //         >Quên mật khẩu?</Text>
    //       </View>
    //     </View>
    //     <Button
    //       text='Đăng nhập'
    //       onPress={handleLogin}
    //     >
    //       <FontAwesome5 name="sign-in-alt" size={widthScreen * 0.03} color="white" />
    //     </Button>
    //     <Link href={'/signUp'} asChild>
    //       <View style={{ flexDirection: 'row', alignItems: "center" }}>
    //         <Text
    //           style={{
    //             // fontWeight: "bold",
    //             opacity: 0.8,
    //             fontSize: widthScreen * 0.04,
    //             color: "white",
    //             textDecorationLine: 'underline',
    //           }}
    //         >Đăng ký tài khoản</Text>
    //         <FontAwesome5 n
    //           name="user-plus"
    //           size={widthScreen * 0.03}
    //           color="white"
    //           style={{ marginLeft: widthScreen * 0.01 }}
    //         />
    //       </View>
    //     </Link>
    //   </ImageBackground>
    // </View>
  );
};

export default index;

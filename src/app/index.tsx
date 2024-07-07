import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack, useNavigation } from 'expo-router';
import { useCartContext } from '@/providers.tsx/CartProvider';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
// import {fs, db,  addDoc, getDocs} from '@/firebase/index.tsx'; 
// import { collection, onSnapshot } from 'firebase/firestore';
import { LogBox } from 'react-native';
import Loading from '@/components/Loading';

LogBox.ignoreLogs(['Warning: ...']);

const index = () => {
  const { heightScreen, widthScreen, baseURL, setUserID } = useCartContext();
  const styles = StyleSheet.create({
    divContainer: {
      width: widthScreen,
      height: heightScreen,
      justifyContent: "center",
      alignItems: "center",
      // backgroundImage: "url('https://www.w3schools.com/css/img_lights.jpg')"
    },
    input: {
      width: '90%',
      height: heightScreen * 0.06,
      borderRadius: widthScreen * 0.02,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 10,
      paddingHorizontal: 10,
      backgroundColor: 'white'
    },

  })
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: '',
  });
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)
  const [rememberPassword, setRememberPassword] = useState(false);

  const [errorText, setErrorText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getRememberPassword = async () => {
      const rememberPassword = await AsyncStorage.getItem('rememberPassword');
      if (rememberPassword === 'true') {
        console.log(rememberPassword, "rememberPassword");
        setRememberPassword(true);
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        setSignInInfo({
          email: email ? email.substring(1, email.length - 1) : '',
          password: password ? password.substring(1, password.length - 1) : ''
        });
      }
    }
    getRememberPassword();
  }, [])

  // useEffect(() => {
  // 	onSnapshot(collection(db, `users`), (snap) => {
  // 		if (snap.empty) {
  // 			console.log('Data not found');
  // 		} else {
  // 			const items: any[] = [];
  // 			snap.forEach((item: any) => {
  // 				items.push({
  // 					key: item.id,
  // 					...item.data(),
  // 				});
  // 			});
  //       console.log(items, "items");
  // 			setUsers(items);
  //       setSignInInfo({
  //         ...signInInfo,
  //         email: items[0].username
  //       })
  // 		}
  // 	});
  //   console.log( "items");
  // }, []);

  const handleInputInfo = (key: string, value: string) => {
    setSignInInfo({
      ...signInInfo,
      [key]: value
    });
  }

  const handleRememberPassword = () => {
    AsyncStorage.setItem('rememberPassword', JSON.stringify(!rememberPassword));
    setRememberPassword(!rememberPassword);
  }

  useEffect(() => {
    setIsLoadingLogin(false);
  }, [errorText])

  const handleLogin = () => {
    // navigation.navigate('(user)');  
    setIsLoadingLogin(true);
    axios.post(baseURL + '/signin', signInInfo)
      .then((response) => {
        console.log(response.data, "ẠCBNJAKS");
        if (response.data.statusCode === 200) {
          AsyncStorage.setItem('token', response.data.token);
          AsyncStorage.setItem('userID', JSON.stringify(response.data.userID));
          AsyncStorage.setItem('NameAndAVTURL', JSON.stringify(response.data.infoUserAtHome));
          setUserID(response.data.userID);
          console.log(response.data.userID, "use2rID");
          AsyncStorage.setItem('rememberPassword', JSON.stringify(rememberPassword));
          AsyncStorage.setItem('email', JSON.stringify(signInInfo.email));
          AsyncStorage.setItem('password', JSON.stringify(signInInfo.password));
          setIsLoadingLogin(false);
          navigation.navigate('(user)' as never);
        }
        else {
          if (response.data.message === errorText)
            setErrorText(response.data.message + ' ')
          else
            setErrorText(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.divContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      {
        isLoadingLogin
          ? <Loading />
          : <ImageBackground
            source={require('@assets/images/backgroundBlue.jpg')}
            style={{
              width: widthScreen,
              height: heightScreen,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{
              // marginBottom: heightScreen * 0.75, 
              // position: "absolute",
            }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: widthScreen * 0.07,
                  color: "white",
                }}
              >ĐĂNG NHẬP</Text>
            </View>
            <View
              style={
                isLoadingLogin
                  ? [{ display: 'none' }]
                  : {
                    width: widthScreen,
                    justifyContent: "center",
                    alignItems: "center",
                  }
              }
            >
              <TextInput
                style={styles.input}
                placeholder="Nhập email đăng nhập"
                onChangeText={text => handleInputInfo('email', text)}
                value={signInInfo.email}
                placeholderTextColor={'gray'}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                onChangeText={text => handleInputInfo('password', text)}
                value={signInInfo.password}
                secureTextEntry={true}
                placeholderTextColor={'gray'}
              />
              <Text style={{ color: 'red', marginVertical: heightScreen * 0.01, fontWeight: "bold" }}>{errorText}</Text>
              <View style={{ flexDirection: 'row', justifyContent: "space-between", width: widthScreen * 0.9, marginVertical: heightScreen * 0.008 }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <CheckBox
                    checked={rememberPassword}
                    onPress={() => handleRememberPassword()}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                      opacity: 1,
                      borderColor: "white",
                    }}
                    checkedColor="white"
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: widthScreen * 0.04,
                      opacity: 1,
                      alignSelf: "center",
                      color: "white",
                      marginLeft: widthScreen * -0.02
                    }}
                  >Ghi nhớ mật khẩu</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => { navigation.navigate('forgetPassword' as never) }}>
                    {/* <Link href={"/(user)/home/"}> */}
                    <Text
                      style={{ textDecorationLine: 'underline', color: 'white', fontSize: widthScreen * 0.04 }}
                    >Quên mật khẩu?</Text>
                    {/* </Link> */}
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                text='Đăng nhập'
                onPress={handleLogin}
              >
                {/* <Link href={"/(user)/home"}> */}
                <FontAwesome5 name="sign-in-alt" size={widthScreen * 0.03} color="white" />
                {/* </Link> */}
              </Button>
              <TouchableOpacity onPress={() => { navigation.navigate('signUp' as never) }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Text
                    style={{
                      // fontWeight: "bold",
                      opacity: 0.8,
                      fontSize: widthScreen * 0.04,
                      color: "white",
                      textDecorationLine: 'underline',
                    }}
                  >Đăng ký tài khoản</Text>
                  <FontAwesome5
                    name="user-plus"
                    size={widthScreen * 0.03}
                    color="white"
                    style={{ marginLeft: widthScreen * 0.01 }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.navigate('setData' as never) }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Text
                    style={{
                      // fontWeight: "bold",
                      opacity: 0.8,
                      fontSize: widthScreen * 0.04,
                      color: "white",
                      textDecorationLine: 'underline',
                    }}
                  >set data</Text>
                  <FontAwesome5
                    name="user-plus"
                    size={widthScreen * 0.03}
                    color="white"
                    style={{ marginLeft: widthScreen * 0.01 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
      }
    </View>
  );
};

export default index;
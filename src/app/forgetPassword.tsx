import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link, Stack, useNavigation } from 'expo-router';
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
  const [users, setUsers] = useState<any[]>([]);
  const {heightScreen, widthScreen, mainColor, baseURL } = useCartContext();
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

  const [rememberPassword, setRememberPassword] = useState(false);

  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
          email: email ? email : '',
          password: password ? password : ''
        });
      }
    }
    getRememberPassword(); 
  }, [])
 
  const handleInputInfo = (key: string, value: string) => {
    setSignInInfo({
      ...signInInfo,
      [key]: value
    });
  }

  const handleRememberPassword = () => { 
    setRememberPassword(!rememberPassword); 
  }

  useEffect(() => {
    setIsLoading(false);
  }, [errorText])

  const handleSendMailRecoverPassword = () => {  
    // navigation.navigate('(user)');  
    setIsLoading(true);
    axios.post(baseURL + '/sendMailRecoverPassword', signInInfo) 
    .then((response) => { 
      console.log(response.data);
      if(response.data.statusCode === 200) { 
        setIsLoading(false);
        navigation.navigate('sendMailRecoverPasswordSuccess' as never); 
      } 
      else{ 
        if(response.data.message === errorText)
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
      <Stack.Screen  options={{ headerShown: false }} />
      <ImageBackground
        source={require('@assets/images/backgroundBlue.jpg')}
        style={{
          width: widthScreen,
          height: heightScreen,
          justifyContent: "center",
          alignItems: "center",
        }}
      > 
      <View style={{ 
              marginBottom: heightScreen * 0.3, 
              position: "absolute",
            }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: widthScreen * 0.07,
            color: "white",
          }}
        >KHÔI PHỤC MẬT KHẨU</Text>
      </View>
      <View 
        style={
          isLoading 
          ? [{display: 'none'}] 
          : {
            width: widthScreen, 
            justifyContent: "center",
            alignItems: "center", 
          }
        }
      >
        <TextInput
            style={styles.input}
            placeholder="Nhập email đã đăng ký"
            onChangeText={text => handleInputInfo('email', text)}
            value={signInInfo.email}
        />  
        <Text style={{color: 'red', marginVertical: heightScreen * 0.01, fontWeight: "bold"}}>{errorText}</Text> 
          <Button 
            text='Gửi mật khẩu mới' 
            onPress={handleSendMailRecoverPassword}
          >
        {/* <Link href={"/(user)/home"}> */}
            <FontAwesome5 name="sign-in-alt" size={widthScreen * 0.03} color="white" />
        {/* </Link> */}
          </Button> 
        <TouchableOpacity onPress={() => { navigation.navigate('index' as never) }}>
          <View style={{flexDirection: 'row', alignItems: "center"}}>
            <Text
              style={{
                // fontWeight: "bold",
                opacity: 0.8,
                fontSize: widthScreen * 0.04,
                color: "white",
                textDecorationLine: 'underline',
              }}
              >Đăng nhập</Text>
            <FontAwesome5 
              name="user-plus" 
              size={widthScreen * 0.03}
              color="white" 
              style={{ marginLeft: widthScreen * 0.01}}
              />
          </View>
        </TouchableOpacity> 
      </View>
      <Loading></Loading>
      </ImageBackground>
    </View> 
);
};

export default index;
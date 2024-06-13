import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Platform, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useContext, useState } from 'react';
import { useCartContext } from '@/providers.tsx/CartProvider';
import { FlatList } from 'react-native-gesture-handler';
import CartEveryItem from '@/components/CartEveryItem';
import Button from '@/components/Button';
import { Link, Stack, useNavigation } from 'expo-router';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
 

export default function CartScreen() {
    const {heightScreen, widthScreen, mainColor, baseURL, emailPattern, phoneNumberPattern, fullNamePattern} = useCartContext();
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
    const [signUpInfo, setSignUpInfo] = useState({
      fullname: '',  
      email: '',
      phoneNumber: '',
      password: '',
      repeatPassword: '',
      birthday: '2000-01-01',
      gender: 0
    });
    const [validation, setValidation] = useState({ 
      name: true,
      email: true,
      phoneNumber: true,
      password: true,
      repeatPassword: true, 
    });

    const navigation = useNavigation();

    const handleInputInfo = (key: string, value: any) => {
        if(key !== "gender") {
          setSignUpInfo({
              ...signUpInfo,
              [key]: value
          });
        } else {
          setSignUpInfo({
              ...signUpInfo,
              gender: value
          });
        }
        console.log(key, value, "okok")
    }
    const handleRegistration = () => {

        //kiểm tra định dạng email
        if(!emailPattern.test(signUpInfo.email)) {
            console.log('Email không hợp lệ!');
            setValidation({
              ...validation,
              email: false
            })
            return;
        }

        //kiểm tra định dạng số điện thoại
        if(!phoneNumberPattern.test(signUpInfo.phoneNumber)) {
            console.log('Số điện thoại không hợp lệ!');
            setValidation({
              ...validation,
              phoneNumber: false
            })
            return;
        }

        //kiểm tra định dạng họ và tên
        if(!fullNamePattern.test(signUpInfo.fullname)) {
            console.log('Họ và tên không hợp lệ!');
            setValidation({
              ...validation,
              name: false
            })
            return;
        }

        if(signUpInfo.password.length < 6) { 
          setValidation({
            ...validation,
            password: false
          })
          return;
        }
        else if(signUpInfo.password !== signUpInfo.repeatPassword) {
          setValidation({
            ...validation,
            repeatPassword: false
          })
          return;
        }

        axios.post(baseURL + '/signup', signUpInfo)
        .then((response) => {
          console.log(response.data);
          navigation.navigate('signUpSuccess');
        })

        console.log('Đăng ký thành công!', signUpInfo);
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
        <View style={{ marginBottom: heightScreen * 0.04}}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: widthScreen * 0.07,
            color: "white",
          }}
        >ĐĂNG KÝ</Text>
      </View>
        <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            onChangeText={text => handleInputInfo('fullname', text)}
            value={signUpInfo.fullname}
        />
        <Text style={{
          color: 'white',
          marginTop: heightScreen * 0.01,
          display: validation.name ? 'none' : 'flex'
        }}>Tên không hợp lệ</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => handleInputInfo('email', text)}
            value={signUpInfo.email}
        />
        <Text style={{
          color: 'white',
          marginTop: heightScreen * 0.01,
          display: validation.email ? 'none' : 'flex'
        }}>Email không đúng định dạng</Text>
        <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            onChangeText={text => handleInputInfo('phoneNumber', text)}
            value={signUpInfo.phoneNumber}
        />
        <Text style={{
          color: 'white',
          marginTop: heightScreen * 0.01,
          display: validation.phoneNumber ? 'none' : 'flex'
        }}>SĐT không đúng định dạng</Text>
        <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            onChangeText={text => handleInputInfo('password', text)}
            value={signUpInfo.password}
            secureTextEntry={true}
        /> 
        <Text style={{
          color: 'white',
          marginTop: heightScreen * 0.01,
          display: validation.password ? 'none' : 'flex'
        }}>Mật khẩu phải đủ 6 ký tự trở lên</Text>
        <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            onChangeText={text => handleInputInfo('repeatPassword', text)}
            value={signUpInfo.repeatPassword}
            secureTextEntry={true}
        />
        
        <Text style={{
          color: 'white',
          marginTop: heightScreen * 0.01,
          display: validation.email ? 'none' : 'flex'
        }}>Nhập khẩu nhập lại không khớp</Text>
        {/* <DateTimePicker
          value={signUpInfo.birthday}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => handleInputInfo('birthday', selectedDate?.toISOString() || '')}
        /> */}
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: widthScreen * 0.04,
              opacity: 1,
              alignSelf: "center",
              color: "white", 
              marginTop: heightScreen * 0.01
            }}
          >Giới tính</Text>
        </View>
        <View style={{ flexDirection: 'row', width: widthScreen * 0.7, justifyContent: "space-around", marginBottom: heightScreen * 0.005 }}>
            <View style={{ flexDirection: 'row' }}>
                <CheckBox
                    checked={signUpInfo.gender === 0}
                    onPress={() => handleInputInfo("gender", 0)} 
                    containerStyle={{
                        padding: 0,
                        margin: 0,
                        opacity: 1
                    }}
                    checkedColor='white'
                />
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: widthScreen * 0.04,
                        opacity: 1,
                        alignSelf: "center",
                        color: "white", 
                    }}
                >Nam</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <CheckBox
                    checked={signUpInfo.gender === 1}
                    onPress={() => handleInputInfo("gender", 1)}
                    containerStyle={{
                        padding: 0,
                        margin: 0,
                        opacity: 1
                    }}
                    checkedColor='white'
                    
                />
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: widthScreen * 0.04,
                        opacity: 1,
                        alignSelf: "center",
                        color: "white"
                    }}
                >Nữ</Text>
            </View>
        </View>
        <Button 
          text='Đăng ký' 
          onPress={handleRegistration}
        ></Button>
        <Link href={'/'} asChild>
          <View style={{flexDirection: 'row', alignItems: "center", alignContent: 'center'}}>
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
              name="sign-in-alt" 
              size={widthScreen * 0.03}
              color="white" 
              style={{ marginLeft: widthScreen * 0.01}}
              />
          </View>
        </Link>
      </ImageBackground>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

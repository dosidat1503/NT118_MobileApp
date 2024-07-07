import { useCartContext } from '@/providers.tsx/CartProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const mainColor = '#DFEBF4';

export default function Security() { 
  const {  mainColor, baseURL, userID, heightScreen   } = useCartContext();
  const [errorMessage, setErrorMessage] = useState('');
 
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#6495ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        height: heightScreen,
        // alignContent: "center"
        paddingTop: heightScreen * 0.2
    }, 
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
 
  const [itemList, setItemList] = useState([
    { placeholder: 'Mật khẩu cũ', value: "" },
    { placeholder: 'Mật khẩu mới', value: "" },
    { placeholder: 'Xác nhận mật khẩu mới', value: "" },
  ])

  const handleChangePassword = () => {
    // Kiểm tra độ dài của mật khẩu mới
    if (itemList[1].value.length < 6) {
      setErrorMessage('Mật khẩu mới cần ít nhất 6 ký tự.');
      return;
    }

    // Xử lý logic để thay đổi mật khẩu ở đây
    if (itemList[1].value !== itemList[2].value) {
      setErrorMessage('Xác nhận mật khẩu mới không khớp.');
      return;
    }
    const dataSave = {
      userID: userID === 0 ? 1 : userID,
      oldPassword: itemList[0].value,
      newPassword: itemList[1].value
    }
    axios.post(baseURL + '/changePassword', dataSave)
    .then((res) => {
      console.log(res.data)
      if(res.data.statusCode === 1)
        setErrorMessage(res.data.message);
      if(res.data.statusCode === 200)
        setErrorMessage(res.data.message);
    })
    .catch((err) => {
      console.log(err)
      setErrorMessage("Lỗi trong quá trình đổi mật khẩu");
    })

    // Đoạn mã xử lý thay đổi mật khẩu sẽ được thêm vào ở đây
    console.log('Đổi mật khẩu thành công!');
  };

  return (
    <View style={[styles.container, { backgroundColor: mainColor }]}>
      <Text style={styles.title}>Đổi mật khẩu</Text>
      {
        itemList.map((item, index) => {
          return (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={item.placeholder}
              secureTextEntry
              value={item.value}
              onChangeText={(text) => {
                const newItemList = [...itemList];
                newItemList[index].value = text;
                setItemList(newItemList);
              }}
            />
          )
        })
      } 

      <View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

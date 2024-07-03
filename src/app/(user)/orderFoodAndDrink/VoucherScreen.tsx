import { useCartContext } from '@/providers.tsx/CartProvider';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

type VoucherProps = {
  DISCOUNT_VALUE: number;
  MIN_ORDER_TOTAL: number;
  VOUCHER_CODE: string;
  START_DATE: string;
  EXPIRATION_DATE: string;
  REMAIN_AMOUNT: number;
}

const VoucherScreen = () => {
  const { heightScreen, widthScreen, baseURL, mainColor,  RD } = useCartContext();
  const [voucherInfo, setVoucherInfo] = useState<VoucherProps[] | undefined>(undefined)
  let FADShop_ID = 0;
  useEffect(() => {
      const loadFADShop_ID = async () => {
          FADShop_ID = parseInt(await AsyncStorage.getItem('FADShop_ID') || "0"); 
          handleGetVoucherInfo()
      }   
      loadFADShop_ID()
  }, [])
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#DFEBF4',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      // marginBottom: 16,
      textAlign: 'center', 
      paddingVertical: heightScreen * 0.01,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      backgroundColor: 'white', 
      padding: 8, 
      borderRadius: 0,
    },
    input: {
      flex: 1,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 15,
      padding: 5,
      marginRight: 8,
      backgroundColor: 'rgba(100, 149, 237, 0.5)',
    },
    applyButton: {
      backgroundColor: '#6495ED',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 15,
    },
    applyButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    voucherItem: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 4,
      marginBottom: 10,
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    voucherImage: {
      width: 50,
      height: 50,
      marginRight: 20,
    },
    voucherTextContainer: {
      flex: 1,
    },
    voucherTitle: {
      fontSize: RD * 0.00004,
      fontWeight: 'bold',
      color: "red"
    },
    voucherDescription: {
      fontSize: 18,
      color: '#000',
       
    },
    conditionText: {
      // fontWeight:'bold',
      color: '#6495ED', // Màu xanh với mã màu DFEBF4
    },
    radioButton: {
      width: RD * 0.0001,
      height: RD * 0.0001,
      borderRadius: RD * 0.00005,
      borderWidth: 2,
      borderColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.5
    },
    radioCircle: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent', // Đặt màu nền của radioCircle là trong suốt
  },
  });
 

  const copyToClipboard = async ( copyText: string) => {
    await Clipboard.setStringAsync( copyText );
  };

  const handleGetVoucherInfo = () => {
    axios.get(baseURL + '/getVoucherInfo', {params: {FADShop_ID: FADShop_ID}})
    .then(res => {
      console.log((FADShop_ID), 'FADShop_ID')
      console.log(res.data, 'voucherInfo')
      setVoucherInfo(res.data.voucherInfo)  
    })
    .catch(err => {
      alert("Đã có lỗi xin vui lòng thử lại")
    })
  }

  const renderItem = ({ item }: { item: VoucherProps }) => ( 
    <View style={styles.voucherItem}>
      <Image
        source={{ uri: 'https://img.lovepik.com/element/45013/2020.png_860.png' }}
        style={styles.voucherImage}
      />
      <View style={styles.voucherTextContainer}>
        <Text style={styles.voucherTitle}>Giảm {item.DISCOUNT_VALUE}% cho đơn hàng từ {item.MIN_ORDER_TOTAL}đ</Text>
        <Text style={styles.conditionText}>
          Mã: <Text style={{ color: "black" }}> {item.VOUCHER_CODE}</Text>
        </Text> 
        <Text style={styles.conditionText}>Có giá trị từ ngày: {item.START_DATE}</Text>
        <Text style={styles.conditionText}>Đến ngày: {item.EXPIRATION_DATE}</Text>
        <Text style={styles.conditionText}>Số lượng còn lại: {item.REMAIN_AMOUNT}</Text>
        {/* <Text style={styles.voucherDescription}> </Text> */}
      </View>
      <TouchableOpacity style={styles.radioButton} onPress={() => copyToClipboard(item.VOUCHER_CODE)}>
        <FontAwesome5 name="clone" size={20} color="#6495ED" />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    handleGetVoucherInfo()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>VOUCHER</Text>
      
      <FlatList
        data={voucherInfo}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.VOUCHER_CODE}
      />
    </View>
  );
};



export default VoucherScreen;


function type(FADShop_ID: number): any {
  throw new Error('Function not implemented.');
}


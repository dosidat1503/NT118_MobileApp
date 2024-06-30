import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const vouchers = [
  { id: '1', title: 'Free ship', description: 'Đơn tối thiểu 0đ\nGiảm 15k phí giao hàng\nĐiều kiện' },
  { id: '2', title: 'Free ship', description: 'Đơn tối thiểu 0đ\nGiảm 15k phí giao hàng\nĐiều kiện' },
  { id: '3', title: 'Free ship', description: 'Đơn tối thiểu 0đ\nGiảm 15k phí giao hàng\nĐiều kiện' },
  { id: '4', title: 'Free ship', description: 'Đơn tối thiểu 0đ\nGiảm 15k phí giao hàng\nĐiều kiện' },
];

const VoucherScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.voucherItem}>
      <Image
        source={{ uri: 'https://img.icons8.com/?size=100&id=2nkA5qL3u990&format=png&color=6495ED' }}
        style={styles.voucherImage}
      />
      <View style={styles.voucherTextContainer}>
        <Text style={styles.voucherTitle}>{item.title}</Text>
        <Text style={styles.voucherDescription}>
          {item.description.split('\n').slice(0, -1).join('\n')}
          {'\n'}
          <Text style={styles.conditionText}>Điều kiện</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.radioButton}>
        <View style={styles.radioCircle}></View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn voucher</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nhập mã voucher" />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={vouchers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#DFEBF4',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', 
    padding: 30,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  voucherDescription: {
    fontSize: 18,
    color: '#000',
     
  },
  conditionText: {
    fontWeight:'bold',
    color: '#6495ED', // Màu xanh với mã màu DFEBF4
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6495ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircle: {
  width: 20,
  height: 20,
  backgroundColor: 'transparent', // Đặt màu nền của radioCircle là trong suốt
},
});

export default VoucherScreen;



import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Voucherdetail = () => {
  const voucher = {
    code: 'FREE SHIP',
    discount: 'Free ship',
    expiry: '25/04/2024',
    details: {
      start: '02/04/2024 00:00',
      end: '25/04/2024 23:59',
      offer: 'Free ship',
      paymentMethods: 'Mọi hình thức thanh toán',
      conditions: `Sử dụng mã giảm phí vận chuyển cho đơn hàng đầu tiên.
      - Giảm 15k phí vận chuyển.
      - Cho đơn hàng từ 0đ
      Số lượt sử dụng có hạn, chương trình có thể kết thúc khi hết lượt ưu đãi hoặc hết hạn ưu đãi, tùy thuộc vào điều kiện nào đến trước.`
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chi tiết Voucher</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.voucherContainer}>
          <Image source={{ uri: 'https://img.icons8.com/?size=100&id=2nkA5qL3u990&format=png&color=6495ED' }} style={styles.voucherImage} />
          <Text style={styles.voucherTitle}>{voucher.code}</Text>
          <Text style={styles.voucherSubtitle}>Đơn tối thiểu 0đ</Text>
          <Text style={styles.voucherExpiry}>Hết hạn: {voucher.expiry}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsLabel}>Hạn mã sử dụng</Text>
          <Text style={styles.detailsText}>{voucher.details.start} → {voucher.details.end}</Text>

          <Text style={styles.detailsLabel}>Ưu đãi</Text>
          <Text style={styles.detailsText}>{voucher.details.offer}</Text>

          <Text style={styles.detailsLabel}>Hình thức thanh toán</Text>
          <Text style={styles.detailsText}>{voucher.details.paymentMethods}</Text>

          <Text style={styles.detailsLabel}>Điều kiện</Text>
          <Text style={styles.detailsText}>{voucher.details.conditions}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => alert('Đồng ý')}>
        <Text style={styles.buttonText}>Đồng ý</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFEBF4',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  voucherContainer: {
    backgroundColor: '#d3e6ff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  voucherImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  voucherTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  voucherSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  voucherExpiry: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  detailsText: {
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Voucherdetail;



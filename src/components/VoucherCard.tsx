import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import React
  from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface VoucherCardProps {
  url: string;
  item: {
    VOUCHER_ID: number;
    DISCOUNT_VALUE: number;
    MAX_QUANTITY: number;
    MAX_DISCOUNT_VALUE: number | null;
    VOUCHER_CODE: string;
    SHOP_ID: number;
    MIN_ORDER_TOTAL: number;
    START_DATE: string;
    EXPIRATION_DATE: string;
    REMAIN_AMOUNT: number;
    IS_DELETED: number;
  },
  onEdit: () => void,
  onDelete: () => void,
}

const VoucherCard = ({ url, item, onEdit, onDelete }: VoucherCardProps) => {
  return (
    <View style={styles.itemView}>
      <Image source={require(`../../assets/images/discount.png`)} style={styles.itemImage} />
      <View style={styles.nameView}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>Giảm {item.DISCOUNT_VALUE}</Text>
          <Text style={styles.descText}>Đơn tối thiểu{item.MIN_ORDER_TOTAL}</Text>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>{item.VOUCHER_CODE}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => { onEdit() }} style={styles.button}>
            <FontAwesome5 name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onDelete() }} style={styles.button}>
            <FontAwesome5 name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
}

export default VoucherCard;


const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 5,
    borderRadius: 10,
    height: 100,
    marginBottom: 10
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  textContainer: {
    width: '80%',
  },
  buttonContainer: {
    width: '20%',
    flexDirection: 'column',
    gap: 20,
    verticalAlign: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 5,
  },
  priceView: {
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#464646'
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#252525'
  },
  priceText: {
    fontSize: 18,
    color: '#098bd2',
    fontWeight: '700',
  },
  icon: {
    width: 24,
    height: 24
  }
});

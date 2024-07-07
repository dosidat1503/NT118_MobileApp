import Button from '@/components/Button';
import React from 'react';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, SafeAreaView, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import globalApi from '@/services/globalApi';
import { uploadToFirebase } from '@/firebase';

interface Voucher {
  DISCOUNT_VALUE: number;
  MAX_QUANTITY: number;
  MAX_DISCOUNT_VALUE: number | null;
  VOUCHER_CODE: string;
  SHOP_ID: number;
  MIN_ORDER_TOTAL: number;
  START_DATE: string;
  EXPIRATION_DATE: string;
  REMAIN_AMOUNT: number | null;
}

interface Validation {
  dis_val: boolean;
  max_quant: boolean;
  max_dis_val: boolean;
  min_ord_tot: boolean;
  start_date: boolean;
  exp_date: boolean;
  voucher_code: boolean;
  remain_amount: boolean;
}

const initialValidation: Validation = {
  dis_val: true,
  max_quant: true,
  max_dis_val: true,
  min_ord_tot: true,
  start_date: true,
  exp_date: true,
  voucher_code: true,
  remain_amount: true,
};

const EditVoucherScreen = ({ navigation, route }) => {

  const [voucherInfo, setVoucherInfo] = useState<Voucher>({
    DISCOUNT_VALUE: 0,
    MAX_QUANTITY: 0,
    MAX_DISCOUNT_VALUE: null,
    VOUCHER_CODE: '',
    SHOP_ID: 1,
    MIN_ORDER_TOTAL: 0,
    START_DATE: '',
    EXPIRATION_DATE: '',
    REMAIN_AMOUNT: null
  });

  const [validation, setValidation] = useState<Validation>(initialValidation);

  const id = route.params.id;
  const resetData = route.params.resetData;

  console.log(id);
  console.log(route);
  const isUpdating = !!id;
  const [updatingVoucher, setUpdatingVoucher] = useState<Voucher | null>(null);

  // const router = useRouter();

  const fetchUpdatingVoucher = async (voucherId: number) => {
    try {
      const response = await globalApi.getVoucher(voucherId);
      console.log(response);
      if (response.data !== null && response.statusCode === 200) {
        setUpdatingVoucher(response.data);
      }
    } catch (e) {
      console.error("Lỗi lấy thông tin khuyến mãi", e);
    }
  }


  useEffect(() => {
    if (isUpdating) {
      fetchUpdatingVoucher(id);
    }
  }, []);

  useEffect(() => {
    if (updatingVoucher) {
      setVoucherInfo(updatingVoucher);
    }
  }, [updatingVoucher]);

  const resetFields = () => {
    setVoucherInfo({
      DISCOUNT_VALUE: 0,
      MAX_QUANTITY: 0,
      MAX_DISCOUNT_VALUE: null,
      VOUCHER_CODE: '',
      SHOP_ID: 1,
      MIN_ORDER_TOTAL: 0,
      START_DATE: '',
      EXPIRATION_DATE: '',
      REMAIN_AMOUNT: null
    });
  };

  const validateInput = (voucher: Voucher, setValidation: React.Dispatch<React.SetStateAction<Validation>>) => {
    let isValid = true;
    const newValidation = { ...initialValidation };

    if (voucher.DISCOUNT_VALUE <= 0) {
      newValidation.dis_val = false;
      isValid = false;
    }

    if (voucher.MAX_QUANTITY <= 0) {
      newValidation.max_quant = false;
      isValid = false;
    }

    if (voucher.MAX_DISCOUNT_VALUE !== null && voucher.MAX_DISCOUNT_VALUE <= 0) {
      newValidation.max_dis_val = false;
      isValid = false;
    }

    if (voucher.MIN_ORDER_TOTAL <= 0) {
      newValidation.min_ord_tot = false;
      isValid = false;
    }

    if (!Date.parse(voucher.START_DATE)) {
      newValidation.start_date = false;
      isValid = false;
    }

    if (!Date.parse(voucher.EXPIRATION_DATE)) {
      newValidation.exp_date = false;
      isValid = false;
    }

    if (voucher.VOUCHER_CODE.trim() === '') {
      newValidation.voucher_code = false;
      isValid = false;
    }

    if (voucher.REMAIN_AMOUNT < 0 || voucher.REMAIN_AMOUNT > voucher.MAX_QUANTITY) {
      newValidation.remain_amount = false;
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  const onSubmit = () => {
    if (isUpdating) {
      // update
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = async () => {
    if (validateInput(voucherInfo, setValidation)) {
      console.log('Data is valid. Proceeding with form submission.');
      const data = {
        voucher_code: voucherInfo.VOUCHER_CODE,
        shop_id: 1,
        discount_value: voucherInfo.DISCOUNT_VALUE,
        max_quantity: voucherInfo.MAX_QUANTITY,
        max_discount_value: voucherInfo.MAX_DISCOUNT_VALUE,
        min_order_total: voucherInfo.MIN_ORDER_TOTAL,
        start_date: voucherInfo.START_DATE,
        end_date: voucherInfo.EXPIRATION_DATE
      } as object;
      console.log(data);
      const response = await globalApi.addVoucher(data);
      console.log(response);
      if (response.statusCode === 200) {
        console.log('Thêm voucher thành công');
        resetData();
        navigation.navigate("listVouchers");
      }
      else {
        Alert.alert('Confirm', 'Tạo khuyến mãi thất bại bạn có muốn tạo lại không? ', [
          {
            text: 'Không',
            onPress: navigation.replace("listVouchers")
          },
          {
            text: 'Có'
          },
        ]);
      }
    } else {
      console.log('Data is not valid. Please correct the errors and try again.');
    }
  };

  const onUpdate = async () => {
    if (validateInput(voucherInfo, setValidation)) {
      console.log('Data is valid. Proceeding with form submission.');
      let data
      if (voucherInfo.REMAIN_AMOUNT !== null) {
        data = {
          voucher_code: voucherInfo.VOUCHER_CODE,
          discount_value: voucherInfo.DISCOUNT_VALUE,
          max_quantity: voucherInfo.MAX_QUANTITY,
          max_discount_value: voucherInfo.MAX_DISCOUNT_VALUE,
          min_order_total: voucherInfo.MIN_ORDER_TOTAL,
          start_date: voucherInfo.START_DATE,
          end_date: voucherInfo.EXPIRATION_DATE,
          remain_amount: voucherInfo.REMAIN_AMOUNT,
        } as object;
      } else {
        data = {
          voucher_code: voucherInfo.VOUCHER_CODE,
          discount_value: voucherInfo.DISCOUNT_VALUE,
          max_quantity: voucherInfo.MAX_QUANTITY,
          max_discount_value: voucherInfo.MAX_DISCOUNT_VALUE,
          min_order_total: voucherInfo.MIN_ORDER_TOTAL,
          start_date: voucherInfo.START_DATE,
          end_date: voucherInfo.EXPIRATION_DATE,
          remain_amount: voucherInfo.REMAIN_AMOUNT,
        } as object;
      }
      console.log("update data", data);
      const response = await globalApi.updateVoucher(data, id);
      console.log(response);
      if (response.statusCode === 200) {
        console.log('Cập nhật khuyến mãi thành công');
        resetData();
        navigation.navigate("listVouchers");
      }
      else {
        Alert.alert('Confirm', 'Cập nhật khuyến mãi thất bại bạn có muốn cập nhật lại không? ', [
          {
            text: 'Không',
            onPress: navigation.replace("listVouchers")
          },
          {
            text: 'Có'
          },
        ]);
      }
    } else {
      console.log('Data is not valid. Please correct the errors and try again.');
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setVoucherInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const confirmDelete = () => {
    Alert.alert('Xác nhận', 'Bạn thật sự muốn xoá khuyén mãi này?', [
      {
        text: 'Huỷ bỏ',
      },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await globalApi.deleteVoucher(voucherInfo.VOUCHER_ID);
            if (response.data !== null && response.statusCode === 200) {
              console.log('Xóa thành công khuyến mãi');
              navigation.replace("listVouchers");
            } else {
              console.log('Xóa thất bại');
            }
          } catch (e) {
            console.log('Lỗi khi xoá khuyến mãi');
          }
        }
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>{isUpdating ? 'Cập nhật khuyến mãi' : 'Tạo mới khuyến mãi'}</Text>

          <Text style={styles.labelTxtInput}>Mã khuyến mãi<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={voucherInfo.VOUCHER_CODE}
            onChangeText={(value) => handleInputChange('VOUCHER_CODE', value)}
            placeholder="Mã khuyến mãi"
            style={styles.input}
          />
          {!validation.voucher_code && <Text style={{ color: 'red' }}>{"Vui lòng nhập mã khuyến mãi"}</Text>}

          <Text style={styles.labelTxtInput}>Giá trị khuyến mãi<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={String(voucherInfo.DISCOUNT_VALUE)}
            onChangeText={(value) => handleInputChange('DISCOUNT_VALUE', Number(value))}
            placeholder="Giá trị khuyến mãi"
            style={styles.input}
            keyboardType="numeric"
          />
          {!validation.dis_val && <Text style={{ color: 'red' }}>{"Vui lòng nhập giá trị hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Số lượng tối đa<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={String(voucherInfo.MAX_QUANTITY)}
            onChangeText={(value) => handleInputChange('MAX_QUANTITY', Number(value))}
            placeholder="Số lượng tối đa"
            style={styles.input}
            keyboardType="numeric"
          />
          {!validation.max_quant && <Text style={{ color: 'red' }}>{"Vui lòng nhập số lượng hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Giá trị giảm giá tối đa</Text>
          <TextInput
            value={String(voucherInfo.MAX_DISCOUNT_VALUE)}
            onChangeText={(value) => handleInputChange('MAX_DISCOUNT_VALUE', value ? Number(value) : null)}
            placeholder="Giá trị giảm giá tối đa"
            style={styles.input}
            keyboardType="numeric"
          />
          {!validation.max_dis_val && <Text style={{ color: 'red' }}>{"Vui lòng nhập giá trị hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Tổng đơn hàng tối thiểu<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={String(voucherInfo.MIN_ORDER_TOTAL)}
            onChangeText={(value) => handleInputChange('MIN_ORDER_TOTAL', Number(value))}
            placeholder="Tổng đơn hàng tối thiểu"
            style={styles.input}
            keyboardType="numeric"
          />
          {!validation.min_ord_tot && <Text style={{ color: 'red' }}>{"Vui lòng nhập tổng đơn hàng hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Ngày bắt đầu<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={voucherInfo.START_DATE}
            onChangeText={(value) => handleInputChange('START_DATE', value)}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
          {!validation.start_date && <Text style={{ color: 'red' }}>{"Vui lòng nhập ngày hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Ngày hết hạn<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={voucherInfo.EXPIRATION_DATE}
            onChangeText={(value) => handleInputChange('EXPIRATION_DATE', value)}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
          {!validation.exp_date && <Text style={{ color: 'red' }}>{"Vui lòng nhập ngày hợp lệ"}</Text>}

          {
            isUpdating && (
              <>
                <Text style={styles.labelTxtInput}>Số lượng còn lại<Text style={{ color: "red" }}>(*)</Text></Text>
                <TextInput
                  value={String(voucherInfo.REMAIN_AMOUNT)}
                  onChangeText={(value) => handleInputChange('REMAIN_AMOUNT', Number(value))}
                  placeholder="Số lượng còn lại"
                  style={styles.input}
                  keyboardType="numeric"
                />
                {!validation.remain_amount && <Text style={{ color: 'red' }}>{"Vui lòng nhập số lượng hợp lệ"}</Text>}</>
            )
          }

          {/* <Text style={{ color: 'red' }}>{errors}</Text> */}
          <Button onPress={onSubmit} text={isUpdating ? 'Cập nhật' : 'Tạo Voucher'} />
          {isUpdating && (
            <Text onPress={() => {
              confirmDelete()
            }} style={styles.textButton}>
              Xoá
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditVoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 20
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20
  },
  innerContainer: {
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10
  },

  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  labelTxtInput: {
    color: '#000',
    fontSize: 16,
    marginTop: 20
  },

  // drop-down css
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 10,
    backgroundColor: "white"
  },
  icon: {
    marginRight: 5,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
});

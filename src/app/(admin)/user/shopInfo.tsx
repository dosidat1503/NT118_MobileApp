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

interface Shop {
  SHOP_ID: number;
  SHOP_NAME: string;
  PHONE: string;
  OPENTIME: string;
  CLOSETIME: string;
  AVT_IMAGE_ID: number;
  AVATAR_IMAGE_URL: string;
  COVER_IMAGE_ID: number;
  COVER_IMAGE_URL: string;
  SHOP_OWNER_ID: number;
  EMAIL: string;
  ADDRESS_ID: number;
  ADDRESS: string;
  DESCRIPTION: string;
  IS_DELETED: number;
  created_at: string;
}

interface Validation {
  shop_name: boolean;
  phone: boolean;
  open_time: boolean;
  close_time: boolean;
  avatar_image_url: boolean;
  cover_image_url: boolean;
  email: boolean;
  address: boolean;
  description: boolean
}

const initialValidation: Validation = {
  shop_name: true,
  phone: true,
  open_time: true,
  close_time: true,
  avatar_image_url: true,
  cover_image_url: true,
  email: true,
  address: true,
  description: true
};

const EditInfoScreen = ({ navigation, route }) => {
  const [updatingShop, setUpdatingShop] = useState<Shop>({
    SHOP_ID: 0,
    SHOP_NAME: '',
    PHONE: '',
    OPENTIME: '',
    CLOSETIME: '',
    AVT_IMAGE_ID: 0,
    AVATAR_IMAGE_URL: '',
    COVER_IMAGE_ID: 0,
    COVER_IMAGE_URL: '',
    SHOP_OWNER_ID: 0,
    EMAIL: '',
    ADDRESS_ID: 0,
    ADDRESS: '',
    DESCRIPTION: '',
    IS_DELETED: 0,
    created_at: '',
  });

  const [validation, setValidation] = useState<Validation>(initialValidation);
  const isUpdating = true;

  // const router = useRouter();

  const fetchUpdatingInfo = async (shopId: number) => {
    try {
      const response = await globalApi.getShopDetail(shopId);
      console.log(response);
      if (response.data !== null && response.statusCode === 200) {
        setUpdatingShop(response.data);
      }
    } catch (e) {
      console.error("Lỗi lấy thông tin cửa hàng", e);
    }
  }


  useEffect(() => {
    fetchUpdatingInfo(1);
  }, []);

  // const resetFields = () => {
  //   setUpdatingShop({
  //     DISCOUNT_VALUE: 0,
  //     MAX_QUANTITY: 0,
  //     MAX_DISCOUNT_VALUE: null,
  //     VOUCHER_CODE: '',
  //     SHOP_ID: 1,
  //     MIN_ORDER_TOTAL: 0,
  //     START_DATE: '',
  //     EXPIRATION_DATE: '',
  //     REMAIN_AMOUNT: null
  //   });
  // };

  const validateInput = (shop: Shop, setValidation: React.Dispatch<React.SetStateAction<Validation>>) => {
    let isValid = true;
    const newValidation = { ...initialValidation };

    if (shop.SHOP_NAME.trim() === '') {
      newValidation.shop_name = false;
      isValid = false;
    }

    if (!/^\d{10}$/.test(shop.PHONE)) { // Example: Validates for a 10 digit phone number
      newValidation.phone = false;
      isValid = false;
    }

    if (!shop.OPENTIME.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) { // Validates for HH:MM:SS format
      newValidation.open_time = false;
      isValid = false;
    }

    if (!shop.CLOSETIME.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) { // Validates for HH:MM:SS format
      newValidation.close_time = false;
      isValid = false;
    }

    if (!shop.AVATAR_IMAGE_URL.trim()) {
      newValidation.avatar_image_url = false;
      isValid = false;
    }

    if (!shop.COVER_IMAGE_URL.trim()) {
      newValidation.cover_image_url = false;
      isValid = false;
    }

    if (shop.ADDRESS.trim() === '') {
      newValidation.address = false;
      isValid = false;
    }

    if (shop.DESCRIPTION.trim() === '') {
      newValidation.description = false;
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  const onSubmit = () => {
    onUpdate();
  };

  const onUpdate = async () => {
    if (validateInput(updatingShop, setValidation)) {
      console.log('Data is valid. Proceeding with form submission.');
      const avtPath = await uploadImage(updatingShop.AVATAR_IMAGE_URL);
      const coverPath = await uploadImage(updatingShop.COVER_IMAGE_URL);
      const data = {
        admin_id: 1,
        shop_name: updatingShop.SHOP_NAME,
        phone: updatingShop.PHONE,
        opentime: updatingShop.OPENTIME,
        closetime: updatingShop.CLOSETIME,
        avt_image_link: avtPath,
        cover_image_link: coverPath,
        address_id: updatingShop.ADDRESS_ID,
        description: updatingShop.DESCRIPTION
      } as object;
      console.log("update data", data);
      const response = await globalApi.updateShopInfo(data, 1);
      if (response.statusCode === 201) {
        console.log('Cập nhật thông tin cửa hàng thành công');
        navigation.pop();
      }
      else {
        Alert.alert('Confirm', 'Cập nhật thông tin cửa hàng thất bại bạn có muốn cập nhật lại không? ', [
          {
            text: 'Không',
            onPress: () => {
              navigation.navigate("userscreen")
            }
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
    setUpdatingShop((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const pickImage = async (category: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (category === "avt") {
        setUpdatingShop((prev) => ({
          ...prev,
          AVATAR_IMAGE_URL: result.assets[0].uri
        }));
      } else {
        setUpdatingShop((prev) => ({
          ...prev,
          COVER_IMAGE_URL: result.assets[0].uri
        }));
      }
    }
  };


  const uploadImage = async (image: string) => {
    // Check if the image is already a Firebase URL
    if (image.startsWith('https://firebasestorage.googleapis.com/')) {
      console.log('Image is already a Firebase URL:', image);
      return image;  // Return the existing Firebase URL
    }

    // If it's a local mobile image URL, proceed with the upload
    const fileName = image.split("/").pop();
    console.log('Uploading image:', image);

    // Upload the image to Firebase
    const uploadResp = await uploadToFirebase(
      image,
      fileName,
      (progress) => {
        console.log(progress, 'progress');
      },
      []
    ) as object;

    console.log('Upload response:', uploadResp);
    return uploadResp.downloadUrl;
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>{'Cập nhật thông tin cửa hàng'}</Text>

          <Image
            source={{ uri: updatingShop.AVATAR_IMAGE_URL || "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png" }}
            style={styles.image}
          />
          <Text onPress={() => { pickImage('avt') }} style={styles.textButton}>
            Chọn ảnh đại diện của cửa hàng
          </Text>
          {!validation.avatar_image_url && <Text style={{ color: 'red' }}>{"Vui lòng nhập URL ảnh đại diện hợp lệ"}</Text>}

          <Image
            source={{ uri: updatingShop.COVER_IMAGE_URL || "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png" }}
            style={styles.image}
          />
          <Text onPress={() => { pickImage('cover') }} style={styles.textButton}>
            Chọn ảnh bìa của cửa hàng
          </Text>
          {!validation.cover_image_url && <Text style={{ color: 'red' }}>{"Vui lòng nhập URL ảnh bìa hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Tên cửa hàng<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={updatingShop.SHOP_NAME}
            onChangeText={(value) => handleInputChange('SHOP_NAME', value)}
            placeholder="Tên cửa hàng"
            style={styles.input}
          />
          {!validation.shop_name && <Text style={{ color: 'red' }}>{"Vui lòng nhập tên cửa hàng"}</Text>}

          <Text style={styles.labelTxtInput}>Số điện thoại<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={updatingShop.PHONE}
            onChangeText={(value) => handleInputChange('PHONE', value)}
            placeholder="Số điện thoại"
            style={styles.input}
            keyboardType="phone-pad"
          />
          {!validation.phone && <Text style={{ color: 'red' }}>{"Vui lòng nhập số điện thoại hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Giờ mở cửa<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={updatingShop.OPENTIME}
            onChangeText={(value) => handleInputChange('OPENTIME', value)}
            placeholder="HH:MM:SS"
            style={styles.input}
          />
          {!validation.open_time && <Text style={{ color: 'red' }}>{"Vui lòng nhập giờ mở cửa hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Giờ đóng cửa<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={updatingShop.CLOSETIME}
            onChangeText={(value) => handleInputChange('CLOSETIME', value)}
            placeholder="HH:MM:SS"
            style={styles.input}
          />
          {!validation.close_time && <Text style={{ color: 'red' }}>{"Vui lòng nhập giờ đóng cửa hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Email</Text>
          <TextInput
            value={updatingShop.EMAIL}
            placeholder="Email"
            style={[styles.input, { backgroundColor: '#eee' }]}
            keyboardType="email-address"
            editable={false}
          />

          <Text style={styles.labelTxtInput}>Địa chỉ<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={updatingShop.ADDRESS}
            onChangeText={(value) => handleInputChange('ADDRESS', value)}
            placeholder="Địa chỉ"
            style={styles.input}
          />
          {!validation.address && <Text style={{ color: 'red' }}>{"Vui lòng nhập địa chỉ hợp lệ"}</Text>}

          <Text style={styles.labelTxtInput}>Mô tả quán<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={updatingShop.DESCRIPTION}
            onChangeText={(value) => handleInputChange('DESCRIPTION', value)}
            placeholder="Mô tả quán"
            style={styles.input}
          />
          {!validation.description && <Text style={{ color: 'red' }}>{"Vui lòng nhập mô tả quán"}</Text>}

          {/* <Text style={{ color: 'red' }}>{errors}</Text> */}
          <Button onPress={onSubmit} text={'Cập nhật'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditInfoScreen;

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

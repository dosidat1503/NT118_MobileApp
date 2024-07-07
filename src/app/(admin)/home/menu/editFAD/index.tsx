import Button from '@/components/Button';
import React from 'react';
import Colors from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert, KeyboardAvoidingView, SafeAreaView, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';

import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { ScrollView } from 'react-native-gesture-handler';

import { Dropdown } from 'react-native-element-dropdown';
import globalApi from '@/services/globalApi';
import { uploadToFirebase } from '@/firebase';

interface Option {
  label: string;
  value: string;
}

const data = [
  { label: 'Thức ăn', value: '1' },
  { label: 'Đồ uống', value: '2' },
  { label: 'Topping', value: '3' },
  { label: 'Size', value: '4' }
];

const tagData = [
  { label: 'Cơm', value: '1' },
  { label: 'Phở, bún', value: '2' },
  { label: 'Lẩu', value: '3' },
  { label: 'Trà sữa', value: '4' },
  { label: 'Trà chanh', value: '5' }
];

const CreateProductScreen = ({ navigation, route }) => {
  // const navigation = useNavigation();
  // const route = useRoute();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [parentTopping, setParentTopping] = useState('');
  const [parentSize, setParentSize] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tag, setTag] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);


  const [fadArray, setFadArray] = useState<Option[]>([]);
  const [isFadLoad, setIsFadLoad] = useState(false);
  const [sizeArray, setSizeArray] = useState<Option[]>([]);
  const [isSizeLoad, setIsSizeLoad] = useState(false);

  const id = route.params.id;
  const refreshData = route.params.refreshData;
  console.log(id);
  console.log(route);
  // const refresh = navigation.getParams("refresh");
  const isUpdating = !!id;
  const [updatingFAD, setUpdatingFAD] = useState<object | null>(null);

  // const router = useRouter();

  const popAction = StackActions.pop(1);

  const [validation, setValidation] = useState({
    name: true,
    price: true,
    parentTopping: true,
    parentSize: true,
    description: true,
    quantity: true,
    tag: true,
    category: true,
    image: true,
  });

  const fetchFadArray = async (id: any) => {
    try {
      const response = await globalApi.getFADs(id);
      console.log(response);
      if (response.data !== null && response.statusCode === 200) {
        const mergedArray = [...response.data.foods, ...response.data.drinks];
        const sizeArray = [...response.data.sizes];
        const data: { label: string, value: string }[] = mergedArray.map(item => ({
          label: item.FAD_NAME,
          value: item.FAD_ID.toString()
        }));
        const sizeData: { label: string, value: string }[] = sizeArray.map(item => ({
          label: item.FAD_NAME,
          value: item.FAD_ID.toString()
        }));

        setFadArray(data);
        setIsFadLoad(true);

        setSizeArray(sizeData);
        setIsSizeLoad(true);
      } else {
        setIsFadLoad(false);
        setIsSizeLoad(false);
      }
    } catch (e) {
      console.error("Lỗi lấy thông tin món ăn cửa hàng", e);
      setIsFadLoad(false);
      setIsSizeLoad(false);
    }
  }

  const fetchUpdatingFAD = async (fadID: number) => {
    try {
      const response = await globalApi.getFAD(fadID);
      console.log(response);
      if (response.data !== null && response.statusCode === 200) {
        setUpdatingFAD(response.data);
      }
    } catch (e) {
      console.error("Lỗi lấy thông tin món ăn cửa hàng", e);
    }
  }


  useEffect(() => {
    console.log('product id', id)
    if (isUpdating) {
      fetchUpdatingFAD(id);
    }

    fetchFadArray(1);
  }, []);

  useEffect(() => {
    if (updatingFAD) {
      setName(updatingFAD.FAD.FAD_NAME);
      setPrice(updatingFAD.FAD.FAD_PRICE.toString());
      setParentTopping(updatingFAD.FAD.ID_PARENTFADOFTOPPING ? updatingFAD.FAD.ID_PARENTFADOFTOPPING.toString() : updatingFAD.FAD.ID_PARENTFADOFTOPPING);
      setParentSize(updatingFAD.FAD.ID_PARENTFADOFSIZE ? updatingFAD.FAD.ID_PARENTFADOFSIZE.toString() : updatingFAD.FAD.ID_PARENTFADOFSIZE);
      setDescription(updatingFAD.FAD.DESCRIPTION);
      setQuantity(updatingFAD.FAD.QUANTITY.toString());
      setCategory(updatingFAD.FAD.CATEGORY.toString());
      setTag(updatingFAD.FAD.TAG ? updatingFAD.FAD.TAG.toString() : updatingFAD.FAD.TAG);
      setImage(updatingFAD.FAD.IMAGE_URL);
    }
  }, [updatingFAD]);

  const resetFields = () => {
    setName('');
    setPrice('');
    setParentTopping('');
    setParentSize('');
    setDescription('');
    setQuantity('0');
    setCategory(null);
    setTag('');
    setImage(null);
  };

  const validateInput = () => {
    let isValid = true;
    console.log(category);
    console.log(image);
    const newValidation = {
      name: true,
      price: true,
      parentTopping: true,
      parentSize: true,
      description: true,
      quantity: true,
      tag: true,
      category: true,
      image: true,
    };

    if (!name) {
      console.log('Vui lòng điền tên món ăn!');
      newValidation.name = false;
      isValid = false;
    }

    if (!price || isNaN(parseFloat(price))) {
      console.log('Vui lòng điền giá món ăn hợp lệ!');
      newValidation.price = false;
      isValid = false;
    }

    if (category === '3' && parentTopping === null) {
      console.log('Vui lòng điền topping của món ăn!');
      newValidation.parentTopping = false;
      isValid = false;
    }

    // if (parentSize === null) {
    //   console.log('Vui lòng điền size của món ăn!');
    //   newValidation.parentSize = false;
    //   isValid = false;
    // }

    if ((quantity as unknown) as number <= 0) {
      console.log('Vui lòng điền số lượng hợp lệ!');
      newValidation.quantity = false;
      isValid = false;
    }

    if (category === null) {
      console.log('Vui lòng chọn loại món ăn!');
      newValidation.category = false;
      isValid = false;
    }

    if (!image) {
      console.log('Vui lòng chọn ảnh món ăn!');
      newValidation.image = false;
      isValid = false;
    }

    // if (tag === null) {
    //   console.log('Vui lòng điền thẻ món ăn!');
    //   newValidation.tag = false;
    //   isValid = false;
    // }

    // if (!description) {
    //   console.log('Vui lòng điền mô tả món ăn!');
    //   newValidation.description = false;
    //   isValid = false;
    // }

    setValidation(newValidation);

    return isValid;
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const onCreate = async () => {
    if (validateInput()) {
      console.log('Data is valid. Proceeding with form submission.');
      const imagePath = await uploadImage();
      const data = {
        fad_name: name,
        category: category,
        quantity: (quantity as unknown) as number,
        fad_price: (price as unknown) as number,
        tag: tag === "" ? null : (tag as unknown) as number,
        image_link: imagePath,
        admin_id: 1,
        shop_id: 1,
        id_parentoftopping: parentTopping === "" ? null : (parentTopping as unknown) as number,
        id_parentofsize: parentSize === "" ? null : (parentSize as unknown) as number,
        description: description
      } as object;
      console.log(data);
      const response = await globalApi.addFAD(data);
      if (response.statusCode === 201) {
        console.log('Thêm món ăn thành công');
        refreshData();
        navigation.pop();
      }
      else {
        Alert.alert('Confirm', 'Tạo món ăn thất bại bạn có muốn tạo lại không? ', [
          {
            text: 'Không',
          },
          {
            text: 'Có',
            onPress: resetFields
          },
        ]);
      }
    } else {
      console.log('Data is not valid. Please correct the errors and try again.');
    }
  };

  const onUpdate = async () => {
    if (validateInput()) {
      console.log('Data is valid. Proceeding with form submission.');
      const imagePath = await uploadImage();
      console.log(imagePath);
      const data = {
        fad_name: name,
        category: category,
        quantity: (quantity as unknown) as number,
        fad_price: (price as unknown) as number,
        tag: tag === "" ? null : (tag as unknown) as number,
        image_link: imagePath,
        admin_id: 1,
        shop_id: 1,
        id_parentoftopping: parentTopping === "" ? null : (parentTopping as unknown) as number,
        id_parentofsize: parentSize === "" ? null : (parentSize as unknown) as number,
        description: description
      } as object;
      console.log(data);
      const response = await globalApi.updateFAD(data, id as unknown as number);
      if (response.statusCode === 200) {
        console.log('Cập nhật món ăn thành công');
        refreshData();
        navigation.pop();
      }
      else {
        Alert.alert('Confirm', 'Cập nhật món ăn thất bại bạn có muốn điền lại không không? ', [
          {
            text: 'Không',
            onPress: () => { navigation.dispatch(popAction); }
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete = async () => {
    try {
      const response = await globalApi.deleteFAD(id);
      if (response.data !== null && response.statusCode === 200) {
        console.log('Xóa thành công');
        navigation.replace("editMenu");
      } else {
        console.log('Xóa thất bại');
      }
    } catch (e) {
      console.log('Lỗi khi xoá món ăn');
    }
  };

  const confirmDelete = () => {
    Alert.alert('Xác nhận', 'Bạn thật sự muốn xoá món ăn này', [
      {
        text: 'Huỷ bỏ',
      },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  };

  const uploadImage = async () => {
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
          <Text style={styles.heading}>{isUpdating ? 'Cập nhật món ăn' : 'Tạo mới món ăn'}</Text>
          <Image
            source={{ uri: image || "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png" }}
            style={styles.image}
          />
          <Text onPress={pickImage} style={styles.textButton}>
            Chọn ảnh sản phẩm
          </Text>
          {
            !validation.image && <Text style={{ color: 'red', alignSelf: "center" }}>{"(*)Vui lòng chọn ảnh"}</Text>
          }
          <Text style={styles.labelTxtInput}>Tên sản phẩm<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Tên món ăn"
            style={styles.input}
          />
          {
            !validation.name && <Text style={{ color: 'red' }}>{"Vui lòng điền tên món ăn"}</Text>
          }
          <Text style={styles.labelTxtInput}>Giá (VNĐ)<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="10.000VNĐ"
            style={styles.input}
            keyboardType="numeric"
          />
          {
            !validation.price && <Text style={{ color: 'red' }}>{"Vui lòng nhập giá hợp lệ"}</Text>
          }
          <Text style={styles.labelTxtInput}>Số lượng<Text style={{ color: "red" }}>(*)</Text></Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Số lượng bán phải từ 0 trở lên"
            style={styles.input}
            keyboardType="numeric"
          />
          {
            !validation.quantity && <Text style={{ color: 'red' }}>{"Vui lòng nhập số lượng hợp lệ"}</Text>
          }

          <Text style={styles.labelTxtInput}>Loại món ăn</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Chọn loại món ăn' : '...'}
            searchPlaceholder="Tìm kiếm..."
            value={category}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCategory(item.value);
              setIsFocus(false);
            }}
          />
          {
            !validation.category && <Text style={{ color: 'red' }}>{"Vui lòng chọn loại món ăn"}</Text>
          }
          {/* <Text style={styles.labelTxtInput}>Thẻ món ăn</Text>
          <TextInput
            value={tag}
            onChangeText={setTag}
            placeholder="Lựa chọn thẻ món ăn"
            style={styles.input}
            keyboardType="numeric"
          /> */}

          {
            category && category === '3' && (<>
              <Text style={styles.labelTxtInput}>Là topping của món ăn</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={isFadLoad ? fadArray : []}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Là topping của' : '...'}
                searchPlaceholder="Tìm kiếm..."
                value={parentTopping}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setParentTopping(item.value);
                  setIsFocus(false);
                }}
              /></>)
          }


          {
            category && category !== '4' && category !== '3' && (<>
              <Text style={styles.labelTxtInput}>Lựa chọn size(S, M, L,...)</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={isSizeLoad ? sizeArray : []}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Có size là' : '...'}
                searchPlaceholder="Tìm kiếm..."
                value={parentSize}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setParentSize(item.value);
                  setIsFocus(false);
                }}
              /></>)
          }

          <Text style={styles.labelTxtInput}>Mô tả</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Mô tả món ăn"
            style={styles.input}
          />

          {/* <Text style={{ color: 'red' }}>{errors}</Text> */}
          <Button onPress={onSubmit} text={isUpdating ? 'Cập nhật' : 'Tạo món ăn'} />
          {isUpdating && (
            <Text onPress={confirmDelete} style={styles.textButton}>
              Xoá
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProductScreen;

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

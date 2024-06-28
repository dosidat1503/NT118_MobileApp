import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image, TextInput } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useCartContext } from '@/providers.tsx/CartProvider';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Button from '../orderFoodAndDrink/Button';
import axios from 'axios';
import { uploadToFirebase } from '../../../firebase/index';
import Loading from '@/components/Loading';

const { width: widthScreen } = Dimensions.get('window');
const mainColor = '#DFEBF4'; // Bạn có thể đổi màu sắc theo ý muốn

type PersonalInfo = {
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  facebookLink: string;
  schoolName: string;
  address: string;
  codeVerifyEmail: string;
}; 

export default function AccountInfo() {

  const { heightScreen, widthScreen, mainColor, emailPattern, phoneNumberPattern, baseURL, userID, isLoading, setIsLoading } = useCartContext();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DFEBF4',
    },
    headerContainer: {
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: '#E8F4FD',
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    editButton: {
      position: 'absolute',
      top: 40,
      right: 20,
    },
    editIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 5,
    },
    bodyContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      marginBottom: 15,
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 15,
    },
    itemText: {
      fontSize: 18,
      flexShrink: 1,
    },
    input: {
      fontSize: 18,
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#6495ED',
    },
    errorText: {
      color: 'red',
      marginBottom: heightScreen * 0.01,
    },
  });
  const [image, setImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState("");
  const [isShowBirthdayCalendar, setIsShowBirthdayCalendar] = useState(false);
  const [isShowVerifyEmail, setIsShowVerifyEmail] = useState(false);
  const [isChangeMail, setIsChangeMail] = useState(false)
  const [emailBeforeChange, setEmailBeforeChange] = useState("")
  const [avatarURLBeforeChange, setAvatarURLBeforeChange] = useState("")
  const [codeVerifyEmail, setCodeVerifyEmail] = useState("")
  const [hasUploadedFirebase, setHasUploadedFirebase] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'Trần Thị Mỹ Xoan',
    avatar: 'https://stickerly.pstatic.net/sticker_pack/BQnofyFGrZaoEtNwJxtJ0A/UTBNZQ/9/01fe3390-e2a8-4a24-87d2-1447775025e3.png',
    email: "tranthimyxoan@gmail.com",
    phoneNumber: '+84 123 456 789',
    birthDate: '2003-06-19',
    facebookLink: 'https://www.facebook.com/yourfacebook',
    schoolName: 'Đại học CÔNG NGHỆ THÔNG TIN ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH ',
    address: 'KTX TRƯƠNG UIT, DĨ AN, BÌNH DƯƠNG',
    codeVerifyEmail: ""
  });

  const infoItemList = [
    { icon: 'birthday-cake', library: FontAwesome, title: 'Ngày sinh', field: 'birthDate' },
    { icon: 'envelope', library: FontAwesome, title: 'Email', field: 'email' },
    { icon: 'phone', library: FontAwesome, title: 'Số điện thoại', field: 'phoneNumber' },
    { icon: 'facebook', library: FontAwesome, title: 'Link Facebook', field: 'facebookLink' },
    { icon: 'school', library: Ionicons, title: 'Tên trường đang theo học', field: 'schoolName' },
    { icon: 'place', library: MaterialIcons, title: 'Địa chỉ', field: 'address' },
  ] 

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setErrors("")
  };
 
  const handleInputChange = (field: any, value: any) => {
    if(field === 'email') {
      setIsChangeMail(true)
      console.log(isChangeMail, "isChangeMail")
    }
    const birthdayRegex = /^[0-9-]*$/;
    const phoneRegex = /^[0-9]*$/;
    if(field === 'birthDate' && !birthdayRegex.test(value)) {
      return
    }
    if(field === 'phoneNumber' && !phoneRegex.test(value)) {
      return
    }
    console.log(field, value, personalInfo.phoneNumber, "field22")
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  const changeAvartaImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
      orderedSelection: true,
    });

    console.log(result, 'result', 'im2ageList');

    if (!result.canceled) {
      console.log(result, 'result', 'im2ageList');
      // let localUri = result.assets[0].uri as string;
      // let arrImage = [...image]
      // let newArrImage = arrImage.push(result)

      setPersonalInfo({ ...personalInfo, avatar: result.assets[0].uri as string })
      setImage(result.assets[0].uri as string); // Update the type of the value passed to setImage
      // setImageList( result.assets.map((item: any) => item.uri) )
    }
  }

  const handleDateChange= (date: any) => {
    const formattedStartDate = date ? dayjs(date).format('YYYY-MM-DD') : null;

    setPersonalInfo({
      ...personalInfo,
      birthDate: formattedStartDate || "",
    });
    
  }

  // const requestSaveInfoAccount = () => {
  //   console.log(personalInfo.codeVerifyEmail, 'codeVerifyEmail')
  //   setIsLoading(true)
  //   console.log(personalInfo, "person22alInfo")
  //   axios.post(baseURL + '/updateAccountInfo', {
  //     userID: userID,
  //     name: personalInfo.name,
  //     avatar: personalInfo.avatar,
  //     email: personalInfo.email,
  //     codeVerifyEmail: personalInfo.codeVerifyEmail,
  //     phoneNumber: personalInfo.phoneNumber,
  //     birthDate: personalInfo.birthDate,
  //     facebookLink: personalInfo.facebookLink,
  //     schoolName: personalInfo.schoolName,
  //     address: personalInfo.address,
  //     avatarURLBeforeChange: avatarURLBeforeChange,
  //     emailBeforeChange: emailBeforeChange
  //   })
  //   .then(res => {
  //     console.log(res.data, "res.data")
  //     if(res.data.statusCode === 200) {
  //       setErrors("Cập nhật thông tin thành công")
  //       setIsEditing(false)
  //     } 
  //     else if(res.data.statusCode === 1) {
  //       setErrors(res.data.message)
  //     }
  //     else {
  //       setErrors("Cập nhật thông tin thất bại")
  //     }  
  //     setIsLoading(false)
  //   })
  //   .catch(err => {
  //     console.log(err) 
  //     setIsEditing(false)
  //     setIsLoading(false)
  //   })
  // }

  const handleSaveAccountInfo = () => { 
    if (isEditing) {
      // Kiểm tra số điện thoại trước khi lưu
      // const phoneNumberPattern = /^[0-9]{9,10}$/;
      const birthdayPattern = /^\d{4}-\d{2}-\d{2}$/;
      if (personalInfo.phoneNumber !== "" && !phoneNumberPattern.test(personalInfo.phoneNumber)) {
        setErrors('Sai định dạng số điện thoại.');
        return;
      }
      if(personalInfo.name === "") {
        setErrors('Tên không được để trống.');
        return;
      }
      if(personalInfo.email === "") {
        setErrors('Email không được để trống.');
        return;
      }
      if(personalInfo.email !== "" && !emailPattern.test(personalInfo.email) ) {
        setErrors('Email Sai định dạng');
        return;
      }
      if(personalInfo.birthDate === "" && !birthdayPattern.test(personalInfo.birthDate)) {
        setErrors('Ngày sinh sai định dạng.');
        return;
      }
      if(isChangeMail && emailBeforeChange !== personalInfo.email && personalInfo.codeVerifyEmail === "") {
        setErrors('Vui lòng nhập mã xác nhận email khi thay đổi email');
        return;
      }
      setErrors("");

      if(personalInfo.avatar !== avatarURLBeforeChange) {
        uploadImagesToFirebaseStorage()
      }
      else{
        console.log(personalInfo.codeVerifyEmail, 'codeVerifyEmail')
        setIsLoading(true)
        console.log(personalInfo, "person22alInfo")
        axios.post(baseURL + '/updateAccountInfo', {
          userID: userID,
          name: personalInfo.name,
          avatar: personalInfo.avatar,
          email: personalInfo.email,
          codeVerifyEmail: personalInfo.codeVerifyEmail,
          phoneNumber: personalInfo.phoneNumber,
          birthDate: personalInfo.birthDate,
          facebookLink: personalInfo.facebookLink,
          schoolName: personalInfo.schoolName,
          address: personalInfo.address,
          avatarURLBeforeChange: avatarURLBeforeChange,
          emailBeforeChange: emailBeforeChange
        })
        .then(res => {
          console.log(res.data, "res.datahandleSaveAccountInfo")
          if(res.data.statusCode === 200) {
            setErrors("Cập nhật thông tin thành công")
            setIsEditing(false)
          } 
          else if(res.data.statusCode === 1) {
            setErrors(res.data.message)
          }
          else {
            setErrors("Cập nhật thông tin thất bại")
          }  
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err) 
          setIsEditing(false)
          setIsLoading(false)
        })
      }
    }  
  }

  const uploadImagesToFirebaseStorage = async () => { 
      // sau khi upload hình ảnh thì sẽ sử dụng useEffect để gửi request lên server
      let listLink: never[] = []  
      const fileName = personalInfo.avatar.split("/").pop();
      const uploadResp = await uploadToFirebase(
                                                personalInfo.avatar, 
                                                fileName, 
                                                (progress: any) => { 
                                                    console.log(progress, 'progress') 
                                                },
                                                listLink
                                              )
      console.log(uploadResp, 'uploadResp')
      console.log(listLink, 'listLink', listLink.length)
      if(listLink.length === 1) {
        setPersonalInfo({...personalInfo, avatar: listLink[0]})
        console.log(personalInfo.codeVerifyEmail, 'codeVerifyEmail')
        setIsLoading(true)  
        console.log(personalInfo, "person22alInfo")
        axios.post(baseURL + '/updateAccountInfo', {
          userID: userID,
          name: personalInfo.name,
          avatar: personalInfo.avatar,
          email: personalInfo.email,
          codeVerifyEmail: personalInfo.codeVerifyEmail,
          phoneNumber: personalInfo.phoneNumber,
          birthDate: personalInfo.birthDate,
          facebookLink: personalInfo.facebookLink,
          schoolName: personalInfo.schoolName,
          address: personalInfo.address,
          avatarURLBeforeChange: avatarURLBeforeChange,
          emailBeforeChange: emailBeforeChange
        })
        .then(res => {
          console.log(res.data, "res.datauploadImagesToFirebaseStorage")
          if(res.data.statusCode === 200) {
            setErrors("Cập nhật thông tin thành công")
            setIsEditing(false)
          } 
          else if(res.data.statusCode === 1) {
            setErrors(res.data.message)
          }
          else {
            setErrors("Cập nhật thông tin thất bại")
          }  
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err) 
          setIsEditing(false)
          setIsLoading(false)
        })
      }
  };

  useEffect(() => {
    // requestSaveInfoAccount()
  }, [hasUploadedFirebase === true])

  const getInfoAccount = () => {
    axios.get(baseURL + '/getInfoAccount', {params: {userID: userID}})
    .then(res => {
      console.log(res.data, "res.data")
      setAvatarURLBeforeChange(res.data.accountInfo.URL)
      setEmailBeforeChange(res.data.accountInfo.EMAIL)
      
      setPersonalInfo({
        codeVerifyEmail: "",
        name: res.data.accountInfo.NAME,
        avatar: res.data.accountInfo.URL,
        email: res.data.accountInfo.EMAIL,
        phoneNumber: res.data.accountInfo.PHONE,
        birthDate: res.data.accountInfo.BIRTHDAY,
        facebookLink: res.data.accountInfo.LINK_FB,
        schoolName: res.data.accountInfo.SCHOOL,
        address: res.data.accountInfo.ADDRESS,
      })
      
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleSendCodeVerifyChangeMail = () => {
    setIsLoading(true)
    console.log(handleSendCodeVerifyChangeMail, 'handleSendCodeVerifyChangeMail')
    axios.post(baseURL + '/verifyChangeMail', { userID: userID, email: emailBeforeChange })
    .then(res => {
      console.log(res.data, "res.datahandleSendCodeVerifyChangeMail") 
      setIsLoading(false)
    })
    .catch(err => {
      setIsLoading(false) 
    })
  }

  useEffect(() => {
    getInfoAccount()
  }, [])
 
  return (
    
      isLoading 
      ? <Loading></Loading>
      : <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: personalInfo.avatar }} style={styles.avatar} />
        {isEditing ? (
          <>
            {/* <TextInput
              style={styles.input}
              value={personalInfo.avatar}
              onChangeText={(value) => handleInputChange('avatar', value)}
              placeholder="URL hình ảnh"
            /> */}
            <TouchableOpacity
              onPress={() => changeAvartaImage()}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: mainColor }}>Thay đổi ảnh đại diện</Text>
              <FontAwesome5 name="upload" style={{ marginLeft: widthScreen * 0.01, color: "green" }}></FontAwesome5>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={personalInfo.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Tên"
            />
          </>
        ) : (
          <>
            <Text style={styles.name}>{personalInfo.name}</Text>
          </>
        )}
        {
          isEditing === false && (
            <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
              <View style={styles.editIcon}>
                <FontAwesome name="edit" size={20} color="#6495ED" />
              </View>
            </TouchableOpacity>
          )
        }
      </View>

      <View style={styles.bodyContainer}>
        {
          infoItemList.map((item, index) => {
            const IconComponent = item.library;
            const today = new Date();
            const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            return (
              <View key={index}>
                <View  style={styles.itemContainer}>
                  <IconComponent name={item.icon} size={30} color="#6495ED" style={styles.icon} />
                  {
                    isEditing 
                    ? <TextInput
                        style={styles.input}
                        value={personalInfo[item.field]}
                        onChangeText={(value) => handleInputChange(item.field, value)}
                        onFocus={
                          () => {
                            item.field === infoItemList[0].field 
                              ? setIsShowBirthdayCalendar(true) 
                              : setIsShowBirthdayCalendar(false)
                            item.field === infoItemList[1].field
                              ? setIsShowVerifyEmail(true) 
                              : setIsShowVerifyEmail(false) 
                          }
                        } 
                      /> 
                    : <Text style={styles.itemText}>{personalInfo[item.field]}</Text> 
                  }
                </View>
                {
                  //Hiển thị calendar khi click vào ngày sinh
                  item.field === 'birthDate' && isShowBirthdayCalendar && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <View 
                          style={{ 
                              width: widthScreen * 0.7,
                              paddingHorizontal: widthScreen * 0.03,
                              paddingBottom: heightScreen * 0.05,
                          }}
                      >
                        <DateTimePicker
                            height={heightScreen * 0.2}
                            mode="single"
                            date={ personalInfo.birthDate ? new Date(personalInfo.birthDate) : new Date()}
                            onChange={(params) => handleDateChange(params.date)} 
                            maxDate={eighteenYearsAgo}
                        />
                      </View>
                      {/* <TouchableOpacity onPress={() => setIsShowBirthdayCalendar(false)}>
                        <FontAwesome name="calendar" size={30} color="#6495ED" style={styles.icon} />
                      </TouchableOpacity> */}
                    </View>
                  )  
                }
                {
                  //Hiển thị ô nhập mã xác nhận bằng email trước khi đổi email
                  item.field === 'email' && isEditing && isShowVerifyEmail && (
                    <View style={{ flexDirection: 'row', marginBottom: heightScreen * 0.02 }}>
                      <Button
                        iconName='paper-plane'
                        buttonName='Gửi mã'
                        handlePress={handleSendCodeVerifyChangeMail}
                        color={mainColor}
                      /> 
                      <TextInput
                        style={[styles.input, { marginHorizontal: widthScreen * 0.03}]}
                        placeholder="Nhập mã xác nhận để thay đổi mail"
                        value={personalInfo.codeVerifyEmail}
                        onChangeText={(value) => handleInputChange('codeVerifyEmail', value)}
                      />
                    </View>
                  )
                }
              </View>
            );
          })
        }
        {
          errors && <Text style={styles.errorText}>{errors}</Text>
        }
        {
          isEditing && (
            <View style={{ flexDirection: "row", width: widthScreen * 0.5, marginHorizontal: widthScreen * 0.2, justifyContent: "space-around" }}>
              <Button
                iconName='save'
                buttonName='Lưu'
                handlePress={handleSaveAccountInfo}
                color={mainColor}
              />
              <Button
                iconName='window-close'
                buttonName='Huỷ'
                handlePress={handleEditToggle}
                color="red"
              />
            </View>
          ) 
        }
        
      </View>
    </ScrollView> 
    
  );
}





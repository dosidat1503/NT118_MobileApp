import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image, TextInput } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const { width: widthScreen } = Dimensions.get('window');
const mainColor = '#DFEBF4'; // Bạn có thể đổi màu sắc theo ý muốn

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Trần Thị Mỹ Xoan',
    avatar: 'https://stickerly.pstatic.net/sticker_pack/BQnofyFGrZaoEtNwJxtJ0A/UTBNZQ/9/01fe3390-e2a8-4a24-87d2-1447775025e3.png',
    birthDate: '20/08/1995',
    phoneNumber: '+84 123 456 789',
    facebookLink: 'https://www.facebook.com/yourfacebook',
    schoolName: 'Đại học CÔNG NGHỆ THÔNG TIN ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH ',
    address: 'KTX TRƯƠNG UIT, DĨ AN, BÌNH DƯƠNG',
  });

  const listItem = {
    featureManagement: [
      { icon: 'birthday-cake', library: FontAwesome, title: 'Ngày sinh', field: 'birthDate' },
      { icon: 'phone', library: FontAwesome, title: 'Số điện thoại', field: 'phoneNumber' },
      { icon: 'facebook', library: FontAwesome, title: 'Link Facebook', field: 'facebookLink' },
      { icon: 'school', library: Ionicons, title: 'Tên trường đang theo học', field: 'schoolName' },
      { icon: 'place', library: MaterialIcons, title: 'Địa chỉ', field: 'address' },
    ],
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Kiểm tra số điện thoại trước khi lưu
      const phoneNumberPattern = /^[0-9]{9,10}$/;
      if (!phoneNumberPattern.test(personalInfo.phoneNumber.replace(/\D/g, ''))) {
        setErrors({ phoneNumber: 'Số điện thoại phải có 9 hoặc 10 chữ số.' });
        return;
      }
    }
    setErrors({});
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={personalInfo.avatar}
              onChangeText={(value) => handleInputChange('avatar', value)}
              placeholder="URL hình ảnh"
            />
            <TextInput
              style={styles.input}
              value={personalInfo.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Tên"
            />
          </>
        ) : (
          <>
            <Image source={{ uri: personalInfo.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{personalInfo.name}</Text>
          </>
        )}
        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <FontAwesome name={isEditing ? "save" : "pencil"} size={20} color="#6495ED" backgroundColor="white" style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        {listItem.featureManagement.map((item, index) => {
          const IconComponent = item.library;
          return (
            <View key={index} style={styles.itemContainer}>
              <IconComponent name={item.icon} size={30} color="#6495ED" style={styles.icon} />
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={personalInfo[item.field]}
                  onChangeText={(value) => handleInputChange(item.field, value)}
                />
              ) : (
                <Text style={styles.itemText}>{personalInfo[item.field]}</Text>
              )}
            </View>
          );
        })}
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
      </View>
    </ScrollView>
  );
}

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
    marginTop: 5,
  },
});



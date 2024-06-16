

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const { width: widthScreen } = Dimensions.get('window');
const mainColor = '#DFEBF4'; // Bạn có thể đổi màu sắc theo ý muốn

export default function AccountInfo() {
  const listItem = {
    featureManagement: [
      { icon: 'birthday-cake', library: FontAwesome, title: 'Ngày sinh' },
      { icon: 'phone', library: FontAwesome, title: 'Số điện thoại' },
      { icon: 'facebook', library: FontAwesome, title: 'Link Facebook' },
      { icon: 'school', library: Ionicons, title: 'Tên trường đang theo học' },
      { icon: 'place', library: MaterialIcons, title: 'Địa chỉ' },
    ],
    personalInfo: {
      birthDate: '20/08/1995',
      phoneNumber: '+84 123 456 789',
      facebookLink: 'https://www.facebook.com/yourfacebook',
      schoolName: 'Đại học CÔNG NGHỆ THÔNG TIN ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH ',
      address: 'KTX TRƯƠNG UIT, DĨ AN, BÌNH DƯƠNG',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: 'https://stickerly.pstatic.net/sticker_pack/BQnofyFGrZaoEtNwJxtJ0A/UTBNZQ/9/01fe3390-e2a8-4a24-87d2-1447775025e3.png' }} style={styles.avatar} />
        <Text style={styles.name}>Trần Thị Mỹ Xoan</Text>
        <TouchableOpacity style={styles.editButton}>
          <FontAwesome name="pencil" size={20} color="#6495ED" backgroundColor="white" style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.itemContainer}>
          <FontAwesome name="birthday-cake" size={30} color="#6495ED" style={styles.icon} />
          <Text style={styles.itemText}>{listItem.personalInfo.birthDate}</Text>
        </View>
        <View style={styles.itemContainer}>
          <FontAwesome name="phone" size={30} color="#6495ED" style={styles.icon} />
          <Text style={styles.itemText}>{listItem.personalInfo.phoneNumber}</Text>
        </View>
        <View style={styles.itemContainer}>
          <FontAwesome name="facebook" size={30} color="#6495ED" style={styles.icon} />
          <Text style={styles.itemText}>{listItem.personalInfo.facebookLink}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Ionicons name="school" size={30} color="#6495ED" style={styles.icon} />
          <Text style={styles.itemText}>{listItem.personalInfo.schoolName}</Text>
        </View>
        <View style={styles.itemContainer}>
          <MaterialIcons name="place" size={30} color="#6495ED" style={styles.icon} />
          <Text style={styles.itemText}>{listItem.personalInfo.address}</Text>
        </View>
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
    width: 30, // To ra thêm 10 units
    height: 30, // To ra thêm 10 units
    borderRadius: 15, // Đổi thành hình tròn
    backgroundColor: 'white', // Đổi màu nền thành màu trắng
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
});



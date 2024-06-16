import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width: widthScreen } = Dimensions.get('window');
const mainColor = '#DFEBF4'; // Bạn có thể đổi màu sắc theo ý muốn

export default function AccountInfo() {
  const listItem = {
    featureManagement: [
      { icon: 'birthday-cake', library: FontAwesome, title: 'Ngày sinh' },
      { icon: 'phone', library: FontAwesome, title: 'Số điện thoại' },
      { icon: 'facebook', library: FontAwesome, title: 'Link Facebook' },
      { icon: 'school', library: Ionicons, title: 'Tên trường đang theo học' },
      { icon: 'map-marker-alt', library: FontAwesome, title: 'Địa chỉ' },
    ],
    personalInfo: {
      birthDate: '25/01/2003',
      phoneNumber: '+84 123 456 789',
      facebookLink: 'https://www.facebook.com/yourfacebook',
      schoolName: 'Đại học Công Nghệ Thông Tin',
      address: '123 Đường ABC, Quận XYZ, Thành phố HCM',
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: 'https://th.bing.com/th/id/R.fb4d1b2177b64dfb1e5e71328957ddb0?rik=RBkplrzaBp3YOw&riu=http%3a%2f%2fhdwpro.com%2fwp-content%2fuploads%2f2016%2f01%2fPink-Tulip.jpeg&ehk=Vl09RxT9pco7eBLNgWO%2fMsR4xJwWr%2bHQIgSJlCEqDHM%3d&risl=&pid=ImgRaw&r=0' }} style={styles.avatar} />
        <Text style={styles.name}>Trần Thị Mỹ Xoan</Text>
        <TouchableOpacity style={styles.editButton}>
          <FontAwesome name="pencil" size={20} color="black" style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        {/* Các thông tin cá nhân */}
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
          <FontAwesome name="map-marker-alt" size={30} color="#6495ED" style={styles.icon} />
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
    top: 20,
    right: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
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
  },
});

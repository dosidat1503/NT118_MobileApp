import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const TestNotification = () => {
  useEffect(() => {
    // Yêu cầu quyền nhận thông báo
    requestUserPermission();

    // Nhận thông báo khi ứng dụng đang ở foreground
    const unsubscribe = messaging().onMessage(async () => {
      alert('A new FCM message arrived!');
    });

    return unsubscribe;
  }, []);

  // Yêu cầu quyền từ người dùng
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to React Native Firebase Messaging!</Text>
      {/* Thêm các nút và các thành phần khác tại đây */}
    </View>
  );
};

export default TestNotification;

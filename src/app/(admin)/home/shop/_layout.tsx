import React from 'react';
import { Pressable, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router'; // useRouter to navigate back
import { FontAwesome } from '@expo/vector-icons'; // For the back icon
import Colors from '@/constants/Colors';

export default function ShopStack() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Quay lại',
          headerShown: false, // Show the header if you want the back button to be visible
          // headerLeft: () => (
          //   <Pressable
          //     onPress={() => router.back()} // Navigate back to the previous screen
          //     style={{ padding: 10 }} // Add padding to make the button easier to press
          //   >
          //     <FontAwesome name="arrow-circle-o-left" size={24} color="black" />
          //   </Pressable>
          // ),
        }}
      />
    </Stack>
  )
}
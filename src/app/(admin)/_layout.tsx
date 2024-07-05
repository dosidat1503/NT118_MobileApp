import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIcon1(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        tabBarStyle: {
          backgroundColor: Colors.light.tint
        },
        tabBarHideOnKeyboard: true,
      }}>

      <Tabs.Screen
        name='index'
        options={{ href: null }}
      ></Tabs.Screen>

      <Tabs.Screen
        name="home"
        options={{
          title: 'Restaurant',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,

        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon1 name="box" color={color} />,
        }}
      />

      {/* <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}

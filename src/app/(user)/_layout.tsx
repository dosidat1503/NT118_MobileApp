import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, useNavigation } from 'expo-router';
import { Pressable, TouchableOpacity, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import React, { useCallback, useContext } from 'react';
import { useCartContext } from '@/providers.tsx/CartProvider';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={32} style={{ marginBottom: -3 }} {...props} />;
}

  const TabLayout = React.memo(() => {
    const colorScheme = useColorScheme(); 
    console.log("TabLayout")

    const renderTabHome = useCallback(() => (
      <Tabs.Screen
        name="home" //Trỏ vào folder menu
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: () => null
        }}
      /> 
    ) , [])

    const renderTabFAD = useCallback(() => (
      <Tabs.Screen
        name="orderFoodAndDrink" 
        options={{
          title: 'Order Food & Drink',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          tabBarLabel: () => null,  
          
        }} 
      /> 
    ) , [])

    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }}>

        {renderTabHome()}
        {renderTabFAD()}
        <Tabs.Screen
          name="dating"
          options={{
            // title: 'Tab Two',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="heartbeat" color={color} />,
            tabBarLabel: () => null
          }}
        /> 
        <Tabs.Screen
          name="account"
          options={{
            // title: 'Tab Two',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            tabBarLabel: () => null
          }}
        />
        
        {/* Tab.Screen dưới đây có tác dụng ẩn đi tab bị dư ra*/}
        <Tabs.Screen 
          name='TestNotification' 
          options={{href: null}}
        ></Tabs.Screen> 
        <Tabs.Screen 
          name='index' 
          options={{href: null}}
        ></Tabs.Screen> 
        <Tabs.Screen 
          name='two' 
          options={{href: null}}
        ></Tabs.Screen> 
        <Tabs.Screen 
          name='Response' 
          options={{href: null}}
        ></Tabs.Screen> 
      </Tabs>
    );
  })
  export default TabLayout;

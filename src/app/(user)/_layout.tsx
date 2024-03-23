import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={32} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>

      <Tabs.Screen
        name="home" //Trỏ vào folder menu
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: () => null
        }}
      />
      
      <Tabs.Screen
        name="two"
        options={{
          // title: 'Tab Two',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          tabBarLabel: () => null
        }}
      />
 

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
        name='index' 
        options={{href: null}}
      ></Tabs.Screen> 
      <Tabs.Screen 
        name='menu' 
        options={{href: null}}
      ></Tabs.Screen> 

    </Tabs>
  );
}

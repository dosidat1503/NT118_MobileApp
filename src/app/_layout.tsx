import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import {  Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import CartProvider from '@/providers.tsx/CartProvider';
import { createStackNavigator } from '@react-navigation/stack';
import TabOneScreen from './(user)/home';
import TabLayout from './(user)/_layout';
import { Component } from 'react';
import Filter from './(user)/home/filter';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const Stack = createStackNavigator();

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
          <Stack.Screen name="(admin)" options={{ headerShown: false }} /> 
          <Stack.Screen name="signUpSuccess" options={{ headerShown: false }} />
          {/* <Stack.Screen name="filter"  options={{ headerShown: false }} component = {Filter}/> */}
        </Stack>
        {/* <NavigationContainer>
          <Stack.Navigator> 
            <Stack.Screen name="UserHome" component={TabOneScreen} />
            <Stack.Screen name="(user)" component={TabLayout} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="userTest" component={TabLayout} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(authentication)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ presentation: 'modal' }} /> */}
          {/* </Stack.Navigator>
        </NavigationContainer> */}
      </CartProvider>
    </ThemeProvider>
  );
}

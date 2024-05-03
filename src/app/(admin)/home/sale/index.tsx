import { FlatList, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';

export default function ShopScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  return (
    <View style={styles.homeContainer}>
      <Text>This is sale screen
      </Text>
    </View >
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#e0effa",
    // marginHorizontal: "2%",
    paddingHorizontal: 10,
    gap: 10,
    width: "100%",
    height: "100%"
  }
  ,
  homeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  summaryContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 10,
    justifyContent: "center"
  },
  serviceContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 20 }, // iOS shadow
    shadowOpacity: 0.5, // iOS shadow
    shadowRadius: 4, // iOS shadow
    elevation: 20, // Android shadow
  },
  text: {
    fontFamily: 'Helvetica'
  },
  income: {
    backgroundColor: "blue",
    // marginHorizontal: "2%",
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 10,
    borderRadius: 25,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 }, // iOS shadow
    shadowOpacity: 0.3, // iOS shadow
    shadowRadius: 4, // iOS shadow
    elevation: 20, // Android shadow
  },
  category: { display: "flex", flexDirection: "column", alignItems: "center" }
  , categoryText: {
    fontFamily: "Roboto_500Medium"
  }
});

import { FlatList, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function ShopScreen() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  const navigation = useNavigation();
  return (
    <View style={styles.homeContainer}>
      <View style={styles.headerBar}>
        <Pressable
          onPress={() => router.back()} // Navigate back to the previous screen
          style={{ padding: 10 }} // Add padding to make the button easier to press
        >
          <View style={styles.backButton}>
            <FontAwesome name="angle-left" size={24} color="white" />
          </View>
        </Pressable>
        <Text>Thêm món ăn</Text>
      </View>

      <View>
        <View>
          <Text>Có sẵn</Text>
        </View>
        <View>
          <Text>Số liệu</Text>
        </View>
      </View>

      <View>
        <Image source={require('../../../../../assets/images/wine-menu.png')} style={{ width: 40, height: 40 }} />

        <Text>
          Thiết lập thực đơn
        </Text>

        <Pressable
          onPress={() => navigation.navigate('editMenu')}
          style={{ padding: 10 }}
        >
          <View style={[styles.backButton, { opacity: 1 }]}>
            <FontAwesome name="angle-right" size={24} color="white" />
          </View>
        </Pressable>
      </View>

      <View>
        <View>
          <Text>Các món chính</Text>
        </View><View>
          <Text>Tuỳ chọn nhóm</Text>
        </View>
      </View>

      <View>
        <View>
          <Text>Menu <Text style={{ marginLeft: 10, color: "gray", fontSize: 12 }}>(2 danh mục)</Text></Text>

          <Pressable>
            <Text>Chọn</Text>
          </Pressable>
        </View>

        <View>
          <View>
            <Text>Lẩu</Text>
            <View>
              <Text>
                3 Món
              </Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          <View>
            <Text>Ăn vặt</Text>
            <View>
              <Text>
                3 Món
              </Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#e0effa",
    gap: 10,
    width: "100%",
    height: "100%"
  },
  headerBar: {
    height: "12%",
    backgroundColor: "white",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    shadowColor: "#000",
  },
  backButton: {
    backgroundColor: '#6495ed',
    width: 30,
    height: 30,
    borderRadius: 15, // Makes the circle perfectly round
    borderCurve: "continuous",
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8, // A bit more opaque to ensure visibility
  }
});

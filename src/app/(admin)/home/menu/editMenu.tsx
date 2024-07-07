import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import globalApi from '@/services/globalApi';
import Categories from '@/components/Categories';
import { StatusBar } from 'expo-status-bar';
import HeaderbarSe from '@/components/HeaderBarSe';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FADCard from '@/components/FADCart';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { formatCurrency } from '@/utils/formatter';
import { StackActions } from '@react-navigation/native';
interface Option {
  label: string;
  value: string;
}

export default function EditMenu({ navigation }) {
  const [foodArray, setFoodArray] = useState<Option[]>([]);
  const [isFoodLoad, setIsFoodLoad] = useState(false);
  const [drinkArray, setDrinkArray] = useState<Option[]>([]);
  const [isDrinkLoad, setIsDrinkLoad] = useState(false);
  const [sizeArray, setSizeArray] = useState<Option[]>([]);
  const [isSizeLoad, setIsSizeLoad] = useState(false);
  const [toppingArray, setToppingArray] = useState<Option[]>([]);
  const [isToppingLoad, setIsToppingLoad] = useState(false);
  const [isAllLoad, setIsAllLoad] = useState(false);
  const fetchFadArray = async (id: any) => {
    try {
      const response = await globalApi.getFADs(id);
      console.log(response);
      if (response.data !== null && response.statusCode === 200) {
        const foodArray = [...response.data.foods];
        const drinkArray = [...response.data.drinks];
        const sizeArray = [...response.data.sizes];
        const toppingArray = [...response.data.toppings];
        console.log('food array', typeof foodArray[0].FAD_PRICE);
        setIsFoodLoad(true);
        setFoodArray(foodArray);

        setDrinkArray(drinkArray);
        setIsDrinkLoad(true);

        setSizeArray(sizeArray);
        setIsSizeLoad(true);

        setToppingArray(toppingArray);
        setIsToppingLoad(true);

        setIsAllLoad(true);
      } else {
        setIsFoodLoad(false);
        setIsDrinkLoad(false);
        setIsSizeLoad(false);
        setIsAllLoad(false);
        setIsToppingLoad(false);
      }
    } catch (e) {
      console.error("Lỗi lấy thông tin món ăn cửa hàng", e);
      setIsFoodLoad(false);
      setIsDrinkLoad(false);
      setIsAllLoad(false);
      setIsSizeLoad(false);
      setIsToppingLoad(false);
    }
  }

  const resetData = () => {
    setIsFoodLoad(false);
    setIsDrinkLoad(false);
    setIsSizeLoad(false);
    setIsAllLoad(false);
    setIsToppingLoad(false);
    setFoodArray([]);
    setDrinkArray([]);
    setSizeArray([]);
    setToppingArray([]);
  }

  const refreshData = () => {
    resetData();
    fetchFadArray(1);
  }

  useEffect(() => {
    resetData();
    fetchFadArray(1);
  }, []);

  const onDelete = async (item) => {
    Alert.alert('Xác nhận', 'Bạn muốn xoá món ăn này? ', [
      {
        text: 'Không',
      },
      {
        text: 'Có',
        onPress: async () => {
          try {
            const response = await globalApi.deleteFAD(item.FAD_ID);
            if (response.data !== null && response.statusCode === 200) {
              console.log('Xóa thành công');
              resetData();
              fetchFadArray(1);
            } else {
              console.log('Xóa thất bại');
            }
          } catch (e) {
            console.log('Lỗi khi xoá món ăn');
          }
        }
      },
    ]);
  };


  const handleEdit = (item: any) => {
    navigation.navigate('editFAD', {
      id: item.FAD_ID,
      refreshData: refreshData
    });
  };

  const handleDelete = (item: any) => {
    onDelete(item);
  };


  return (
    <ScrollView style={styles.homeContainer}>
      <TouchableOpacity style={styles.searchbox}>
        <AntDesign name="search1" size={24} color="black" style={{ color: '#FF3F00' }} />
        <Text style={styles.input}>Search</Text>
      </TouchableOpacity>

      <Categories />
      <View>
        <View style={(styles.paddingTotal, styles.pickMenuHeader)}>
          <Text style={{ color: "black", fontWeight: "700" }}>
            Kết quả{" "}
            <Text style={{ marginLeft: 10, color: "gray", fontSize: 12 }}>
              (4 danh mục)
            </Text>
          </Text>
          <Pressable>
            <Text style={{ color: "#709dee" }}>Chọn</Text>
          </Pressable>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "700" }}>Thức ăn</Text>
              <Text style={{ color: "#6495ED" }}>Chỉnh sửa danh mục</Text>
            </View>
            <View style={styles.mealCount}>

              <Text>{isFoodLoad && foodArray.length} Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          {isAllLoad === true ? foodArray.map((food: object) => {
            food.FAD_PRICE = formatCurrency((food.FAD_PRICE as unknown) as number);
            return (
              <FADCard key={food.FAD_ID} url={food.IMAGE_URL} item={food} onEdit={() => handleEdit(food)}
                onDelete={() => handleDelete(food)} />
            );
          }) : ""}
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "700" }}>Nước uống</Text>
              <Text style={{ color: "#6495ED" }}>Chỉnh sửa danh mục</Text>
            </View>
            <View style={styles.mealCount}>

              <Text>{isDrinkLoad && drinkArray.length} Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          {isAllLoad === true ? drinkArray.map((drink: object) => {
            drink.FAD_PRICE = formatCurrency((drink.FAD_PRICE as unknown) as number);
            return (
              <FADCard key={drink.FAD_ID} url={drink.IMAGE_URL} item={drink} onEdit={() => handleEdit(drink)}
                onDelete={() => handleDelete(drink)} />
            );
          }) : ""}
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "700" }}>Topping</Text>
              <Text style={{ color: "#6495ED" }}>Chỉnh sửa danh mục</Text>
            </View>
            <View style={styles.mealCount}>

              <Text>{isToppingLoad && toppingArray.length} Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          {isAllLoad === true ? toppingArray.map((topping: object) => {
            topping.FAD_PRICE = formatCurrency((topping.FAD_PRICE as unknown) as number);
            return (
              <FADCard key={topping.FAD_ID} url={topping.IMAGE_URL} item={topping} onEdit={() => handleEdit(topping)}
                onDelete={() => handleDelete(topping)} />
            );
          }) : ""}
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "700" }}>Size</Text>
              <Text style={{ color: "#6495ED" }}>Chỉnh sửa danh mục</Text>
            </View>
            <View style={styles.mealCount}>

              <Text>{isSizeLoad && sizeArray.length} Món</Text>
              <FontAwesome name="angle-down" size={24} color="black" />
            </View>
          </View>
          {isAllLoad === true ? sizeArray.map((size: object) => {
            size.FAD_PRICE = formatCurrency((size.FAD_PRICE as unknown) as number);
            return (
              <FADCard key={size.FAD_ID} url={size.IMAGE_URL} item={size} onEdit={() => handleEdit(size)}
                onDelete={() => handleDelete(size)} />
            );
          }) : ""}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%'

  },
  searchbox: {
    flexDirection: 'row',
    width: '95%',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20, //30
    alignSelf: 'center',
    elevation: 2
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 16,
    color: '#c4c4c4',
  }
  ,

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
  whiteContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  containerItem: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pickMenuHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  paddingTotal: {
    padding: 10,
  }
  ,
  backButton: {
    backgroundColor: '#6495ed',
    width: 30,
    height: 30,
    borderRadius: 15, // Makes the circle perfectly round
    borderCurve: "continuous",
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8, // A bit more opaque to ensure visibility
  },
  menuRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 10,
  },
  mealCount: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  menuContainer: {
    display: "flex",
    gap: 10,
  },
});

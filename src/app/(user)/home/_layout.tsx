import { Stack, Link } from "expo-router"
import { Pressable, View, TextInput, Image, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/constants/Colors"
import DetailProduct from "./[id]"

export default function MenuStack(){
    return (
        <Stack>
          <Stack.Screen
            name="index" 
            options={{
                title: 'Home', 
                headerLeft: () => (<View></View>),
                headerBackVisible: false,
                headerBackButtonMenuEnabled: false, 
                headerRight: () => (
                    <View style={{ 
                      flexDirection: 'row', 
                      marginRight: 15, 
                      justifyContent: "center", 
                      alignItems: "center", 
                      // paddingBottom: 20
                    }}> 
                      <View style={styles.comboSearch}>
                        <TextInput
                          placeholder="Search..."
                          style={styles.inputSearch} 
                        /> 
                        <Link href="/cart" asChild>
                          <Pressable>
                            {({ pressed }) => (
                              <FontAwesome
                                name="search"
                                size={25}
                                color={Colors.light.tint} 
                              />
                            )}
                          </Pressable>
                        </Link> 
                      </View> 
                      <Link href="/home/filter" asChild>
                        <Pressable>
                          {({ pressed }) => ( 
                            <Image
                              source={require('@assets/images/filter_home_2.png')}
                              style={styles.filterIcon}
                            ></Image>
                          )}
                        </Pressable>
                      </Link> 
                      
                    </View>
                ),  
            }}
          />  
          
        </Stack>
    )
}

const styles = StyleSheet.create({
  filterIcon: {
    width: 30,
    height: 30,
    color: 'green', 
  },
  comboSearch:{
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#FBFFC8",
    borderColor: '#89CFF0',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 15,
    width: 200
  },
  inputSearch: { 
    // height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    // marginHorizontal: 5,
    marginRight: 5,
    borderColor: "white",
    borderCurve: 'continuous',
    borderRightColor: "#89CFF0",
    borderWidth: 1,
    width: "80%"
  },
})
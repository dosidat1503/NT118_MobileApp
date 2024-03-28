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
                headerRight: () => (
                    <View style={{ 
                      flexDirection: 'row', 
                      marginRight: 15, 
                      justifyContent: "center", 
                      alignItems: "center",
                      // marginHorizontal: 10
                      paddingBottom: 20
                    }}>
                      {/* <Link href="/cart" asChild>
                        <Pressable>
                          {({ pressed }) => (
                            <FontAwesome
                              name="shopping-cart"
                              size={25}
                              color={Colors.light.tint}
                              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                          )}
                        </Pressable>
                      </Link>  */}
                      <View style={styles.comboSearch}>
                        <TextInput
                          placeholder="Search..."
                          style={styles.inputSearch}
                          // value={searchQuery}
                          // onChangeText={(text) => setSearchQuery(text)}
                        /> 
                        <Link href="/cart" asChild>
                          <Pressable>
                            {({ pressed }) => (
                              <FontAwesome
                                name="search"
                                size={25}
                                color={Colors.light.tint}
                                // style={[styles.buttonSearch, pressed && styles.addStyleButtonSearch]}
                              />
                            )}
                          </Pressable>
                        </Link> 
                      </View>
                      {/* <Link href="/cart" asChild>
                        <Pressable>
                          {({ pressed }) => (
                            <FontAwesome
                              name="search"
                              size={25}
                              color={Colors.light.tint}
                              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                          )}
                        </Pressable>
                      </Link>  */}
                      <Link href="/home/filter" asChild>
                        <Pressable>
                          {({ pressed }) => (
                            // <FontAwesome
                            //   name="bars"
                            //   size={25}
                            //   color={Colors.light.tint}
                            //   style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            // />
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
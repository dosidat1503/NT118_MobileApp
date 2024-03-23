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
                    <View style={{ flexDirection: 'row', marginRight: 15}}>
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
                      <Link href="/cart" asChild>
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
                      </Link> 
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
    
  }
})
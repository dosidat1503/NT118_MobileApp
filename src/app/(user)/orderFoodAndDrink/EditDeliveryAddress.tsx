import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, ScrollView, Pressable, SafeAreaView, TextInput } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { CheckBox } from "react-native-elements";
import Button from "./Button";

export default function EditDeliveryAddress() {
    const { heightScreen, widthScreen, mainColor } = useCartContext();

    const styles = StyleSheet.create({ 
        titleTextForDeliveryContainer: {
            flexDirection: 'row',
            alignItems: "center",
            paddingVertical: heightScreen * 0.009,
            paddingHorizontal: widthScreen * 0.02,
            // width: widthScreen * 0.95,
            borderBottomWidth: 1,
            borderBottomColor: "#89CFF0", 
            // backgroundColor: "white", 
        },
        titleTextForDelivery: {
            fontWeight: "bold",
            fontSize: widthScreen * 0.03, 
            opacity: 0.5, 
        },
        inputTextDivContainer: {
            backgroundColor: "white",
            paddingVertical: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.05,
        },
        inputText: {
            borderWidth: 1,
            borderColor: '#89CFF0',
            borderRadius: widthScreen * 0.05,
            paddingHorizontal: widthScreen * 0.03,
            paddingVertical: heightScreen * 0.008, 
            marginVertical: heightScreen * 0.006,
            opacity: 0.7 
        }, 
    })

    return (
        <SafeAreaView >
            <ScrollView>
                <View style={styles.titleTextForDeliveryContainer}>
                    <FontAwesome5
                        name="map-marker-alt" 
                        style={{
                            opacity: 0.5,
                            marginHorizontal: widthScreen * 0.02,
                            fontSize: widthScreen * 0.04,
                            color: mainColor
                        }}
                    ></FontAwesome5>
                    <Text style={styles.titleTextForDelivery}>Chỉnh sửa thông tin giao hàng</Text>
                </View>
                <View style={styles.inputTextDivContainer}> 
                    <View>
                        <Text style={styles.titleTextForDelivery}>Họ và tên</Text>
                        <TextInput style={styles.inputText}></TextInput>
                    </View>
                    <View>
                        <Text style={styles.titleTextForDelivery}>Số điện thoại</Text>
                        <TextInput style={styles.inputText}></TextInput>
                    </View>
                    <View>
                        <Text style={styles.titleTextForDelivery}>Địa chỉ</Text>
                        <TextInput style={styles.inputText}></TextInput>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={styles.titleTextForDelivery}>Chọn làm địa chỉ mặc định</Text>
                        <CheckBox
                            // checked={item.isCheckedForPayment}
                            onPress={() => {}}
                            containerStyle={{
                                padding: 0,
                                margin: 0,
                            }}
                        />
                    </View>
                    <View  style={{flexDirection: "row", flex: 10, justifyContent: "flex-end", alignSelf: "flex-end"}}>
                        <View style={{flexDirection: "row", flex: 3}}>
                            <Button 
                                iconName="save"
                                buttonName="Lưu"
                                handlePress={() => {}}
                            ></Button>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}
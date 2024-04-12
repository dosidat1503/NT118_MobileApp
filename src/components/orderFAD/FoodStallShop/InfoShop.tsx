import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/ProductListItem";
import { Link } from "expo-router";
import { useNavigation } from '@react-navigation/native'; 

export default function InfoShop({infoShop}: {infoShop: any}) {
    const { heightScreen, widthScreen } = useCartContext();
    
    const heightInfoShop = heightScreen * 0.08; 
    const avatarSize = heightScreen * 0.05;
    const navigation = useNavigation(); 

    const styles = StyleSheet.create({  
        infoShopDivContainer: {
            flexDirection: 'column',
            justifyContent: 'center', 
            alignSelf: "center",
            // overflow: "hidden"
        },
        infoShopContainer: {
            // height: heightInfoShop,
            // width: widthInfoShop,
            flexDirection: 'column',
            // overflow: 'hidden',
            borderWidth: 1, 
            borderColor: "#89CFF0",
            backgroundColor: "white", 
            position: 'relative', 
            top: heightScreen * (-0.03),
            // padding: heightInfoShop * 0.1,
            borderRadius: heightInfoShop * 0.1,
        },  
        infoShopItem: {
            flexDirection: 'row',
            alignItems: "center",
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.02,
            width: widthScreen * 0.65,
            borderBottomWidth: 1,
            borderBottomColor: "#89CFF0"
        },
        avatar: {
            height: avatarSize,
            width: avatarSize,
            borderRadius: avatarSize * 0.5,
            marginLeft: widthScreen * 0.01
        },
        nameShopText: {
            fontWeight: "bold",
            fontSize: heightScreen * 0.018,
            marginLeft: widthScreen * 0.02
        },
        star: {
            color: "yellow",
            fontSize: heightScreen * 0.03,
            paddingHorizontal: widthScreen * 0.03
        },
        reviewText: {
            fontWeight: 500,
            fontSize: heightScreen * 0.019,
            paddingLeft: widthScreen * 0.02,
            opacity: 0.7
        },
        angleRight: {
            paddingLeft: widthScreen * 0.03,
            alignSelf: "center",
            opacity: 0.3,
            fontSize: widthScreen * 0.05
        },
        address: {
            marginHorizontal: widthScreen * 0.03
        }
    })
    return(
    // {/* input search bạn muốn ăn gì */}
        <View style={styles.infoShopDivContainer}>
            <View style={styles.infoShopContainer}>
                {/* avatar & name shop */}
                <View style={styles.infoShopItem}>
                    <Image
                        source={{uri: infoShop.avatar}}
                        style={styles.avatar}
                    />
                    <Text
                        style={styles.nameShopText}
                    >
                        {infoShop.name}
                    </Text>
                </View> 

                {/* rate / review */}
                <Link href="/(user)/orderFoodAndDrink/ReviewShop"> 
                    <View style={styles.infoShopItem}>
                        <FontAwesome
                            name="star"
                            style={styles.star}
                        />
                        <Text
                            style={styles.reviewText}
                        >Đánh giá và nhận xét</Text>
                        <FontAwesome5
                            name="angle-right"
                            style={styles.angleRight}
                        />
                    </View> 
                </Link>

                {/* address shop */}
                <View style={styles.infoShopItem}>
                    <FontAwesome5
                        name="map-marker-alt"
                        style={styles.star}
                    />
                    <Text
                        style={styles.address}
                    >{infoShop.address}</Text>
                </View> 
            </View>
        </View>
    )
}
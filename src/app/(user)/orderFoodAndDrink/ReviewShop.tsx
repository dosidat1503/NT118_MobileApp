import { Link } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { defaultPrizzaImage } from "@/components/PostList";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function ReviewShop() {
    const { heightScreen, widthScreen } = useCartContext();
    
    const heightReviewShop = heightScreen * 0.08; 
    const avatarSize = heightScreen * 0.05;
 
    const stars = []
    

    const styles = StyleSheet.create({  
        reviewShopDivContainer: {
            flexDirection: 'column',
            justifyContent: 'center', 
            alignSelf: "center", 
        },
        reviewShopContainer: { 
            flexDirection: 'column', 
            borderWidth: 1, 
            borderColor: "#89CFF0",
            backgroundColor: "white",   
            borderRadius: heightReviewShop * 0.1,
        },  
        reviewShopItem: {
            flexDirection: 'row',
            alignItems: "center",
            paddingVertical: heightScreen * 0.01,
            paddingHorizontal: widthScreen * 0.07,
            width: widthScreen * 0.95,
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
        },
        star: {
            color: "yellow",
            fontSize: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.005
        },
        reviewText: {
            fontWeight: 500,
            fontSize: heightScreen * 0.019,
            paddingLeft: widthScreen * 0.02,
            opacity: 0.9
        },
        angleRight: {
            paddingLeft: widthScreen * 0.03,
            alignSelf: "center",
            opacity: 0.3,
            fontSize: widthScreen * 0.05
        },
        address: {
            marginHorizontal: widthScreen * 0.03
        },
        starContainer: {
            flexDirection: "row"
        },
        nameAndStarContainer: {
            marginLeft: widthScreen * 0.03
        }
    })
    for(let i = 0; i < 5; i++){
        stars.push(
            <FontAwesome
                name="star"
                style={styles.star}
            /> 
        )
    }  
    return(
        <View style={styles.reviewShopDivContainer}>
            <View style={styles.reviewShopContainer}>
                {/* avatar & name shop */}
                <View style={styles.reviewShopItem}>
                    <Image
                        source={{uri: defaultPrizzaImage}}
                        style={styles.avatar}
                    />
                    <View style={styles.nameAndStarContainer}>
                        <Text
                            style={styles.nameShopText}
                        >
                            Trần thị mỹ xoan
                        </Text>
                        <View style={styles.starContainer}>
                            {stars}
                        </View>
                    </View>
                </View> 

                {/* rate / review */} 
                <View style={styles.reviewShopItem}>
                    <Text
                        style={styles.reviewText}
                    >Đánh giá và nhận xét</Text> 
                </View>   
            </View>
        </View>
    )
}
import { FlatList, StyleSheet} from "react-native";
import InfoListItemFADofShop from "./InfoListItemFADofShop";
import { View } from "@/components/Themed";

export default function InfoListFADofShop({products}) {
    const renderListItemFADofShop = ({item}) => <InfoListItemFADofShop item={item}></InfoListItemFADofShop>

    const styles = StyleSheet.create({
        listContainer: {
            flexDirection: "column", 
            alignSelf: "center"
        }
    })
    return (  
        <FlatList
            data={products}
            renderItem={renderListItemFADofShop}
            numColumns={2}
            showsVerticalScrollIndicator
            style={styles.listContainer}
        ></FlatList> 
    )
}
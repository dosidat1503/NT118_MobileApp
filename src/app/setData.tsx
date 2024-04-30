import { Button, View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { useState } from "react";


export default function setData() {
    const { baseURL } = useCartContext();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSetData = () => {
        console.log("Setting data");
        axios.get(baseURL + "/setData")
        .then((response) => {
            setIsSuccess(true);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <View>
            {/* <Button title="Set Data" onPress={() => handleSetData} /> */}
            <TouchableOpacity onPress={handleSetData}>
                <Text
                    style={{
                        backgroundColor: "green",
                        fontSize: 20,
                        padding: 20,
                        borderWidth: 1,
                        fontWeight: "bold",
                        width: 130,
                        borderRadius: 10,
                    }}
                >Set Data</Text>
            </TouchableOpacity>
            {
                isSuccess && 
                    <Text>Success</Text>
            }
        </View>
    );
}


 import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Platform, Modal } from "react-native"
// import { View } from "@/components/Themed"
// import DatePicker from 'react-native-modern-datepicker' 
import DateTimePicker from '@react-native-community/datetimepicker'
import { FindFilterAtHome } from "@/types"; 
import { useCartContext } from "@/providers.tsx/CartProvider";
import axios from "axios";

export default function SearchPost() {  
    const { baseURL, textQueryPost } = useCartContext();
    useEffect(() => {
        const handleSearch = () => {
            console.log(textQueryPost, "handleSearch")
            axios.get(baseURL + '/searchPost', { params: {textQueryPost: textQueryPost} })
            .then((response) => {
              console.log(response.data, "handleSearch")
              // navigation.navigate('SearchPost')
            })
        }
        handleSearch()
    })

    return (
        <View
            style={ styles.container} 
        >
            <View>
                <Text>SearchPost</Text>
            </View>
            <View>    
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    sortBy: {
        width: '50%'
    },
    chooseTopic: {
        width: '50%',
        flexDirection: 'column',
        alignItems: "center"
    },
    topicIsSelected: {
        borderColor: 'green',
        borderWidth: 1,
    },
    topicIcon: {
        width: 20,
        height: 20,
    },
    chooseTopicItem: {
        flexDirection: 'row',
        paddingHorizontal: '6%',
        paddingVertical: 10,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#6495ED',
        width: '70%',
        marginVertical: 5,
        maxWidth: 300,
        elevation: 40, 

    },
    topicText: {
        fontWeight: 'bold',
        marginLeft: '10%',
        opacity: 0.7
    },
    titleChooseTopic: {
        fontWeight: 'bold',
        opacity: 0.5,
        marginTop: 20,
        marginBottom: 5,
        textAlign: "center"
    },
    sortByIcon: {
        color: '#6495ED',
        width: 20,
        height: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})
 
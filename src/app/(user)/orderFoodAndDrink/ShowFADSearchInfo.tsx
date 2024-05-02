import { View, TextInput, StyleSheet, Text, Animated  } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { FontAwesome5 } from "@expo/vector-icons";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "react-native-elements/dist/config";
import { color } from "react-native-elements/dist/helpers";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { SetStateAction, useRef, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list"; 


export default function ShowFADSearchInfo() {
    const { heightScreen, widthScreen, mainColor } = useCartContext();
    
    const heightSearchFAD = heightScreen * 0.06;
    const widthSearchFAD = widthScreen * 0.7;
    const widthPaddingSearchFAD = widthScreen * 0.04

    const styles = StyleSheet.create({ 
        searchFADIcon: {
            // paddingVertical: "auto",
            alignSelf: 'center',
            paddingHorizontal: widthPaddingSearchFAD,
            backgroundColor: "#89CFF0",
            fontSize: heightScreen * 0.02,
        },
        showFADSearchContainer: {  
            flexDirection: 'row',
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1, 
            borderColor: "#89CFF0",
            // backgroundColor: "#89CFF0",  
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.006,
            marginHorizontal: widthScreen * 0.02,
            marginVertical: heightScreen * 0.006,
        },
        searchFADInput: {
            height: "100%",
            width: "100%",
            backgroundColor: "#FBFFC8",
            color: "red",
            fontSize: heightScreen * 0.02,
            paddingHorizontal: widthScreen * 0.02
        },
        showFADSearchInfoDivContainer: {  
            flexDirection: "column", 
        },
        filterText: {
            paddingRight: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.01,
            fontSize: widthScreen * 0.035,
            fontWeight: "bold",
            color: "#787877",
            // borderWidth: 1,
            borderColor: '#b3b3a8',
            backgroundColor: "white",
            borderRadius: widthScreen * 0.02,
        },
        filterButtonContainer: {
            flexDirection: "row",
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.006,
            backgroundColor: "white",
            borderRadius: widthScreen * 0.02,
            height: heightScreen * 0.06,
        },
        filterIcon: {
            paddingVertical: heightScreen * 0.006,
            paddingHorizontal: widthScreen * 0.02,
            borderWidth: 1,
            borderColor: '#b3b3a8',
            borderRadius: widthScreen * 0.02,
            color: "orange",
            shadowColor: '#000',
            shadowOffset: { width: 5, height: 7 }, 
            shadowOpacity: 0.1, 
            shadowRadius: 10,  
        },
        filterElementDivContainer: {
            backgroundColor: "white",
            borderRadius: widthScreen * 0.02,
            marginHorizontal: widthScreen * 0.02,
        },
        everyFilterElementContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: widthScreen * 0.02,
        }
    })
    const [range, setRange] = useState([20, 180]); // Khoảng giá
    const [showFilterElement, setShowFilterElement] = useState(false); // Hiển thị bộ lọc
 
    const [topicSelectedToPost, setTopicSelectedToPost] = useState("")
  
    const dataToSelectFADType = [
    //   {key:'1', value:'Chọn chủ đề', disabled:true}, 
      {key:'1', value:'Đồ ăn'},
      {key:'2', value:'Nước uống'}, 
    ]
    const dataToSelectDeliveryLocation = [
        //   {key:'1', value:'Chọn chủ đề', disabled:true}, 
        {key:'1', value:'Giao toà'},
        {key:'2', value:'Giao rào'}, 
    ]

    const handleRangeChange = (values: SetStateAction<number[]>) => {
        setRange(values);
    };

    const renderFilterElement = () => {
        const slideAnimaed = useRef(new Animated.Value(0)).current;

        Animated.timing(slideAnimaed, {
            toValue: showFilterElement ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start(); 

        return (
            <Animated.View style={{
                transform: [{ 
                    translateY: slideAnimaed.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0],
                    }) 
                }],
            }}> 
                <View style={styles.filterElementDivContainer}>
                    <View style={styles.everyFilterElementContainer}>
                        <Text style={styles.filterText}>Giá: </Text> 
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
                            <MultiSlider
                                values={[range[0], range[1]]}
                                sliderLength={widthScreen * 0.5}
                                min={0}
                                max={200}
                                step={1}
                                allowOverlap={false}
                                snapped={true}
                                selectedStyle={{
                                    backgroundColor: mainColor,
                                }}
                                    unselectedStyle={{
                                    backgroundColor: 'gray',
                                }}
                                markerStyle={{
                                    backgroundColor: '#b8b6b0',
                                }}
                                onValuesChange={handleRangeChange} 
                            />
                        </View> 
                    </View>
                    <View style={styles.everyFilterElementContainer}> 
                        <Text style={styles.filterText}>Phân loại: </Text> 
                        <SelectList
                            setSelected={setTopicSelectedToPost}
                            data={dataToSelectFADType}
                            placeholder='Chọn chủ đề'
                            defaultOption={dataToSelectFADType[0]}
                            boxStyles={{ 
                                paddingVertical: heightScreen * 0.006,
                                paddingHorizontal: widthScreen * 0.04,
                                borderColor: "#89CFF0",
                                marginBottom: 5,   
                            }}
                            dropdownItemStyles={{
                                paddingVertical: 2
                            }}
                            dropdownStyles={{
                                paddingVertical: 0,
                                marginVertical: 2, 
                                width: widthScreen * 0.4,
                            }} 
                            inputStyles={{
                                width: widthScreen * 0.2, 
                            }} 
                            dropdownTextStyles={{ 
                                // paddingRight: widthScreen * 0.02,
                                // paddingVertical: heightScreen * 0.01,
                                fontSize: widthScreen * 0.035,
                                fontWeight: "bold",
                                color: "#787877",
                                // borderWidth: 1,
                                borderColor: '#b3b3a8',
                                backgroundColor: "white",
                                borderRadius: widthScreen * 0.02,
                            }}
                            search={false}  
                        ></SelectList>
                        
                    </View>
                    <View style={styles.everyFilterElementContainer}>
                        <Text style={styles.filterText}>Vị trí giao: </Text> 
                        <SelectList
                            setSelected={setTopicSelectedToPost}
                            data={dataToSelectDeliveryLocation}
                            placeholder='Chọn chủ đề'
                            defaultOption={dataToSelectDeliveryLocation[0]}
                            boxStyles={{ 
                                paddingVertical: heightScreen * 0.006,
                                paddingHorizontal: widthScreen * 0.04,
                                borderColor: "#89CFF0",
                                marginBottom: 5,   
                            }}
                            dropdownItemStyles={{
                                paddingVertical: 2
                            }}
                            dropdownStyles={{
                                paddingTop: 0,
                                marginTop: 2, 
                                width: widthScreen * 0.4,
                            }} 
                            inputStyles={{
                                width: widthScreen * 0.2, 
                            }} 
                            dropdownTextStyles={{ 
                                // paddingRight: widthScreen * 0.02,
                                // paddingVertical: heightScreen * 0.01,
                                fontSize: widthScreen * 0.035,
                                fontWeight: "bold",
                                color: "#787877",
                                // borderWidth: 1,
                                borderColor: '#b3b3a8',
                                backgroundColor: "white",
                                borderRadius: widthScreen * 0.02,
                            }}
                            search={false}  
                        ></SelectList>
                    </View>
                </View>
            </Animated.View>

        )

    }
  

    return(
    // {/* input search bạn muốn ăn gì */}
        <View style={styles.showFADSearchInfoDivContainer}>
            <View style={styles.showFADSearchContainer}> 
                <View style={styles.filterButtonContainer}>
                    <Text
                        style={styles.filterText}
                    >Bộ lọc</Text>
                    <TouchableOpacity onPress={() => { setShowFilterElement(!showFilterElement) }}>
                        <FontAwesome5 
                            name="filter" 
                            style={styles.filterIcon}
                            size={widthScreen * 0.05}
                        /> 
                    </TouchableOpacity>
                </View>
                {  renderFilterElement() }
            </View>
            <View>

            </View>
        </View>
    )
}
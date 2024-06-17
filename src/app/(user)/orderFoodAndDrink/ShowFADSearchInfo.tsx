import { View, TextInput, StyleSheet, Text, Animated, FlatList  } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { FontAwesome5 } from "@expo/vector-icons";
import { useCartContext } from "@/providers.tsx/CartProvider";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "react-native-elements/dist/config";
import { color } from "react-native-elements/dist/helpers";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list"; 
import Collapsible from 'react-native-collapsible';
import axios from "axios";
import ShowProduct from "@/components/orderFAD/ShowProduct";

export default function ShowFADSearchInfo() {
    const { heightScreen, widthScreen, mainColor, textToSearchFAD, setTextToSearchFAD, baseURL } = useCartContext();
    
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
            flexDirection: 'column',
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1, 
            borderColor: "#89CFF0",
            // backgroundColor: "#89CFF0",  
            paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.006,
            marginHorizontal: widthScreen * 0.02,
            marginVertical: heightScreen * 0.006,
            // width: widthScreen,
            // flexShrink: 1, 
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
            paddingVertical: heightScreen * 0.01,
            backgroundColor: "white",
            borderRadius: widthScreen * 0.02,
            height: heightScreen * 0.06,
            // flex: 2
            width: "27%",
            // marginBottom: heightScreen * 0.007,
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
            marginVertical: heightScreen * 0.006,
            paddingBottom: heightScreen * 0.006
        },
        everyFilterElementContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: widthScreen * 0.02,
        }
    })
    const [range, setRange] = useState([20, 180]); // Khoảng giá
    const [showFilterElement, setShowFilterElement] = useState(false); // Hiển thị bộ lọc
    const [dataHadChosenToFilter, setDataHadChosenToFilter] = useState({
        range: [5, 400],
        FADtype: 0,
        deliveryType: 0,
        sortType: 0,
    });

    const [FADInfo, setFADInfo] = useState<any>({})

    const filterList =  [
        {
            propertyName: "Phân loại:",
            valueList: [
                {
                    key: 1,
                    value: "Đồ ăn"
                },
                {
                    key: 2,
                    value: "Nước uống"
                },
            ]
        },
        {
            propertyName: "Vị trí:",
            valueList: [
                {
                    key: 1,
                    value: "Giao toà"
                },
                {
                    key: 2,
                    value: "Giao rào"
                },
            ]
        },
        {
            propertyName: "Sắp xếp theo:",
            valueList: [
                {
                    key: 1,
                    value: "Bán chạy"
                },
                {
                    key: 2,
                    value: "Mới nhất"
                },
            ]
        },
    ]

    
    useEffect(() => {
        const getFADInfo = async () => {
            let data = {
                textToSearchFAD: textToSearchFAD,
                range: dataHadChosenToFilter.range,
                FADtype: dataHadChosenToFilter.FADtype,
                deliveryType: dataHadChosenToFilter.deliveryType,
                sortType: dataHadChosenToFilter.sortType,
            }
            axios.get(baseURL + '/searchFAD', {params: data})
            .then( (res) => {
                // console.log(res.data, "searchFAD") 
                setFADInfo(res.data)
            })
        }
        getFADInfo()
    }, [])

    const handleRangeChange = (values: number[]) => {
        setDataHadChosenToFilter({...dataHadChosenToFilter, range: values}); 
    };

    const handleChooseValue = (value: string, itemFilter: any) => {
        if(itemFilter.propertyName === filterList[0].propertyName) {
            setDataHadChosenToFilter({...dataHadChosenToFilter, FADtype: parseInt(value)})
        }
        else if(itemFilter.propertyName === filterList[1].propertyName) {
            setDataHadChosenToFilter({...dataHadChosenToFilter, deliveryType: parseInt(value)})
        }
        else if(itemFilter.propertyName === filterList[2].propertyName) {
            setDataHadChosenToFilter({...dataHadChosenToFilter, deliveryType: parseInt(value)})
        }
        console.log(dataHadChosenToFilter, "dataHadChosenToFilter", itemFilter.propertyName)
    }

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
                        <View>
                            <Text style={styles.filterText}>Giá: </Text> 
                        </View>
                        <View style={{ 
                            flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            // height: heightScreen * 0.02,
                            flexDirection: 'row',  
                        }}> 
                            <Text style={styles.filterText}>{dataHadChosenToFilter.range[0]}</Text>
                            <MultiSlider
                                values={[dataHadChosenToFilter.range[0], dataHadChosenToFilter.range[1]]}
                                sliderLength={widthScreen * 0.57}
                                min={5}
                                max={400}
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
                                // touchDimensions={{height: 100,width: 50,borderRadius: 15,slipDisplacement: 200}}
                                // sliderLength={350}
                            />
                            <Text style={[styles.filterText, {marginRight: widthScreen * 0.0001}]}>{dataHadChosenToFilter.range[1]}</Text>
                        </View> 
                    </View>
                    {
                        filterList.map((itemFilter, index) => {
                            return (
                                <View style={styles.everyFilterElementContainer} key={index}>
                                    <Text style={styles.filterText}>{itemFilter.propertyName}</Text>
                                    <SelectList
                                        setSelected={(value: string) => handleChooseValue(value, itemFilter)}
                                        // onSelect={() => {}}
                                        data={itemFilter.valueList}
                                        // placeholder='Chọn chủ đề'
                                        defaultOption={itemFilter.valueList[0]}
                                        boxStyles={{ 
                                            paddingVertical: heightScreen * 0.006,
                                            paddingHorizontal: widthScreen * 0.04,
                                            borderColor: "#89CFF0",
                                            marginBottom: 5,
                                        }}
                                        dropdownItemStyles={{
                                            paddingVertical: 1
                                        }}
                                        dropdownStyles={{
                                            paddingTop: 0,
                                            marginTop: 2, 
                                            marginBottom: heightScreen * 0.01, 
                                            width: widthScreen * 0.4,
                                        }} 
                                        inputStyles={{
                                            width: widthScreen * 0.2, 
                                            fontSize: widthScreen * 0.035,
                                            fontWeight: "bold",
                                            color: "#787877",
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
                            ) 
                        })
                    } 
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
                <Collapsible 
                    collapsed={!showFilterElement} 
                    style={{
                        // marginVertical: heightScreen * 0.01, 
                    }}
                >
                    { renderFilterElement() }
                </Collapsible>
            </View> 
            <FlatList
                data={[]}  // Không có dữ liệu cụ thể cho danh sách này
                renderItem={(item) => null}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <ShowProduct products={FADInfo.FADInfo_eloquent}/>
                } 
            /> 
        </View>
    )
}
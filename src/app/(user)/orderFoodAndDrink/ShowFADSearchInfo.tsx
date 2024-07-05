import { View, TextInput, StyleSheet, Text, Animated, FlatList } from "react-native";
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
import FilterButton from "../home/FilterButton";

export default function ShowFADSearchInfo() {
    const {
        heightScreen,
        widthScreen, mainColor,
        textToSearchFAD, setTextToSearchFAD,
        baseURL, RD,
        dataHadChosenToFilter, setDataHadChosenToFilter,
        tagIDToGetFADInfo, setTagIDToGetFADInfo,
    } = useCartContext();

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
            paddingLeft: widthScreen * 0.02,
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
            // paddingHorizontal: widthScreen * 0.02,
            paddingVertical: heightScreen * 0.006,
            backgroundColor: "white",
            borderRadius: widthScreen * 0.02,
            // height: heightScreen * 0.06,
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
            paddingBottom: heightScreen * 0.006,
            marginBottom: heightScreen * 0.015,
        },
        everyFilterElementContainer: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: widthScreen * 0.02,
        },
        chooseTopic: {
            width: widthScreen * 0.9,
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginLeft: widthScreen * 0.05,
            // borderWidth: 1,

        },
        titleChooseTopic: {
            fontWeight: 'bold',
            opacity: 0.5,
            // marginTop: 20,
            marginBottom: 5,
            textAlign: "center"
        },
        filterListContainer: {
            // width: "100%",
            flexDirection: 'row',
            flexWrap: 'wrap',
            // alignItems: "flex-end", 
            // justifyContent: "center",
            // alignContent: "center",
            // paddingLeft: widthScreen * 0.22,
            // borderWidth: 1,
            // borderColor: "red",
        },
        topicText: {
            fontWeight: 'bold',
            marginLeft: '10%',
            opacity: 0.7,
            width: "80%",
            textAlignVertical: 'center',
        },
        chooseTopicItem: {
            flexDirection: 'row',
            paddingHorizontal: '6%',
            paddingVertical: "7%",
            borderWidth: RD * 0.000003,
            borderRadius: RD * 0.00003,
            borderColor: '#6495ED',
            width: '100%',
            marginVertical: heightScreen * 0.004,
            // maxWidth: 300,
            elevation: 6,
            backgroundColor: 'white',
            textAlign: "left",
            // justifyContent: "center"
        },
        sortByIcon: {
            // color: '#6495ED',
            width: 20,
            height: 20,
        },
        topicIsSelected: {
            borderColor: 'green',
            borderWidth: RD * 0.000007,
        },
    })

    const [showFilterElement, setShowFilterElement] = useState(false); // Hiển thị bộ lọc
    // const [dataHadChosenToFilter, setDataHadChosenToFilter] = useState({
    //     range: [5, 400],
    //     FADtype: 0,
    //     deliveryType: 0,
    //     sortType: 0,
    // });

    const [FADInfo, setFADInfo] = useState<any>({})
    const filterList = [
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
        // {
        //     propertyName: "Vị trí:",
        //     valueList: [
        //         {
        //             key: 1,
        //             value: "Giao toà"
        //         },
        //         {
        //             key: 2,
        //             value: "Giao rào"
        //         },
        //     ]
        // },
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
        getFADInfo()
    }, [])

    const getFADInfo = async () => {
        const startRange = dataHadChosenToFilter.range[0] * 1000;
        const endRange = dataHadChosenToFilter.range[1] * 1000;
        let data = {
            textToSearchFAD: textToSearchFAD,
            range: [startRange, endRange],
            FADtype: dataHadChosenToFilter.FADtype,
            deliveryType: dataHadChosenToFilter.deliveryType,
            sortType: dataHadChosenToFilter.sortType,
            tagIDToGetFADInfo: tagIDToGetFADInfo, // biến này dùng để phân biệt vào trong component này để thực hiện hiển thị thông tin tìm kiếm hay là thông tin của một chủ để món ăn như (cơm, trà sữa, phở lẩu, trà chanh)
        }
        axios.get(baseURL + '/userSearchFAD', { params: data })
            .then((res) => {
                // console.log(res.data.FADInfo_eloquent[2].ORDER_COUNT, "userSearchFAD", data) 
                setFADInfo(res.data)
            })
    }

    const handleRangeChange = (values: number[]) => {
        setDataHadChosenToFilter({ ...dataHadChosenToFilter, range: values });
    };

    const handleChooseValue = (value: string, itemFilter: any) => {
        if (itemFilter.propertyName === filterList[0].propertyName) {
            setDataHadChosenToFilter({ ...dataHadChosenToFilter, FADtype: parseInt(value) })
        }
        else if (itemFilter.propertyName === filterList[1].propertyName) {
            setDataHadChosenToFilter({ ...dataHadChosenToFilter, sortType: parseInt(value) })
        }
        // else if(itemFilter.propertyName === filterList[2].propertyName) {
        //     setDataHadChosenToFilter({...dataHadChosenToFilter, deliveryType: parseInt(value)})
        // }
        console.log(dataHadChosenToFilter, "dataHadChosenToFilter", itemFilter.propertyName)
    }


    const renderFiltersList = (
        item: {
            propertyName: string,
            valueList: {
                key: number,
                value: string
            }[]
        }
    ) => {
        let isSlected = false;
        let isSlectedSortBy = false;
        let mainStyle = {};
        let styleIcon = {};
        let selectedStyle = {};
        return item.valueList.map((itemInList, index) => {
            isSlected = false
            isSlectedSortBy = false
            selectedStyle = {}
            // console.log(itemInList, item, "itemInList, item")
            //Điều chỉnh các thuộc tính trong style cho từng loại bộ lọc là sortBy hay topic
            if (filterList[0].propertyName === item.propertyName) {
                itemInList.key === dataHadChosenToFilter.FADtype ? isSlected = true : isSlected = false
                mainStyle = styles.chooseTopicItem;
                styleIcon = styles.sortByIcon;
                selectedStyle = isSlected && styles.topicIsSelected;
            }
            if (filterList[1].propertyName === item.propertyName) {
                itemInList.key === dataHadChosenToFilter.sortType ? isSlected = true : isSlected = false
                mainStyle = styles.chooseTopicItem;
                styleIcon = styles.sortByIcon;
                selectedStyle = isSlected && styles.topicIsSelected;
                // console.log(itemInList, item, filterList[1].propertyName, dataHadChosenToFilter.sortType, "itemInList, item")
            }

            return (
                <View
                    style={{
                        width: "35%",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                    key={index}
                >
                    {
                        // Nếu là bộ lọc "Sắp xếp theo" và "Chọn chủ đề" thì render ra các item trong list còn "Khoảng thời gian" thì render ra DateTimePicker
                        <TouchableOpacity
                            key={index}
                            style={[mainStyle, selectedStyle]}
                            onPress={() => handleChooseValue(itemInList.key.toString(), item)}
                        >
                            {/* <Image
                                source={itemInList.imagePath}
                                style={styleIcon}
                            ></Image>  */}
                            <Text style={styles.topicText} >
                                {itemInList.value}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            )
        })
    }

    const renderFilterElement = () => {
        const slideAnimaed = useRef(new Animated.Value(0)).current;

        Animated.timing(slideAnimaed, {
            toValue: showFilterElement ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        return (
            // <Animated.View style={{
            //     transform: [{ 
            //         translateY: slideAnimaed.interpolate({
            //             inputRange: [0, 1],
            //             outputRange: [200, 0],
            //         }) 
            //     }],
            // }}> 
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
                        <Text style={[styles.filterText, { marginRight: widthScreen * 0.0001 }]}>{dataHadChosenToFilter.range[1]}</Text>
                    </View>
                </View>
                {
                    // filterList.map((itemFilter, index) => {
                    //     return (
                    //         <View style={styles.everyFilterElementContainer} key={index}>
                    //             <Text style={styles.filterText}>{itemFilter.propertyName}</Text>
                    //             <SelectList
                    //                 setSelected={(value: string) => handleChooseValue(value, itemFilter)}
                    //                 // onSelect={() => {}}
                    //                 data={itemFilter.valueList}
                    //                 // placeholder='Chọn chủ đề'
                    //                 defaultOption={itemFilter.valueList[0]}
                    //                 boxStyles={{ 
                    //                     paddingVertical: heightScreen * 0.006,
                    //                     paddingHorizontal: widthScreen * 0.04,
                    //                     borderColor: "#89CFF0",
                    //                     marginBottom: 5,
                    //                 }}
                    //                 dropdownItemStyles={{
                    //                     paddingVertical: 1
                    //                 }}
                    //                 dropdownStyles={{
                    //                     paddingTop: 0,
                    //                     marginTop: 2, 
                    //                     marginBottom: heightScreen * 0.01, 
                    //                     width: widthScreen * 0.4,
                    //                 }} 
                    //                 inputStyles={{
                    //                     width: widthScreen * 0.2, 
                    //                     fontSize: widthScreen * 0.035,
                    //                     fontWeight: "bold",
                    //                     color: "#787877",
                    //                 }} 
                    //                 dropdownTextStyles={{ 
                    //                     // paddingRight: widthScreen * 0.02,
                    //                     // paddingVertical: heightScreen * 0.01,
                    //                     fontSize: widthScreen * 0.035,
                    //                     fontWeight: "bold",
                    //                     color: "#787877",
                    //                     // borderWidth: 1,
                    //                     borderColor: '#b3b3a8',
                    //                     backgroundColor: "white",
                    //                     borderRadius: widthScreen * 0.02,
                    //                 }}
                    //                 search={false}  
                    //             ></SelectList>
                    //         </View>
                    //     ) 
                    // })
                    filterList.map((item, index) => (
                        <View style={styles.chooseTopic} key={index}>
                            <View>
                                <Text style={styles.titleChooseTopic}>
                                    {item.propertyName}
                                </Text>
                            </View>
                            <View style={styles.filterListContainer}>
                                {renderFiltersList(item)}
                            </View>
                        </View>
                    ))
                }
            </View>
            // </Animated.View> 
        )
    }


    return (
        // {/* input search bạn muốn ăn gì */}
        // <View >



        // </View>
        <FlatList
            data={[]}  // Không có dữ liệu cụ thể cho danh sách này
            renderItem={(item) => null}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
                <View>
                    <View style={styles.showFADSearchContainer}>
                        <View style={styles.filterButtonContainer}>
                            <Text
                                style={styles.filterText}
                            >
                                Bộ lọc
                            </Text>
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
                            {renderFilterElement()}
                            <FilterButton handleReloadPost={getFADInfo}></FilterButton>
                        </Collapsible>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginHorizontal: widthScreen * 0.03,
                        marginTop: heightScreen * 0.01,
                        // position: "relative",
                    }}>
                        <Text >Từ khoá tìm kiếm: </Text>
                        <Text>"{textToSearchFAD}"</Text>
                    </View>
                </View>
            }
            ListFooterComponent={
                <FlatList
                    data={[]}  // Không có dữ liệu cụ thể cho danh sách này
                    renderItem={(item) => null}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <ShowProduct products={FADInfo.FADInfo_eloquent} />
                    }
                />
            }
            style={styles.showFADSearchInfoDivContainer}
        />
    )
}
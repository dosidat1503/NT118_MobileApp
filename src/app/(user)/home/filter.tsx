import index from "@/app";
import { Stack } from "expo-router"
import { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Platform, Modal, Button, Pressable, TextInput, SafeAreaView, ScrollView, Dimensions } from "react-native"
// import { View } from "@/components/Themed"
// import DatePicker from 'react-native-modern-datepicker' 
// import DateTimePicker from '@react-native-community/datetimepicker'
import { FindFilterAtHome } from "@/types";
// import DatePicker from 'react-native-date-picker'
// import DatePicker from '@dietime/react-native-date-picker';
import { useCartContext } from "@/providers.tsx/CartProvider";
import React from "react";
import DatePicker from 'react-native-date-picker';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs'; 
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import FilterButton from "./FilterButton";
import { useSearchPostContext } from "./SearchPostContext";
import { selectedType } from "./SearchPostContext";
 

type FilterProps  = { 
    handleReloadPost: () => void
}

type itemInListProps = { 
    id: number,
    name: string; 
    imagePath: any; 
    isCheckBoxSelected?: boolean;
    isComboBoxSelected?: boolean;
}

type itemInFilterProps = { 
    name: string; 
    list: itemInListProps[]; 
    propertyNameOfSlectedItem?: string; 
}

export const filters = [
    { 
        name: "Sắp xếp theo",
        list: [
            {
                id: 1,
                name: "Mới nhất",
                imagePath: require('@assets/images/newest.png'),
                isCheckBoxSelected: false,
            },
            {
                id: 2,
                name: "Hot",
                imagePath: require('@assets/images/hotest.png'),
                isCheckBoxSelected: false,
            },
        ],
        propertyNameOfSlectedItem: "sortByItem"
    },
    {
        name: "Chọn chủ đề",
        list: [
            {
                id: 1,
                name: "Giải đáp Thắc mắc",
                imagePath: require('@assets/images/replyQuestion.png'),
                isComboBoxSelected: false,
            }, 
            { 
                id: 2,
                name: "Cẩm nang",
                imagePath: require('@assets/images/handbook.png'),
                isComboBoxSelected: false,
            },
            { 
                id: 3,
                name: "Tìm đồ",
                imagePath: require('@assets/images/findItem.png'),
                isComboBoxSelected: false,
            },
            { 
                id: 4,
                name: "Pass đồ",
                imagePath: require('@assets/images/passItem.png'),
                isComboBoxSelected: false,
            },
            { 
                id: 5,
                name: "Việc làm",
                imagePath: require('@assets/images/passItem.png'),
                isComboBoxSelected: false,
            },
            { 
                id: 6,
                name: "Review",
                imagePath: require('@assets/images/passItem.png'),
                isComboBoxSelected: false,
            },
            { 
                id: 7,
                name: "Học tập",
                imagePath: require('@assets/images/passItem.png'),
                isComboBoxSelected: false,
            },
            { 
                id: 8,
                name: "Khác",
                imagePath: require('@assets/images/passItem.png'),
                isComboBoxSelected: false,
            },
        ],
        propertyNameOfSlectedItem: "topicItem"
    },
    {
        name: "Khoảng thời gian",
        list: [ 
            {
                id: 1,
                name: "Giải đáp Thắc mắc",
                imagePath: require('@assets/images/replyQuestion.png'),
                isComboBoxSelected: false,
            }, 
        ]
    } 
]

const Filter = React.memo( ({handleReloadPost}: FilterProps ) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState(""); 
  
    // const { selectedItem, setSelectedItem } = useSearchPostContext();
    const [selectedInFile, setSelectedInFile] = useState<selectedType>({ 
        startDate: "", 
        endDate: "", 
        topicItem: [], 
        sortByItem: undefined 
    })
    
    const widthScreen = Dimensions.get("window").width
    const heightScreen = Dimensions.get("window").height
    const RD = widthScreen * heightScreen 
    const mainColor = "#89CFF0" 
    
    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: widthScreen
        },
        sortBy: {
            width: '50%'
        },
        chooseTopic: {
            width: widthScreen,
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: "center",
            justifyContent: "center"
        },
        topicIsSelected: {
            borderColor: 'green',
            borderWidth: RD * 0.000007,
        },
        topicIcon: {
            width: RD * 0.00007,
            height: RD * 0.00007,
        },
        chooseTopicItem: {
            flexDirection: 'row',
            paddingHorizontal: '6%',
            paddingVertical: "4%",
            borderWidth: RD * 0.000003,
            borderRadius: RD * 0.00003,
            borderColor: '#6495ED',
            width: '70%',
            marginVertical: heightScreen * 0.004,
            // maxWidth: 300,
            elevation: 6, 
            backgroundColor: 'white',
            textAlign: 'center',
            // justifyContent: "center"
        },
        topicText: {
            fontWeight: 'bold',
            marginLeft: '10%',
            opacity: 0.7,
            width: "80%",
            textAlignVertical: 'center',
        },
        titleChooseTopic: {
            fontWeight: 'bold',
            opacity: 0.5,
            marginTop: 20,
            marginBottom: 5,
            textAlign: "center"
        },
        sortByIcon: {
            // color: '#6495ED',
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
                height: 1
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2
        },
        filterIcon: {
          width: RD * 0.00006,
          height: RD * 0.00006,
          color: 'green', 
        },
        applyFilterButtonContainer: { 
            paddingBottom: heightScreen * 0.01, 
            alignItems: 'center',
            borderBottomWidth: 1,
            width: "80%",
            
            marginLeft: "10%",
            borderColor: mainColor, 
            justifyContent: 'space-around',
            flexDirection: 'row',
        },
        applyFilterButtonTouchable: {
            borderColor: mainColor,
            borderRadius: RD * 0.00003,
            borderWidth: 1, 
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: mainColor,
        },
        applyFilterButtonText: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: RD * 0.00004,
        },
        filterListContainer: {
            width: "100%",
            flexDirection: 'row',
            flexWrap: 'wrap',
            // alignItems: "flex-end", 
            justifyContent: "center",
            alignContent: "center",
            // paddingLeft: widthScreen * 0.22
        },
        filterItemContainer: {
            width: "50%", 
            justifyContent: "center", 
            flexDirection: "row"
        },
        containerForDateFilter: { 
            width: widthScreen * 0.7,
            paddingHorizontal: widthScreen * 0.03,
            paddingBottom: heightScreen * 0.05,
        }
    }), [mainColor, heightScreen, widthScreen, RD])
    
    const handleDateChange = useCallback(({ startDate, endDate } : {startDate: any, endDate: any}) => { 
        console.log('handleDateChange')
        const formattedStartDate = startDate ? dayjs(startDate).format('YYYY-MM-DD HH:mm:ss') : null;
        const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD HH:mm:ss') : null;

        setStartDate(startDate);
        setEndDate(endDate);
        console.log(formattedStartDate, formattedEndDate, 'ok', selectedInFile)
        setSelectedInFile({
            ...selectedInFile,
            startDate: formattedStartDate || "",
            endDate: formattedEndDate || ""
        })
    }, [ selectedInFile ])

    // ===== CÁC BỘ LỌC THU NHỎ PHẠM VI HIỂN THỊ BÀI ĐĂNG =====
    // Bộ lọc thay đổi khoảng thời gian 
    // Bộ lọc chọn chủ đề (topic)
    const handleChooseFilterItem = useCallback((item: any, filterType: string | undefined) => {  
        //filterType là sortByItem hoặc topicItem
        console.log('handleChooseFilterItem')
        if(filterType === filters[1].propertyNameOfSlectedItem) 
        {
            // Khi select comboBox Topic thì vào logic này
            if(selectedInFile.topicItem.includes(item))
                setSelectedInFile({
                    ...selectedInFile,
                    topicItem: selectedInFile.topicItem.filter(itemInListSelected => itemInListSelected !== item)
                })
            else
                setSelectedInFile({
                    ...selectedInFile, 
                    topicItem: [...selectedInFile.topicItem, item]
                }) 
        }
        else if(filterType === filters[0].propertyNameOfSlectedItem) 
        { 
            setSelectedInFile({
                ...selectedInFile,
                sortByItem:  item,
            }) 
        }   
        console.log(selectedInFile, 'selectedItemFilter')
    }, [ selectedInFile ])  
    
    const renderFiltersList = useCallback(( item: itemInFilterProps ) => {
        console.log('renderFiltersList')
        let isSlected = false;
        let mainStyle = {};
        let styleIcon = {};
        let selectedStyle = {};
        return item.list.map((itemInList, index) => {
            isSlected = false
            selectedStyle = {}
            // console.log(selectedInFile, 'selectedItem22')
            //Điều chỉnh các thuộc tính trong style cho từng loại bộ lọc là sortBy hay topic
             
            if(filters[0].name === item.name){//sắp xếp theo
                itemInList.id === selectedInFile.sortByItem ? isSlected = true : isSlected = false  
                mainStyle = styles.chooseTopicItem;
                styleIcon = styles.sortByIcon;
                selectedStyle = isSlected && styles.topicIsSelected; 
            }
            else if(filters[1].name === item.name){// chọn chủ đề
                mainStyle = styles.chooseTopicItem;

                isSlected = selectedInFile.topicItem.includes(itemInList.id);
                selectedStyle = isSlected && styles.topicIsSelected;

                styleIcon = styles.topicIcon;
            }
            
            return (
                <View style={ styles.filterItemContainer } key={index}>
                    { 
                        // Nếu là bộ lọc "Sắp xếp theo" và "Chọn chủ đề" thì render ra các item trong list còn "Khoảng thời gian" thì render ra DateTimePicker
                        item.name !== "Khoảng thời gian" 
                        ? <TouchableOpacity
                            key={index}
                            style={[mainStyle, selectedStyle]}
                            onPress={ () => handleChooseFilterItem(itemInList.id, item.propertyNameOfSlectedItem) }
                        > 

                            {
                                itemInList.imagePath && 
                                <Image
                                    source={itemInList.imagePath}
                                    style={styleIcon}
                                ></Image> 
                            }
                            <Text style={ styles.topicText} >
                                {itemInList.name}
                            </Text>   
                        </TouchableOpacity>
                        : <View  style={ styles.containerForDateFilter} >
                            <DateTimePicker
                                height={heightScreen * 0.2}
                                mode="range"
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleDateChange} 
                                maxDate={new Date()}
                            />
                        </View>
                    } 
                </View>
            )
        })
    }, [ handleChooseFilterItem,  handleDateChange])  

    const renderFilterGroup = useCallback(() => filters.map((item, index) => (
            <View style={ styles.chooseTopic } key={ index }> 
                <View> 
                    <Text style={ styles.titleChooseTopic }>
                        {item.name}
                    </Text>
                </View>
                <View style={ styles.filterListContainer }>
                    { renderFiltersList(item) } 
                </View>    
            </View> 
        ))
    , [ selectedInFile ])

    return (
        <SafeAreaView
            style={ styles.container } 
        > 
            <View>
                { renderFilterGroup() }   
                <FilterButton 
                    handleReloadPost={ handleReloadPost } 
                    selectedInFile={ selectedInFile } 
                    setSelectedInFile={ setSelectedInFile }
                ></FilterButton>
            </View>
        </SafeAreaView>
    )
}) 

export default Filter;

 
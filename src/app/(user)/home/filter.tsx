import index from "@/app";
import { Stack } from "expo-router"
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Platform, Modal } from "react-native"
// import { View } from "@/components/Themed"
// import DatePicker from 'react-native-modern-datepicker' 
import DateTimePicker from '@react-native-community/datetimepicker'
import { FindFilterAtHome } from "@/types";

type changeIntervalTimeProps = {
    item: Date,
}
type chooseFilterItemProps = {
    item: never,
    filterType: string,
}

type renderFiltersListProps = {
    item: FindFilterAtHome
}

export const filters = [
    { 
        name: "Sắp xếp theo",
        list: [
            {
                name: "Mới nhất",
                imagePath: require('@assets/images/newest.png')
            },
            {
                name: "Hot",
                imagePath: require('@assets/images/hotest.png')
            },
        ],
        propertyNameOfSlectedItem: "sortByItem"
    },
    {
        name: "Chọn chủ đề",
        list: [
            {
                name: "Giải đáp Thắc mắc",
                imagePath: require('@assets/images/replyQuestion.png')
            }, 
            {
                name: "Cẩm nang",
                imagePath: require('@assets/images/handbook.png')
            },
            {
                name: "Tìm đồ",
                imagePath: require('@assets/images/findItem.png')
            },
            {
                name: "Pass đồ",
                imagePath: require('@assets/images/passItem.png')
            },
        ],
        propertyNameOfSlectedItem: "topicItem"
    },
    {
        name: "Khoảng thời gian",
        list: [
            {
                name: "Từ ngày",
                imagePath: require('@assets/images/schedule.png')
            },
            {
                name: "Đến ngày",
                imagePath: require('@assets/images/schedule.png')
            }
        ]
    } 
]
export default function Filter() {
    const [openCalendar, setOpenCalender] = useState(false) 
    const compareWithFiltersName = {
        sortBy: "Sắp xếp theo",
        topic: "Chọn chủ đề",
        intervalTime: "Khoảng thời gian"
    } 
    
    const [selectedItem, setSelectedItem] = useState({
        topicItem: [],
        sortByItem: '',
        startDate: new Date(),
        endDate: '',
    }) 
    // ===== CÁC BỘ LỌC THU NHỎ PHẠM VI HIỂN THỊ BÀI ĐĂNG =====
    // Bộ lọc thay đổi khoảng thời gian
    const handleChangeIntervalTime = ({item} : changeIntervalTimeProps) => {
        setSelectedItem({
            ...selectedItem,
            startDate: item
        })
    }

    // Bộ lọc chọn chủ đề (topic)
    const handleChooseFilterItem = (item, filterType) => { 
        if(filterType === filters[1].propertyNameOfSlectedItem) 
        {
            // Khi select comboBox Topic thì vào logic này
            if(selectedItem.topicItem.includes(item))
                setSelectedItem({
                    ...selectedItem,
                    topicItem: selectedItem.topicItem.filter(itemInListSelected => itemInListSelected !== item)
                })
            else
                setSelectedItem({
                    ...selectedItem, 
                    topicItem: [...selectedItem.topicItem, item]
                })
             
        }
        else if(filterType === filters[0].propertyNameOfSlectedItem) 
        { 
            setSelectedItem({
                ...selectedItem,
                sortByItem:  item,
            }) 
        }   
    }

    // Bộ lọc chọn khoảng thời gian bài đăng
    const handleOpenCalender = () => {
        setOpenCalender(!openCalendar);
        console.log('ok')
    }
 
    const renderFiltersList = (item) => {
        let isSlected = false;
        let mainStyle = {};
        let styleIcon = {};
        let selectedStyle = {};
        return item.list.map((itemInList, index) => {
            isSlected = false
            selectedStyle = {}
            if(compareWithFiltersName.sortBy === item.name){
                itemInList.name === selectedItem.sortByItem ? isSlected = true : isSlected = false  
                mainStyle = styles.chooseTopicItem;
                styleIcon = styles.sortByIcon;
                selectedStyle = isSlected && styles.topicIsSelected; 
            }
            else if(compareWithFiltersName.topic === item.name){
                mainStyle = styles.chooseTopicItem;

                isSlected = selectedItem.topicItem.includes(itemInList.name);
                selectedStyle = isSlected && styles.topicIsSelected;

                styleIcon = styles.topicIcon;
            }
            else if(compareWithFiltersName.intervalTime === item.name){
                mainStyle = styles.chooseTopicItem;
            }
            console.log(item.name, compareWithFiltersName.intervalTime, 'ok999')
            return (
                <TouchableOpacity
                    key={index}
                    style={[mainStyle, selectedStyle]}
                    onPress={
                        item.name === compareWithFiltersName.intervalTime
                        ? () => handleOpenCalender() 
                        : () => handleChooseFilterItem(itemInList.name, item.propertyNameOfSlectedItem)
                    }
                > 
                        <Image
                            source={itemInList.imagePath}
                            style={styleIcon}
                        ></Image>
                        {
                            item.name !== compareWithFiltersName.intervalTime
                                ?(
                                    <Text
                                        style={ styles.topicText}
                                    >{itemInList.name}</Text>  
                                )
                                :(
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={openCalendar}
                                    >
                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView}>
                                                <DateTimePicker
                                                    mode="date"
                                                    value={selectedItem.startDate}
                                                    onChange={handleChangeIntervalTime}
                                                ></DateTimePicker>
                                            </View>
                                        </View>
                                    </Modal>
                                )
                        }
                        
                </TouchableOpacity>
            )
        })
    }

    return (
        <View
            style={ styles.container } 
        >
            <Stack.Screen
                options={{
                    title: "Bộ lọc"
                }}
            ></Stack.Screen>
            {
                filters.map(item => (
                    <View style={ styles.chooseTopic }>
                        <Text style={ styles.titleChooseTopic }>
                            {item.name}
                        </Text>
                        {renderFiltersList(item)}
                    </View> 
                ))
            } 
            {/* <View style={styles.modalView}>
                <DateTimePicker
                    mode="date"
                    value={selectedItem.startDate}
                    onChange={handleChangeIntervalTime}
                ></DateTimePicker>
            </View> */}
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


                        // item.name !== compareWithFiltersName.intervalTime
                        //     ?  
                        
                            // : (
                                // <Modal
                                //     animationType="slide"
                                //     transparent={true}
                                //     visible={openCalendar}
                                // >
                                //     <View style={styles.centeredView}>
                                //         <View style={styles.modalView}>
                                //             <DateTimePicker
                                //                 mode='time'
                                //                 value={selectedItem.startDate}
                                //                 onDateChanged={handleChangeIntervalTime}
                                //             ></DateTimePicker>
                                //         </View>
                                //     </View>
                                // </Modal>
                            // ) 
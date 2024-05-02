import index from "@/app";
import { Stack } from "expo-router"
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text, Platform, Modal, Button, Pressable, TextInput } from "react-native"
// import { View } from "@/components/Themed"
// import DatePicker from 'react-native-modern-datepicker' 
import DateTimePicker from '@react-native-community/datetimepicker'
import { FindFilterAtHome } from "@/types";
// import DatePicker from 'react-native-date-picker'
import DatePicker from '@dietime/react-native-date-picker';
import { useCartContext } from "@/providers.tsx/CartProvider";

type changeIntervalTimeProps = {
    item: Date,
    index: number
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
                imagePath: require('@assets/images/newest.png'),
                isCheckBoxSelected: false,
            },
            {
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
                name: "Giải đáp Thắc mắc",
                imagePath: require('@assets/images/replyQuestion.png'),
                isComboBoxSelected: false,
            }, 
            {
                name: "Cẩm nang",
                imagePath: require('@assets/images/handbook.png'),
                isComboBoxSelected: false,
            },
            {
                name: "Tìm đồ",
                imagePath: require('@assets/images/findItem.png'),
                isComboBoxSelected: false,
            },
            {
                name: "Pass đồ",
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
                name: "Từ ngày",// khi đổi tên mặc định thì nhớ nó còn có ảnh hưởng ở việc nhập
                imagePath: require('@assets/images/schedule.png'),
                dateChoosed: new Date(),
                dateForSaveAndShow: ""
            },
            {
                name: "Đến ngày",
                imagePath: require('@assets/images/schedule.png'),
                dateChoosed: new Date(),
                dateForSaveAndShow: ""
            }
        ]
    } 
]
export default function Filter() {
    const { mainColor, heightScreen, widthScreen } = useCartContext();
    const [openCalendar, setOpenCalender] = useState(false) 
    const compareWithFiltersName = {
        sortBy: "Sắp xếp theo",
        topic: "Chọn chủ đề",
        intervalTime: "Khoảng thời gian",
        startDate: "Từ ngày",
        endDate: "Đến ngày"
    } 
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    
    const [selectedItem, setSelectedItem] = useState({
        topicItem: [],
        sortByItem: '',
        startDate: new Date(),
        endDate: new Date(),
        startDateForSaveAndShow: "",
        endDateForSaveAndShow: "",
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
    const handleChooseFilterItem = (item: any, filterType: string | undefined) => { 
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

    useEffect(() => { 
        const month = selectedItem.startDate.getMonth() + 1
        const concatDate = selectedItem.startDate.getDate()  + "/" + month + "/" +  selectedItem.startDate.getFullYear()
        setSelectedItem({
            ...selectedItem,
            startDateForSaveAndShow: concatDate
        })
        console.log(selectedItem.startDate, selectedItem.endDate, 'startday endDate')
    }, [selectedItem.startDate])

    useEffect(() => {  
        const month = selectedItem.endDate.getMonth() + 1
        const concatDate = selectedItem.endDate.getDay()  + "/" + month + "/" +  selectedItem.endDate.getFullYear()
        setSelectedItem({
            ...selectedItem,
            endDateForSaveAndShow: concatDate
        })
        console.log(selectedItem.endDate, 'endDate')
    }, [selectedItem.endDate])
 
    const renderFiltersList = (item: { name: string; list: { name: string; imagePath: any; }[]; propertyNameOfSlectedItem: string; } | { name: string; list: { name: string; imagePath: any; }[]; propertyNameOfSlectedItem?: undefined; }) => {
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
            console.log(
                item.name, 
                compareWithFiltersName.intervalTime, 
                itemInList.name === compareWithFiltersName.startDate,
                itemInList.name,
                compareWithFiltersName.startDate,
                'ok999'
            )
            return (
                <View style={{width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    {item.name === "Khoảng thời gian" 
                        && <View style={{ alignSelf: "flex-start", marginLeft: "15%", opacity: 0.6 }}>
                                <Text>
                                    {itemInList.name}
                                </Text>
                            </View>}
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
                            ? (
                                <Text
                                    style={ styles.topicText}
                                >
                                    {itemInList.name}
                                </Text>  
                            )
                            : ( 
                                <View>
                                    <View>
                                        <View> 
                                            <Text>
                                                { 
                                                    selectedItem.startDateForSaveAndShow
                                                }
                                            </Text>
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={openCalendar} 
                                            >
                                                <View style={styles.centeredView}>
                                                    <View style={styles.modalView}>
                                                        <DatePicker
                                                            value={ selectedItem.startDate  }
                                                            onChange={ (value) => setSelectedItem({ ...selectedItem, startDate: value }) }
                                                            format="dd-mm-yyyy"
                                                            fadeColor={mainColor}
                                                            markHeight={heightScreen * 0.05}
                                                            height={heightScreen * 0.2}
                                                        />
                                                    </View>
                                                </View> 
                                            </Modal>
                                        </View>  
                                    </View>  
                                </View>
                            )
                        }
                            
                    </TouchableOpacity>
                </View>
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
            {/* <View
                style={{ marginTop: heightScreen * 0.4, backgroundColor: mainColor }}
            >
                <TouchableOpacity
                    onPress={() => { setOpenCalender(false)}} 
                > 
                    <Text>áp dụng</Text>
                </TouchableOpacity>
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
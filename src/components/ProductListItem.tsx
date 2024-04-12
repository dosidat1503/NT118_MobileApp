import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'; 
import { Product } from '../types';
import { Link, useSegments } from 'expo-router'; 
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';


export const defaultPrizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/extravaganzza.png'

type ProductListItemProps = {
    product: Product,
    segments: []
}

const ProductListItem = ({product} : ProductListItemProps) => {
  const segments = useSegments()
  return ( 
      <View style={styles.container}>
        <View style={ styles.postHeader }> 
          <View style={ styles.postHeaderLeft }>
            <Image
              style={ styles.image_avatar }
              source={{ uri: defaultPrizzaImage}} 
            ></Image>  
            <View style={styles.postHeaderCenter}>
              <Text style={styles.postHeaderCenterName} >Đỗ Sĩ Đạt</Text>
              <Text style={styles.postHeaderCenterTime} >20:30 17/03/2024</Text>
            </View>
          </View> 
          
          <FontAwesome5 name='bookmark' size={30} ></FontAwesome5>
        </View>
        {/* <Link 
          href={`${segments[0]}/menu/${product.id}`}  
          asChild
        >
          <Pressable style={styles.container}> */}
        <View style={styles.postContent}>
          <View style={styles.postContentText}>
            <Text>
              Mùa thu hoa nở, hạ tàn. 
              Lòng anh nao nức đợi nàng đến chơi, 
              Làm việc chăm chỉ chẳng nghỉ ngơi, 
            </Text>
          </View>
          <View style={styles.postContentContainImage}>
            <Image 
              style={styles.postContentImage} 
              source={{uri: defaultPrizzaImage }} 
            ></Image>
          </View>
        </View>
          {/* </Pressable>
        </Link> */}
        <View style={styles.postFooter}>
          <FontAwesome5 name='heart' style={styles.postFooterIcon}></FontAwesome5>
        </View>
      </View>  
  );
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden'
  },
  title: { 
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  }, 
  postContentImage: {
    maxWidth: '100%',
    maxHeight: 500,
    aspectRatio: 1,
  }, 
  createPost: { 
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'flex-start' 
  },
  image_avatar: {
    maxWidth: '100%',
    maxHeight: '100%',
    aspectRatio: 1,
    borderRadius: 100, 
  },
  postHeaderCenter: {
    flexDirection: "column",
    justifyContent: 'flex-start',
    paddingLeft: 20
  },
  postHeaderLeft: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around'
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  postHeaderCenterName: {
    fontWeight: '700',
    fontSize: 16
  },
  postHeaderCenterTime: {
    opacity: 0.7
  },
  postContent: {
    height: 500,
    
  },
  postContentText: {
    paddingHorizontal: 15,
    paddingVertical: 5,

  },
  postContentContainImage: {
    
  },
  postFooter: {
    paddingVertical: 10,
    paddingHorizontal: 15, 
    // marginTop: 45,
  },
  postFooterIcon: {
    fontSize: 30
  },

});

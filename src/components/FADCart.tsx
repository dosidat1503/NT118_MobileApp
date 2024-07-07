import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import React
  from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FADCardProps {
  url: string;
  item: {
    FAD_ID: number,
    FAD_NAME: string,
    FAD_PRICE: number,
    DESCRIPTION: string
  },
  onEdit: () => void,
  onDelete: () => void,
}

const FADCard = ({ url, item, onEdit, onDelete }: FADCardProps) => {
  return (
    <View style={styles.itemView}>
      <Image source={{ uri: url }} style={styles.itemImage} />
      <View style={styles.nameView}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{item.FAD_NAME}</Text>
          <Text style={styles.descText}>{item.DESCRIPTION}</Text>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>{item.FAD_PRICE}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => { onEdit() }} style={styles.button}>
            <FontAwesome5 name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onDelete() }} style={styles.button}>
            <FontAwesome5 name="trash" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default FADCard;


const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 5,
    borderRadius: 10,
    height: 100,
    marginBottom: 10
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  textContainer: {
    width: '80%',
  },
  buttonContainer: {
    width: '20%',
    flexDirection: 'column',
    gap: 20,
    verticalAlign: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 5,
  },
  priceView: {
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#464646'
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#252525'
  },
  priceText: {
    fontSize: 18,
    color: '#098bd2',
    fontWeight: '700',
  },
  icon: {
    width: 24,
    height: 24
  }
});

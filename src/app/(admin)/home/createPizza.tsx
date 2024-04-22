import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';  
import { Text, View, Image } from 'react-native';
import { defaultPrizzaImage } from '@/components/ProductListItem';
import { Stack } from 'expo-router';
import Button from '@/components/Button';
import * as ImagePicker from 'expo-image-picker'

export default function ModalScreen() {
    // const [pizzaItem, setPizzaItem] = useState({
    //     name: '',
    //     price: 0,
    // })
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState<string | null>(null)

    const resetInput = () => {
      setError('')
      setName('')
      setPrice('')
    }
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const validateInput = () => {
      if(name === '') {
        setError('Input Name, please!!')
        return false;
      }
      else if(price === '') {
        setError('Input Price, please!!')
        return false;
      }
      return true;
    }
    const createPizza = () => {
      if(!validateInput()) return

      resetInput();
    }

    return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Create Pizza'
        }}
      />
        <Image 
          source={{ uri: image || defaultPrizzaImage}}
          style={styles.image}
        ></Image>
        <Button
          text='Select a image'
          onPress={pickImage}
        ></Button>
        <Text style={styles.label}>Name</Text> 
        <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder='type name Pizza'
        ></TextInput> 

        <Text style={styles.label}>Price</Text>  
        <TextInput
            value={price} 
            onChangeText={setPrice}
            style={styles.input}
            placeholder='type price Pizza' 
        ></TextInput>
        <Text style={styles.error}>{error}</Text>
        <Button 
          text='Create'
          onPress={createPizza}
          style={styles.buttonCreate}
        ></Button>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    textDecorationLine: 'none',
    textDecorationColor: 'none'
  },
  image: {
    width: '50%',
    aspectRatio: 1,
  },
  error: {
    color: 'red'
  },
  buttonCreate: {
    color: 'white',
    marginVertical: 10
  }
});

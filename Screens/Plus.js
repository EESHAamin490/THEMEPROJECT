import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Header from './Header';
import {URL} from '../config';
export default function Plusfun({navigation}) {
  const [imageUri, setImageUri] = useState('');
  const [data, setData] = useState({
    caption: '',
  });
  const {caption} = data;
  const onChange = (name, value) => {
    setData(prevState => ({...prevState, [name]: value}));
  };
  console.log(data);
  const getTokenFromStorage = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      return user;
    } catch (error) {
      return null;
    }
  };
  const formSubmit = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const formData = new FormData();
    formData.append('post', {
      name: formattedDate + '_post',
      uri: imageUri.uri,
      type: 'image/jpg',
    });
    formData.append('caption', data.caption);
    const user = await getTokenFromStorage();
    await axios
      .post(`${URL}/auth/user/post/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        Alert.alert('Successful', JSON.stringify(res.data), [
          {text: 'OK'},
        ]);
      })
      .catch(err => console.error(err));
  };
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };
  const pickImage = async () => {
    const res = await launchImageLibrary(options);
    setImageUri(res.assets[0]);
  };

  return (
    <View style={{backgroundColor: '#212E52', flex: 1}}>
      <View style={{flexDirection:"row"}}>
      <Header />
      </View>
      <Text style={styles.button1}>ADD POST</Text>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
          }}>
          <View
            style={{
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <View
              style={{
                width: '100%',
                aspectRatio: 1, // Ensures the container is a square
                backgroundColor: '#e1e1e1',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderWidth: 5,
                borderColor: '#fff',
              }}>
              {imageUri.uri ? (
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={{uri: imageUri.uri}}
                />
              ) : (
                <Text>Upload an Image</Text>
              )}
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Write Something Here"
            name="caption"
            value={caption}
            onChangeText={value => onChange('caption', value)}
          />
          <View style={{flexDirection:"row"}}>
          <Icon
                name="cloud-upload-outline"
                size={25}
                color={'white'}
                title="Add Photo"
                style={{marginLeft: 10}}
              />
              <TouchableOpacity onPress={() => pickImage()}>
              <Text style={{color: 'white', marginLeft: 15}}>Add Photo</Text>
          </TouchableOpacity>
          <Icon
                name="pricetags-outline"
                size={25}
                color={'white'}
                title="Add Photo"
                style={{marginLeft: 90}}
              />
              <TouchableOpacity>
              <Text style={{color: 'white', marginLeft: 15}}>Add Tags</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
      <TouchableOpacity style={styles.button}  onPress={()=> navigation.navigate('Discover')}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={formSubmit}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
    </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  button3: {
    marginLeft:120,
    margin:70,
    backgroundColor: '#D0D3D4',
        padding: 10,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
  },
  container: {
    marginTop:79,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#F0F3F4',
    padding: 10,
    borderRadius: 5,
    width: '48%', // Adjust the width as needed
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button1: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: '#D0D3D4',
        padding: 10,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
  },
  input: {
    height: 40,
    width:350,
    backgroundColor: 'white',
    borderRadius: 90,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 16,
    paddingHorizontal: 8,
  },
});

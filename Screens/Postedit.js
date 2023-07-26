import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Header from './Header';
const COLORS = { primary: '#212E52', white: '#fff' };
import { Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../config';
import { useRoute } from '@react-navigation/native';
const EditCaptionScreen = ({ navigation }) => {
  const route = useRoute();
  const { postId, postcaption } = route.params;

  const [data, setData] = useState({ caption: '' });
  const onChange = (name, value) => {
    setData(prevState => ({ ...prevState, [name]: value }));
  };
  const { caption } = data;
  const updatePost = async ({ postId }) => {
    console.log(user)
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    console.log(user._id);


    const response = await axios.put(
      `${URL}/auth/user/post/${postId}`,
      data,
      {
        headers: {

          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    ).then(res => {
      console.log(res.data)
      Alert.alert('Successful Updated', JSON.stringify(res.data.firstName), [
        { text: 'OK' },
      ]);
    })
      .catch(err => console.error(err));
  };
  console.log(data);
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.headerpost}>Edit Posts</Text>
      <Divider />
      <TextInput
        style={styles.captionInput}
        value={caption}
        onChangeText={value => onChange('caption', value)}
        placeholder="Enter caption"
        placeholderTextColor="#999"
        multiline
      />
      <View style={styles.container1}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Discover')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={updatePost}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,

    backgroundColor: COLORS.primary,
  },
  container1: {
    marginTop: 79,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  captionInput: {
    height: 150,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 20,
  },
  headerpost: {
    color: 'white',
    marginStart: 30,
    marginBottom: 50,
    fontWeight: 'bold',
    fontSize: 25,
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
    fontSize: 20,
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
});

export default EditCaptionScreen;

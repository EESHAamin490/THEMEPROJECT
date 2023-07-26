import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Background from './Background';
import Field from './Filed';
import {URL} from '../config';
import Relationship from './AfterLogin/Relationship';

const Createusername = props => {
  const [formData, setFormData] = useState({
    username: '',
  });
  const {username} = formData;
  console.log(formData);
  const onChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };

  useEffect(() => {}, []);

  const formSubmit = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    console.log(user._id);

    await axios
      .put(`${URL}/auth/user/addUsername/${user._id}`, formData, {
        headers: {Authorization: `Bearer ${user.token}`},
      })

      .then(response => {
        console.log(response.data);
        <Relationship id={user._id} token={user.token} />;
        props.navigation.navigate('relation');
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View>
      <Background>
        <View style={{alignItems: 'center', width: 460}}>
          <Text
            style={{
              color: 'white',
              fontSize: 44,
              fontWeight: 'bold',
              marginVertical: 60,
            }}></Text>
          <View
            style={{
              backgroundColor: '#e6e6e6',
              height: 700,
              width: 450,
              borderTopLeftRadius: 70,
              paddingRight: 60,
              paddingTop: 80,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 30, color: '#212E52', fontWeight: 'bold'}}>
              Create Your Username
            </Text>

            <Field
              placeholder=" UserName"
              name="username"
              value={username}
              onChangeText={value => onChange('username', value)}
            />
            <Text style={{padding: 25, color: 'black'}}>
              {' '}
              Yes, I agree that war on cancer may process special categories of
              personal data bout me in order to proviide the service(app) and
              functionalities terin, We will not share any of your personal data
              with any third party providers given your explicit consent,You can
              always withdraw your const by deleting your account.
            </Text>
            <View
              style={{
                alignItems: 'center',
                width: '78%',
                margin: 50,
                paddingRight: 36,
                marginBottom: 100,
                paddingBottom: 100,
              }}>
              <Button
                title="Allow and Continue"
                color="#212E52"
                onPress={formSubmit}
              />
            </View>
          </View>
        </View>
      </Background>
    </View>
  );
};
export default Createusername;
const styles = StyleSheet.create({});

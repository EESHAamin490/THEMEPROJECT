import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import Btn from '..//Btn';
import Background from '..//..//Components/BackgroundAdmin';
import Field from '..//Filed';
import axios from 'axios';
import { URL } from '../../config';
const AdminLogin = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = formData;
  console.log(formData);
  const onChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };
  const formSubmit = () => {
    axios
      .post(`${URL}/auth/admin/login`, {email, password})
      .then(response => {
        console.log(response.data.token);
        //aync storage store token
        AsyncStorage.setItem('token', JSON.stringify(response.data))
          .then(() => console.log('Token stored successfully.'))
          .catch(error => console.log('Error storing token:', error));
        props.navigation.navigate('users');
      })
      .catch(error => {
        console.log('login failed', error);
      });
  };
  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 44,
            fontWeight: 'bold',
            marginVertical: 90,
          }}></Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 90,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 40,
              color: '#212E52',
              fontWeight: 'bold',
              marginEnd: 50,
            }}>
            Welcome Admin
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field
            placeholder="Email / Username"
            name="email"
            value={email}
            onChangeText={value => onChange('email', value)}
            keyboardType={'email-address'}
          />
          <Field
            placeholder="Password"
            name="password"
            value={password}
            onChangeText={value => onChange('password', value)}
            secureTextEntry={true}
          />
          <View
            style={{
              alignItems: 'center',
              width: '78%',
              paddingRight: 36,
              marginBottom: 200,
            }}>
            <Button
              title="  Login  "
              color="#212E52"
              onPress={formSubmit}
            />
          </View>
        </View>
      </View>
    </Background>
  );
};

export default AdminLogin;

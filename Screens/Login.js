import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import Btn from './Btn';
import Background from './Background';
import Field from './Filed';
import axios from 'axios';
import { URL } from '../config';

const Login = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = formData;
  console.log(formData);
  const onChange = (name, value) => {
    setFormData(prevState => ({...prevState, [name]: value}));
  };
  const formSubmit = async() => {
    await axios
      .post(`${URL}/auth/user/login`,formData)
      .then(response => {
        console.log(response.data.token);
        //aync storage store token 
        AsyncStorage.setItem('user',JSON.stringify( response.data))
        .then(() => console.log('User stored successfully.'))
        .catch(error => console.log('Error storing token:', error));
        props.navigation.navigate('createusername');
      })
      .catch(error => {
        
        console.log('login failed', error);
      });
  };
  // AsyncStorage.getItem('token')
  // .then(token => console.log('Retrieved token:', token))
  // .catch(error => console.log('Error retrieving token:', error));

  return (
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
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 90,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: '#212E52', fontWeight: 'bold'}}>
            Welcome Back
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
            <Button title="login" color="#212E52" onPress={formSubmit} />
            <Text style={{color: '#212E52', fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Don't have an account ?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Signup')}>
                <Text
                  style={{color: '#212E52', fontWeight: 'bold', fontSize: 16}}>
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Login;

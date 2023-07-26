import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Background from '../../Components/Backgroundrelation';
import Icon from 'react-native-vector-icons/Ionicons';
import {URL} from '../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Relationship = props => {
  const [data, setData] = useState([{}]);
  const [formData, setFormData] = useState({
    relation: '',
  });
  const {relation} = formData;
  const [update, setUpdate] = useState({});
  const response = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (update.relation == 'Diagnose') {
      console.log('Diagnose');
      await axios
        .put(`${URL}/auth/user/addRelation/${user._id}`, update, {
          headers: {Authorization: `Bearer ${user.token}`},
        })
        .then(response => {
          console.log('relation Added  ' + update.relation);
        })
        .catch(error => {
          console.log(error);
        });
    } else if (update.relation == 'Family') {
      console.log('Family');
      await axios
        .put(`${URL}/auth/user/addRelation/${user._id}`, update, {
          headers: {Authorization: `Bearer ${user.token}`},
        })
        .then(response => {
          console.log('relation Added  ' + update.relation);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('error');
    }
  };
  response();
  useEffect(() => {}, []);
  return (
    <Background>
      <View style={{alignItems: 'center', width: 460, height: 200}}>
        <Text
          style={{
            color: 'white',
            fontSize: 45,
            fontWeight: 'bold',
            marginVertical: 10,
            paddingTop: 105,
          }}>
          Relationship
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: 700,
          width: 400,
          borderTopLeftRadius: 130,
          paddingTop: 100,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 35,
            color: '#212E52',
            fontWeight: 'bold',
            paddingRight: 20,
            marginBottom: 20,
          }}>
          What's brought you here?
        </Text>

        <TouchableOpacity
          style={{
            width: '85%',
            height: 60,
            borderBottomWidth: 0.2,
            borderBottomColor: 'grey',
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'row',
          }}
          onPress={() => setUpdate({relation: 'Diagnose'})}
          // onPress={() => props.navigation.navigate("diagnose")}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Icon name="analytics-outline" size={25} color={'#212E52'} />
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                paddingLeft: 5,
                paddingTop: 8,
              }}>
              I have been Diagnose
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '85%',
            height: 50,
            borderBottomWidth: 0.2,
            borderBottomColor: 'grey',
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'row',
          }}
          onPress={() => setUpdate({relation: 'Family'})}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Icon name="heart" size={25} color={'#212E52'} />

            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                paddingTop: 8,
              }}>
              I am friend or family
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={25} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 100}}>
          <Icon name="chevron-back-outline" size={25} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TabScreens')}>
            <Text
              style={{
                color: '#212E52',
                fontWeight: 'bold',
                fontSize: 16,
                marginStart: 0,
              }}>
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('diagnose')}>
            <Text
              style={{
                color: '#212E52',
                fontWeight: 'bold',
                fontSize: 16,
                marginStart: 120,
              }}>
              Next
            </Text>
          </TouchableOpacity>
          <Icon name="chevron-forward-outline" size={15} />
        </View>
      </View>
    </Background>
  );
};
export default Relationship;

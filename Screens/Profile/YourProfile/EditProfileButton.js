import React from 'react';
import {View, Text,TouchableOpacity,} from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
export default function EditProfileButton( ) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Editprofile')}>
      <View style={{marginTop: 10}}>
        <View
          style={{
            height: 30,
            borderRadius: 5,
            marginStart: 10,
            marginEnd: 10,
            backgroundColor: '#212E52',
            justifyContent: 'center',
            borderColor: 'white',
            borderWidth: 1,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Edit Profile</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
   
    
  );
}

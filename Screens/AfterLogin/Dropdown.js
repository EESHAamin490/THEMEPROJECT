import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL} from '../../config';
import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';

function Dropdown() {
  const [selectdiagnose, setselecteddiagnose] = useState('diagnose');
  const [update, setUpdate] = useState();
  const [isselected, setisselected] = useState(false);
  const [data, setdata] = useState(diagnoseType);
  const searchRef = useRef();
  const onSearch = text => {
    if (text !== '') {
      let tempData = data.filter(item => {
        return item.cancerType.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setdata(tempData);
    } else {
      setdata(diagnoseType);
    }
  };
  console.log(selectdiagnose);
  const response = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user) {
      await axios
        .put(`${URL}/auth/user/addDiagnose/${user._id}`, selectdiagnose, {
          headers: {Authorization: `Bearer ${user.token}`},
        })
        .then(response => {
          console.log('Diagnose Added  ' + selectdiagnose);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('error');
    }
  };
  return (
    <View style={{flex: 1}}>
     
    </View>
  );
}
export default Dropdown;

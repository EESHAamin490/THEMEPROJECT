import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import Background from '../../Components/BackgroundDiagnose';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL} from '../../config';

const diagnoseType = [
  {cancerType: 'Blood Cancer', number: 1},
  {cancerType: 'Heart Cancer', number: 2},
  {cancerType: 'Brain Cancer', number: 3},
  {cancerType: 'Lungs Cancer', number: 4},
];

function Diagnose(props) {
  const [diagnose, setDiagnose] = useState('Select a Diagnose');
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
  const response = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user) {
      await axios
        .put(`${URL}/auth/user/addDiagnose/${user._id}`, update, {
          headers: {Authorization: `Bearer ${user.token}`},
        })
        .then(response => {
          console.log('Diagnose Added  ' + update.diagnose);
          props.navigation.navigate('TabScreens');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('error');
    }
  };

  return (
    <Background>
      <View style={{alignItems: 'center', width: 460}}>
        <Text
          style={{
            color: 'white',
            fontSize: 45,
            fontWeight: 'bold',
            marginStart: 50,
            paddingTop: 100,
          }}>
          Diagnose
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
            fontSize: 30,
            color: '#212E52',
            fontWeight: 'bold',
            paddingRight: 20,
            marginBottom: 20,
          }}>
          What's Your Diagnosis?
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: 20,
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          Life's better with people who get it.Fill in your cancer type to
          connect with people and content that catch your drift.
        </Text>
        <View style={{width: 400, height: 100}}>
          <View>
            <Text
              style={{
                color: '#212E52',
                fontWeight: '700',
                paddingLeft: 15,
                paddingTop: 15,
                fontSize: 20,
              }}>
              Diagnosis
            </Text>
            <TouchableOpacity
              style={{
                width: '90%',
                height: 50,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'grey',
                alignSelf: 'center',
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => {
                setisselected(!isselected);
              }}>
              <Text style={{color: '#212E52'}}>{diagnose}</Text>
              {isselected ? (
                <Image
                  style={{width: 24, height: 24}}
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYQGXJeBMGQc8td1TRLXkhk07Htmlc-BWQmIQ2jf_4Cg&s',
                  }}
                />
              ) : (
                <Image
                  style={{width: 24, height: 24}}
                  source={{
                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAVFBMVEX///8AAADFxcXIyMjDw8PMzMz29vagoKDn5+e+vr4kJCTW1tYYGBiPj4/v7++tra2amppfX18dHR05OTl3d3f5+fkuLi6mpqaWlpZtbW1ISEgxMTHRk7UpAAACyUlEQVR4nO3c6VLrMAyG4abQLS2Ufb3/+zzTMWZOSuwmqWxJmff5C1NbzadYocBiAQAAAAAAAAAAAAAAAAAAAAAAAAAAgKK2u+Nuq72Jcl43bXPSbl61t1LG/q2J3vbamylh1fxvpb0ded0Cm+ZGe0PSbppzS+0tyfpb4MxKPI/o7ILadwVndRVTBc6mxP6IziiouQJncS6mIzqToF4q0H2J+YjOIKhDCnR9u7kcUedBHVqg26s4LKKOSxx+BZ0GdVyBDkscE9HAWVDHF+isxExEH9JfchTUTIG3i+UMSsxE9FRDpn4nA1ymgtBqmXfARS9mIxr4DmrmAt3+flOmRPNX8UIPRn57MbPz5bRvNGZAD0Y+e3FQD0aZEs0GdeQp4O/QGN1a3npxRA9Gvnpx4DHRdXH8MWTiXie9LyomRDTwEtRRx0SXjwHuqqx5GOCuvOvbPzQm92BkvRev6MHI9gAnMntZHuCEmshuUK/uwcjqoSE4ktgc4ER3ZXGAE4toYK8XBY6JLmu9WOAOb+vQKDJrWRrghHswstOLxW58Vga4goeXjV4sFNHAQlDFj4ku/UOj+PCh/dRfYYDUHeCK9mCk2YuFezDSOzSq3cu1Do2KU5XOAFelByONXqx8i6v/1F99xdq9WDWiQd2gVjomumoOcPvKifmRCY7wH9quDyoF5ko8rEUXuksuVC6iQTqod5LLrFutAjMltpIXMdmFNR7Ykvc4yU58T6xR56E7dRXfBdf40IpokCjxQ3CJjeIVPOm/o25Kr1Dzx9C9vSj5pHivGNGgL6j3kgt8KhfYV+Kn6OtvNSMa/OkU4f9zc+y+usYHemclHqVfv/PXPDqfO3dKfCjw+r/D95fW/0HafsUtHMq8x7vH76f2+UXzl3hWL8/t0/fjrtwKa9lHFqdbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUPcPVqEVOakV55EAAAAASUVORK5CYII=',
                  }}
                />
              )}
            </TouchableOpacity>
            {isselected ? (
              <View
                style={{
                  width: '90%',
                  height: 300,
                  borderRadius: 10,
                  marginTop: 20,
                  backgroundColor: 'white',
                  elevation: 5,
                  alignSelf: 'center',
                }}>
                <TextInput
                  ref={searchRef}
                  style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'grey',
                    alignSelf: 'center',
                    marginTop: 20,
                    color: '#212E52',
                    paddingLeft: 15,
                    backgroundColor: 'white',
                  }}
                  placeholder="Search"
                  onChangeText={text => {
                    onSearch(text);
                  }}
                />

                <View>
                  <FlatList
                    data={data}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          style={{
                            width: '85%',
                            height: 50,
                            borderBottomWidth: 0.2,
                            borderBottomColor: 'grey',
                            alignSelf: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => {
                            setDiagnose(item.cancerType);
                            setUpdate({diagnose: item.cancerType});
                            onSearch('');
                            setisselected(false);
                            searchRef.current.clear();
                          }}>
                          <Text style={{color: '#212E52'}}>
                            {item.cancerType}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 200}}>
          <Icon name="chevron-back-outline" size={25} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('relation')}>
            <Text
              style={{
                color: '#212E52',
                fontWeight: 'bold',
                fontSize: 16,
                marginStart: 10,
              }}>
              Skip
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => response()}>
            <Text
              style={{
                color: '#212E52',
                fontWeight: 'bold',
                fontSize: 16,
                marginStart: 200,
              }}>
              Next
            </Text>
          </TouchableOpacity>
          <Icon name="chevron-forward-outline" size={25} />
        </View>
      </View>
    </Background>
  );
}
export default Diagnose;

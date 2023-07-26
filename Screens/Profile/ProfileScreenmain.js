import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Btn from '../Btn';
import {pink, white, darkpink} from '../../components/colors';
import Feild from '../../Components/Feild';
import axios from 'axios';
import {URL} from '..//..//config';
import Icon from 'react-native-vector-icons/MaterialIcons';
function Profilescreenmain(props) {
  const [data, setData] = useState([{}]);
  const getTokenFromStorage = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      return user;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const response = async () => {
      const user = await getTokenFromStorage();
      console.log(user);
      await axios
        .get(`${URL}/auth/user/me/`, {
          headers: {Authorization: `Bearer ${user.token}`},
        })
        .then(res => setData(res.data));
    };
    response();
  }, []);
  return (
    //Add Profile
    <ScrollView>
      <View style={Styles.container}>
        <TouchableOpacity>
          <Image
            source={require('..//..//assets/images/Users/User9-Maria.jpg')}
            style={Styles.profilePicture}
          />
        </TouchableOpacity>
        <View style={{marginLeft: 20}}>
          {/* {FIRSTNAME}{lASTNAME} */}
          <View style={{marginBottom: 2, marginTop: 15, marginEnd: 140}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 25}}>
              {data.firstName} {data.lastName}
            </Text>
          </View>
          {/* {RELATIONSHIP}{DIAGNOSE} */}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginTop: 5,
              marginLeft: 6,
            }}>
            <Text style={{color: 'gray', fontWeight: 'bold', marginEnd: 15}}>
              @{data.username}
            </Text>
            <Text style={{color: 'gray', fontWeight: 'bold'}}>
              {data.email}
            </Text>
          </View>
          {/* {LOCATION} */}
          <View style={{marginTop: 3, marginLeft: 6}}>
            <Text style={{color: 'blue', fontWeight: 'bold'}}>{data.relation}    {data.diagnose}</Text>
          </View>
        </View>
      </View>

      {/* NEXT CONTAINER TO VIEW PROFILE */}
      <View style={Styles.secondcontainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ProfileScreen1')}
          style={Styles.ViewProfile}>
          <Icon name="account-circle" color={"#000"} size={30} />
          <Text style={{fontWeight: 'bold', marginEnd: 170, color: 'black'}}>
            View your profile
          </Text>
          <Icon name="keyboard-arrow-right" color={"#000"} size={30} />
        </TouchableOpacity>
      </View>

      {/* How was your day Container */}
      <View style={Styles.secondcontainer}>
        <Text style={Styles.text}>How are you today?</Text>
        <View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              marginBottom: 20,
              marginTop: 16,
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile')}>
              <Image
                source={require('..//..//assets//images//Emojis//Bad.jpg')}
                style={Styles.Emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile')}>
              <Image
                source={require('..//..//assets//images//Emojis//Happy.jpg')}
                style={Styles.Emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile')}>
              <Image
                source={require('..//..//assets//images//Emojis//sad.jpg')}
                style={Styles.Emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile')}>
              <Image
                source={require('..//..//assets//images//Emojis//ILL.png')}
                style={Styles.Emoji}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('profile')}>
              <Image
                source={require('..//..//assets//images//Emojis//Upset.jpg')}
                style={Styles.Emoji}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('Addpost')}
        style={{backgroundColor: 'white', borderRadius: 20, marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            style={{
              height: 35,
              width: 35,
              padding: 5,
              margin: 5,
              paddingLeft: 5,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              paddingLeft: 10,
              paddingTop: 10,
            }}>
            Ask the community question?
          </Text>
        </View>
        <Text style={{color: 'grey', paddingTop: 10, paddingLeft: 10}}>
          Get support from the shared experiences in the community by posting a
          question others can answer.
        </Text>
        <View style={{marginLeft: 15}}>
          <Feild placeholder="Ask Question?" />
        </View>
      </TouchableOpacity>

      <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 20}}>
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
              style={{
                height: 35,
                width: 35,
                padding: 5,
                margin: 5,
                paddingLeft: 5,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingTop: 10,
              }}>
              Discover others like you
            </Text>
          </View>
          <Text
            style={{
              color: 'grey',
              paddingTop: 10,
              paddingLeft: 10,
              paddingBottom: 10,
            }}>
            connect with others that understand and relate to your experience.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 20}}>
        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'data:image/png;base64,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',
              }}
              style={{
                height: 35,
                width: 35,
                padding: 5,
                margin: 5,
                paddingLeft: 5,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingTop: 15,
              }}>
              Health Studies
            </Text>
          </View>
          <Text
            style={{
              color: 'grey',
              paddingTop: 8,
              paddingLeft: 10,
              paddingBottom: 15,
            }}>
            Be the part of change and participate in improving the world's
            understanding of cancer.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 20}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Addpost')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'data:image/png;base64,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',
              }}
              style={{
                height: 35,
                width: 35,
                padding: 5,
                margin: 5,
                paddingLeft: 5,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingTop: 10,
                marginBottom: 10,
                paddingBottom: 10,
              }}>
              Create a new post
            </Text>
          </View>
          <Image
            style={{width: 24, height: 24}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY5TLi2OCv7ISG-koucxH3MdcFF9XMiHyBg&usqp=CAU',
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 20}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'data:image/png;base64,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',
              }}
              style={{
                height: 35,
                width: 35,
                padding: 5,
                margin: 5,
                paddingLeft: 5,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingTop: 10,
                marginBottom: 10,
                paddingBottom: 10,
              }}>
              invite friends
            </Text>
          </View>
          <Image
            style={{width: 24, height: 24}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY5TLi2OCv7ISG-koucxH3MdcFF9XMiHyBg&usqp=CAU',
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 20}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Editprofile')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'data:image/png;base64,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',
              }}
              style={{
                height: 35,
                width: 35,
                padding: 5,
                margin: 5,
                paddingLeft: 5,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingTop: 10,
                marginBottom: 10,
                paddingBottom: 10,
              }}>
              Complete your profile
            </Text>
          </View>
          <Image
            style={{width: 24, height: 24}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY5TLi2OCv7ISG-koucxH3MdcFF9XMiHyBg&usqp=CAU',
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: 'white', borderRadius: 20, marginTop: 20}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SettingsScreen')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: 'data:image/png;base64,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',
              }}
              style={{
                height: 35,
                width: 35,
                padding: 5,
                margin: 5,
                paddingLeft: 5,
              }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingTop: 10,
                marginBottom: 10,
                paddingBottom: 10,
              }}>
              Settings
            </Text>
          </View>
          <Image
            style={{width: 24, height: 24}}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY5TLi2OCv7ISG-koucxH3MdcFF9XMiHyBg&usqp=CAU',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 90}}></View>
    </ScrollView>
  );
}
export default Profilescreenmain;

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  secondcontainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
  },
  profilePicture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginLeft: 20,
    marginTop: 15,
  },
  ViewProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    flexDirection: 'row',
    margin: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  Emoji: {
    height: 55,
    width: 55,
    borderRadius: 100,
    marginLeft: 20,
  },
});

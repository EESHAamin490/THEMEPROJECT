
import React,{useState} from 'react'
import { StyleSheet,FlatList,TextInput ,Text, TouchableOpacity, View,ScrollView, SafeAreaView } from 'react-native'
import Header from '..//Header'
import Posts from '..//Posts'
import Stories from '../../Components/Stories'
import { POSTS } from '../..//Data/adminPost'
import { URL } from '../../config'
import axios from 'axios';
const COLORS = {primary:'#212E52',white:'#fff'};
const   Onboardingadmin = () => {
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
    <View style={styles.container}>
      <SafeAreaView>
      <Header/>
      <ScrollView>
        <Text>{data.city}</Text>
       </ScrollView>
      </SafeAreaView>   
    </View>
  )
}

export default Onboardingadmin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.primary,
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
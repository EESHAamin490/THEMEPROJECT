import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity,Image} from 'react-native'
import Header from '../Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stories from '../../Components/Stories';
import { Users } from '../../Data/Users';
import { POSTS } from '../../Data/Post';
import { URL } from '../../config';
import axios from 'axios';
const COLORS = {primary:'#212E52',white:'#fff'};
const AdminUserView = ({navigation}) => {
  const handleitemPress=(item)=>{
    navigation.navigate('send',{item})
  }
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
        .get(`${URL}/auth/admin/userList`, {
          headers: {Authorization: `Bearer ${user.token}`},
        })
        .then(res => setData(res.data));
    };
    response();
  }, []);
  const renderItem=({item})=>( 
    <TouchableOpacity onPress={()=>handleitemPress(item)}>
    <Image style={styles.story} source={item.profile_picture}/>
    <Text style={{color:'white',marginStart:25}}>
            {item.user.length>11
            ?item.user.slice(0,10).toLowerCase()+'...'
            :item.user.toLowerCase()                      
          }
    </Text>
    </TouchableOpacity>

  );

  return (
    
    <View style={styles.container}>
      
      <Header/>
      <Text style={styles.headerpost}> Users Information </Text>
      <View style={{marginBotton:13,margin:50}}>
          <FlatList
          numColumns={3}
              data={POSTS}
              renderItem={renderItem}
              keyExtractor={(item)=>item.id}
             />
             
    </View>

      </View>
  )
}

export default AdminUserView

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:COLORS.primary,
      },
      headerpost:{
        color:"white",
        marginStart:30,
        marginBottom:10,
        fontWeight:"bold",
        fontSize:25
      },
      story:{
        marginRight:15,
       height:70,
       width:70,
       borderRadius:50,
       marginLeft:6,
       borderWidth:3,
       borderColor:'#ff8501',
    },
})
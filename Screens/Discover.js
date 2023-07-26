import {View, Text ,StyleSheet,Image,Button,FlatList,TouchableOpacity,TextInput, ScrollView} from 'react-native'
import React,{useState} from 'react'
import Allpostfun from './AllPosts'
import PostItem from './Postedit';
import Icon from 'react-native-vector-icons/Ionicons';
export default function Discoverfun({navigation})
{
  return (
    
    <View style={styles.container} >
      <Text style={{fontSize:27,color:'white',fontWeight:'bold'}}>Discover</Text>
      <View style={{padding:10,flexDirection:'row'}}>
      <Button
       onPress={()=> navigation.navigate('Discover')}
       title="For you"
        color="#212E52"
     />
     <Button
       onPress={()=> navigation.navigate('Login')}
       title="Profile"
        color="#212E52"
     />
      </View>
      <View style={{borderRadius:50}}>
         <TextInput 
         placeholder='search '
         style={{padding:9,backgroundColor:'white',margin:20,borderRadius:80}}
         />
      </View>
      <View style={{flexDirection:'row'}}>
        <ScrollView>
        <TouchableOpacity onPress={()=>navigation.navigate("onboarding")}>
        <Image source={require('..//assets/images/1.jpg')} style={{margin:80,height:140,width:200}}/>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>navigation.navigate("onboarding")}>
        <Image source={require('..//assets/images/2.jpg')} style={{margin:80,height:140,width:200,marginTop:0 }}/>
        </TouchableOpacity>
      </ScrollView>
      
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#212E52',
  elevation: 9,
},
Post:{
flexDirection:'row',
padding:10,
elevation: 100,
},
  item:{
  color:'black',
  marginTop:10,
  margin:20,
  elevation:9,
 padding:30,
backgroundColor:'white',
fontSize:20,

  }  
})
import { View, Text ,StyleSheet,Image,Button,FlatList,TouchableOpacity} from 'react-native'
import React,{useState}from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
export default function Allpostfun({navigation})
{
    const [Post,setPost]=useState([
        { Name:' DARRAN,Jey, MOOR...',
        Time: ' 6 Hour Ago',
          Post:' War on Cancer is my Home and Crunch.'},
     ]);
      return (
        
        <View style={styles.container} >
          <Text style={{fontSize:27,color:'white',fontWeight:'bold'}}>Community</Text>
          <View style={{padding:10,flexDirection:'row'}}>
          <Button
           onPress={()=> navigation.navigate('Home')}
           title="For you"
            color="#212E52"
         />
         <Button
           onPress={()=> navigation.navigate('All Post')}
           title="All Post"
            color="#212E52"
         />
          </View>
          <View style={styles.Post}>
            <Image source={require('..//assets/images/user.jpg')} style={{height:46,width:46,borderRadius:50}}/>
            <FlatList
          data={Post}
          renderItem={({item})=>(
            <Text style={{color:'white',marginStart:20,fontWeight:'bold',marginEnd:80}}>{item.Name}{item.Time}</Text>
            
            )}
       />
              <Button title='Follow'
              />
         </View>
         <View style={styles.list}>
         <FlatList
          data={Post}
          renderItem={({item})=>(
            <Text style={styles.item}>{item.Post}</Text>
          )}
       />
       <View style={{evaluation:9,padding:0.04,backgroundColor:'white',marginStart:10,marginEnd:10,flexDirection:'row'}}>
        <TouchableOpacity onPress={alert('like')}>
        <Icon name='heart' size={40} style={{marginStart:20}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={alert('Comment')}>
        <Icon name="chatbox-ellipses-outline" size={40} style={{marginStart:100}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={alert('Share')}>
        <Icon name="arrow-redo-outline" size={40} style={{marginStart:90}} />
        </TouchableOpacity>
       </View>
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
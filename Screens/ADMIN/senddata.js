import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import Header from '../Header';
import { Users } from '../../Data/Users';
const COLORS = {primary:'#212E52',white:'#fff'};
const Senddata = ({route}) => {
  const {item}=route.params;
  return (
    <View style={styles.container}>
      <Header/>
      <Text style={{color:"white"}}>    User No : {item.id}</Text>
      <Text style={{color:"white"}}>    User Name : {item.user}</Text>
      <Image source={item.profile_picture} style={styles.story}/>
       <View style={{height:250,width:'50%',margin:90,alignContent:'center',justifyContent:'center'}}>
        
        <Image
                   source={item.image}
                   style={{height:'90%',width:'100%',resizeMode:'cover',margin:2}}
        />
        <Text style={{color:"white"}}>    Total Likes : {item.likes}</Text>
        <Text style={{color:"white"}}>    Caption : {item.caption}</Text>
       <Text style={{color:"white"}}>Comments</Text>
       {
        
        item.comments.map((comments,index)=>(
          <Text style={{color:"white"}}> {comments.user}
          <Text key={index}>{comments.comments}</Text>
          </Text>
        ))
       }
    </View>
    </View>
  )
}

export default Senddata

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
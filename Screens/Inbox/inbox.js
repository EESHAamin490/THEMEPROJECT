import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text,Button } from 'react-native';
import Header from '../Header';
const COLORS = {primary:'#212E52',white:'#fff'};
const InboxFun = ({navigation}) => {
  return(
    <View style={styles.container}>
        <Header/>
        <Text style={{color:'white',fontSize:20}}>    INBOX</Text>
        <View style={{padding:10,flexDirection:'row'}}>
      <Button
       onPress={()=> navigation.navigate('message')}
       title="Message"
        color="#212E52"
     />
     <Button
       onPress={()=> navigation.navigate('Group')}
       title="Group"
        color="#212E52"
     />
      </View>
        <View style={{borderRadius:50}}>
         <TextInput 
         placeholder='search '
         style={{padding:9,backgroundColor:'white',margin:20,borderRadius:80}}
         />
      </View>
    </View>
  )
}
export default InboxFun;
const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor:COLORS.primary,
    },
})

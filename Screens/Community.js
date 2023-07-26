import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import Header from './Header';
import Posts from './Posts';
const COLORS = {primary: '#212E52', white: '#fff'};
const Community = ({navigation}) => {
  return (
    
  
      <View style={styles.container}>
      <SafeAreaView>
        <Header />
        <Text style={styles.headerpost}>All Posts</Text>
        <ScrollView>
       
        </ScrollView>
      </SafeAreaView>
    </View>
   
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
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
  headerpost: {
    color: 'white',
    marginStart: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
});

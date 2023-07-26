import React from 'react';
import {Image, Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function PostFolowFolowing(props) {
  const navigation = useNavigation();
  return (
    <View style={Styles.container}>
   <View style={Styles.container2}>
        <View style={Styles.container3}>
          <TouchableOpacity onPress={()=>navigation.navigate('PostScreen')}>
            <Text style={Styles.text}>Posts</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity>
          
            <Text style={Styles.text}>Followers</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.container3}>
          <TouchableOpacity>
            
            <Text style={Styles.text}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 20,
  },
  numberContainer: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginEnd: 20,
  },
  text: {
    color: 'black',
    fontSize:18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  container3: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
});
 
 


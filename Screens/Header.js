import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
const Header = () => {
  return (
    <View style={style.container}>
      <Image
        style={style.logo}
        source={require('..//assets/images/logo.png')}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          marginTop: 20,
          fontWeight: 'bold',
        }}>
        Community
      </Text>
    </View>
  );
};
export default Header;
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

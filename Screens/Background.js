import React from 'react';
import {View, ImageBackground} from 'react-native';

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground source={require("..//assets/images/cancer.jpg")} style={{ height: '70%' }} />
      <View style={{ position: "absolute" }}>
        {children}
      </View>
    </View>
  );
}

export default Background;
import React from 'react';
import {Image, View, Text} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Postgridicon() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
      }}>
      <TouchableOpacity>
        {/* <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32czKdtjqVS7Cc4cJ4ociwjSRsyMI4nyuHg&usqp=CAU',
          }}
          style={{width: 25, height: 25, paddingRight: 2}}
        /> */}
        <Text>Posts</Text>
      </TouchableOpacity>
    </View>
  );
}

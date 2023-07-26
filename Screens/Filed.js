import React from 'react';
import {TextInput} from 'react-native';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: '#212E52',
        paddingHorizontal: 10,
        width: '78%',
        backgroundColor: 'rgb(220,220, 220)',
        marginVertical: 10,
        marginEnd:50,
      }}></TextInput>
  );
};

export default Field;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { darkpink } from '../../../components/colors';
import Feild from '../../../Components/Feild';
import Btn from '../../Btn';
//import { postApi } from '../../../api/service';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import { setProfile } from '../../../reducers/Profile';

function EditProfile(props) {
  const [errormsg, seterrormsg] = useState(null);
  const [selectimage, setselectimage] = useState('data:image/png;base64,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');
  // const update=async()=>{

  //       try {
  //         const response = await postApi('/personalinfo',updatedata);
  //         if (!response.status && response.message) 
  //         {
  //           seterrormsg(response.message); 
  //         }
  //         else
  //       {
  //         if(response.findUser){
  //           console.log(response.findUser)
  //           dispatch(setProfile(response.findUser));
  //         }
  //         props.navigation.navigate("Profilenav");
  //         console.log("updated successfully");
  //         alert("updated successfully");
  //       }
  //       } catch (err)
  //       {
  //         console.log(err);
  //       } 

  // }

  const ImagePicker = () => {
    let options = {
      storageOptions:
      {
        path: "image",
      },
    };
    launchImageLibrary(options, response => {
      setselectimage(response.assets[0].uri)
      console.log(response.assets[0].uri);
    })
  };

  return (
    <View>
      <ScrollView>
        <TouchableOpacity onPress={() => {
          ImagePicker()
        }}>
          <Image
            style={Styles.prfilePicture}
            source={{ uri: selectimage }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginBottom: 100,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
              marginTop: 5,
            }}>
            Edit Personal Information
          </Text>

          {errormsg ? (<Text
            style={{
              color: 'red',
              fontSize: 15,
              textAlign: 'center',
              backgroundColor: pink,
              padding: 5,
              borderRadius: 10,
            }}> {errormsg}</Text>) : null}

          <Feild
            placeholder="Email"
            onChangeText={text => setupdatedata({ ...updatedata, email: text })}
            onPressIn={() => seterrormsg(null)}


          //onSubmitEditing={handleSubmit}

          />
          <Feild
            placeholder="First Name"
            onChangeText={text => setupdatedata({ ...updatedata, firstname: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="Last Name"
            onChangeText={text => setupdatedata({ ...updatedata, lastname: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="Gender Identity"
            onChangeText={text => setupdatedata({ ...updatedata, gender: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="Date of Birth"
            onChangeText={text => setupdatedata({ ...updatedata, dateofbirth: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="Phone Number"
            onChangeText={text => setupdatedata({ ...updatedata, mobile: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="Country/Residence"
            onChangeText={text => setupdatedata({ ...updatedata, country: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="About"
            onChangeText={text => setupdatedata({ ...updatedata, about: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="Relationship to patient"
            onChangeText={text => setupdatedata({ ...updatedata, relationship: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Feild
            placeholder="Cancer Diagnosed"
            onChangeText={text => setupdatedata({ ...updatedata, diagnose: text })}
            onPressIn={() => seterrormsg(null)}

          />
          <Btn
            textColor="white"
            bgColor={pink}
            btnLabel="Save Changes"
            Press={() => update()}
          />
          <Btn textColor="white" bgColor={"pink"} btnLabel="Cancel" Press={() => props.navigation.navigate("Profilemain")} />
        </View>
      </ScrollView>
    </View>
  );
}

export default EditProfile;
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prfilePicture: {
    height: 110,
    width: 110,
    borderRadius: 100,
    marginLeft: 120,
  },
})

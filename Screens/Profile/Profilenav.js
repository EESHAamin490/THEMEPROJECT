// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profilescreenmain from './ProfileScreenmain';
import EditProfile from './EditProfile/EditProfile';
import ProfileScreen1 from './YourProfile/Profilescreen1'
import PostFolowFolowing from './YourProfile/PostFollowFfolowing/PostFolowFolowing';
import Postfollownav from './YourProfile/PostFollowFfolowing/Postfollownav';
import PostScreen from './YourProfile/PostFollowFfolowing/PostScreen';
import FollowScreen from './YourProfile/PostFollowFfolowing/FollowerScreen';
import FollowingScreen from './YourProfile/PostFollowFfolowing/FollowingScreen';
import SettingsScreen from './Settings/SettingsScreen';
import AccountSettings from './Settings/AccountSettings';
const Stack = createNativeStackNavigator();

function Profilenav() {
  return (
   
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Profilemain" component={Profilescreenmain} />
        <Stack.Screen name="ProfileScreen1" component={ProfileScreen1} />
        <Stack.Screen name="Postfollownav" component={Postfollownav} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name='AccountSettings' component={AccountSettings}/>
        {/* <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen name="FollowScreen" component={FollowScreen} />
      <Stack.Screen name="FollowingScreen" component={FollowingScreen} /> */}
        <Stack.Screen name="Editprofile" component={EditProfile} /> 
      </Stack.Navigator>
    
  );
}

export default Profilenav;
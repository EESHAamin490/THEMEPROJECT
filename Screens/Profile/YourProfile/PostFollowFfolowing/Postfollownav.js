//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FollowScreen from './FollowerScreen';
import FollowingScreen from './FollowingScreen';
import PostScreen from './PostScreen';
import PostFolowFolowing from './PostFolowFolowing';

const Tab = createMaterialTopTabNavigator()
//const Stack = createNativeStackNavigator();
 function Postfollownav() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="PostFolowFolowing" component={PostFolowFolowing} /> */}
      <Tab.Screen name="PostScreen" component={PostScreen} />
      <Tab.Screen name="FollowScreen" component={FollowScreen} />
      <Tab.Screen name="FollowingScreen" component={FollowingScreen} />
     
    </Tab.Navigator>
  );
}
export default Postfollownav
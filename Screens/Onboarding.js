// import React, { useRef } from 'react'
// import {Dimensions, StyleSheet, Text, View ,Image,SafeAreaView, StatusBar, FlatList, TouchableOpacity} from 'react-native'
// import { Divider } from 'react-native-elements';
// const {width,height}=Dimensions.get('window');
// import Icon from 'react-native-vector-icons/Ionicons';
// const COLORS = {primary:'#282534',white:'#fff'};
// const Slides=[
//    {
//     id:'1',
//        image:require('..//assets//images/Posts/Board1.jpg'),
//      title: 'What Brought you here?',
//      subtitle1:'I Have Been Diagnosed',
//      subtitle2:'I am a friend or family',
     
//    },
//    {
//      id:'3',
//      image:require('..//assets//images/Posts/post1.png'),
//      title: 'Increase Your Value',
//      subtitle1:'I Have Been Diagnosed',
//      subtitle2:'I am a friend or family',
//    },
// ]
// const Slide=({item})=>{
  
//   return (
//     <View style={{alignItems: 'center'}}>
//       <Image
//         source={item?.image}
//         style={{height: '35%', width}}
//       />
//       <View style={{flexDirection:"column",alignContent:'center',alignItems:'center'}}
//       >
//         <Text style={styles.title}>{item?.title}</Text>
//         <View style={{flexDirection:'row'}}>
//         <Icon name='analytics-outline' size={100} style={styles.subtitle}/>
//         <TouchableOpacity>
//         <Text style={styles.subtitle}>{item?.subtitle1}</Text>
//         </TouchableOpacity>
//         </View>
//         <Divider/>
//         <View style={{flexDirection:'row'}}>
//         <Icon name='heart' size={100} style={styles.subtitle}/>
//         <TouchableOpacity>
//         <Text style={styles.subtitle}>{item?.subtitle2}</Text>
//         </TouchableOpacity>
//         </View>
//       </View>
//     </View>
    
//   );
  
// }
// const Onboarding = ({navigation}) => {
//   const [currentSlideIndex,setCurrentSlideIndex]=React.useState(0);
//   const ref=React.useRef(null);
//   const Footer=()=>{
//     return(
//       <View
//         style={{
//           height: height * 0.25,
//           justifyContent: 'space-between',
//           paddingHorizontal: 20,
//         }}>
//         {/* Indicator container */}
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             marginTop: 20,
//           }}>
//               {
//                 Slides.map((_,index)=>(
//                 <View key={index}  style={[styles.indicator,currentSlideIndex==index && {
//                   backgroundColor:COLORS.white,
//                   width:25,
//                 }]}/>
//                 ))}
//           </View>
//           <View style={{marginBottom:20}}>
//           {currentSlideIndex == Slides.length - 1 ? (
//             <View style={{height: 50}}>
//               <TouchableOpacity
//                 style={styles.btn}
//                 onPress={() => navigation.navigate('TabScreens')}>
//                 <Text style={{fontWeight: 'bold', fontSize: 15}}>
//                   GET STARTED
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={{flexDirection:'row'}}>
//                <TouchableOpacity style={[styles.btn,{backgroundColor:'transparent',borderWidth:1,borderColor:COLORS.white}]} onPress={skip}>
//                <Text style= {{fontWeight:'bold',fontSize:15,color:COLORS.white}}>
//                   SKIP
//                 </Text>
//                </TouchableOpacity>
//                <View style={{width:15}}></View>
//                <TouchableOpacity style={[styles.btn]} onPress={goToNextSlide}>
//                 <Text style= {{fontWeight:'bold',fontSize:15}}>
//                   NEXT
//                 </Text>
//                </TouchableOpacity>
               
//             </View>
//           )}
//           </View>
//           </View>
          
//     )
//   }
//   const goToNextSlide = () => {
//     const nextSlideIndex=currentSlideIndex+1;
//     if (nextSlideIndex != Slides.length){
//        const offset=nextSlideIndex*width;
//        ref?.current.scrollToOffset({offset});
//        setCurrentSlideIndex(currentSlideIndex + 1);
//     }
//   }
//   const skip = () => {
//     const lastSlideIndex = Slides.length - 1;
//     const offset = lastSlideIndex * width;
//     ref?.current.scrollToOffset({offset});
//     setCurrentSlideIndex(lastSlideIndex);
//   };
//   const updatecurrentSlideIndex = e =>{
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / width);
//     console.log(currentIndex)
//   }
//   return (
//     <SafeAreaView style={{flex:1,backgroundColor:COLORS.primary}}>
//         <StatusBar backgroundColor={COLORS.primary}/>
//         <FlatList
//         ref={ref}
//          onMomentumScrollEnd={updatecurrentSlideIndex}
//          contentContainerStyle={{height: height * 0.75}}
//          showsHorizontalScrollIndicator={false}
//          horizontal
//          data={Slides}
//          pagingEnabled
//          renderItem={({item}) => <Slide item={item} />}
//         />
//       <Footer/>
//     </SafeAreaView>
//   )
// }
// export default Onboarding

// const styles = StyleSheet.create({
//   title:{
//     color:COLORS.white,
//     fontSize:26,
//     fontWeight:'bold',
//     marginTop:20,
//     textAlign:'center',
//   },
//   subtitle:{
//     borderEndWidth:30,
//     borderColor:'white',
//     color:COLORS.white,
//     fontSize:16,
//     marginTop:40,
//     maxWidth:'90%',
//     textAlign:'center',
//     lineHeight:23,
//   },
//   indicator: {
//     height: 2.5,
//     width: 10,
//     backgroundColor: 'grey',
//     marginHorizontal: 3,
//     borderRadius: 2,
//   },
//   btn: {
//     flex: 1,
//     height: 50,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })
import { StyleSheet, Text, View,ScrollView ,Image} from 'react-native'
import React from 'react'

const Onboarding = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={require('..//assets//images//Posts//post7.jpg')}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Blog Post Title</Text>
        <Text style={styles.date}>Published on June 26, 2023</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          pulvinar, augue eget ultricies rutrum, neque elit suscipit mauris, vel
          eleifend lorem risus ut enim. Vivamus vulputate urna ac ex vehicula,
          nec sollicitudin nunc tincidunt. Integer vel mauris vitae turpis
          pellentesque elementum. Aliquam erat volutpat. Cras vel dui quis est
          maximus scelerisque. Vestibulum sed nulla quis ligula varius
          efficitur a sit amet ligula. Integer interdum malesuada mauris, nec
          tempus dui dignissim a. Nulla facilisi. Fusce dapibus diam eu
          accumsan posuere.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  contentContainer: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Onboarding;

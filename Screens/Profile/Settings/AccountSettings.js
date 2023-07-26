import React from 'react'
import {Text, View,TouchableOpacity,Image} from 'react-native'
function AccountSettings(props) {
  return (
    <View>
      <View style={{backgroundColor:'white',borderRadius:20,marginTop:20}}>
      <Text style={{color:'black',fontSize:30,fontWeight:'bold'}}>Account Settings</Text>
      </View>
<Text style={{marginTop:30,fontWeight:'700',fontSize:20,color:'grey'}}>Manage Your Account here</Text>
  <View style={{backgroundColor:'white',borderRadius:20,marginTop:20}}>  
  <TouchableOpacity onPress={()=>props.navigation.navigate('Editprofile')} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:15,paddingRight:15}}>
  <View style={{flexDirection:'row'}}>
    <Image source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8AAAC3t7d5eXn6+vp0dHS7u7uvr6+enp6ysrLFxcWLi4vBwcHX19ciIiLr6+vNzc2CgoJZWVlJSUmTk5Pe3t5ubm6oqKjw8PBoaGicnJwuLi4QEBA5OTkXFxfl5eVAQEBeXl6MchetAAADuElEQVR4nO3c63KiQBCGYYiHGDERNAc2G028/5vcaFmprHZDM9P2zDDf+zOLLE8BKjJDUSCEEEIIIYQQQmhw6+X8LopWjzfxLZ7KiGrW2r46Kt+xd13gfWgP0UwTWIfWkDV6wDa0hWmuJmxCU5j+agHbj9AUrqWScBkawqZ1JlahIWw7JeEkNIRtrySchYbwQQghhOGDEEIIwwehj3AzMc5cuFJauThzod71tawphD5BaBKEXkFoEoReQWgShF5BaBKEXkFoEoReQWgShF5BaBKEXkFoEoReQWgShF6lL2zrajJr7j+5f09dOK3258U3zBB4cnip1sBHae7Cx98veCYXeaPW/aK6/f05Cx/+f8UfaplPYtVaowLFuQqvxuBX1FLb61XTe/uGOQofrl9DnYvEIOGpvqE7NyE1i2JLLXj1bmr9TuoopKeJkG8hF8ep+THqJmTmwbyR63/tXeTGOQiJc/DUhF589TMlYWv9QXFquJCdyUR+YByrq83ua7MI4nMQ8lO1Xs02elBDhdwhWrJHaegGCjuAAT4IRA0Tds4mVJ+cqdMgYScw0oN0kLDrEC3L1nbDxQ0Qdk94tb7sEycXdgMX1hsuTixMFSgWdp+DEQOlwmT3oFSYMFAmTPcQLWTCpIESYcqHaCERJg7sF6Z9iBb9wtT3YK8wfWCPcATAbmHy5+CxLmGMzwc6t12wNy0HCCMGHmuEd0B4YfchGkE72W5khXPj7XVJ9NsXJ3wx3linRA9D4oQH0011TXKnhxEmsQvL8knwbsMIn4031bXaWUjcgI8ycvSASLgn/xxfgvtdjNB4Q507YB9mfB6O/710/J+HxcF0S13z+E5DDrqLLq/vpeO/tsjg+jCDa/yoiTq/02TwW1sGv5eOgpj9fYsRnIu4f1gkT8R9/FNJEzGe5lzCRIxr+ynZvYjxpb8a/RjhDMZ5ZzBWP4P5FhnMmclg3lMGc9cymH+YwRzSDOYBZzCXO4P5+Bk8UyGD52Jk8GyTi+fT0GMi0n4+TVG0Y3/GUDH+50T1B6FJEHoFoUkQegWhSRB6BaFJEHoFoUkQegWhSRB6BaFJEHoFoUkQegWhSRB6BaFJEHpFCldKKxdnLtxMjDMXxhGEEEIYPgghhDB8EAqjvzDFkNYIySo0hG2nJCSGCEdSoyRsP/r/rzCpDQElB5hGkOjxS6La0BQmxd8Z6tAWMq2z8FSMzymaaQK/9+JTaNBl77rA7xZRGZubTHVdL+d3UbRiJhUghBBCCCGEEEJj7R8Fp1lWNMvViAAAAABJRU5ErkJggg=='}}
     style={{height:35,width:35,padding:5,margin:5,paddingLeft:5}}
    />
  <Text style={{color:'black',fontSize:18,fontWeight:'bold',paddingLeft:10,paddingTop:10,marginBottom:10,paddingBottom:10,}}>Log out</Text>
 </View>
  <Image style={{width:24,height:24}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY5TLi2OCv7ISG-koucxH3MdcFF9XMiHyBg&usqp=CAU'}}/>
  </TouchableOpacity>

  <TouchableOpacity onPress={()=>props.navigation.navigate('Editprofile')} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:15,paddingRight:15}}>
  <View style={{flexDirection:'row'}}>
    <Image source={{uri:'data:image/png;base64,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'}}
     style={{height:35,width:35,padding:5,margin:5,paddingLeft:5}}
    />
  <Text style={{color:'black',fontSize:18,fontWeight:'bold',paddingLeft:10,paddingTop:10,marginBottom:10,paddingBottom:10,}}>Delete Account</Text>
  </View>
  <Image style={{width:24,height:24}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPY5TLi2OCv7ISG-koucxH3MdcFF9XMiHyBg&usqp=CAU'}}/>
  </TouchableOpacity>
  </View>
    </View>
  )
}

export default AccountSettings

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import { Divider } from 'react-native-elements';
import HeartIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL } from '../config';
import Header from './Header';
import { black } from '../components/colors';
const COLORS = { primary: '#212E52', white: '#fff' };
//main post Component
const Posts = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const gotonextscreen = (postId, postCaption) => {
    navigation.navigate('postItem', { postId, postCaption });
  };

  const handleTextClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    comment: '',
  });
  const { comment } = formData;
  console.log(formData);
  const handleLike = async (userId, postId) => {
    const user = await getTokenFromStorage();
    await axios
      .post(
        `${URL}/auth/user/post/like?userId=${userId}&postId=${postId}`,
        {
          userId: user._id, // Pass the user ID
          postId: postId, // Pass the post ID
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then(res => {
        setImageSource(!imageSource);
        console.log(res.data);
      });
  };
  const deletePost = async (postId) => {

    const user = await getTokenFromStorage();
    console.log(postId);

    const response = await axios.delete(
      `${URL}/auth/user/post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    ).then(res => {
      fetchData();
      console.log(res.data)
    })
      .catch(err => console.error(err));
  };

  const deletecomment = async (commentId) => {

    const user = await getTokenFromStorage();
    console.log(user.token);

    const response = await axios.delete(
      `${URL}/auth/user/post/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      
    ).then(res => {
      fetchData();
      console.log(res.data)
    })
      .catch(err => console.error(err));
  };

  const handleDisLike = async (userId, postId) => {
    const user = await getTokenFromStorage();
    await axios
      .post(
        `${URL}/auth/user/post/unlike?userId=${userId}&postId=${postId}`,
        {
          userId: user._id, // Pass the user ID
          postId: postId, // Pass the post ID
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then(res => {
        setImageSource(!imageSource);
        console.log(res.data);
      });
  };

  const handleAddComment = async (userId, postId) => {
    const user = await getTokenFromStorage();
    console.log(postId);

    const response = await axios
      .post(
        `${URL}/auth/user/post/?userId=${userId}&postId=${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then(res => {
        fetchData();
        setFormData({ comment: '' });
      })
      .catch(err => console.error(err));
  };

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [imageSource, setImageSource] = useState(true);

  const [data, setData] = useState([]);

  const [userId, setUserId] = useState('');
  const getTokenFromStorage = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      setUserId(user.id);
      return user;
    } catch (error) {
      return null;
    }
  };
  const fetchData = async () => {
    const user = await getTokenFromStorage();
    await axios
      .get(`http://192.168.132.73:9000/auth/user/timeline`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(res => setData(res.data))
      .catch(error => console.error(error));
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {}, [data]);
  const onChange = (name, value) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  return (

    <View style={styles.container}>
      <Header />
      <Text style={styles.headerpost}>All Posts</Text>
      <ScrollView>
        {data.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 22 }}>No Post</Text>
          </View>
        ) : (
          data.map((posts, index) => (
            <View key={index}>
              <Divider width={1} orientation="vertical" />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 5,
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require("..//assets/images/Users/User1-Sandra.jpg")} style={styles.story} />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    {posts.user?.firstName} {posts.user?.lastName}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleTextClick}>
                  <Text style={{ color: 'white', fontWeight: '900', fontSize: 25 }}>...  </Text>
                </TouchableOpacity>
                <Modal
                  visible={isModalVisible}
                  // animationType="slide"
                  transparent={true}
                  onRequestClose={closeModal}
                >
                  <View style={styles.modalContainer}>

                    <View style={{ flexDirection: "row" }}>
                      <MaterialIcon name="edit" size={25} color="#000" />
                      <TouchableOpacity onPress={() => gotonextscreen(posts._id, posts.caption)}>
                        <Text style={styles.modalText}>EDIT</Text>
                      </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <MaterialIcon name="delete" size={25} color="#000" />
                      <TouchableOpacity onPress={() => deletePost(posts._id)}>
                        <Text style={styles.modalText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <MaterialIcon name="close" size={25} color="#000" />
                      <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.modalText}>Close</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                </Modal>
              </View>
              <View
                style={{
                  marginTop: 5,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    aspectRatio: 1, // Ensures the container is a square
                    backgroundColor: '#e1e1e1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  {posts.image ? (
                    <Image
                      source={{ uri: posts.image }}
                      style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                  ) : null}
                </View>
              </View>
              <View style={{ backgroundColor: 'white' }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderTopColor:"#212E52",
                      borderTopWidth:2,
                    }}>
                    <View style={styles.leftFooterIcon}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() =>
                            imageSource
                              ? handleDisLike(posts.user._id, posts._id)
                              : handleLike(posts.user._id, posts._id)
                          }>
                          <HeartIcon

                            style={{ margin:8}}
                            name={imageSource ? 'heart' : 'hearto'}
                            size={28}
                            color="red"
                          />
                        </TouchableOpacity>
                        <MaterialIcon name="comment" size={32} color="#212E52" 
                        style={{marginLeft:25}}
                        />
                        <MaterialIcon
                        style={{marginLeft:30}}
                          name="bookmark-outline"
                          size={30}
                          color="#000"
                        />
                        
                      </View>
                      
                    </View>
                    
                  </View>
                  <View style={{flexDirection:"row",
                    borderBottomColor:"#212E52",
                      borderBottomWidth:2,
                  }}>
                          <Text style={{color:"black" ,  marginLeft:10}}>Likes</Text>
                          <Text style={{color:"black" ,  marginLeft:10}}>comment</Text>
                          <Text style={{color:"black" ,  marginLeft:10}}>share</Text>
                          </View>
                  <TouchableOpacity>
                    {/* <Text> {posts.likes.length} Likes</Text> */}
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={{ flexDirection: 'row' ,margin:10}}>
                    <Text style={{ fontWeight: 'bold', marginRight: 1 ,color:"black"}}>
                      {posts.user?.username}
                    </Text>
                    <Text style={{ fontWeight: '600',color:"black" }}>: {posts.caption}</Text>
                  </View>
                </View>

                <View style={{ borderColor: 'gray',flexDirection:"column" }}>
                 
                  {posts.comments.map((comment, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        margin: 8,
                        backgroundColor: 'white',
                      }}>

                      <View style={{flexDirection:"row"}}>
                      
                        <Text style={{ color: 'gray',backgroundColor:"#FAF9F6",height:20,width:300 }}>
                          <Text style={{ fontWeight: 'bold', fontSize: 15 }}>      
                                          {comment.commentBy}
                                          
                            {': '}
                          </Text>
                          {comment.comment}
                          
                        </Text>
                        
                        <MaterialIcon name='delete' size={20} 
                        color={"#000"} style={{flexDirection:"row-reverse"}}
                        onPress={() => deletecomment(comment._id)}
                        />
                        
                  
                      </View>
                      
                    </View>
                  ))}
                </View>

                {/* <View>
                {comments &&
                  comments.map((comment, index) => (
                    <View style={{marginTop: 8, flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>{posts.user}</Text>
                      <Text key={index}>{comment}</Text>
                    </View>
                  ))}
              </View> */}

                <View
                  style={{
                    flexDirection: 'row',
                    margin: 5,
                    color:"black",
                    borderColor: 'gray',
                    borderWidth: 2,
                    borderRadius: 40,
                    marginBottom:19,
                  }}>
                  <TextInput
                  style={{color:"gray", marginLeft:3}}
                    placeholder="Add a comment ..."
                    placeholderTextColor="grey"
                    value={comment}
                    name="comment"
                    onChangeText={value =>
                      onChange('comment', value)
                    }></TextInput>
                  <View style={{ marginTop: 15, marginStart: 180 }}>
                    <MaterialIcon
                      name="send"
                      color={'#000'}
                      size={20}

                      onPress={() => handleAddComment(posts.user._id, posts._id)}
                    />
                  </View>
                </View>
              </View>

            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 150,
    height: 200,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,

  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  story: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 6,
    marginTop: 5,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },
  footerIcon: {
    width: 33,
    height: 300,
  },
  leftFooterIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareIcon: {
    transform: [{ rotate: '320deg' }],
    marginTop: -3,
  },
  headerpost: {
    color: 'white',
    marginStart: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 25,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});

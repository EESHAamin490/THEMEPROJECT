import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
const Message = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
  
    const sendMessage = () => {
      if (inputText.trim() === '') {
        return;
      }
  
      const newMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
        sender: 'User', // Change to dynamic sender if needed
      };
  
      setMessages([...messages, newMessage]);
      setInputText('');
    };
  
    const renderMessage = ({ item }) => (
      <View style={item.sender === 'User' ? styles.userMessageContainer : styles.otherMessageContainer}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesContainer}
          inverted
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    messagesContainer: {
      flexGrow: 1,
    },
    userMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C6',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
      maxWidth: '70%',
    },
    otherMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#E6E6E6',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
      maxWidth: '70%',
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    sendButton: {
      backgroundColor: '#007AFF',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default Message

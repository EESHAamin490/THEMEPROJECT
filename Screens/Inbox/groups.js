import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Groups = () => {
  const messages = [
    { id: '1', sender: 'John', content: 'Hey, how are you?' },
    { id: '2', sender: 'Emily', content: 'I\'m good! How about you?' },
    { id: '3', sender: 'John', content: 'I\'m doing great, thanks!' },
    // Add more messages here
  ];

  const renderMessage = ({ item }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.sender === 'John' ? styles.senderMessage : styles.receiverMessage
        ]}
      >
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.messageContent}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  senderMessage: {
    backgroundColor: '#E4F0E8',
    alignSelf: 'flex-start',
  },
  receiverMessage: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-end',
  },
  sender: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 16,
  },
});

export default Groups;

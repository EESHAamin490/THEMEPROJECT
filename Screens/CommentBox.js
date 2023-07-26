import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const CommentBox = ({ comment, onDelete, onEdit }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    onEdit(editedComment);
    setIsEditMode(false);
  };

  return (
    <View style={styles.container}>
      {isEditMode ? (
        <TextInput
          style={styles.input}
          value={editedComment}
          onChangeText={setEditedComment}
        />
      ) : (
        <Text style={styles.commentText}>{comment}</Text>
      )}

      <View style={styles.buttonContainer}>
        {isEditMode ? (
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <MaterialIcon name="check" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <MaterialIcon name="edit" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onDelete}>
              <MaterialIcon name="trash-2" size={20} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  commentText: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    padding: 4,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
});

export default CommentBox;

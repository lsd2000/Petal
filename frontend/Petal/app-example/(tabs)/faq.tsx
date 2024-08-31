import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView, Text, Keyboard } from 'react-native';

const ChatInputBar = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // State to store chat history

  const handleSend = async () => {
    if (inputText.trim()) {
      // Add user's input to chat history
      setChatHistory([...chatHistory, { type: 'user', content: inputText }]);
      console.log('User input:', inputText); // Log the input text for debugging
      setInputText(''); // Clear the input after sending
      // Dismiss the keyboard
      Keyboard.dismiss();
      try {
        // Make a POST request to the FastAPI endpoint
        const response = await fetch('https://petalbackend.onrender.com/faq_llm/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_input: inputText }), // Send the input text in JSON format
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        const data = await response.json();
        console.log('Response from server:', data); // Log the response from the server

        // Add LLM response to chat history
        setChatHistory([...chatHistory, { type: 'user', content: inputText }, { type: 'bot', content: data['faq_output'] }]);

      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to send message to the server');
      }

    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust based on platform
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80} // Adjust offset for keyboard
    >
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chatHistory.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              message.type === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1, // Allow the view to take all available space
  },
  chatContainer: {
    flexGrow: 1, // Allow ScrollView to resize with the keyboard
    paddingHorizontal: 10,
    paddingBottom: 20, // Add some bottom padding to prevent input from being too close to the keyboard
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ChatInputBar;

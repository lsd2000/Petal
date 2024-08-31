import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, View, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView, Text, Keyboard } from 'react-native';


interface Message {
  type: 'user' | 'bot';
  content: string;
}

export default function faq() {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

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
  }


  return (
    <View style={styles.container}>
              <Image
          source={require('../assets/images/topbanner.jpg')}
          style={styles.banner}
        />
      
      <Text style={styles.chatText}>FAQ Chatbot</Text>

      {/* Body content */}
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

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <Link href="/home" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text>Home</Text>
          </View>
        </Link>
        <Link href="/scan" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="search-outline" size={24} color="black" />
            <Text>Scan</Text>
          </View>
        </Link>
        <Link href="/location" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="location-outline" size={24} color="black" />
            <Text>Locate</Text>
          </View>
        </Link>
        <Link href="/rewards" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="gift-outline" size={24} color="black" />
            <Text>Rewards</Text>
          </View>
        </Link>
        <Link href="/faq" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="information-circle" size={24} color="black" />
            <Text>FAQ</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    alignItems: "center",
  },
  iconTextContainer: {
    alignItems: "center",
  },
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
    borderColor: '#D3D3D3',
    borderWidth: 2,
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
  } ,
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  chatText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    alignSelf: 'center',
  },
});

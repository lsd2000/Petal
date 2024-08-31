import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import {
  Button,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Text,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function Scan() {

  const win = Dimensions.get("window");
  const [image, setImage] = useState<string | null>(null);
  const [ratio, setRatio] = useState(1);
  const scale = 0.8;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, width, height } = result.assets[0];
      setImage(uri);
      setRatio(height / width);

      try {
        // Read the file as base64
        const fileBase64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        // const base64Data = await readFile(uri, 'base64')
        // Create FormData
        const formData = new FormData();
        formData.append('file', fileBase64);
        
        // Make the request to FastAPI endpoint
        const response = await fetch('https://petalbackend.onrender.com/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!response.ok) {
            console.log(response.status)
          throw new Error('Network response was not ok');
        }

        const output = await response.json();
        // console.
        console.log('Generated content:', output.fun_facts);
        Alert.alert('Fun Facts', output.fun_facts);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to upload image and generate content.');
      }
    }
  };

  const width = scale * win.width;
  const height = ratio * width;

  return (
    <View style={styles.container}>
              <Image
          source={require('../assets/images/topbanner.jpg')}
          style={styles.banner}
        />
      {/* Body content */}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width, height }} />}
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
            <Ionicons name="search" size={24} color="black" />
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
            <Ionicons name="information-circle-outline" size={24} color="black" />
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
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});

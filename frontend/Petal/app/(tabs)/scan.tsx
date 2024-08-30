import { useState } from 'react';
import { Button, Image, View, StyleSheet, Dimensions, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
// import { readFile } from 'react-native-fs';
// import RNFS from 'react-native-fs';

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
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width, height }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
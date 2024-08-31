import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, Dimensions, Alert, Platform, Pressable, Text, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dropdown } from 'react-native-element-dropdown';
import { Overlay } from "react-native-elements";
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const data = [
  { label: 'Recycling Information', value: 1 },
  { label: 'Upcycle Ideas', value: 2 },
  { label: 'Fun Facts!', value: 3 },
];

export default function Scan() {
  const win = Dimensions.get("window");
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [ratio, setRatio] = useState(1);
  const [selectedValue, setValue] = useState(0)
  const [funfacts, setFunFacts] = useState();
  const [upcycle, setUpcycle] = useState();
  const [classification, setClassification] = useState();
  const [displayedText, setText] = useState();
  const [visible, setVisible] = useState(false);
  const scale = 0.8;

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
    }
  };

  useEffect(() => {
    if (image == null) return;
    setLoading(true)
    uploadImage()
  }, [image]);

  const uploadImage = async () => {
    try {
      const uri = image;
      const fileBase64 = await FileSystem.readAsStringAsync(uri!, { encoding: FileSystem.EncodingType.Base64 });
      const formData = new FormData();
      formData.append('file', fileBase64);

      const response = await fetch('https://petalbackend.onrender.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const output = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(output);
      }

      setClassification(output.classification);
      setFunFacts(output.fun_facts);
      setUpcycle(output.upcycle);

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to upload image and generate content.');
    }
  }

  function handleSelectChange(e: { label?: string; value: any; }): void {
    setVisible(true);
    setValue(e.value);
    if (e.value == 1) {
      setText(classification);
    } else if (e.value == 2) {
      setText(upcycle);
    } else if (e.value == 3) {
      setText(funfacts);
    }
  }

  const width = scale * win.width;
  const height = ratio * width;

  return (
    <View style={styles.container}>

      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.imageUP}>
        {image != null ? <Image source={{ uri: image }} style={{ width, height }} /> : null}
      </View>
      <Pressable style={styles.uploadButton} onPress={pickImage}>
        <Text style={{ fontSize: 16, color: 'white' }}>{image ? "Pick new image from camera roll" : "Pick an image from camera roll"}</Text>
      </Pressable>
      <Dropdown style={[styles.dropdown, { backgroundColor: (image == null || isLoading) ? "lightgray" : "white" }]}
        disable={image == null || isLoading}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={(image == null || isLoading) ? "Please upload an image" : 'What information are you looking for?'}
        onChange={e =>
          handleSelectChange(e)
        }
        dropdownPosition='top'
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlaystyle} >
        <Text>{displayedText}</Text>
      </Overlay>

      <View style={styles.spacer} />
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
  },
  overlaystyle: {
    margin: 50,
    padding: 10,
    minWidth: "80%",
    borderRadius: 10,
  },
  displayText: {
    fontSize: 16,
  },
  imageUP: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: 300,
    alignSelf: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    width: '100%',
  },
  navButton: {
    alignItems: "center",
  },
  iconTextContainer: {
    alignItems: "center",
  },
  spacer: {
    height: 80,
  },
});

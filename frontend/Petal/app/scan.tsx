import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Image, View, StyleSheet, Dimensions, Alert, Platform, Pressable, Text, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Spinner from 'react-native-loading-spinner-overlay';
// import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { Dropdown } from 'react-native-element-dropdown';
import { ThemedText } from '@/components/ThemedText';
import { Overlay } from "react-native-elements";
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const data = [
  { label: 'Recycling Information', value: 1 },
  { label: 'Upcycle Ideas', value: 2 },
  { label: 'Fun Facts!', value: 3 },
];

export default function scan() {
  const win = Dimensions.get("window");
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [ratio, setRatio] = useState(1);
  const [selectedValue, setValue] = useState(0)
  const [funfacts, setFunFacts] = useState();
  const [upcycle, setUpcycle] = useState();
  const [classification, setClassification] = useState();
  // const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>();
  const [displayedText, setText] = useState()
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
      // console.log(uri)
      setImage(uri);
      // console.log(image)
      setRatio(height / width);

      // uploadImage()
      // setLoading(true)
    }
  };

  useEffect(() => {
    // action on update of movies
    if (image == null) return;
    setLoading(true)
    uploadImage()
  }, [image]);

  const uploadImage = async () => {
    try {
      // Read the file as base64
      // console.log(image)
      const uri = image
      const fileBase64 = await FileSystem.readAsStringAsync(uri!, { encoding: FileSystem.EncodingType.Base64 });
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

      const output = await response.json();
      setLoading(false)

      if (!response.ok) {
        // console.log(response.status)
        // console.log(response.body)
        throw new Error(output);
      }

      console.log('Generated content:', output.fun_facts);
      // Alert.alert('Fun Facts', output.classification);
      setClassification(output.classification)
      setFunFacts(output.fun_facts)
      setUpcycle(output.upcycle)

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to upload image and generate content.');
    }
  }

  function handleSelectChange(e: { label?: string; value: any; }): void {
    setVisible(true)
    setValue(e.value)
    if (e.value == 1) {
      setText(classification)
    } else if (e.value == 2) {
      setText(upcycle)
    } else if (e.value == 3) [
      setText(funfacts)
    ]
  }

  const width = scale * win.width;
  const height = ratio * width;

  return (
    <View>

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
      {/* <Select
        style={styles.select}
        placeholder='Disabled'
        disabled={true}
      >
        <SelectItem title='Recycling Information' />
        <SelectItem title='Upcycle Ideas' />
        <SelectItem title='Fun Facts!' />
      </Select> */}
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
      {/* <ScrollView> */}
      {/* <ThemedText style={styles.displayText}>{displayedText}</ThemedText> */}
      {/* </ScrollView> */}

      {/* {!(image != null && classification == null) ? null : <ActivityIndicator size={50} />} */}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.overlaystyle} >
        <Text>{displayedText}</Text>
        <View style={styles.spacer} />
      </Overlay>


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
            <Text>scan</Text>
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
            <Text>faq</Text>
          </View>
        </Link>
      </View>
    </View >


  );
}

const styles = StyleSheet.create({
  overlaystyle: {
    // margin:15,
    // marginEnd?
    margin: 50,
    padding: 10,
    minWidth: "80%",
    borderRadius: 10
    // backgroundColor:"black"
  },
  displayText: {
    fontSize: 16,
    // fontFamily:"lato"
    bottom: -100
  },
  imageUP: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -275
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    top: 760,
    left: 60,
    // x
    width: 300
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  dropdown: {
    // alignItems: 'center',
    // justifyContent: 'center',
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    bottom: -630,
  },
  scrollContentContainer: {
    paddingBottom: 80,
  },
  banner: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginVertical: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Roboto-Bold',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 5,
  },
  goldsectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F5BF03',
    marginBottom: 15,
    fontFamily: 'Roboto-Bold',
    marginLeft: 15,
  },
  silversectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#707070',
    marginBottom: 15,
    fontFamily: 'Roboto-Bold',
    marginLeft: 15,
  },
  scrollView: {
    flexDirection: 'row',
  },
  itemContainer: {
    width: 180,
    padding: 15,
    marginRight: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
  },
  
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Roboto-Bold',
    marginVertical: 10,
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
  },
  itemPoints: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    fontFamily: 'Roboto-Regular',
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: "center",
  },
  iconTextContainer: {
    alignItems: "center",
  },
  spacer: {
    height: 80, // Adjust this value to create enough space above the navbar
  },
  membershipCard: {
    marginVertical: 15,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
    height: 200,
  },
  topLeftBox: {
    position: 'absolute',
    top: 15,
    left: 20,
    backgroundColor: 'transparent',
  },
  petalText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFC1CC', 
    alignContent: 'center',
  },
  goldText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F5BF03', 
    left: 5,
  },
  topRightBox: {
    position: 'absolute',
    top: 15,
    right: 20,
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  expiryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  tierText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emeraldText: {
    color: '#50C878', // Emerald green color code
    fontWeight: 'bold', // Optional: Make it bold for emphasis
  },
  infoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 20,
    marginBottom : 5,
  },
  barcodeContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeImage: {
    width: 280,
    height: 40,
    resizeMode: 'contain',
  },
  barcodeNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
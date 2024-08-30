import { useState } from 'react';
import { Button, Image, View, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const win = Dimensions.get("window")
  const [image, setImage] = useState<string | null>(null);
  const [height, setHeight] = useState(win.height)
  const [width, setWidth] = useState(win.width)
  const [ratio, setRatio] = useState(1)
  const scale = 0.8

  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    //   aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setRatio(result.assets[0].height/ result.assets[0].width)
      setWidth(scale * win.width)
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{width:width, height:ratio * width}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get("window").width,
    height: 400,
  },
});

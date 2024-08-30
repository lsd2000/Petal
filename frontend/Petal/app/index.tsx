import { StyleSheet, Text, Image, View } from "react-native"; // Import View for the subcontainer
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { TextInput, Button } from "react-native-paper";
import * as React from "react";

export default function Index() {
  const [usertext, setUserText] = React.useState("");
  const [passwordtext, setPasswordText] = React.useState("");
  return (
    <SafeAreaView style={styles.background_container}>
      <View style={styles.subContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.imageStyle}
        />
        <ThemedText type="title" >
          Petal
        </ThemedText>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Username"
          value={usertext}
          onChangeText={(usertext) => setUserText(usertext)}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={passwordtext}
          onChangeText={(passwordtext) => setPasswordText(passwordtext)}
        />
        <View style={styles.buttonContainer}>
          <Button style={{backgroundColor:"#FC6C85"}}mode="contained" onPress={() => console.log("Pressed")}>
            Login
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background_container: {
    flex: 1,
    backgroundColor: "#FFC1CC",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    maxHeight: "12%",
  },
  imageStyle: {
    width: 150, // Define width
    height: 150, // Define height
    marginBottom: 20, // Space between the image and the text
  },

  formContainer: {
    minWidth: "70%",
    maxHeight: "1%",
    marginBottom: 150,
    gap: 10,
    padding:0,
    margin:0,
  },
  buttonContainer:{
    minHeight:"10%",
    margin: 20,
  }
});

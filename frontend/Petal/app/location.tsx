import React, { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

// simply using as mock data for simiplicity. a possibility is to just call the api once and store the data once 
const sampleRecyclingBins = [
  {
    id: 1,
    name: "Recycling Bin 1",
    latitude: 1.3521,
    longitude: 103.8198,  
  },
  {
    id: 2,
    name: "Recycling Bin 2",
    latitude: 1.3435,
    longitude: 103.8231,  
  },
  {
    id: 3,
    name: "Recycling Bin 3",
    latitude: 1.3478,
    longitude: 103.8103,  
  },
  {
    id: 4,
    name: "Recycling Bin 4",
    latitude: 1.2849,
    longitude: 103.8585,  
  },
  {
    id: 5,
    name: "Recycling Bin 5",
    latitude: 1.3039,
    longitude: 103.8318,  
  },
  {
    id: 6,
    name: "Recycling Bin 6",
    latitude: 1.3332,
    longitude: 103.7436, 
  },
  {
    id: 7,
    name: "Recycling Bin 7",
    latitude: 1.3324,
    longitude: 103.8474, 
  },
  {
    id: 8,
    name: "Recycling Bin 8",
    latitude: 1.3547,
    longitude: 103.9451,  
  },
  {
    id: 9,
    name: "Recycling Bin 9",
    latitude: 1.3508,
    longitude: 103.8723,  
  },
  {
    id: 10,
    name: "Recycling Bin 10",
    latitude: 1.4043,
    longitude: 103.7930,  
  },

];


export default function Locate() {

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recyclingBins, setRecyclingBins] = useState(sampleRecyclingBins);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Body content */}
      <View style={{ maxHeight:"100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
        {location ? (
          <MapView style={styles.map} initialRegion={location}>
            <Marker coordinate={location} title="Your Location" />
            {recyclingBins.map((bin) => (
              <Marker
                key={bin.id}
                coordinate={{ latitude: bin.latitude, longitude: bin.longitude }}
                title={bin.name}
                description={"Tap for more info"}
                pinColor="green"
              />
            ))}
          </MapView>
        ) : (
          <Text style={{}}>
            {errorMsg ? errorMsg : "Requesting permissions... "}
          </Text>
        )}
      </View>

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
            <Ionicons name="help-outline" size={24} color="black" />
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
  map: {
    width: "100%",
    height: "100%",
  },
});
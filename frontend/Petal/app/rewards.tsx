import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Linking, useColorScheme, Text, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function Home() {
  const colorScheme = useColorScheme(); // Gets the current theme (light or dark)
  
  // Fake user data
  const [userPoints, setUserPoints] = useState(19256); // Initial points
  
  const handleClaimReward = (pointsRequired: number, rewardName: string) => {
    if (userPoints >= pointsRequired) {
      setUserPoints(userPoints - pointsRequired);
      Alert.alert('Reward Claimed!', `You have successfully claimed ${rewardName}.`);
    } else {
      Alert.alert('Insufficient Points', 'You do not have enough points to claim this reward.');
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {/* Banner Image */}
        <Image
          source={require('../assets/images/topbanner.jpg')} // Replace with your local image path
          style={styles.banner}
        />

        {/* JUNHUI PUT UR CONTENT HERE, SCROLL SHUD BE ENABLED ALRDY*/}

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rewards</ThemedText>
      </ThemedView>

      <ThemedView style={styles.userInfoContainer}>
        <ThemedText type="subtitle" style={styles.userInfoText}>User: Shao Dong</ThemedText>
        <ThemedText type="subtitle" style={styles.userInfoText}>Points: {userPoints}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Gold Member Bonus</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {goldMemberItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.itemContainer}
              onPress={() => handleClaimReward(item.pointsRequired, item.name)}
            >
              <Image source={item.image} style={styles.itemImage} />
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.itemPoints}>Points Required: {item.pointsRequired}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Silver Member Bonus</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {silverMemberItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.itemContainer}
              onPress={() => handleClaimReward(item.pointsRequired, item.name)}
            >
              <Image source={item.image} style={styles.itemImage} />
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.itemPoints}>Points Required: {item.pointsRequired}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

        {/* Spacer to push navbar to the bottom */}
        <View style={styles.spacer} />
      </ScrollView>

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

// Sample items for Gold and Silver Members
const goldMemberItems = [
  {
    name: 'Grab Delivery Vouchers',
    description: '20% off on all store items.',
    image: require('@/assets/images/grab.png'),
    pointsRequired: 5000,
  },
  {
    name: 'Sheng Siong Vouchers',
    description: 'Free shipping on orders over $50.',
    image: require('@/assets/images/fairprice.jpg'),
    pointsRequired: 7000,
  },
  {
    name: 'Harvey Norman Discounts',
    description: '20% off on next purchase.',
    image: require('@/assets/images/harvey.jpg'),
    pointsRequired: 9000,
  },
  // Add more items as needed
];

const silverMemberItems = [
  {
    name: 'Yakun Discounts',
    description: '20% off on next purchase.',
    image: require('@/assets/images/yakun.jpg'),
    pointsRequired: 2000,
  },
  {
    name: 'Swensons Vouchers',
    description: '20% off on next purchase.',
    image: require('@/assets/images/swenson.png'),
    pointsRequired: 2000,
  },
  {
    name: 'Mac discounts',
    description: '20% off on next purchase.',
    image: require('@/assets/images/macs.png'),
    pointsRequired: 2000,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    paddingBottom: 80, // To ensure space for the navbar
  },
  banner: {
    width: '100%',
    height: 150, // Adjust the height as needed
    resizeMode: 'cover',
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
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  userInfoContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    padding: 20,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  scrollView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  itemContainer: {
    marginRight: 20,
    alignItems: 'center',
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemPoints: {
    fontSize: 12,
    color: '#333',
  },
});

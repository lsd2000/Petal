import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Alert, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

        {/* Title and User Info */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Rewards</ThemedText>
        </ThemedView>

        <ThemedView style={styles.userInfoContainer}>
          <ThemedText type="subtitle" style={styles.userInfoText}>User: Shao Dong</ThemedText>
          <ThemedText type="subtitle" style={styles.userInfoText}>Points: {userPoints}</ThemedText>
        </ThemedView>

        {/* Gold Member Bonus */}
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

        {/* Silver Member Bonus */}
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
            <Ionicons name="home-outline" size={24} color="#333" />
            <ThemedText style={styles.navText}>Home</ThemedText>
          </View>
        </Link>
        <Link href="/scan" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="search-outline" size={24} color="#333" />
            <ThemedText style={styles.navText}>Scan</ThemedText>
          </View>
        </Link>
        <Link href="/location" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="location-outline" size={24} color="#333" />
            <ThemedText style={styles.navText}>Locate</ThemedText>
          </View>
        </Link>
        <Link href="/rewards" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="gift-outline" size={24} color="#333" />
            <ThemedText style={styles.navText}>Rewards</ThemedText>
          </View>
        </Link>
        <Link href="/faq" style={styles.navButton}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="help-outline" size={24} color="#333" />
            <ThemedText style={styles.navText}>FAQ</ThemedText>
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
    description: '20% off next purchase',
    image: require('@/assets/images/grab.png'),
    pointsRequired: 5000,
  },
  {
    name: 'Sheng Siong Vouchers',
    description: '$50 shopping voucher',
    image: require('@/assets/images/fairprice.jpg'),
    pointsRequired: 7000,
  },
  {
    name: 'Harvey Norman Discounts',
    description: '20% off next purchase',
    image: require('@/assets/images/harvey.jpg'),
    pointsRequired: 9000,
  },
];

const silverMemberItems = [
  {
    name: 'Yakun Discounts',
    description: '20% off next purchase',
    image: require('@/assets/images/yakun.jpg'),
    pointsRequired: 2000,
  },
  {
    name: 'Swensons Vouchers',
    description: '$10 Voucher',
    image: require('@/assets/images/swenson.png'),
    pointsRequired: 2000,
  },
  {
    name: 'Mac Discounts',
    description: '$10 Voucher',
    image: require('@/assets/images/macs.png'),
    pointsRequired: 2000,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  scrollContentContainer: {
    paddingBottom: 80, // Ensure space for the navbar
  },
  banner: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  userInfoContainer: {
    marginVertical: 15,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Roboto-Regular',
  },
  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Roboto-Bold',
  },
  scrollView: {
    flexDirection: 'row',
  },
  itemContainer: {
    marginRight: 15,
    alignItems: 'center',
    width: 200,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  itemImage: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Roboto-Medium',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  itemPoints: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Roboto-Regular',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  navButton: {
    alignItems: 'center',
  },
  iconTextContainer: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  spacer: {
    height: 80, // Space to push navbar to the bottom
  },
});

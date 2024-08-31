import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Alert, useColorScheme, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Home() {
  const colorScheme = useColorScheme();
  
  // Fake user data
  const [userPoints, setUserPoints] = useState(19256); // Initial points
  
  const handleClaimReward = (pointsRequired: number, rewardName: string) => {
    if (userPoints < pointsRequired) {
      Alert.alert('Insufficient Points', 'You do not have enough points to claim this reward.');
      return;
    }
    
    Alert.alert(
      'Confirm Redemption',
      `Are you sure you want to claim "${rewardName}" for ${pointsRequired} points?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            setUserPoints(userPoints - pointsRequired);
            Alert.alert('Reward Claimed!', `You have successfully claimed ${rewardName}.`);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>

        <Image
          source={require('../assets/images/topbanner.jpg')}
          style={styles.banner}
        />
        <Text style={styles.infoText}>Lee Shaodong</Text>
        
        {/* Membership Card */}
        <ThemedView style={styles.membershipCard}>
          {/* Top Left - Petal and Gold */}
          <View style={styles.topLeftBox}>
            <Text style={styles.petalText}>Petal</Text>
            <Text style={styles.goldText}>Gold</Text>
          </View>

          {/* Top Right - Points Info */}
          <View style={styles.topRightBox}>
            <Text style={styles.pointsText}>{userPoints} points</Text>
            <Text style={styles.expiryText}>Expiry: 31/12/2025</Text>
            <Text style={styles.tierText}>
              11750 points to <Text style={styles.emeraldText}>Emerald</Text>
            </Text>
          </View>

          {/* Barcode */}
          <View style={styles.barcodeContainer}>
            <Image
              source={require('../assets/images/barcode.png')} // Replace with your barcode image
              style={styles.barcodeImage}
            />
            <Text style={styles.barcodeNumber}>1234 5678 9012 3456</Text>
          </View>

        </ThemedView>

        {/* Rest of the content remains the same */}
        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.goldsectionTitle}>Gold Member Bonus</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            {goldMemberItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.itemContainer}
                onPress={() => handleClaimReward(item.pointsRequired, item.name)}
              >
                <Image source={item.image} style={styles.itemImage} />
                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                <ThemedText style={styles.itemPoints}>Points Required: {item.pointsRequired}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.silversectionTitle}>Silver Member Bonus</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
            {silverMemberItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.itemContainer}
                onPress={() => handleClaimReward(item.pointsRequired, item.name)}
              >
                <Image source={item.image} style={styles.itemImage} />
                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                <ThemedText style={styles.itemPoints}>Points Required: {item.pointsRequired}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>

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
            <Ionicons name="gift" size={24} color="black" />
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
    </View>
  );
}

// Sample items for Gold and Silver Members
const goldMemberItems = [
  {
    name: '$20 GrabFood Vouchers',
    image: require('@/assets/images/grab.png'),
    pointsRequired: 5000,
  },
  {
    name: '$50 Sheng Siong Vouchers',
    image: require('@/assets/images/fairprice.jpg'),
    pointsRequired: 7000,
  },
  {
    name: 'Harvey Norman 10% Discounts',
    image: require('@/assets/images/harvey.jpg'),
    pointsRequired: 9000,
  },
];

const silverMemberItems = [
  {
    name: '$5 Yakun Discounts',
    image: require('@/assets/images/yakun.png'),
    pointsRequired: 2000,
  },
  {
    name: '$10 Swensons Vouchers',
    image: require('@/assets/images/swenson.png'),
    pointsRequired: 2000,
  },
  {
    name: '$10 MacDonalds Vouchers',
    image: require('@/assets/images/macs.png'),
    pointsRequired: 2000,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContentContainer: {
    paddingBottom: 80,
  },
  banner: {
    width: '100%',
    height: 150,
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

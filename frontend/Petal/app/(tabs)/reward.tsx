import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView'; // Assuming you have this component

export default function Rewards() {
  const colorScheme = useColorScheme(); // Gets the current theme (light or dark)
  
  // Fake user data
  const [userPoints, setUserPoints] = useState(19256); // Initial points
  
  const handleClaimReward = (pointsRequired, rewardName) => {
    if (userPoints >= pointsRequired) {
      setUserPoints(userPoints - pointsRequired);
      Alert.alert('Reward Claimed!', `You have successfully claimed ${rewardName}.`);
    } else {
      Alert.alert('Insufficient Points', 'You do not have enough points to claim this reward.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/petal.jpg')} // Replace with your image URL
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rewards</ThemedText>
      </ThemedView>

      {/* User Information */}
      <ThemedView style={styles.userInfoContainer}>
        <ThemedText type="subtitle">User: Shao Dong</ThemedText>
        <ThemedText type="subtitle">Points: {userPoints}</ThemedText>
      </ThemedView>

      {/* Gold Member Bonus Section */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Gold Member Bonus</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {goldMemberItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.itemContainer}
              onPress={() => handleClaimReward(item.pointsRequired, item.name)}
            >
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.itemPoints}>Points Required: {item.pointsRequired}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* Silver Member Bonus Section */}
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="subtitle">Silver Member Bonus</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {silverMemberItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.itemContainer}
              onPress={() => handleClaimReward(item.pointsRequired, item.name)}
            >
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <ThemedText style={styles.itemName}>{item.name}</ThemedText>
              <ThemedText style={styles.itemDescription}>{item.description}</ThemedText>
              <ThemedText style={styles.itemPoints}>Points Required: {item.pointsRequired}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Sample items for Gold and Silver Members
const goldMemberItems = [
  {
    name: 'Gold Member Exclusive Item 1',
    description: '20% off on all store items.',
    image: 'https://example.com/item1.jpg', // Replace with actual item image URL
    pointsRequired: 5000,
  },
  {
    name: 'Gold Member Exclusive Item 2',
    description: 'Free shipping on orders over $50.',
    image: 'https://example.com/item2.jpg', // Replace with actual item image URL
    pointsRequired: 7000,
  },
  // Add more items as needed
];

const silverMemberItems = [
  {
    name: 'Silver Member Exclusive Item 1',
    description: 'Free item with every purchase over $50.',
    image: 'https://example.com/item1.jpg', // Replace with actual item image URL
    pointsRequired: 3000,
  },
  {
    name: 'Silver Member Exclusive Item 2',
    description: '10% off on select items.',
    image: 'https://example.com/item2.jpg', // Replace with actual item image URL
    pointsRequired: 4000,
  },
  // Add more items as needed
];

const styles = StyleSheet.create({
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
  },
  sectionContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  scrollView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  itemContainer: {
    marginRight: 20,
    alignItems: 'center',
    width: 150,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  itemPoints: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});

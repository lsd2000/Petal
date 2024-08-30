import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Linking, useColorScheme } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Rewards() {
  const colorScheme = useColorScheme(); // Gets the current theme (light or dark)

  const handlePress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL", err));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://example.com/header-image.jpg' }} // Replace with your image URL
            style={styles.headerImage}
          />
          <ThemedText style={styles.headerTitle}>Rewards</ThemedText>
        </View>

        {/* Rewards List */}
        <View style={styles.rewardsContainer}>
          <RewardItem
            title="Gold Member Bonus"
            description="Enjoy a 20% discount on all items in our store."
            onPress={() => handlePress('https://example.com/gold-bonus')}
          />
          <RewardItem
            title="Silver Member Bonus"
            description="Get a free item with every purchase over $50."
            onPress={() => handlePress('https://example.com/silver-bonus')}
          />
          {/* Add more RewardItem components as needed */}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const RewardItem = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.rewardItem} onPress={onPress}>
    <View style={styles.rewardContent}>
      <ThemedText style={styles.rewardTitle}>{title}</ThemedText>
      <ThemedText style={styles.rewardDescription}>{description}</ThemedText>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#888" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // You can change this based on colorScheme
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  rewardsContainer: {
    marginTop: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

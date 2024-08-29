import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Linking, useColorScheme } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Welcome() {
  const colorScheme = useColorScheme(); // Gets the current theme (light or dark)

  const handlePress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL", err));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/petal.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome Shao Dong!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Membership Status and Points Containers */}
      <View style={styles.containerRow}>
        <ThemedView style={[styles.pointsContainer, colorScheme === 'dark' && styles.darkMode]}>
          <ThemedText>Membership:</ThemedText>
          <View style={styles.membershipRow}>
            <Ionicons name="medal-outline" size={24} color="#FFD700" />
            <ThemedText type="subtitle">Gold</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={[styles.pointsContainer, colorScheme === 'dark' && styles.darkMode]}>
          <ThemedText>Points:</ThemedText>
          <ThemedText type="subtitle">19,256</ThemedText>
        </ThemedView>
      </View>

      {/* Events Row */}
      <ThemedView style={styles.eventsContainer}>
        <ThemedText type="subtitle">Events you may like</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {eventsData.map((event, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.eventItem}
              onPress={() => handlePress(event.url)}
            >
              <Image source={event.image} style={styles.eventImage} />
              <ThemedText style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                {event.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {/* News Row */}
      <ThemedView style={styles.newsContainer}>
        <ThemedText type="subtitle">Latest News</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {newsData.map((news, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.newsItem}
              onPress={() => handlePress(news.url)}
            >
              <Image source={news.image} style={styles.newsImage} />
              <ThemedText style={styles.newsDescription} numberOfLines={1} ellipsizeMode="tail">
                {news.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
            
    </ParallaxScrollView>
  );
}

// Sample event data
const eventsData = [
  { 
    image: require('@/assets/images/terrarium.jpg'), 
    description: 'Terrarium Workshop',
    url: 'https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/upcycling-terrarium-workshop/'
  },
  { 
    image: require('@/assets/images/pencil.jpg'), 
    description: 'Pencil Holder Workshop',
    url: 'https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/upcycling-toilet-roll-stationery-holder/'
  },
  { 
    image: require('@/assets/images/candle.jpg'), 
    description: 'Soy Candle Workshop',
    url: 'https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/#'
  },
  { 
    image: require('@/assets/images/piggy.jpg'), 
    description: 'Pet Bottle Piggy Bank Workshop',
    url: 'https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/4-pet-bottle-piggy-bank-workshop/'
  },
];

const newsData = [
  { 
    image: require('@/assets/images/recycle.png'), 
    description: 'Why is Singapore\'s recycling rate falling? ',
    url: 'https://www.straitstimes.com/singapore/why-is-singapore-s-recycling-rate-falling'
  },
  { 
    image: require('@/assets/images/bottle.jpg'), 
    description: 'Beverage container return scheme launch pushed back by a year',
    url: 'https://www.channelnewsasia.com/singapore/beverage-container-return-scheme-pushed-back-recycling-producers-request-4516481'
  },
  { 
    image: require('@/assets/images/bags.png'), 
    description: 'Supermarkets ordering less plastic bags',
    url: 'https://www.channelnewsasia.com/watch/supermarkets-ordering-less-plastic-bags-demand-other-retailers-still-high-manufacturers-4455246'
  },
  { 
    image: require('@/assets/images/contam.png'), 
    description: 'Contamination of several batches of recyclable items',
    url: 'https://www.channelnewsasia.com/singapore/recycling-contamination-food-waste-awareness-education-4423631'
  },
];

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures space between the two containers
    padding: 10, // Adjust padding as needed
  },
  pointsContainer: {
    flex: 1, // Flexibility to occupy half the screen
    marginLeft: 10, // Margin to add space between the two containers
    padding: 15,
    backgroundColor: '#FFF', // Default background color for light mode
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  darkMode: {
    backgroundColor: '#333', // Dark mode background color
    // You can also add other dark mode styles here
  },
  membershipRow: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically align the icon and text
    gap: 8, // Add space between the icon and text (optional)
  },
  eventsContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  newsContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  scrollView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  eventItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  eventImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  eventDescription: {
    textAlign: 'center',
    width: 150,
    overflow: 'hidden', // Ensure overflow is hidden
  },
  newsItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  newsImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  newsDescription: {
    textAlign: 'center',
    width: 150,
    overflow: 'hidden', // Ensure overflow is hidden
  },
});

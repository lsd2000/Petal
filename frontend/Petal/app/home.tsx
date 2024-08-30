import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        {/* Banner Image */}
        <Image
          source={require('../assets/images/topbanner.jpg')} // Replace with your local image path
          style={styles.banner}
        />

        {/* Welcome Message */}
        <Text style={styles.welcomeText}>Welcome Shaodong! 👋</Text>

        {/* Membership and Points Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Membership:</Text>
            <View style={styles.infoValueContainer}>
              <Ionicons name="medal-outline" size={20} color="#F5BF03" />
              <Text style={styles.infoValueGold}>Gold</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Current Points:</Text>
            <Text style={styles.infoValueBlack}>8250</Text>
          </View>
        </View>

        {/* Event Section */}
        <Text style={styles.eventText}>Events you may like:</Text>

        {/* Horizontal Scroller for Events */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventScroller}>
          {/* Repeat for each event */}
          <TouchableOpacity onPress={() => Linking.openURL('https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/upcycling-terrarium-workshop/')}>
            <View style={styles.eventContainer}>
              <Image source={require('../assets/images/terrarium.jpg')} style={styles.eventImage} />
              <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Terrarium Workshop
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/#')}>
            <View style={styles.eventContainer}>
            <Image source={require('../assets/images/candle.jpg')} style={styles.eventImage} />
            <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Soy Candle Workshop
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/upcycling-self-watering-planter/')}>
            <View style={styles.eventContainer}>
            <Image source={require('../assets/images/piggy.jpg')} style={styles.eventImage} />
            <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Pet Bottle Self-Watering Planter Workshop
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.ecoponics.com.sg/science-environment-workshops/upcycling-workshops/upcycling-toilet-roll-stationery-holder/')}>
            <View style={styles.eventContainer}>
            <Image source={require('../assets/images/pencil.jpg')} style={styles.eventImage} />
            <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Pencil Holder Workshop
            </Text>
            </View>
        </TouchableOpacity>
        </ScrollView>

        {/* News Section */}
        <Text style={styles.newsText}>Latest Recycling News:</Text>

        {/* Horizontal Scroller for News */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventScroller}>
          {/* Repeat for each news item */}
          <TouchableOpacity onPress={() => Linking.openURL('https://www.straitstimes.com/singapore/why-is-singapore-s-recycling-rate-falling')}>
            <View style={styles.eventContainer}>
              <Image source={require('../assets/images/recycle.png')} style={styles.eventImage} />
              <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Why is Singapore's recycling rate falling?
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.channelnewsasia.com/singapore/beverage-container-return-scheme-pushed-back-recycling-producers-request-4516481')}>
            <View style={styles.eventContainer}>
            <Image source={require('../assets/images/bottle.jpg')} style={styles.eventImage} />
            <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Beverage container return scheme launch pushed back by a year
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.channelnewsasia.com/watch/supermarkets-ordering-less-plastic-bags-demand-other-retailers-still-high-manufacturers-4455246')}>
            <View style={styles.eventContainer}>
            <Image source={require('../assets/images/bags.png')} style={styles.eventImage} />
            <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Supermarkets ordering less plastic bags
            </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.channelnewsasia.com/singapore/recycling-contamination-food-waste-awareness-education-4423631')}>
            <View style={styles.eventContainer}>
            <Image source={require('../assets/images/contam.png')} style={styles.eventImage} />
            <Text style={styles.eventDescription} numberOfLines={1} ellipsizeMode="tail">
                Contamination of several batches of recyclable items
            </Text>
            </View>
        </TouchableOpacity>
        </ScrollView>

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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20, // Add vertical margin for spacing
    marginHorizontal: 16, // Maintain horizontal padding if needed
  },
  eventText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20, // Add vertical margin for spacing
    marginHorizontal: 16, // Maintain horizontal padding if needed
  },
  newsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20, // Add vertical margin for spacing
    marginHorizontal: 16, // Maintain horizontal padding if needed
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
    alignItems: 'center', // Center content horizontally
  },
  infoTitle: {
    fontSize: 18,
    marginBottom: 5, // Space between title and value
  },
  infoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoValueGold: {
    fontSize: 16,
    color: '#F5BF03', // Gold color
    fontWeight: 'bold',
    marginLeft: 8, // Space between icon and text
  },
  infoValueBlack: {
    fontSize: 18,
    color: 'black', // Black color
    fontWeight: 'bold',
    marginTop: 4,
  },
  eventScroller: {
    marginHorizontal: 16,
  },
  eventContainer: {
    width: 150,
    marginRight: 16,
  },
  eventImage: {
    width: '100%',
    height: 100, // Adjust the height as needed
    borderRadius: 8,
  },
  eventDescription: {
    fontSize: 14,
    marginTop: 4, // Reduce space between image and text
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
});

import React, { useState, useRef } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, View, Text, Image, ScrollView, Linking, TouchableOpacity, Animated, Easing, Modal, Pressable } from 'react-native';

export default function Home() {
  const [flipped, setFlipped] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: flipped ? 0 : 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const rotateY = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

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
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoBox}>
            <Text style={styles.infoTitle}>Lifetime Earnings:</Text>
            <Text style={styles.infoValueBlack}>48250</Text>
          </TouchableOpacity>
        </View>

        {/* Tip of the Day Card */}
        <TouchableOpacity onPress={flipCard}>
          <View style={styles.tipCardContainer}>
            <Animated.View style={[
              styles.tipCard,
              {
                transform: [{ rotateY }],
              },
            ]}>
              {/* Front Side of the Card */}
              <Animated.View style={[
                styles.cardFace,
                styles.cardFront,
                {
                  opacity: frontOpacity,
                },
              ]}>
                <View style={styles.cardFrontContent}>
                  <Image
                    source={require('../assets/images/icon2.png')} // Replace with your local image path
                    style={styles.tipIcon}
                  />
                  <Text style={styles.tipFrontText}>Tip of the Day</Text>
                </View>
              </Animated.View>
              {/* Back Side of the Card */}
              <Animated.View style={[
                styles.cardFace,
                styles.cardBack,
                {
                  opacity: backOpacity,
                },
              ]}>
                <Text style={styles.tipBackText}>
                  Remember to recycle your plastic bottles by rinsing them before disposal to ensure they are properly processed. Proper recycling helps conserve natural resources and reduces pollution.
                </Text>
              </Animated.View>
            </Animated.View>
          </View>
        </TouchableOpacity>

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
            <Ionicons name="information-circle-outline" size={24} color="black" />
            <Text>FAQ</Text>
          </View>
        </Link>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Image
            source={require('@/assets/images/leaderboard.png')}
            style={styles.modalImage}
          />
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  banner: {
    width: '100%',
    height: 150,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
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
  tipCardContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    height: 200, // Set height to accommodate card flip
  },
  tipCard: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
    overflow: 'hidden', // Ensures content is clipped to card border
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: '#FDD9E5',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cardBack: {
    backgroundColor: '#FFEBEF',
    transform: [{ rotateY: '180deg' }],
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  tipFrontText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipBackText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    padding: 15,
  },
  tipIcon: {
    width: 100,
    height: 70,
    marginBottom: 10, // Space between image and text
  },
  eventText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  newsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
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
  cardFrontContent: {
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Colors } from "@/constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
  const router = useRouter();
  const [latestTrip, setLatestTrip] = useState(null);

  useEffect(() => {
    if (userTrips && userTrips.length > 0) {
      const lastTrip = JSON.parse(userTrips[userTrips.length - 1].tripData);
      setLatestTrip(lastTrip);
    }
  }, [userTrips]);

  if (!latestTrip) {
    return null;
  }

  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth * 0.8;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={styles.imageContainer}>
        {latestTrip.location?.photoReference ? (
          <Image
            source={{
              uri:
                'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
                latestTrip.location.photoReference +
                '&key=AIzaSyBaKrmxRVY07K3wocP7ecVrqmWxZTD2K-w', // Substitua sua chave aqui
            }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require('@/assets/images/place.jpeg')}
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoContent}>
          <View style={styles.infoDetails}>
            <Text style={styles.locationName}>
              {latestTrip.location?.name}
            </Text>
            <Text style={styles.infoText}>
              {moment(latestTrip.startDate).format("DD MMM YYYY")}
            </Text>
            <Text style={styles.infoText}>
              {latestTrip.traveler.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              const trip = userTrips[userTrips.length - 1];
              router.push({
                pathname: '/trip-details',
                params: {
                  trip: JSON.stringify(trip),
                },
              });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Ver mais
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{textAlign:'center', fontSize: 18, fontFamily:'outfit-bold', marginTop: 15}}>Locais já visitados</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {userTrips.map((trip, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() =>
              router.push({
                pathname: '/trip-details',
                params: {
                  trip: JSON.stringify(trip),
                },
              })
            }
          >
            <UserTripCard trip={trip} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 30,
  },
  infoContainer: {
    padding: 12,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontFamily: "outfit-bold",
  },
  infoText: {
    fontSize: 12,
    fontFamily: "outfit-regular",
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.BLACK,
    padding: 7,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "outfit-regular",
    color: Colors.WHITE,
  },
  scrollContainer: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginTop: 10,
    padding: 3,
    width: Dimensions.get('window').width * 0.9,
    marginRight: 5,
  },
});

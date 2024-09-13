import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import moment from 'moment';
import { GetPhotoRef } from '@/configs/GooglePlaceApi';

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripData, setTripData] = useState(null);
  const [imageError, setImageError] = useState({});
  const [backButtonColor, setBackButtonColor] = useState(Colors.WHITE);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerBackTitleVisible: false,
      headerBackImage: () => (
        <View style={{ padding: 10, backgroundColor: backButtonColor }}>
          {/* Your custom back button */}
          <Text style={{ color: Colors.WHITE }}>Back</Text>
        </View>
      ),
    });

    try {
      if (trip) {
        const parsedTrip = JSON.parse(trip);
        setTripData(parsedTrip);
      }
    } catch (error) {
      console.error("Erro ao fazer o parse do JSON:", error);
    }
  }, [trip]);

  if (!tripData) {
    return <View><Text>Loading...</Text></View>;
  }

  const fetchPhotoReference = async (placeName) => {
    try {
      const data = await GetPhotoRef({ placeName });
      if (data.results && data.results.length > 0 && data.results[0].photos) {
        return data.results[0].photos[0].photo_reference;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar foto:", error);
      return null;
    }
  };

  const getGooglePlacesPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return 'https://via.placeholder.com/400x300.png?text=Imagem+Não+Disponível';
    }
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=AIzaSyBaKrmxRVY07K3wocP7ecVrqmWxZTD2K-w`;
  };

  const handleImageError = async (placeName, index) => {
    const photoReference = await fetchPhotoReference(placeName);
    const imageUrl = getGooglePlacesPhotoUrl(photoReference);
    setImageError(prev => ({ ...prev, [index]: imageUrl }));
  };

  const handlePress = async (url) => {
    if (url) {
      await Linking.openURL(url);
    }
  };

  const sortedItinerary = Object.entries(tripData.trip.itinerary).sort(([dayA], [dayB]) => {
    const dayNumberA = parseInt(dayA.replace('day', ''), 10);
    const dayNumberB = parseInt(dayB.replace('day', ''), 10);
    return dayNumberA - dayNumberB;
  });

  return (
    <ScrollView contentContainerStyle={{ marginBottom: 30 }}>
      {tripData.location && (
        <Image
          source={{ uri: getGooglePlacesPhotoUrl(tripData.location.photoReference) }}
          style={{ width: '100%', height: 330 }}
          onError={() => handleImageError(tripData.location.name, 'location')}
        />
      )}

      <View style={{ padding: 15, backgroundColor: Colors.WHITE, marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        {tripData.location && (
          <Text style={{ fontSize: 25, fontFamily: 'outfit-bold', marginTop: 10 }}>
            {tripData.location.name}
          </Text>
        )}
        <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 15, color: Colors.GRAY }}>
            {moment(tripData.startDate).format("DD/MM/YYYY")}
          </Text>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 15, color: Colors.GRAY }}>
            - {moment(tripData.endDate).format("DD/MM/YYYY")}
          </Text>
        </View>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 14, color: Colors.GRAY }}>Viajando:  <Text style={{ fontFamily: "outfit-regular", fontSize: 15, color: Colors.GRAY }}>{tripData.traveler.title}</Text> </Text>
        
        {/* Replace the URL text with a button */}
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 14, color: Colors.GRAY }}>
        Pesquise por linhas áreas:
        </Text>
        <TouchableOpacity onPress={() => handlePress(tripData.trip.flight.booking_url)}
         style={{ marginLeft: 5, padding: 5,  backgroundColor: Colors.BLACK, borderRadius: 10, justifyContent:'center' }}>
            <Text style={{ fontFamily: "outfit-regular", fontSize: 12, color: Colors.WHITE }}>
              Pesquise
            </Text>
          </TouchableOpacity>
        </View>
       
        
        <Text style={{ fontFamily: "outfit-bold", fontSize: 14, color: Colors.GRAY }}>Preço da passagem:   <Text style={{ fontFamily: "outfit-regular", fontSize: 15, color: Colors.GRAY }}>{tripData.trip.flight.price}</Text></Text>

        <Text style={{ fontSize: 18, fontFamily: 'outfit-bold', marginTop: 20 }}>Hóteis recomendados</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 15 }}>
          {tripData.trip.hotel.map((hotel, index) => (
            <View key={index} style={{ width: 180, marginRight: 15 }}>
              <Image
                source={{ uri: imageError[index] || getGooglePlacesPhotoUrl(hotel.image_url) }}
                style={{ width: 180, height: 110, borderRadius: 10 }}
                onError={() => handleImageError(hotel.name, index)}
              />
              <Text style={{ fontFamily: "outfit-bold", fontSize: 15, marginTop: 10 }}>{hotel.name}</Text>
              <Text style={{ fontFamily: "outfit-medium", fontSize: 13, color: Colors.GRAY }}>{hotel.address}</Text>
              <Text style={{ fontFamily: "outfit-medium", fontSize: 12, color: Colors.GRAY, marginTop: 5 }}>Preço: {hotel.price}</Text>
              <Text style={{ fontFamily: "outfit-medium", fontSize: 12, color: Colors.GRAY, marginTop: 5 }}>Rating: {hotel.rating}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 10 }}>
          {tripData.trip.details && Object.entries(tripData.trip.details).map(([day, detail]) => (
            <View key={day} style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: "outfit-bold", fontSize: 16 }}>{detail.time}</Text>
              <Text style={{ fontFamily: "outfit-medium", fontSize: 14, marginTop: 5 }}>{detail.activity}</Text>
              <Text style={{ fontFamily: "outfit-regular", fontSize: 14, color: Colors.GRAY }}>{detail.details}</Text>
              <Image
                source={{ uri: imageError[index] || getGooglePlacesPhotoUrl(detail.photo_reference) }}
                style={{ width: '100%', height: 150, borderRadius: 10, marginTop: 10 }}
                onError={() => handleImageError(detail.activity, index)}
              />
            </View>
          ))}
        </View>

        <Text style={{ fontFamily: "outfit-bold", fontSize: 18, marginTop: 10 }}>Melhor época para visitar</Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 14, color: Colors.GRAY, marginTop: 5 }}>
          {tripData.trip?.bestTimeToVisit}
        </Text>

        <Text style={{ fontFamily: "outfit-bold", fontSize: 18, marginTop: 20 }}>Itinerário</Text>
        {sortedItinerary.map(([day, details], index) => (
          day.startsWith('day') && (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ fontFamily: "outfit-bold", fontSize: 16 }}>{details.time}</Text>
              <Text style={{ fontFamily: "outfit-regular", fontSize: 14, marginTop: 5 }}>{details.activity}</Text>
              <Text style={{ fontFamily: "outfit-light", fontSize: 14, color: Colors.GRAY }}>{details.details}</Text>
              <Image
                source={{ uri: imageError[index] || getGooglePlacesPhotoUrl(details.photo_reference) }}
                style={{ width: '100%', height: 150, borderRadius: 10, marginTop: 10 }}
                onError={() => handleImageError(details.activity, index)}
              />
            </View>
          )
        ))}
      </View>
    </ScrollView>
  );
}

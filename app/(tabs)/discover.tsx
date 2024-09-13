import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const fetchPlaceDetails = async (placeName: string, apiKey: string) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${apiKey}`);
  const data = await response.json();
  return data.results;
};

const fetchPlacePhotos = async (photoReference: string, apiKey: string) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiKey}`);
  return response.url;
};

export default function Discover() {
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [touristAttractions, setTouristAttractions] = useState([]); // Estado para pontos turísticos
  const [loading, setLoading] = useState(true);
  const apiKey = 'AIzaSyBaKrmxRVY07K3wocP7ecVrqmWxZTD2K-w';
  const router = useRouter();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const restaurantName = 'restaurant';
        const hotelName = 'hotel';
        const touristAttractionName = 'tourist attraction'; // Nome para pontos turísticos

        // Fetch Restaurants
        const restaurantsData = await fetchPlaceDetails(restaurantName, apiKey);
        const restaurantsWithPhotos = await Promise.all(restaurantsData.map(async (place: any) => {
          const photoUrl = place.photos ? await fetchPlacePhotos(place.photos[0].photo_reference, apiKey) : null;
          return { ...place, photoUrl };
        }));

        // Fetch Hotels
        const hotelsData = await fetchPlaceDetails(hotelName, apiKey);
        const hotelsWithPhotos = await Promise.all(hotelsData.map(async (place: any) => {
          const photoUrl = place.photos ? await fetchPlacePhotos(place.photos[0].photo_reference, apiKey) : null;
          return { ...place, photoUrl };
        }));

        // Fetch Tourist Attractions
        const touristAttractionsData = await fetchPlaceDetails(touristAttractionName, apiKey);
        const touristAttractionsWithPhotos = await Promise.all(touristAttractionsData.map(async (place: any) => {
          const photoUrl = place.photos ? await fetchPlacePhotos(place.photos[0].photo_reference, apiKey) : null;
          return { ...place, photoUrl };
        }));

        setRestaurants(restaurantsWithPhotos);
        setHotels(hotelsWithPhotos);
        setTouristAttractions(touristAttractionsWithPhotos); // Salva pontos turísticos
      } catch (error) {
        console.error('Error fetching place details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 0.5,
        overflow: 'hidden',
        width: 150,
      }}
      onPress={() => router.push(`/${item.place_id}`)}
    >
      {item.photoUrl ? (
        <Image
          source={{ uri: item.photoUrl }}
          style={{ width: 150, height: 100 }}
        />
      ) : (
        <View
          style={{
            width: 150,
            height: 100,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'outfit-regular', fontSize: 10 }}>Sem Imagem</Text>
        </View>
      )}
      <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
        <Text style={{ fontSize: 11, fontFamily: 'outfit-bold' }}>{item.name}</Text>
        <Text style={{ fontFamily: 'outfit-regular', fontSize: 10, color: '#888', marginTop: 5 }}>{item.formatted_address}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20, width: '100%', height:'100%' }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 10, marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 18, color: Colors.BLACK }}>Locais próximos</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Restaurantes Próximos */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 16, color: Colors.BLACK, marginBottom: 5 }}>Restaurantes próximos</Text>
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={item => item.place_id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 10, paddingRight: 10,  }}
          />
        </View>

        {/* Hotéis Próximos */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 16, color: Colors.BLACK, marginBottom: 10 }}>Hotéis próximos</Text>
          <FlatList
            data={hotels}
            renderItem={renderItem}
            keyExtractor={item => item.place_id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </View>

        {/* Pontos Turísticos Próximos */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 16, color: Colors.BLACK, marginBottom: 10 }}>Pontos mais visitados</Text>
          <FlatList
            data={touristAttractions}
            renderItem={renderItem}
            keyExtractor={item => item.place_id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

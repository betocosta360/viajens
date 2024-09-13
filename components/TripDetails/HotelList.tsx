import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

// Definindo o tipo para os dados dos hotéis
type Hotel = {
  address: string;
  description: string;
  geo_coordinates: {
    latitude: number;
    longitude: number;
  };
  image_url: string;
  name: string;
  placesNearby: Array<{
    address: string;
    description: string;
    geo_coordinates: {
      latitude: number;
      longitude: number;
    };
    image_url: string;
    placeName: string;
    ticket_pricing: string;
    time_to_travel: string;
    price: string;
    rating: string;
  }>;
};

type HotelListProps = {
  hotels: Hotel[];
};

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 15 }}>
      <Text>Testando</Text>
    </ScrollView>
  );
};

export default HotelList;

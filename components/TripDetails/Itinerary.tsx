import { View, Text } from 'react-native';
import React from 'react';

// Definindo o tipo para o itinerário
type ItineraryType = {
  [key: string]: {
    time: string;
    activity: string;
    details: string;
  };
};

export default function Itinerary({ itinerary }: { itinerary: ItineraryType | undefined }) {
  if (!itinerary) {
    return (
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 15 }}>
        Itinerário não disponível.
      </Text>
    );
  }

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Itinerário</Text>
      {Object.keys(itinerary).map((day, index) => (
        <View key={index} style={{ marginBottom: 15 }}>
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 }}>
            {day} - {itinerary[day].time}
          </Text>
          <Text>{itinerary[day].activity}</Text>
          <Text>{itinerary[day].details}</Text>
        </View>
      ))}
    </View>
  );
}

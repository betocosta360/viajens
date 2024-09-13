import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function FlightInfo({flightData}) {
  const [tripData, setTripData] = useState(); // Inicialize com null ou um objeto vazio
  return (
    <View>

<Text style={{ fontFamily: "outfit-bold", fontSize: 15, color: Colors.GRAY }}>Viajando: {tripData.traveler.title}</Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 15, color: Colors.GRAY }}>Vou: {tripData.trip.flight.details}</Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 15, color: Colors.GRAY }}>Preço da passagem: R$ {tripData.trip.flight.price}</Text>
       
    </View>
  )
}
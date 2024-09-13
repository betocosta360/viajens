import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '@/constants/Colors';

export default function UserTripCard({ trip }) {
  const tripData = JSON.parse(trip.tripData);

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{
          uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
            + tripData.location.photoReference
            + '&key=AIzaSyBaKrmxRVY07K3wocP7ecVrqmWxZTD2K-w' // Substitua sua chave aqui
        }}
        style={styles.image}
      />

      <View style={styles.textContainer}>
        <Text style={styles.locationName}>
          {tripData.location?.name || 'Localização não especificada'}
        </Text>
        <Text style={styles.date}>
          Data: {moment(tripData.startDate).format("DD/MM/YYYY")}
        </Text>
        <Text style={styles.traveler}>
          Viajem: {tripData.traveler.title}
        </Text>
      </View>
    </View>
  ); 
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    padding: 14,  // Reduzido padding
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 10,  // Reduzido borderRadius
    backgroundColor: Colors.WHITE,
    marginVertical: 1,  // Reduzido marginVertical
    shadowColor: '#000',  // Cor da sombra
    shadowOffset: { width: 0, height: 1 },  // Offset da sombra
    shadowOpacity: 0.5,  // Opacidade da sombra
    shadowRadius: 2,  // Raio da sombra
    elevation: 1,  // Altura da sombra no Android
  },
  image: {
    width: 100,  // Reduzido width
    height: 100,  // Reduzido height
    borderRadius: 16,  // Ajustado borderRadius
    marginRight: 9,  // Reduzido marginRight
  },
  textContainer: {
    flex: 1,
  },
  locationName: {
    fontFamily: "outfit-bold",
    fontSize: 12,  // Reduzido fontSize
  },
  subtitle: {
    fontFamily: "outfit-regular",
    fontSize: 14,  // FontSize para o subtítulo
    color: Colors.GRAY,
    marginVertical: 2,  // Espaçamento vertical para o subtítulo
  },
  date: {
    fontFamily: "outfit-regular",
    fontSize: 12,  // Reduzido fontSize
    color: Colors.GRAY,
  },
  traveler: {
    fontFamily: "outfit-regular",
    fontSize: 12,  // Reduzido fontSize
    color: Colors.GRAY,
  },
});

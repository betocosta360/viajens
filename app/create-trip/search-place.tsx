import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "@/context/CreateTripContext";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const handlePlaceSelection = (data, details = null) => {
    const locationName = data.description;
    const coordinates = details?.geometry.location;
    const photoReference = details?.photos?.[0]?.photo_reference;
    const url = details?.url;

    if (tripData && tripData.traveler) {
      setTripData((prevTripData) => ({
        ...prevTripData,
        location: {
          name: locationName,
          coordinates: coordinates,
          photoReference: photoReference,
          url: url,
        },
      }));
    }

    router.push("/create-trip/select-traveler");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
    source={require("@/assets/images/search.jpg")} // Substitua pela URL da sua imagem de fundo
      style={styles.background}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.title}>Para onde vamos...</Text>
        <GooglePlacesAutocomplete
          placeholder="Encontre sua Trip..."
          fetchDetails={true}
          onFail={(error) => console.log(error)}
          onPress={handlePlaceSelection}
          query={{
            key: "AIzaSyBaKrmxRVY07K3wocP7ecVrqmWxZTD2K-w", // Substitua pela sua chave da API do Google Maps
            language: "pt-BR",
          }}
          styles={{
            textInputContainer: {
              borderRadius: 5,
              marginTop: 25,
              //borderWidth: 1,
              alignItems: 'center',
            },
            textInput: {
              height: 40,
              color: Colors.BLACK,
              fontFamily: 'outfit-medium',
              fontSize: 18,
            },
            predefinedPlacesDescription: {
              color: Colors.BLACK,
            },
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Para cobrir toda a área da tela
  },
  overlay: {
    flex: 1,
    padding: 26,
    paddingTop: 75,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Cor do overlay com transparência
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginTop: 10,
    color: Colors.WHITE,
  },
});

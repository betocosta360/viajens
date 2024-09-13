import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SelectTravelerList } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { CreateTripContext } from '@/context/CreateTripContext';
import { Ionicons } from '@expo/vector-icons';

export default function SelectTraveler() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedTraveler, setSelectedTraveler] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Set headerShown to false as we'll be managing the header ourselves
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedTraveler !== null) {
      setTripData(prev => ({ ...prev, traveler: selectedTraveler }));
    }
  }, [selectedTraveler, setTripData]);

  const handleSelectTraveler = useCallback((traveler) => {
    setSelectedTraveler(traveler);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectTraveler(item)} style={{ marginVertical: 10 }}>
      <OptionCard option={item} selectedOption={selectedTraveler} />
    </TouchableOpacity>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
      </TouchableOpacity>
      <Text style={styles.title}>Quem estará viajando</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={SelectTravelerList}
          renderItem={renderItem}
          keyExtractor={(item) => item.title.toString()}
        />
        <TouchableOpacity style={styles.continueButton}>
          <Link href={'/create-trip/select-date'} style={styles.link}>
            <Text style={styles.buttonText}>Continue</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    marginTop: 30,
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 15,
  },
  continueButton: {
    padding: 12,
    backgroundColor: Colors.BLACK,
    borderRadius: 15,
    marginTop: 20,
  },
  link: {
    textAlign: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-regular',
    fontSize: 18,
  },
});

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router'; 
import { Colors } from '@/constants/Colors';
import { SelectBudgetOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { CreateTripContext } from '@/context/CreateTripContext';
import { Ionicons } from '@expo/vector-icons'; // Importa o Ionicons para usar o ícone de seta

export default function SelectBudget() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // Oculta o header padrão
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedOption !== null) {
      setTripData({
        ...tripData,
        budget: selectedOption,
      });
    }
  }, [selectedOption, setTripData]);

  const onClickContinue = () => {
    if (!selectedOption) {
      Alert.alert('Escolha um pacote para continuar');
      return;
    }
    router.push('/create-trip/review-trip');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedOption(item)}
      style={[
        styles.itemContainer,
        selectedOption?.id === item.id && styles.selectedItemContainer, // Adiciona estilo ao item selecionado
      ]}
    >
      <OptionCard option={item} selectedOption={selectedOption} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
      </TouchableOpacity>
      <Text style={styles.title}>Selecione o seu orçamento</Text>
      <View style={styles.content}>
        <Text style={styles.description}>
        Ajuste seu orçamento e encontre destinos perfeitos
        </Text>
        <FlatList
          data={SelectBudgetOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity onPress={onClickContinue} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 75,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
  },
  content: {
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    fontFamily: 'outfit-regular',
    marginBottom: 10,
    color: Colors.GRAY,
    textAlign: 'center',
  },
  itemContainer: {
    marginVertical: 10,
    padding: 10, // Adiciona um pouco de padding aos itens
    borderRadius: 10,
    borderColor: Colors.GRAY_LIGHT, // Cor da borda padrão
  },
  selectedItemContainer: {
    borderColor: Colors.BLACK, // Destaque para o item selecionado
    backgroundColor: Colors.GRAY_LIGHT,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.BLACK,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-regular',
    fontSize: 18,
    textAlign: 'center',
  },
});

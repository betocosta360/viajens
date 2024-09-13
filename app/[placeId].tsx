import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importa o ícone de voltar
import { Colors } from '@/constants/Colors';

const fetchPlaceDetailsById = async (placeId: string, apiKey: string) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`);
    const data = await response.json();
    return data.result;
};

// Mapeamento dos dias da semana
const daysOfWeekTranslation: { [key: string]: string } = {
    'Monday': 'Segunda-feira',
    'Tuesday': 'Terça-feira',
    'Wednesday': 'Quarta-feira',
    'Thursday': 'Quinta-feira',
    'Friday': 'Sexta-feira',
    'Saturday': 'Sábado',
    'Sunday': 'Domingo',
};

const translateOpeningHours = (hours: string[]) => {
    return hours.map(hour => {
        const [day, time] = hour.split(': ');
        return `${daysOfWeekTranslation[day] || day}: ${time}`;
    });
};

const formatSchedule = (schedule: { day: string, time: string }[]) => {
    return schedule.map((slot, index) => (
        <Text key={index} style={{ fontSize: 17, fontFamily: 'outfit-medium', color: Colors.GRAY }}>
            {`${daysOfWeekTranslation[slot.day] || slot.day}: ${slot.time}`}
        </Text>
    ));
};

export default function PlaceDetails() {
    const [place, setPlace] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const apiKey = 'AIzaSyBaKrmxRVY07K3wocP7ecVrqmWxZTD2K-w'; // Substitua pela sua chave de API
    const { placeId } = useLocalSearchParams();
    const router = useRouter(); // Usa o hook `useRouter` para navegação

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (placeId) {
                    const placeDetails = await fetchPlaceDetailsById(placeId as string, apiKey);
                    setPlace(placeDetails);
                }
            } catch (error) {
                console.error('Error fetching place details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [placeId]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!place) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Local não encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, marginTop: 30, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginTop: 30 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 20 }}>
                    <Ionicons name="arrow-back" size={17} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 17, fontFamily: 'outfit-bold' }}>{place.name}</Text>
            </View>

            {place.photos && place.photos.length > 0 && (
                <Image
                    source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}` }}
                    style={{ width: '100%', height: 180, marginTop: 10, borderRadius: 10 }}
                />
            )}

            <View style={{
                marginTop: 20,
                padding: 40,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginBottom: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
                overflow: 'hidden',
            }}>
                <Text style={{ fontSize: 14, fontFamily: 'outfit-regular', color: Colors.GRAY }}>
                    <Text style={{ fontSize: 14, color: Colors.BLACK, fontFamily: 'outfit-bold' }}>Telefone: </Text>
                    {place.formatted_phone_number}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: 'outfit-regular', color: Colors.GRAY, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, color: Colors.BLACK, fontFamily: 'outfit-bold' }}>Site: </Text>
                    {place.website}
                </Text>
                <Text style={{ fontSize: 14, fontFamily: 'outfit-regular', color: Colors.GRAY, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, color: Colors.BLACK, fontFamily: 'outfit-bold' }}>Endereço: </Text>
                    {place.formatted_address}
                </Text>
                {place.opening_hours && place.opening_hours.weekday_text && (
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 14, fontFamily: 'outfit-bold', color: Colors.BLACK }}>Horário de Abertura:</Text>
                        {translateOpeningHours(place.opening_hours.weekday_text).map((text, index) => (
                            <Text key={index} style={{ fontSize: 14, fontFamily: 'outfit-regular', color: Colors.GRAY, marginTop: 5 }}>
                                {text}
                            </Text>
                        ))}
                    </View>
                )}

            </View>
        </ScrollView>
    );
}

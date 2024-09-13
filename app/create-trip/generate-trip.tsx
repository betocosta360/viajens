import { View, Text, Animated } from 'react-native';
import { Image } from 'expo-image';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { CreateTripContext } from '@/context/CreateTripContext';
import { AI_PROMPT } from '@/constants/Options';
import { chatSession } from '@/configs/AiModal';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/configs/FireBaseConfig';

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [opacity] = useState(new Animated.Value(1)); // Estado para a animação de opacidade

  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData) {
      console.log('tripData:', tripData);
      GenerateAiTrip();
    }
  }, [tripData]);

  useEffect(() => {
    // Configura a animação de piscar
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  const GenerateAiTrip = async () => {
    setLoading(true);
    if (!tripData) {
      console.error('tripData is undefined');
      return;
    }

    const totalDays = tripData.totalNoOfDays || 0;
    const totalNights = totalDays - 1;

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData.location?.name)
      .replace('{totalNoOfDays}', totalDays.toString())
      .replace('{totalNight}', totalNights.toString())
      .replace('{traveler}', tripData.traveler?.title)
      .replace('{budget}', tripData.budget?.title)
      .replace('{location}', tripData.location?.name)
      .replace('{totalNoOfDays}', totalDays.toString())
      .replace('{totalNight}', totalNights.toString())
      .replace('{startDate}', tripData.startDate?.date || '')
      .replace('{endDate}', tripData.endDate?.date || '');

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp = JSON.parse(result.response.text());

    setLoading(false);

    const docId = (Date.now()).toString();
    const result_ = await setDoc(doc(db, 'UserTrips', docId), {
      userEmail: user?.email,
      tripPlan: tripResp,
      trip: tripResp.trip,
      tripData: JSON.stringify(tripData),
      docId: docId,
      totalNoOfDays: tripData?.totalNoOfDays,
      location: tripData?.location,
      traveler: tripData?.traveler,
      budget: tripData?.budget,
      startDate: tripData?.startDate,
      endDate: tripData?.endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    });

    router.push('(tabs)/mytrip');
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Animated.Text style={{ fontSize: 35, fontFamily: 'outfit-bold', textAlign: 'center', opacity }}>
        Aguarde...
      </Animated.Text>
     
      <Image source={require('@/assets/images/trip.gif')} contentFit="contain" style={{
    width: '100%',
    height: 200,
    // Estilo da sombra para iOS
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 4, // Raio de desfoque da sombra
    // Estilo da sombra para Android
    elevation: 5, // Elevação para sombra no Android
  }} />
      <Text style={{ fontFamily: 'outfit-regular', color: Colors.GRAY, fontSize: 15, textAlign: 'center' }}>
      Estamos moldando a sua viagem ...
      </Text>
    </View>
  );
}

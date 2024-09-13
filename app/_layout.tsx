import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { CreateTripContext } from '@/context/CreateTripContext';




export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-light': require('../assets/fonts/Outfit-Light.ttf'),
  });

  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    console.log('Trip Data changed:', tripData);
  }, [tripData]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
   
      <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Aqui você pode renderizar seus componentes de navegação */}
          <Stack.Screen name="index" />
        </Stack>
      </CreateTripContext.Provider>
   

  );
}

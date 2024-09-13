import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartNewTripCard() {

    const router = useRouter()
  return (
    <View
      style={{
        padding: 25,
        marginTop: 60,
        display: "flex",
        alignItems: "center",
        gap: 25,
      }}
    >
      <Ionicons name="location-sharp" size={45} color="black" />

      <Text
        style={{
          fontSize: 17,
          fontFamily: "outfit-bold",
          textAlign: "center",
          color: Colors.BLACK,
        }}
      >
        Ainda sem planos. Que tal desenhar sua viagem?
      </Text>

      <Text
        style={{
          fontSize: 16,
          fontFamily: "outfit-regular",
          textAlign: "center",
          color: Colors.GRAY,
        }}
      >
        Sua primeira viagem começa aqui. Vamos planejar juntos!
      </Text>
      <TouchableOpacity
      onPress={() => router.push("/create-trip/search-place")}
        style={{
          padding: 10,
          backgroundColor: Colors.BLACK,
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "outfit-regular",
            fontSize: 15,
          }}
        >
          Planeje agora!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

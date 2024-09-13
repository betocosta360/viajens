import { useNavigation, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { CreateTripContext } from "@/context/CreateTripContext";
import moment, { Moment } from "moment";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const router=useRouter()

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text style={{ fontSize: 22, fontFamily: "outfit-bold", marginTop: 20, textAlign:'center' }}>
        Revise as suas escolhas
      </Text>

      <View style={{ marginTop: 6 }}>
        <Text
          style={{ fontSize: 15, fontFamily: "outfit-regular", textAlign:'center', color: Colors.GRAY }}
        >
          Certifique-se de que está tudo certo.
        </Text>

        {/* Destinos */}
        <View
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="location" size={34} color="black" />
          <View>
            <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
              Destino
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "outfit-light",
                color: Colors.GRAY,
              }}
            >
              {tripData?.location?.name}
            </Text>
          </View>
        </View>

        {/* Datas */}
        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="calendar" size={34} color="black" />
          <View>
            <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
              Datas reservadas
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "outfit-light",
                color: Colors.GRAY,
              }}
            >
              {moment(tripData?.startDate).format("DD MM YYYY") +
                " à  "  +
                moment(tripData?.endDate).format("DD MM YYYY") +
                " "}
              ({tripData?.totalNoOfDays} dias)
            </Text>
          </View>
        </View>

        {/* Viajante */}
        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="bus" size={34} color="black" />
          <View>
            <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
              Quem estará viajando
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "outfit-light",
                color: Colors.GRAY,
              }}
            >
              {tripData?.traveler?.title}
            </Text>
          </View>
        </View>

        {/* orçamento */}
        <View
          style={{
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <FontAwesome6 name="sack-dollar" size={34} color="black" />
          <View>
            <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
              Orçamento
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "outfit-light",
                color: Colors.GRAY,
              }}
            >
              {tripData?.budget.title}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity  onPress={()=>router.push('/create-trip/generate-trip')}
      style={{
          padding: 10,
          backgroundColor: Colors.BLACK,
          borderRadius: 15,
          marginTop: 20,
        }}>
          <Text style={{ textAlign: 'center', color: Colors.WHITE, fontFamily: 'outfit-regular', fontSize: 18 }}>Construindo minha viagem</Text>
        </TouchableOpacity>
    </View>
  );
}

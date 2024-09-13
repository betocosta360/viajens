import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false); // Estado para controlar a transparência

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/traveler.jpg")}
        style={styles.backgroundImage}
      >
        {/* Adiciona o overlay sobre a imagem */}
        <View style={styles.overlay} />

        <View style={styles.overlayContent}>
          <Text style={styles.title}>AI Travel Planner</Text>
          
          {/* Subtítulo flutuando logo acima do botão */}
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              Descubra novas aventuras, personalize seu itinerário
            </Text>
          </View>

          {/* Botão "Comece Agora" */}
          <TouchableOpacity 
            onPress={() => router.push('/auth/sign-in')} // Ajuste o caminho aqui
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Comece Agora
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Preenche toda a área da tela
    backgroundColor: "rgba(0, 0, 0, 0.40)", // Overlay preto com 30% de opacidade
  },
  overlayContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 50, // Adiciona espaço na parte inferior para o botão
  },
  title: {
    position: 'absolute', // Posiciona o título de forma absoluta
    top: 50, // Distância do topo da tela
    fontSize: 26,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.WHITE,
    textShadowColor: "rgba(0, 0, 0, 1)",  // Cor da sombra
    textShadowOffset: { width: 1, height: 1 }, // Deslocamento da sombra
    textShadowRadius: 4, // Difusão da sombra
  },
  subtitleContainer: {
    marginBottom: 30, // Espaço entre o subtítulo e o botão
    width: "90%",
  },
  subtitle: {
    fontFamily: "outfit-regular",
    fontSize: 15,
    textAlign: "center",
    color: Colors.WHITE,
    textShadowColor: "rgba(0, 0, 0, 1)",  // Cor da sombra
    textShadowOffset: { width: 1, height: 1 }, // Deslocamento da sombra
    textShadowRadius: 4, // Difusão da sombra
  },
  button: {
    padding: 12,
    backgroundColor: Colors.BLACK,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-light",
    fontSize: 16,
  },
});

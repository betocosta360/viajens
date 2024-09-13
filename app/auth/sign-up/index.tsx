import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ToastAndroid, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from '../../../configs/FireBaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nomecompleto, setNomeCompleto] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar o loading

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  const uploadImage = async (userId: string) => {
    if (image) {
      try {
        const storageRef = ref(storage, `avatars/${userId}`);
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    }
    return null;
  };

  const OnCreateAccount = async () => {
    if (!email || !password || !nomecompleto) {
      ToastAndroid.show('Preencha todos os campos', ToastAndroid.LONG);
      return;
    }

    setIsLoading(true); // Iniciar o loading

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const avatar = await uploadImage(user.uid);

      await setDoc(doc(db, "users", user.uid), {
        nomeCompleto: nomecompleto,
        email: email,
        avatarUrl: avatar,
      });

      await signInWithEmailAndPassword(auth, email, password);

      router.replace('/mytrip');

      ToastAndroid.show('Conta criada com sucesso!', ToastAndroid.LONG);
    } catch (error) {
      const errorMessage = error.message;
      ToastAndroid.show(`Erro: ${errorMessage}`, ToastAndroid.LONG);
    } finally {
      setIsLoading(false); // Finalizar o loading
    }
  };

  return (
    <View style={{ padding: 25, backgroundColor: "#fff", height: "100%", justifyContent: 'center' }}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatarImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={100} color="gray" />
        )}
        <Text style={styles.avatarText}>Adicione seu avatar</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          onChangeText={(value) => setNomeCompleto(value)}
          value={nomecompleto}
        />
        <Ionicons name="person-outline" size={24} color="gray" style={styles.iconRight} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={(value) => setEmail(value)}
          value={email}
          keyboardType="email-address"
        />
        <Ionicons name="mail-outline" size={24} color="gray" style={styles.iconRight} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Senha"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.iconRight} />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.BLACK} style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity onPress={OnCreateAccount} style={styles.createButton} disabled={isLoading}>
          <Text style={{ fontFamily: "outfit-light", textAlign: "center", fontSize: 17, color: Colors.WHITE }}>Criar agora</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 15,
    fontFamily: "outfit-regular",
  },
  iconRight: {
    paddingHorizontal: 10,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  avatarText: {
    color: 'gray',
    fontSize: 15,
    fontFamily: "outfit-regular",
  },
  createButton: {
    padding: 15,
    marginTop: 15,
    backgroundColor: "#000",
    borderRadius: 15,
  }
});

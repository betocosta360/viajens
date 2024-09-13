import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Button, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from '@/configs/FireBaseConfig'; // Ajuste conforme necessário
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors"; // Ajuste conforme necessário

export default function Profile() {
  const [nomecompleto, setNomeCompleto] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNomeCompleto(userData.nomeCompleto || '');
          setImageUri(userData.avatarUrl || null);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };

  const uploadImage = async (userId: string) => {
    if (imageUri) {
      try {
        const storageRef = ref(storage, `avatars/${userId}`);
        const response = await fetch(imageUri);
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

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const avatarUrl = await uploadImage(user.uid);

      await updateDoc(doc(db, "users", user.uid), {
        nomeCompleto: nomecompleto,
        avatarUrl: avatarUrl || imageUri
      });

      ToastAndroid.show('Perfil atualizado com sucesso!', ToastAndroid.LONG);
    } catch (error) {
      console.error('Error updating profile:', error);
      ToastAndroid.show('Erro ao atualizar perfil', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatarImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={100} color="gray" />
        )}
        <Text style={styles.avatarText}>Adicione seu avatar</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nomecompleto}
        onChangeText={setNomeCompleto}
      />

      <Button title="Salvar" onPress={handleSave} />

      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} style={styles.loader} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  },
  input: {
    width: '100%',
    padding: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginVertical: 10,
  },
  loader: {
    marginTop: 20,
  },
});

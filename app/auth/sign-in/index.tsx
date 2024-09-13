import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { auth, app } from '../../../configs/FireBaseConfig';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onSignIn = () => {
    if (!email && !password) {
      ToastAndroid.show('Preencha com seu email e senha', ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/mytrip');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        switch (errorCode) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-email':
            ToastAndroid.show('Usuário ou senha incorretos', ToastAndroid.LONG);
            break;
          case 'auth/too-many-requests':
            ToastAndroid.show('Muitas tentativas. Tente novamente mais tarde.', ToastAndroid.LONG);
            break;
          default:
            ToastAndroid.show('Usuário ou senha incorreto', ToastAndroid.LONG);
        }
      });
  };

  return (
    <View
      style={{
        paddingTop: 50,
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", marginTop: 25, fontSize: 25, color: Colors.BLACK, textAlign: 'center' }}>
        Seja bem vindo
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
          fontSize: 16,
          marginTop: 5,
          color: Colors.GRAY,
          textAlign: 'center',
        }}
      >
        Sentimos a sua falta!
      </Text>
      <Text
        style={{ fontFamily: "outfit-regular", fontSize: 16, color: Colors.GRAY, textAlign: 'center' }}
      >
        Vamos começar
      </Text>

      {/* Campo de Email com Ícone */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Ionicons name="mail-outline" size={24} color={Colors.GRAY} style={styles.icon} />
      </View>

      {/* Campo de Senha com Ícone */}
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Senha"
          onChangeText={(value) => setPassword(value)}
        />
        <Ionicons name="lock-closed-outline" size={24} color={Colors.GRAY} style={styles.icon} />
      </View>

      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 15,
          marginTop: 30,
          backgroundColor: Colors.BLACK,
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-regular",
            textAlign: "center",
            fontSize: 16,
            color: Colors.WHITE,
          }}
        >
          Entrar
        </Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>
        <Link
          href="auth/sign-up"
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>
            Crie sua conta.
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 15,
    fontFamily: "outfit-regular",
  },
  icon: {
    marginLeft: 10, // Define espaço entre o TextInput e o ícone
  },
  linkButton: {
    padding: 15,
    marginTop: 20,
  },
  linkText: {
    fontFamily: "outfit-regular",
    textAlign: "center",
    fontSize: 16,
    color: Colors.GRAY,
    textDecorationLine: 'underline',
  },
});

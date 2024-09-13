import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/configs/FireBaseConfig";
import UserTripList from "@/components/CreateTrip/UserTripList";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";

export default function MyTrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(""); // Estado para o nome do usuário
  const [userAvatar, setUserAvatar] = useState(""); // Estado para o avatar do usuário
  const [showTitle, setShowTitle] = useState(true); // Estado para controlar a exibição do título
  const [showMessage, setShowMessage] = useState(""); // Estado para controlar a exibição da mensagem

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      GetMyTrips();
      GetUserInfo();
    }
  }, []);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);

    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', auth.currentUser.email));
      const querySnapshot = await getDocs(q);

      const tripsData = querySnapshot.docs.map(doc => doc.data());
      console.log("Fetched trips data:", tripsData);
      setUserTrips(tripsData);

      // Atualiza o estado para exibir o título apenas se houver viagens
      setShowTitle(tripsData.length > 0);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const GetUserInfo = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserName(userData.nomeCompleto); // Ajuste conforme o campo do nome no Firestore
          setUserAvatar(userData.avatarUrl || ""); // Ajuste conforme o campo do avatar no Firestore
        } else {
          console.log("No such document!");
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      await signOut(auth);
      console.log("Sign out successful");
      setShowMessage('Saindo agora!');
      setTimeout(() => {
        setShowMessage('');
        router.push('/auth/sign-in'); // Ajuste o caminho conforme necessário
      }, 2000); // Tempo de exibição da mensagem
    } catch (error) {
      console.error("Sign out error:", error.message);
      setShowMessage(`Erro ao fazer logout: ${error.message}`);
      setTimeout(() => {
        setShowMessage('');
      }, 2000); // Tempo de exibição da mensagem
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 30, backgroundColor: Colors.WHITE, height: "100%", width: '100%' }}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {userAvatar ? (
            <Image source={{ uri: userAvatar }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle" size={60} color={Colors.GRAY} />
          )}
          <View style={{marginVertical: 15}}>
          <Text style={styles.userNameSaldacao}>Olá,</Text>
          <Text style={styles.userName}>{userName}!</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {showTitle && (
        <View style={styles.tripsHeader}>
          <Text style={styles.tripsTitle}>
            Minhas Viagens
          </Text>
          <TouchableOpacity onPress={() => router.push("/create-trip/search-place")}>
            <Ionicons name="add-circle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {loading && <ActivityIndicator size={"large"} color={Colors.BLACK} />}

      {userTrips.length === 0 ? <StartNewTripCard /> : <UserTripList userTrips={userTrips} />}

      {showMessage ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{showMessage}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  userNameSaldacao: {
    fontFamily: "outfit-regular",
    fontSize: 18,
    color: Colors.BLACK,
    marginBottom:0
  },
  userName: {
    fontFamily: "outfit-regular",
    fontSize: 18,
    color: Colors.BLACK,
    
  },
  logoutButton: {
    backgroundColor: Colors.BLACK,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  logoutText: {
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
    fontSize: 12
  },
  tripsHeader: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  tripsTitle: {
    fontFamily: "outfit-bold",
    fontSize: 18,
    color: Colors.BLACK,
  },
  messageContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  messageText: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

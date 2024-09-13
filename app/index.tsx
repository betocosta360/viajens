import * as Updates from "expo-updates";
import Login from '../components/Login';
import { View } from 'react-native';
import { auth } from '../configs/FireBaseConfig';
import { Redirect } from 'expo-router';


export default function Index() {
  const user = auth.currentUser;

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={'mytrip'} /> : <Login />}
    </View>
  );
}

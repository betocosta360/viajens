import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Colors } from "../../constants/Colors";


export default function TabLayout(){
    return(
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.PRIMARY }}>
            <Tabs.Screen
             name="mytrip"
             options={{
                headerShown: false,
                tabBarLabel: 'Minhas Trips',
                tabBarActiveTintColor: Colors.BLACK,
                tabBarIcon: ({ color }) => <Ionicons name="location" size={28} color={color}/>
              }}/>
            
            <Tabs.Screen
             name="discover"
             options={{
                headerShown: false,
                tabBarLabel: 'Descobertas',
                tabBarActiveTintColor: Colors.BLACK,
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="globe" color={color} />
              }}/>

<Tabs.Screen
             name="profile"
             options={{
                headerShown: false,
                tabBarLabel: 'Perfil',
                tabBarActiveTintColor: Colors.BLACK,
                tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={28} color={color} />
              }}/>
        </Tabs>
    )
}
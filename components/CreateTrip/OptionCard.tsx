import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function OptionCard({ option, selectedTraveler, selectedOption }) {
  return (
    <View 
    style={[{ 
        padding: 10, 
        display:'flex', 
        flexDirection: 'row', 
        justifyContent:'space-between', 
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius:15 }, selectedOption?.id==option?.id&&{borderWidth:2}]}>

      <View>
        <Text style={{fontFamily:'outfit-bold', fontSize:15}}>{option.title}</Text>
        <Text style={{fontFamily:'outfit-regular', fontSize:12, color: Colors.GRAY}}>{option.desc}</Text>
      </View>
      <Text style={{fontSize:20}}>{option.icon}</Text>
      

    </View>
  );
}

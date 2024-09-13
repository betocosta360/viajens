import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import moment, { Moment } from "moment";
import { CreateTripContext } from "@/context/CreateTripContext";
import Icon from 'react-native-vector-icons/MaterialIcons';

// Configurações de local para o calendário
LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt';

export default function SelectDate() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const onDateChange = (date: Moment | null, type: "START_DATE" | "END_DATE") => {
    if (type === "START_DATE") {
      setStartDate(moment(date, 'YYYY-MM-DD'));
      setEndDate(null); // Limpar data final ao definir a data de início
    } else {
      setEndDate(moment(date, 'YYYY-MM-DD'));
    }
  };

  const getMarkedDates = () => {
    let markedDates = {};
    if (startDate && endDate) {
      let currentDate = startDate.clone();
      while (currentDate <= endDate) {
        markedDates[currentDate.format('YYYY-MM-DD')] = { 
          selected: true, 
          selectedColor: Colors.BLACK,
          selectedTextColor: Colors.WHITE, // Adiciona a cor do texto selecionado
        };
        currentDate = currentDate.add(1, 'day');
      }
    }
    return markedDates;
  };

  const onDateSelectionContinue = async () => {
    if (!startDate || !endDate) {
      Alert.alert("Erro", "Por favor, selecione uma data inicial e final.");
      return;
    }
    const totalNoOfDays = endDate.diff(startDate, 'days');
    console.log("Total days: ", totalNoOfDays + 1);

    // Atualiza o contexto com as novas datas e o número total de dias
    setTripData({
      ...tripData,
      startDate: startDate.format('YYYY-MM-DD'),  // Formatar a data para string
      endDate: endDate.format('YYYY-MM-DD'),      // Formatar a data para string
      totalNoOfDays: totalNoOfDays + 1
    });

    // Adicione a lógica para salvar os dados no Firestore se necessário
    // await saveTripData(tripData);

    router.push('/create-trip/select-budget');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()} // Voltar à página anterior
      >
        <Icon name="arrow-back" size={30} color={Colors.BLACK} />
      </TouchableOpacity>

      <Text style={styles.title}>
        Escolha quando viajar
      </Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            const selectedDate = moment(day.dateString, 'YYYY-MM-DD');  // Converter para o formato correto
            if (!startDate) {
              onDateChange(selectedDate, 'START_DATE');
            } else if (!endDate && selectedDate.isAfter(startDate)) {
              onDateChange(selectedDate, 'END_DATE');
            } else {
              onDateChange(selectedDate, 'START_DATE'); // Redefinir intervalo se selecionar nova data inicial
            }
          }}
          markedDates={getMarkedDates()}
          theme={{
            calendarBackground: Colors.WHITE,
            textSectionTitleColor: '#FC6736',
            selectedDayBackgroundColor: Colors.BLACK, // Cor de fundo dos dias selecionados
            selectedDayTextColor: Colors.WHITE, // Cor do texto dos dias selecionados
            todayTextColor: '#FC6736',
            dayTextColor: '#2d4150',
            monthTextColor: '#2d4150',
            textDayFontSize: 20,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 15,
            textDayFontFamily: 'outfit-bold',
            textMonthFontFamily: 'outfit-bold',
            textDayHeaderFontFamily: 'outfit-regular',
          }}
        />
      </View>
      
      <TouchableOpacity
        onPress={onDateSelectionContinue}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginTop: 15,
    textAlign: 'center',
  },
  calendarContainer: {
    marginTop: 35,
    borderRadius: 10,
    overflow: 'hidden', // Garante que a sombra e o borderRadius sejam aplicados corretamente
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6, // Adiciona uma elevação para Android
  },
  button: {
    backgroundColor: Colors.BLACK,
    padding: 10,
    borderRadius: 15,
    marginTop: 35,
  },
  buttonText: {
    fontFamily: "outfit-regular",
    fontSize: 18,
    color: Colors.WHITE,
    textAlign: "center",
  },
});

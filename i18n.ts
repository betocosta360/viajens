// i18n.js (ou outro arquivo de configuração)

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    lng: 'pt-BR',
    fallbackLng: 'pt-BR',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    resources: {
      'pt-BR': {
        translation: {
          
            "bestTimeToVisit": "A primavera (março-maio) e o outono (setembro-novembro) oferecem o clima mais agradável para explorar a cidade e aproveitar atividades ao ar livre.",
            "itinerary": {
              "day1": {
                "activity": "Chegada e Jantar Romântico",
                "details": "Chegada no Aeroporto Internacional McCarran (LAS), check-in no seu hotel luxuoso e brinde à sua escapada romântica com um delicioso jantar em um restaurante de classe mundial.",
                "time": "Dia 1"
              },
              "day2": {
                "activity": "Relaxamento à Beira da Piscina e Passeio de Gôndola",
                "details": "Passe a manhã relaxando à beira da piscina ou desfrutando de tratamentos de spa. À tarde, faça um passeio romântico de gôndola no The Venetian e aproveite o charme da Itália no coração de Las Vegas.",
                "time": "Dia 2"
              },
              "day3": {
                "activity": "Roda Gigante High Roller e Show",
                "details": "Experimente vistas deslumbrantes de Las Vegas a partir da Roda Gigante High Roller. À noite, aproveite um show cativante, como Cirque du Soleil ou um concerto do seu artista favorito.",
                "time": "Dia 3"
              },
              "day4": {
                "activity": "Brunch e Partida",
                "details": "Desfrute de um brunch tranquilo juntos antes de partir do Aeroporto Internacional McCarran (LAS), relembrando sua viagem inesquecível a Las Vegas.",
                "time": "Dia 4"
              }
            }
          
        }
      }
    }
  });

export default i18next;

// src/configs/GooglePlaceApi.js

export const GetPhotoRef = async ({
    placeName,
    searchType = 'textsearch',
    location = null,
    radius = 1000,
    filters = {},
  }) => {
    const apiKey = 'AIzaSyBaKrmxRVY07K3wocP7ecVrqmWxZTD2K-w'; // Substitua pela sua chave de API
  
    try {
      let url = '';
  
      // Configuração de URL baseada no tipo de pesquisa selecionado
      if (searchType === 'findplace') {
        url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&key=${apiKey}`;
      } else if (searchType === 'nearbysearch' && location) {
        url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&keyword=${encodeURIComponent(placeName)}&key=${apiKey}`;
      } else {
        url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${apiKey}`;
      }
  
      // Adicionar filtros adicionais (opcionais)
      const queryParams = new URLSearchParams(filters).toString();
      if (queryParams) {
        url += `&${queryParams}`;
      }
  
      // Solicitação da API
      console.log("Request URL:", url); // Adicione esta linha para depuração
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Adicione esta linha para depuração
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados do Google Places:', error);
      throw error;
    }
  };
  
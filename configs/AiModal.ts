
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  //const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI('AIzaSyBCHUBlAajS2_U9jhp4_XWLT0qyCtQ7oBY');
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
   
    "history": [
      {
        "role": "user",
        "parts": [
          {
            "text": "Generate Travel Plan for Location: Luxemburgo, Bélgica, for 2 Days and 1 Night for Sozinho with a Orçamento de luxo with a Flight details, Flight Price with Booking Details url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time T travel each of the Luxemburgo, Bélgica for 2 days and 1 night with each day plan with best time to visit in JSON"
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "text": "```json\n{\n  \"trip\": {\n    \"destination\": \"Luxembourg, Belgium\",\n    \"duration\": \"2 days, 1 night\",\n    \"traveler\": \"Sozinho\",\n    \"budget\": \"Luxo\",\n    \"flight\": {\n      \"details\": \"Round trip flight from New York City (JFK) to Luxembourg Airport (LUX).\",\n      \"price\": 1500,\n      \"booking_url\": \"https://www.kayak.com/flights/JFK-LUX/2024-07-14/2024-07-16\"\n    },\n    \"hotel\": [\n      {\n        \"name\": \"Le Royal Hotels & Resorts - Luxembourg\",\n        \"address\": \"12 Boulevard Royal, 2449 Luxembourg\",\n        \"price\": 450,\n        \"image_url\": \"https://www.lhw.com/-/media/images/lhw/hotels/le-royal-hotel-luxembourg/lux_luxem_le-royal_50502538_room.jpg\",\n        \"geo_coordinates\": {\"latitude\": 49.611, \"longitude\": 6.127},\n        \"rating\": 4.8,\n        \"description\": \"Luxurious 5-star hotel in the heart of Luxembourg City.\",\n        \"placesNearby\": [\n          {\n            \"placeName\": \"Old Town\",\n            \"details\": \"Historic area with beautiful architecture and vibrant cafes.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/1/1a/Luxembourg_City_1.jpg\",\n            \"geo_coordinates\": {\"latitude\": 49.611, \"longitude\": 6.130},\n            \"ticket_pricing\": \"Free\",\n            \"time_to_travel\": \"5 minutes walk\"\n          },\n          {\n            \"placeName\": \"Grand Ducal Palace\",\n            \"details\": \"Official residence of the Grand Duke of Luxembourg.\",\n            \"image_url\": \"https://upload.wikimedia.org/wikipedia/commons/e/ed/Luxembourg_City_-_Grand_Ducal_Palace_2017-1.jpg\",\n            \"geo_coordinates\": {\"latitude\": 49.610, \"longitude\": 6.129},\n            \"ticket_pricing\": \"10 EUR\",\n            \"time_to_travel\": \"10 minutes walk\"\n          }\n        ]\n      }\n    ],\n    \"itinerary\": {\n      \"day1\": {\n        \"time\": \"Morning\",\n        \"activity\": \"Explore the Old Town\",\n        \"details\": \"Stroll through the historic streets, visit cafes and shops.\"\n      },\n      \"day1\": {\n        \"time\": \"Afternoon\",\n        \"activity\": \"Visit Grand Ducal Palace\",\n        \"details\": \"Take a guided tour of the Grand Ducal Palace.\"\n      },\n      \"day1\": {\n        \"time\": \"Evening\",\n        \"activity\": \"Dinner at a local restaurant\",\n        \"details\": \"Enjoy fine dining at a recommended restaurant.\"\n      },\n      \"day2\": {\n        \"time\": \"Morning\",\n        \"activity\": \"Visit the Bock Casemates\",\n        \"details\": \"Explore the historic underground fortifications.\"\n      },\n      \"day2\": {\n        \"time\": \"Afternoon\",\n        \"activity\": \"Return flight to New York City\",\n        \"details\": \"Depart from Luxembourg Airport.\"\n      }\n    },\n    \"bestTimeToVisit\": \"Summer months from June to August when the weather is warm and pleasant.\"\n  }\n}\n```"
          }
        ]
      }
    ]
  }
  
    );
  
    ///const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
 
  
import { createContext, Dispatch, SetStateAction } from "react";

interface Location {
  name: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  photoReference?: string;
  url?: string;
}

interface CreateTripContextProps {
  tripData: {
    location?: Location;
    traveler?: { title: string }; // Exemplo de objeto de viajante
    budget?: { title: string }; // Exemplo de objeto de orçamento
    totalNoOfDays?: number; // Exemplo de número total de dias
    // Outros campos relevantes para sua aplicação
  };
  setTripData: Dispatch<SetStateAction<{
    location?: Location;
    traveler?: { title: string };
    budget?: { title: string };
    totalNoOfDays?: number;
    // Defina outros campos conforme necessário
  }>>;
}

export const CreateTripContext = createContext<CreateTripContextProps | undefined>(undefined);

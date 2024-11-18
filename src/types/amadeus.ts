// src/types/amadeus.ts
export interface FlightSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    nonStop?: boolean;
    currencyCode?: string;
  }
  
  export interface HotelSearchParams {
    cityCode: string;
    checkInDate: string;
    checkOutDate: string;
    adults?: number;
    radius?: number;
    radiusUnit?: 'KM' | 'MILE';
    ratings?: string[];
  }
  
  export interface LocationResponse {
    data: Array<{
      iataCode: string;
      name: string;
      cityName?: string;
      countryName?: string;
    }>;
  }
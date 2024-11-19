// src/types/weather.ts
export interface WeatherData {
    temperature: number;
    condition: string;
    icon: string;
    forecast: {
        day: string;
        temperature: number;
        condition: string;
        icon: string;
    }[];
}
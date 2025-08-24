import { fetcher } from '@/apis/fetcher';
import { CurrentWeather } from '@/models/weather/CurrentWeather';

export interface GetCurrentWeatherParams {
  latitude: number;
  longitude: number;
}

export async function getCurrentWeather({ latitude, longitude }: GetCurrentWeatherParams): Promise<CurrentWeather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const data = await fetcher<{ current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  }}>(url);
  return new CurrentWeather(data.current_weather);
}

// Open-Meteo current_weather 응답값 모델
export class CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;

  constructor(data: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  }) {
    this.temperature = data.temperature;
    this.windspeed = data.windspeed;
    this.winddirection = data.winddirection;
    this.weathercode = data.weathercode;
    this.is_day = data.is_day;
    this.time = data.time;
  }
}

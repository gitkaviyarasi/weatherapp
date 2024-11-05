///import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
//city, date, icon, iconDescription, tempF, windSpeed, humidity
class Weather  {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.icon = icon;
    this.date = date;
    this.iconDescription = iconDescription;
    this.humidity = humidity;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {
  

  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
   }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city:string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {

    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${this.apiKey}`;
}
  

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) {
    console.log('city -in fetch:',city);
    //console.log(geocode)
    const query = this.buildGeocodeQuery(city);
     console.log('query:',query);
    try {
      const response = await fetch(query);
      const data = await response.json();
      // console.log('data:',data);
      // console.log('data.length:',data.length);

      if (data.length > 0) {
        // console.log('data[0]:',data[0]);
        return this.destructureLocationData(data[0]);
      } 
      else {
        console.error("No data found for city -fetch and destructurelocation:", city);
        return null;
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      return null;
    }

  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    console.log('query:',query);
    try {
      const response = await fetch(query);
      const data = await response.json();
      //console.log('data:',data);
      return data;
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }
  
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    //console.log('response: in parse weather',response);
    // console.log('inparsecurrent weather')
    // console.log('Cityname:',response.city.name);
    // console.log('Date:',new Date(response.list[0].dt * 1000).toLocaleDateString());
    // console.log('icon:',response.list[0].weather[0].icon);
    // console.log('description:',response.list[0].weather[0].description);
    // console.log('temp:',response.list[0].main.temp);
    // console.log('wind:',response.list[0].wind.speed);
    // console.log('humidity:',response.list[0].main.humidity);
    //const weatherArray1 = this.buildForecastArray(response);
    const seenDates = new Set(); // To keep track of dates we have already added
    const weatherArray: Weather[] = [];

for (let i = 0; i < response.list.length; i++) {
  const newdate = response.list[i].dt_txt.split(' ')[0]; // Get the date part

  // Check if we have already seen this date
  if (!seenDates.has(newdate)) {
    seenDates.add(newdate); // Mark this date as seen

    // Add the first occurrence of this date to the weatherArray
    weatherArray.push(
      new Weather(
        response.city.name,
        newdate, // Using the date directly
        response.list[i].weather[0].icon,
        response.list[i].weather[0].description,
        response.list[i].main.temp,
        response.list[i].wind.speed,
        response.list[i].main.humidity
      )
    );
      console.log('weatherArray:',weatherArray);
    }
    
    // return new Weather(
    //   response.city.name,
    //  // response.name,
    //  // new Date(response.dt * 1000).toLocaleDateString(),
    //   new Date(response.list[0].dt * 1000).toLocaleDateString(),
    //   response.list[0].weather[0].icon,
    //   response.list[0].weather[0].description,
    //   response.list[0].main.temp,
    //   response.list[0].wind.speed,
    //   response.list[0].main.humidity
    // );
  }
  return weatherArray;
}
  // TODO: Complete buildForecastArray method -- kavi commented this method.
  //private buildForecastArray(currentWeather: Weather, weatherData: { daily: any[] }) {
  //private buildForecastArray(response:any) {
   
//const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

// console.log('Today:', today);
// console.log('Total entries in response.list:', response.list.length);

//const seenDates = new Set(); // To keep track of dates we have already added
//const weatherArray: Weather[] = [];

//for (let i = 0; i < response.list.length; i++) {
  // const newdate = response.list[i].dt_txt.split(' ')[0]; // Get the date part

  // // Check if we have already seen this date
  // if (!seenDates.has(newdate)) {
  //   seenDates.add(newdate); // Mark this date as seen

  //   // Add the first occurrence of this date to the weatherArray
  //   weatherArray.push(
  //     new Weather(
  //       response.city.name,
  //       newdate, // Using the date directly
  //       response.list[i].weather[0].icon,
  //       response.list[i].weather[0].description,
    //     response.list[i].main.temp,
    //     response.list[i].wind.speed,
    //     response.list[i].main.humidity
    //   )
    // );

    // console.log('Added weather data for date:', newdate);
//   } 
// }

// console.log('Weather Array after push:', weatherArray);

//   }

  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
    console.log('city:',city);
    const coordinates = await this.fetchAndDestructureLocationData(city);
   // const weatherData1 = await this.fetchLocationData(city);
   // console.log('weatherData1:',weatherData1);
    console.log('coordinates:',coordinates);
    if (!coordinates) return null;

    const weatherData = await this.fetchWeatherData(coordinates);
   // const foreCast =  this.buildForecastArray(weatherData)
    return this.parseCurrentWeather(weatherData);
   // return this.buildForecastArray(weatherData);
    console.log('done with getWeatherForCity');
    //return foreCast // just for test -- need to verify
  }
   

}

export default new WeatherService();

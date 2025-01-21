import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface cities {
  name: string; country: string; state: string; lat: string; lon: string;
}

interface weather {
  temp: string; feelTemp: string; maxTemp: string, minTemp: string, description: string, iconURL: string
}
export default function HomeApp() {
  const [city, changeCity] = React.useState('');
  const [lat, changeLat] = React.useState(null);
  const [lon, changeLon] = React.useState(null);
  const [user, changeUser] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<cities[]>([]);
  const [selectedCity, changeSelectedCity] = React.useState<cities>();
  const [colorTop, setColorTop] = React.useState('#5DCCD8');
  const [colorBottom, setColorBottom] = React.useState('#FFE570');
  const [weather, changeWeather] = React.useState<weather>();

  const getLoc = async () => {
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`;
      const response = await fetch(
        url,
      );
      const json = await response.json();
      const lat = json[0].lat;
      const lon = json[0].lon;
      changeLat(lat);
      changeLon(lon);
      setSuggestions([]);
      changeCity('');
      const tempCity = ({
        name: json[0].name,
        country: json[0].country,
        state: json[0].state || '',
        lat: json[0].lat,
        lon: json[0].lon,
      });
      changeSelectedCity(tempCity);
      return;
    } catch (error) {
      console.error(error);
      throw new Error("Location not found");
    }
  };

  const getCitiesForAutoFill = async (query: string) => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`;
      const response = await fetch(
        url,
      );
      const data = await response.json();
      const formattedSuggestions = data.map((item: { name: any; country: any; state: any; lat: any; lon: any; }) => ({
        name: item.name,
        country: item.country,
        state: item.state || '', // Add a default value if state is not available
        lat: item.lat,
        lon: item.lon,
      }));

      setSuggestions(formattedSuggestions); // Assuming the API returns an array of city suggestions
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  //Avoid spanmming api
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getCitiesForAutoFill(city);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSelectCity = (city: any) => {
    changeCity(''); // Display the selected city name in the input
    changeLat(city.lat);
    changeLon(city.lon);
    changeSelectedCity(city); // Store the full city object
    setSuggestions([]); // Clear suggestions
  };



  React.useEffect(() => {
    const getWeather = async () => {
      if (lat != null) {
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`;
          const response = await fetch(
            url,
          );
          const json = await response.json();
          const formatIconURL = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
          const formatWeather = ({
            temp: json.main.temp,
            feelTemp: json.main.feels_like,
            maxTemp: json.main.temp_max,
            minTemp: json.main.temp_min,
            description: json.weather[0].main,
            iconURL: formatIconURL
          });
          //See logic explanation in repo
          // Day time Vs Night, Rain and Snow
          if (json.dt > json.sys.sunrise && json.dt < json.sys.sunset) {
            if (json.weather.main === 'Rain') {
              setColorBottom("#A5C9FF");
            } else if (json.weather.main === 'Snow') {
              setColorBottom("#FCFFD8");
            } else {
              setColorBottom("#FFE570");
            }
          } else {
            if (json.weather.main === 'Rain') {
              setColorBottom("#103C60");
            } else if (json.weather.main === 'Snow') {
              setColorBottom("#003B95");
            } else {
              setColorBottom("#2F373D");
            }
          }
          //Clouds change
          if (json.clouds.all <= 25) {
            setColorTop("#65D9E6");
          } else if (json.clouds.all <= 50) {
            setColorTop("#56BAC6");
          } else if (json.clouds.all <= 83) {
            setColorTop("#4AA1AB");
          } else {
            setColorTop("#488F96");
          }
          changeWeather(formatWeather)
          return 1;
          //return json.movies;
        } catch (error) {
          console.error(error);
          throw (error);
        }
      }

    };

    getWeather();
  }, [lat, lon]);


  return (

    <View style={styles.container} >
      <LinearGradient
        colors={[colorTop, colorBottom]}
        style={styles.background}>

        <View style={styles.center}>
          <Text> {user ? 'Welcome name' : 'Welcome Guest'}</Text>
          <Text style={styles.selectedCity}>
            {selectedCity === null ? '' : selectedCity?.name}
          </Text>
          <Text style={{ fontSize: 30 }}>
            {weather === undefined ? '' : weather?.temp + '°C '}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {weather === undefined ? '' : 'Feels like ' + weather?.feelTemp + '°C ' + 'Max: ' + weather?.maxTemp + '°C ' + 'Min: ' + weather?.maxTemp + '°C'}
          </Text>
          <Image style={styles.weatherIcon}
            source={{
              uri: weather?.iconURL
            }} >
          </Image>
          <Text style={{ fontSize: 20 }}>
            {weather?.description}
          </Text>

          <SafeAreaProvider>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={changeCity}
                value={city}
                placeholder={lat === null ? "Enter the name of a city" : "Search for a different city"}
                keyboardType="numeric"
                onSubmitEditing={getLoc}
              />
              {suggestions.length > 0 && (
                <FlatList
                  data={suggestions}
                  keyExtractor={(item, index) => `${item.name}-${item.country}-${index}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => handleSelectCity(item)}
                    >
                      <Text>{`${item.name}, ${item.state}, ${item.country}`}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        </View>
      </LinearGradient>
    </View>

  );
}



const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
    textAlign: 'center'
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 200,
    alignSelf: 'center',
  },
  selectedCity: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
});

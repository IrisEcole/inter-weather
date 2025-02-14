import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from "../../firebaseConfig";



interface cities {
  name: string; country: string; state: string; lat: string; lon: string;
}

interface weather {
  temp: string; feelTemp: string; maxTemp: string, minTemp: string, description: string, iconURL: string, humidity: string, visibility: string, windSpeed: string, cloudCoverage: string
}
export default function HomeApp() {
  const [city, setCity] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<cities[]>([]);
  const [selectedCity, setSelectedCity] = React.useState<cities>();
  const [colorTop, setColorTop] = React.useState('#5DCCD8');
  const [colorBottom, setColorBottom] = React.useState('#FFE570');
  const [weather, setWeather] = React.useState<weather>();

  const getLoc = async () => {
    try {
      const url = `/api/location?name=${city}}`;
      const response = await fetch(
        url,
        {method: "POST"}
      );
      const json = await response.json();
      setSuggestions([]);
      setCity('');
      const tempCity = ({
        name: json[0].name,
        country: json[0].country,
        state: json[0].state || '',
        lat: json[0].lat,
        lon: json[0].lon,
      });
      setSelectedCity(tempCity);
      return;
    } catch (error) {
      console.log(error);
      throw new Error("Location not found");
    }
  };

  const getCitiesForAutoFill = async (query: string) => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `/api/location?name=${city}}`;
      const response = await fetch(
        url,
        {method: "POST"}
      );
      const data = await response.json();
      const formattedSuggestions = data.map((item: { name: any; country: any; state: any; lat: any; lon: any; }) => ({
        name: item.name,
        country: item.country,
        state: item.state || '',
        lat: item.lat,
        lon: item.lon,
      }));
      setSuggestions(formattedSuggestions);
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
    setCity(''); // Display the selected city name in the input
    setSelectedCity(city); // Store the full city object
    setSuggestions([]); // Clear suggestions
  };

  React.useEffect(() => {
    const getWeather = async () => {
      if (selectedCity !== undefined) {
        try {
          const url = `/api/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}`;
      const response = await fetch(
        url,
        {method: "POST"}
      );
          const json = await response.json();
          const formatIconURL = `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
          const formatWeather = ({
            temp: json.main.temp,
            feelTemp: json.main.feels_like,
            maxTemp: json.main.temp_max,
            minTemp: json.main.temp_min,
            description: json.weather[0].main,
            iconURL: formatIconURL,
            humidity: json.main.humidity,
            visibility: json.visibility,
            windSpeed: json.wind.speed,
            cloudCoverage: json.clouds.all,
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
          //Clouds set
          if (json.clouds.all <= 25) {
            setColorTop("#65D9E6");
          } else if (json.clouds.all <= 50) {
            setColorTop("#56BAC6");
          } else if (json.clouds.all <= 83) {
            setColorTop("#4AA1AB");
          } else {
            setColorTop("#488F96");
          }
          setWeather(formatWeather)
        } catch (error) {
          console.error(error);
          throw (error);
        }
      }
    };

    getWeather();
  }, [selectedCity]);


  return (

    <View style={styles.container} >
      <LinearGradient
        colors={[colorTop, colorBottom]}
        style={styles.background}>

        <View style={styles.center}>
          <Text style={styles.welcome}> {FIREBASE_AUTH.currentUser?.displayName ? ('Welcome back ' + FIREBASE_AUTH.currentUser?.displayName + '!') : 'Welcome !'}</Text>
          <Text style={styles.selectedCity}>
            {selectedCity === null ? '' : selectedCity?.name}
          </Text>
          {(weather !== undefined) && <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 30, paddingTop: 10 }}>
              {weather === undefined ? '' : weather?.temp + '°C '}
            </Text>
            <FontAwesome6 name="temperature-half" size={24} style={{ marginTop: 17 }} color="black" />
          </View>
          }
          <Text style={{ fontSize: 15, paddingTop: 8 }}>
            {weather === undefined ? '' : 'Feels like: ' + weather?.feelTemp + '°C'}
          </Text>
          <Text style={{ fontSize: 15, paddingTop: 5 }}>
            {weather === undefined ? '' : 'Max: ' + weather?.maxTemp + '°C ' + 'Min: ' + weather?.maxTemp + '°C'}
          </Text>
          <Image style={styles.weatherIcon}
            source={{
              uri: weather?.iconURL
            }} >
          </Image>
          <Text style={{ fontSize: 24 }}>
            {weather?.description}
          </Text>
          {(weather !== undefined) &&
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, paddingTop: 10 }}>
                {weather === undefined ? '' : 'Humidity: ' + weather.humidity + '% '}
              </Text>
              <Ionicons name="water-outline" size={17} style={{ marginTop: 7 }} color="black" />
            </View>}
          {(weather !== undefined) &&
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, paddingTop: 10 }}>
                {weather === undefined ? '' : 'Cloud Coverage: ' + weather.cloudCoverage + '% '}
              </Text>
              <Feather name="cloud" size={17} style={{ marginTop: 7 }} color="black" />
            </View>}
          {(weather !== undefined) &&
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, paddingTop: 10 }}>
                {weather === undefined ? '' : 'Wind speed: ' + weather.windSpeed + 'm/s '}
              </Text>
              <Fontisto name="wind" size={17} style={{ marginTop: 7 }} color="black" />
            </View>}
          {(weather !== undefined) &&
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 14, paddingTop: 10 }}>
                {weather === undefined ? '' : 'Visibility: ' + weather.visibility + 'km '}
              </Text>
              <MaterialIcons name="visibility" size={17} style={{ marginTop: 7, paddingBottom: 10 }} color="black" />
            </View>}
          <TextInput
            testID="0"
            style={styles.input}
            onChangeText={setCity}
            value={city}
            placeholder={selectedCity === undefined ? "Enter the name of a city" : "Search for a different city"}
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
                  <Text>
                  {item.state === '' ? `${item.name}, ${item.country}` : `${item.name}, ${item.state}, ${item.country}`}
                 </Text>
                </TouchableOpacity>
              )}
            />
          )}
          <View style={{ paddingBottom: 100 }}></View>

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
    borderColor: '#235789',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    width: 300,
    alignSelf: 'center',
    textAlign: 'center',
    outlineColor: "#235789",
  },
  suggestionItem: {
    padding: 5,
    margin: 5,
    width: 300,
    alignSelf: 'center',
    opacity: 0.6,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  selectedCity: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
  },
  welcome: {
    marginTop: 35,
    fontSize: 26,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});

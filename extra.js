import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import Moment from 'react-moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import TypeWriter from 'react-native-typewriter'


export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [showcity,setShowcity] = useState(false);
  const [prevCity, setPrevCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [feelslike, setFeelslike] = useState(null);
  const [tempmin, setTempmin] = useState(null);
  const [tempmax, setTempmax] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [description, setDescription] = useState('');
  const [temp, setTemp] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nodata, setNodata] = useState(false);

  useEffect(() => {
    if (latitude && longitude) {

      getWeather();
    }
  }, [latitude, longitude]);

  const getPosition = async () => {
    try {
      setNodata(false)
        setIsLoading(true);
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=c79b6cb39826aca9755ade5999cd13bd`
      );
      
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
      setPrevCity(city);
    } catch (error) {
      console.log('errorlocation----', error);
      setIsLoading(false);
      setNodata(true);
      setTemp(null);
      setPrevCity('Nothing');
      // setCity();
    }
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c79b6cb39826aca9755ade5999cd13bd`
      );

      setTemp((response.data.main.temp - 273).toFixed(1));
      setDescription(response.data.weather[0].description);
      setFeelslike((response.data.main.feels_like - 273).toFixed(2))
      setTempmin((response.data.main.temp_min-273).toFixed(2))
      setTempmax((response.data.main.temp_max-273).toFixed(2))
      setPressure(response.data.main.pressure)
      setHumidity(response.data.main.humidity)
      setIsLoading(false);
      setShowcity(true)
    } catch (error) {
      console.log('error----', error);
    }
  };

  return (
    <View style={styles.container}>
      {showcity ? (<Text style={styles.header}>{prevCity.toUpperCase()}</Text>) : (<Text style={styles.header}>Welcome</Text>)}
      <Moment
        element={Text}
        style={styles.date}
        format="dddd, MMMM Do YYYY"
      />
      <View style={styles.inputContainer}>
  <TextInput
    placeholder="Enter City..."
    placeholderTextColor="grey"
    style={styles.input}
    value={city}
    onChangeText={(text) => setCity(text)}
  />
  <TouchableOpacity style={styles.button} onPress={getPosition}>
    <Text style={styles.buttonText}>Search</Text>
  </TouchableOpacity>
</View>
{nodata && (
  <Text style={{
    flex: 1,
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold'
  }}>No such city exist... </Text>
)}
      {!nodata && isLoading ? (
        <ActivityIndicator size="large" color="#841584" />
      ) : temp ? (
        <View >
        <Text style={styles.description}>{description.toUpperCase()}</Text>
       
        <Text style={styles.temp}>{temp}
         <Text>°C</Text>
        </Text>
        <Text style={styles.description2}>Feels like: {feelslike}°C</Text>
 
        <View style={{backgroundColor:'white',padding:20,borderRadius:20,marginTop:50}}>
            <Text style={{fontSize:18,fontWeight:'600',marginBottom:10,color:'#841584'}}>Min. Temp : {tempmin}°C</Text>
            <Text style={{fontSize:18,fontWeight:'600',marginBottom:10,color:'#841584'}}>Max. Temp : {tempmax}°C</Text>
            <Text style={{fontSize:18,fontWeight:'600',marginBottom:10,color:'#841584'}}>Pressure : {pressure}</Text>
            <Text style={{fontSize:18,fontWeight:'600',color:'#841584'}}>Humidity : {humidity}</Text>
        </View>
        </View>
        
       ): <Image style={{width:100,height:100,marginTop:50, marginBottom:50}} source={{uri: 'https://img.freepik.com/free-icon/search_318-805848.jpg'}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
  },
  header: {
    color: '#841584',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10,
  },
  date: {
    backgroundColor: '#FFC82F',
    borderRadius: 30,
    marginVertical: 20,
    padding: 8,
    paddingHorizontal: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    // paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'grey'
  },
  button: {
    backgroundColor: '#841584',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'rgb(255,200,47)',
    alignSelf:'center',
    fontSize: 25,
  },
  description2: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
    alignSelf:'center',
    fontSize: 20,
  },
  temp: {
    fontSize: 70,
    color: 'black',
  },
});


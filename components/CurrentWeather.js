import {View, Text, ActivityIndicator, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {setCity, setLat, setLong, setTemp} from './Action';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment-timezone';

export default function CurrentWeather() {
  // const [currentcity,setCurrentcity]=useState('')
  const today = moment();
  const latitude = useSelector(state => state.reducer.latitude);
  const longitude = useSelector(state => state.reducer.longitude);
  const city = useSelector(state => state.reducer.city);
  const temp = useSelector(state => state.reducer.temperature);
  const [description, setDescription] = useState(null);
  const [mintemp, setMintemp] = useState(null);
  const [maxtemp, setMaxtemp] = useState(null);
  const [loading,setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    if (latitude) {
      getApiData(latitude, longitude);
      console.log('get position from redux----');
    } else
      Geolocation.getCurrentPosition(data => {
        dispatch(setLat(data.coords.latitude));
        dispatch(setLong(data.coords.longitude));
        console.log(data.coords.latitude);
        console.log('get position from function call-----');
        getApiData(data.coords.latitude, data.coords.longitude);
      });
  }, []);

  const dispatch = useDispatch();
  const getApiData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c79b6cb39826aca9755ade5999cd13bd`,
      );

      dispatch(setCity(response.data.name));
      dispatch(setTemp((response.data.main.temp_min - 273).toFixed(2)));
      setDescription(response.data.weather[0].description);
      setMintemp(((response.data.main.temp_min - 273).toFixed(2)));
      setMaxtemp(((response.data.main.temp_max - 273).toFixed(2)));
      console.log('res-----', response.data, latitude, longitude);
    } catch (error) {
      console.log('error----', error, latitude, longitude);
      
    }
    setLoading(false);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: 'ghostwhite',
        // alignItems: 'center',
      }}>
      {loading && (
        <Modal >
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View>
                <ActivityIndicator color={'#841584'} size={'large'}/>
                </View>
            </View>
        </Modal>
      ) }
      <Text
        style={{
          color: '#841584',
          fontWeight: 'bold',
          fontSize: 30,
          marginTop: 10,
          fontStyle:'italic'
        }}>
        Current Weather
      </Text>
      <View
        style={{
          backgroundColor: 'rgb(255,200,47)',
          borderRadius: 30,
          marginVertical: 20,
        }}>
        <Text
          style={{
            color: 'black',
            paddingVertical: 8,
            paddingHorizontal: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {today.format('dddd, MMMM Do YYYY')}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 20,
          marginTop: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: 600,color:'#841584',}}>
          Location{'\n'}
          <Text
            style={{fontSize: 25, color: 'rgb(255,200,47)', paddingTop: 10}}>
            {city}
          </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 20,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 600,color:'#841584',}}>
          Temperature:{'\n'}
          <Text
            style={{fontSize: 30, color: 'rgb(255,200,47)', paddingTop: 10}}>
            {temp}°C
          </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 20,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 600,color:'#841584',}}>
          Description:{'\n'}
          <Text
            style={{fontSize: 25, color: 'rgb(255,200,47)', paddingTop: 10,fontWeight:600}}>
            {description}
          </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 20,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 600,color:'#841584',}}>
          Min. Temp:{'\n'}
          <Text
            style={{fontSize: 30, color: 'rgb(255,200,47)', paddingTop: 10}}>
            {mintemp}°C
          </Text>
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 20,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 600,color:'#841584',}}>
          Max. Temp:{'\n'}
          <Text
            style={{fontSize: 30, color: 'rgb(255,200,47)', paddingTop: 10}}>
            {maxtemp}°C
          </Text>
        </Text>
      </View>

    </View>
  );
}

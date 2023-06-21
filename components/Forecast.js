import {View, Text, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default function Forecast() {
  const latitude = useSelector(state => state.reducer.latitude);
  const longitude = useSelector(state => state.reducer.longitude);
  const [forecast, setForecast] = useState(null);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (latitude && longitude) {
      getApiData();
    }
  }, [latitude, longitude]);

  const getApiData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=c79b6cb39826aca9755ade5999cd13bd`,
      );
      setForecast(response.data);
    } catch (error) {
      console.log('error----', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#841584',
          fontWeight: 'bold',
          fontSize: 30,
          marginTop: 10,
          fontStyle: 'italic',
        }}>
        Weather Forecast
      </Text>
      {loading && (
        <Modal transparent>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View>
                <ActivityIndicator color={'#841584'} size={'large'}/>
                </View>
            </View>
        </Modal>
      ) }
      {forecast && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {forecast.list.map((item, index) => {
            if (index % 4 === 0) {
              return (
                <View key={item.dt_txt} style={{backgroundColor:'white',marginVertical:10,padding:20,borderRadius:25,width:300}}>
                  <Text style={{fontWeight:'bold',fontSize:15,color:'#841584'}}>Date: {new Date(item.dt_txt).toLocaleDateString()}</Text>
                  <Text style={{fontWeight:'bold',fontSize:15,color:'rgb(255,200,47)'}}>Description: {item.weather[0].description}</Text>
                  <Text style={{fontWeight:'bold',fontSize:15,color:'rgb(255,200,47)'}}>Temp: {`${(item.main.temp-273).toFixed(2)}°C`}</Text>
                </View>
              )
            } else {
              return null;
            }
          })}
        </ScrollView>
      )}
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
});

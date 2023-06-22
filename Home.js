import { View, Text, StatusBar, StyleSheet, Button, Linking, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TypeWriter from 'react-native-typewriter';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default function Home() {
  const navigation = useNavigation();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  let count=0;
  let deny=0;
  
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      console.log('granted-----',granted)

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
        navigation.navigate("WeatherApp");
      } else {
        console.log('Location permission denied');
        const permissionResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('permission result------> ', permissionResult)
        if (permissionResult === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
          navigation.navigate("WeatherApp");
        } else if(permissionResult == 'never_ask_again' && deny==1) {
          // alert('Location permission denied again. Grant Permission First');
          count+=1
          if(count>=2)
          {
            Alert.alert('Location Permission Required',
            'To use this feature, location permissions are required. Please go to the app settings and grant location permissions.', [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {text: 'Go to Settings', onPress: () => Linking.openSettings()},
                          ]);

            // const goToSettings = await Linking.openSettings(); 
            
            
          }
         
        }
        else if(permissionResult == 'denied'){
          deny=1,
          count=0,
          console.log('denied-----',deny)
          
            // console.log('count-----',count,deny)
            
        
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }

  function goToWeatherApp() {
    requestLocationPermission();
    if (hasLocationPermission) {
      navigation.navigate("WeatherApp");
    }
  }

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <StatusBar hidden/>
      <Text style={{color:'#841584',fontWeight:'bold',fontSize:50,marginTop:20}}>Get Started {'\n'}Weather App</Text>
      <TypeWriter style={{color:'grey', marginTop:20}} typing={1}><Text >Check the weather of any city of your choice.</Text></TypeWriter>
      <LottieView style={{height:450,width:600,}} source={require('./cloud.json')} autoPlay loop />
      <TouchableOpacity style={{backgroundColor:"#841584",borderRadius:20}} onPress={goToWeatherApp}>
        <Text style={{color:'white',paddingHorizontal:30,paddingVertical:10,fontWeight:'bold',fontSize:18}} >Let's Start</Text>
      </TouchableOpacity>
    </View>
  )
}

import { View, Text, StatusBar, StyleSheet, Button } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TypeWriter from 'react-native-typewriter'


export default function Home() {
  const navigation = useNavigation()
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <StatusBar hidden/>
      <Text style={{color:'#841584',fontWeight:'bold',fontSize:50,marginTop:20}}>Get Started {'\n'}Weather App</Text>
      <TypeWriter style={{color:'grey', marginTop:20}} typing={1}><Text >Check the weather of any country of your choice.</Text></TypeWriter>
      <LottieView style={{height:450,width:600,}} source={require('./cloud.json')} autoPlay loop />
      <TouchableOpacity style={{backgroundColor:"#841584",borderRadius:20}} onPress={()=>navigation.navigate("WeatherApp")}>
        <Text style={{color:'white',paddingHorizontal:30,paddingVertical:10,fontWeight:'bold',fontSize:18}} >Let's Start</Text>
      </TouchableOpacity>
    </View>
  )
}


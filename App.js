import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Home from './Home'

export default function App() {
  return (
    
    <View style={styles.container} >
    <Home/>
    </View>
   
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
   alignItems: 'center',
   padding: 10,
   backgroundColor:'white'
  },

})
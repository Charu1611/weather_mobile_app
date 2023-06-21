import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import App from './App';
import Forecast from './components/Forecast';
import WeatherApp from './WeatherApp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CurrentWeather from './components/CurrentWeather';
import { Provider } from 'react-redux';
import store from './components/Store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator 
        screenOptions={{
          tabBarActiveBackgroundColor:'#841584',
          tabBarInactiveBackgroundColor:'white',
          tabBarActiveTintColor:"white",
          tabBarInactiveTintColor:"white",
          tabBarInactiveBackgroundColor:'rgb(255,200,47)',
          tabBarStyle: { height: 35,borderWidth:1 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold',marginBottom:7},
          tabBarIcon: () => null,
        }}>
        
        <Tab.Screen name="Weather" component={WeatherApp} options={{ headerShown: false }} />
        <Tab.Screen name="CurrentWeather" component={CurrentWeather} options={{ headerShown: false }} />
        <Tab.Screen name="Forecast" component={Forecast} options={{ headerShown: false }} />
        
      </Tab.Navigator>
    );
  }
  

export default function MyStack() {
    const Stack = createStackNavigator()
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='App' >
    <Stack.Screen name="Home" component={Home} options={{
        headerTitle: 'Forecast',
        headerTitleStyle: { fontWeight: 'bold', fontSize:25, color:'rgb(255,200,47)',fontStyle:'italic' },
        headerLeft: null,
       
      }} />
    <Stack.Screen name="App" component={App} options={{headerShown:false}} />
      <Stack.Screen name="WeatherApp" component={MyTabs} options={{
        headerShown:false,
       
      }} />
  </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
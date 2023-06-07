import { Text, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './src/screens/Login';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/screens/Home';
import Navigating from './src/screens/Navigating';

const Stack = createNativeStackNavigator();

function App() {

  useEffect(()=> {
    setTimeout(()=> {
      SplashScreen.hide()
    }, 1000)

    receiveData()



    
  })

  let isLogged = ""
  const receiveData = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const loggedIn = await AsyncStorage.getItem('isLoged');
      if (loggedIn != null){
       
      }
      //   if (loggedIn != null) {
      //     if (userDetails !== null) {
      //       if (userDetails === undefined) {
      //         this.setState({isLogged: false});
      //       } else {
      //         this.setState({isLogged: true});
      //       }
      //     }
      //     // if  (loggedIn === 'true'){
      //     //     this.setState({isLogged:true})
      //     // }else{
      //     //     this.setState({isLogged:false})
      //     // }
      //   }

      //   console.log(loggedIn);
      //   if (userDetails !== null) {
      //     const parseData = userDetails != null ? JSON.parse(userDetails) : null;
      //     this.setState({actualDetails: parseData});
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
       {/* <Stack.Screen name="Navigating" component={Navigating} /> */}
       <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
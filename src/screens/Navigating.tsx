import {Text, View} from 'react-native';
import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './Login';
import Home from './Home';


interface IProps {
    navigation:any
}

interface IState {}


export default class Navigating extends Component<IProps, IState> {
  state = {logged: null};

  componentDidMount(): void {
    this.receiveData();
  }

  receiveData = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const loggedIn = await AsyncStorage.getItem('isLoged');
      this.setState({logged: loggedIn})
      console.log(loggedIn)
      // console.log(loggedIn)
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

  render() {
    const {logged} = this.state;
    
    return logged != null ? this.props.navigation.navigate('Home') : this.props.navigation.navigate('Login');
  }
}

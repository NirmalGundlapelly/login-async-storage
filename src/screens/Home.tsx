import {Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  navigation: any;
}

interface IState {}

export default class Home extends Component<IProps, IState> {
  componentDidMount(): void {
    this.receiveData();
  }

 

  receiveData = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const loggedIn = await AsyncStorage.getItem('isLoged');
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

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoged');
    } catch (error) {
      console.log(error);
    }
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View>
        <Text>Home</Text>
        <TouchableOpacity onPress={this.handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

interface IProps {
  navigation: any;
}

interface IState {
  userEmail: string;
  userPassword: string;
  actualDetails: any;
  isLogged: boolean;
  error: boolean;
}

export default class Login extends Component<IProps, IState> {
  state = {
    userEmail: '',
    userPassword: '',
    isLogged: false,
    actualDetails: null,
    error: false,
  };

  componentDidMount(): void {
    this.storeData();
    this.receiveData();
    if (this.state.isLogged == true){
        this.props.navigation.navigate('Home')
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify({email: 'nirmalgoud2103@gmail.com', password: '12345'}),
      );
    } catch (error) {
      console.log(error);
    }
  };

  receiveData = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      const loggedIn = await AsyncStorage.getItem('isLoged');
      if (loggedIn != null){
        this.props.navigation.navigate('Home')
    }
      if (loggedIn != null) {
          this.setState({isLogged: true});
      }else {
        this.setState({isLogged: false});
      }

     

      if (userDetails !== null) {
        const parseData = userDetails != null ? JSON.parse(userDetails) : null;
        this.setState({actualDetails: parseData});
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleLogin = async () => {
    try {
      const storeLogged = await AsyncStorage.setItem('isLoged', 'true');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {userEmail, userPassword, isLogged} = this.state;
    console.log(isLogged);

  
      // some
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.appContainer}>
            <View style={styles.mainContainer}>
              <Text style={styles.loginText}>Login</Text>
              <View style={styles.formContainer}>
                <TextInput
                  onChangeText={text => this.setState({userEmail: text})}
                  placeholder="Email"
                  value={this.state.userEmail}
                  style={styles.input}
                />
                <TextInput
                  onChangeText={text => this.setState({userPassword: text})}
                  placeholder="Password"
                  value={this.state.userPassword}
                  style={styles.input}
                />
                {this.state.error && (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'flex-start',
                      marginLeft: 10,
                      marginBottom: 10,
                    }}>
                    *Invalid Email or Password
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => {
                    const {email, password} = this.state.actualDetails;

                    if (userEmail !== '' && userPassword !== '') {
                      if (userEmail === email && userPassword === password) {
                        this.handleLogin();
                        this.props.navigation.navigate('Home');
                        this.setState({
                          userEmail: '',
                          userPassword: '',
                          error: false,
                        });
                      }
                    } else {
                      this.setState({error: true});
                    }

                    // if (userEmail !== email && userPassword !== password)  {
                    //   this.setState({error: true});
                    // } else {
                    //     if (userEmail == email && userPassword == password){
                    //         this.props.navigation.navigate('Home');
                    //     }

                    // }
                  }}
                  style={styles.continueButton}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    
    
  
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'black',
    height: height,
  },
  backgrouindmage: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  mainContainer: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(49, 51, 51, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 12,
    marginTop: 10,
    padding: 20,
  },
  input: {
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
    width: '95%',
    backgroundColor: 'white',
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
  },
  loginText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    marginTop: '55%',
    marginLeft: 15,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#1e3e6e',
    width: '95%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  forgetText: {
    color: '#CDE7BE',
    marginTop: 15,
  },
  orText: {
    color: '#939999',
    marginTop: 20,
    fontSize: 14,
  },

  authButtonContainer: {
    backgroundColor: '#EAF4F4',
    width: '95%',
    height: 48,
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  buttonIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  authButtonText: {
    color: '#313333',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonIcon: {
    position: 'absolute',
    left: 5,
  },

  dontHaveText: {
    color: '#EAF4F4',
    marginTop: 20,
    marginRight: 10,
    padding: 10,
  },
  signUpText: {
    color: '#CDE7BE',
    fontWeight: '600',
    fontSize: 15,
  },
});

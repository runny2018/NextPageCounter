import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, ThemeProvider } from 'react-native-elements';








class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 , name:""};
    this.incrementCount = this.incrementCount.bind(this)
  }

  static navigationOptions = () => ({
    title: "Home",
    headerTintColor: "white",                         //Header Bar
    headerStyle: {
      backgroundColor: 'orangered',
      fontFamily: "Rustico-V2-Regular"
    },


  });

  incrementCount() {
    this.setState({ count: this.state.count + 1 })
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', this.state.name);
    } catch (error) {

    }
  };

  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "maroon" }}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <Text style={styles.homeScreenText}>Welcome!</Text>
        <Text style={styles.nameText}>Please enter your name:</Text>
        <TextInput
          style={{ height: 40, color:"white",borderColor: 'gray', borderWidth: 1, marginBottom:70}}
          onChangeText={(name)=> this.setState({name})}
          value={this.state.name}
        />
        <ThemeProvider theme={theme}>
          <Button
            type="outline"
            title="Next Page"
            buttonStyle={{ backgroundColor: "orangered" }}
            onPress={() => {
              this._storeData();
              this.incrementCount();
              this.props.navigation.navigate('Details', { count: this.state.count ,name:this.state.name });
            }}
          />
        </ThemeProvider>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { string: '' };

  }

  componentDidMount() {
    AsyncStorage.getItem(
      '@MySuperStore:key'
    ).then(string => {
      this.setState({ string })
    })

  }

  static navigationOptions = () => ({
    title: "Counter Page",
    headerTintColor: "white",                         //Header Bar
    headerStyle: {
      backgroundColor: 'orangered',
      fontFamily: "Rustico-V2-Regular"
    },


  });

  render() {
    let count = this.props.navigation.getParam('count');
    let name= this.props.navigation.getParam('name');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignItems:"center",backgroundColor: "maroon" }}>
        <Text style={styles.nextPageText}>Have a good day {name}! </Text>
        <Text style={styles.homeScreenText}>{count} </Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: "center",

  },

);

const theme = {
  Button: {

    titleStyle: {
      color: "white"
    },

  }
}

const styles = StyleSheet.create({
  homeScreenText: {
    fontSize: 41,   
    color: "white",
    fontFamily: "Rustico-V2-Regular",
    

  },

  nameText:{
    fontSize: 17,
    color:"white",
    fontFamily:"Rustico-V2-Regular",
    marginBottom:19
  },

  nextPageText:{
    fontSize: 41,
    color:"white",
    fontFamily:"Rustico-V2-Regular",
    margin:45
  }
})



export default createAppContainer(AppNavigator);


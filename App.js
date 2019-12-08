import React, {Component} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, ThemeProvider } from 'react-native-elements';






class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.incrementCount = this.incrementCount.bind(this)
  }

  static navigationOptions = () => ({
    title: "Home",
    headerTintColor: "white",                         //Header Bar
    headerStyle: {
      backgroundColor: 'orangered',
      fontFamily:"Rustico-V2-Regular"
    },
   

  });

  incrementCount() {
    this.setState({ count: this.state.count + 1 })
  }

  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center' , justifyContent: 'center', backgroundColor: "maroon" }}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <Text style={styles.homeScreenText}>Welcome!</Text>
        <ThemeProvider theme={theme}>
        <Button
          type="outline"      
          title="Next Page"
          buttonStyle={{backgroundColor:"orangered"}}
          onPress={() => {
            this.incrementCount();
            this.props.navigation.navigate('Details', { count: this.state.count });
          }}
        />
        </ThemeProvider>       
      </View>
    );
  }
}

class DetailsScreen extends React.Component {

  static navigationOptions = () => ({
    title: "Counter Page",
    headerTintColor: "white",                         //Header Bar
    headerStyle: {
      backgroundColor: 'orangered',
      fontFamily:"Rustico-V2-Regular"
    },
   

  });

  render() {
    let count = this.props.navigation.getParam('count');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"maroon" }}>
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

const theme={
  Button:{
    
    titleStyle:{
      color:"white"
    },
    
  }
}

const styles=StyleSheet.create({
  homeScreenText:{
    fontSize:41,
    marginBottom:30,
    color:"white",
    fontFamily:"Rustico-V2-Regular",
    marginBottom:79
    
  }
})



export default createAppContainer(AppNavigator);


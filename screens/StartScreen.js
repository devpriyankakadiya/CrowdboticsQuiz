import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Header, Button } from './../components/';
import {c_orange} from '../utils/constants';
import Questions from './Questions';
import ResultScreen from './ResultScreen';

class StartScreen extends React.Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }
    render() {
        return (
        <View style={styles.container}>
        <Header  headerText='Trivia Quiz'/>
        <View style={{ flex:1, justifyContent: 'center' }}>
        <Button text='START QUIZ'
            onPress={() => this.props.navigation.navigate('Questions')}
            cardStyle={styles.enterButtonCardStyle}
            btnStyle={styles.enterButtonStyle}
        />
        </View>
        </View>
        );
    }
}

const AppNavigator = createStackNavigator({
  Home: StartScreen,
  Questions: Questions,
  ResultScreen: ResultScreen
},{
    initialRouteName: "Home",
    headerMode: "none",
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    enterButtonCardStyle: {
        backgroundColor: c_orange,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 25,
        elevation: 0
    },
    enterButtonStyle: {
        color: 'white',
        fontSize: 18,
    },
  });
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from './../components/';
import { c_orange } from "../utils/constants";

export default class StartScreen extends React.Component {

    playAgain = () => {
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.navigate('Questions');
    }

    render(){
        const {correctAnswer, totalQuestion} = this.props.navigation.state.params;
        return(
            <View style={{ flex:1, backgroundColor:'#F5FCFF', alignContent: 'center', justifyContent: 'space-around' }}>
                <View style={{ marginLeft:25, marginRight:25, backgroundColor:'#F5FCFF', borderRadius: 10, }}>
                    <Text style={{ color: c_orange, alignSelf: 'center', fontWeight:'900', marginTop:10 }}>Total Questions: {totalQuestion} </Text>
                    <Text style={{ color: c_orange, alignSelf: 'center', fontWeight:'900', marginTop:10 }}>Correct Answers: {correctAnswer}</Text>
                    <Text style={{ color: c_orange, alignSelf: 'center', fontWeight:'900', marginTop:10 }}>Percentage: {(correctAnswer*100)/totalQuestion}%</Text>
                </View>
                <Button text='Play Again'
                    onPress={() => this.playAgain()}
                    cardStyle={styles.enterButtonCardStyle}
                    btnStyle={styles.enterButtonStyle}
                />
            </View>
        )
    }
}

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
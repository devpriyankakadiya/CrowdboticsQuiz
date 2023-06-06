import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Header } from './Header';
import { Button } from './Button';
import { c_orange } from './../utils/constants';

const QuestionComponent = ({question, handleChange, selected, currentIndex, totalQuestion}) => {    
    return (
        <View style={{ backgroundColor: '#F5FCFF', flex:1 }}>
            <Header headerText={currentIndex + 1 + ' OF ' + totalQuestion} />
            <View style={{ margin:20 }}>
            <Text style={{ color: c_orange, fontSize:16, fontWeight:"500" }}>{question.question}</Text>
            </View>
            <View style={{ marginTop:30 }}>
            {question.options.map((option, i) => (
                <Button text={option}
                    onPress={() => handleChange(option)} key={i}
                    cardStyle={[styles.commanButtonCardStyle, selected !== option ? styles.enterButtonDisableCardStyle : styles.enterButtonCardStyle]}
                    btnStyle={selected !== option ? styles.enterButtonDisableStyle : styles.enterButtonStyle}
                />
            ))}
            </View>
        </View>         
    );
};
const styles = StyleSheet.create({
    commanButtonCardStyle: {
        margin: 5,
        borderRadius: 10,
    },
    enterButtonCardStyle: {
        backgroundColor: c_orange,
        elevation: 0
    },
    enterButtonDisableCardStyle: {
        backgroundColor: 'white',
        shadowColor: c_orange,
        elevation: 10
    },
    enterButtonStyle: {
        color: 'white',
        fontSize: 15,
        fontWeight:'300'
    },
    enterButtonDisableStyle: {
        color: c_orange,
        fontSize: 15,
        fontWeight:'300'
    },
});
export {QuestionComponent};

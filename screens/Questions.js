import React, {Component} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Loading from 'react-native-whc-loading';
import { QuestionComponent } from '../components/';
import { c_orange } from '../utils/constants';

export default class Questions extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      current: 0,
      answer: {}
    }
  }

  handleNext = (count, isNext) => {
    const { current,answer } = this.state;
    if(isNext && !answer[current]) return false;
    this.setState((state) => ({current: state.current + count}));
  }

  handleChange = (option, i) => {
      this.setState((state) => ({answer: {...state.answer, [i]: option}}));
  }

  shuffle = (options) => {
    let ctr = options.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = options[ctr];
        options[ctr] = options[index];
        options[index] = temp;
    }
    return options;
}

  getRandomOptions(allQuetions) {
      return allQuetions.map(q => ({
        question: q.question,
        options: this.shuffle([...q.incorrect_answers, q.correct_answer]),
        correct_answer: q.correct_answer
      }));
  }

  getQuestions() {
    this.refs.loading.show();
    axios("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple").then(response => {
      this.refs.loading.close();
      this.setState({questions: this.getRandomOptions(response.data.results)});
    }).catch(error =>{
      this.refs.loading.close();
    });
  }

  componentDidMount(){
    this.getQuestions();
  }

  playAgian() {
    this.setState({questions: [], current: 0, answer: {}}, () => {
      this.getQuestions();
    });
  }

  getResult = () => {
    const {answer, questions, current} = this.state;
    if(!answer[current]) return false;
    let count = 0;
    questions.forEach((question, i) => {
      if(question.correct_answer === answer[i]) {
        count = count + 1;
      }
    })
    this.props.navigation.navigate('ResultScreen',{totalQuestion: questions.length, correctAnswer: count, onGoBack: () => this.playAgian()});
  }

  render() {
    const { questions, current, answer } = this.state;
    return (
      <View style={styles.container}>
        {questions.map((q, i) => (
          current === i ? <QuestionComponent question={q} totalQuestion={questions.length} currentIndex={i} handleChange={(a) => this.handleChange(a, i)} selected={answer[i]}/>: null
        ))}
        <View style={{ height:60, flexDirection: 'row', marginBottom:24 }}>
          {current > 0 && <TouchableOpacity onPress={() => this.handleNext(-1)} style={styles.nextPrevButtonStyle}>
            <Text style={styles.nextPrevButtonTextStyle}>
              Previous
            </Text>
          </TouchableOpacity> }
          {current !== questions.length - 1 && current < questions.length && <TouchableOpacity onPress={() => this.handleNext(1, true)} style={styles.nextPrevButtonStyle}>
            <Text style={styles.nextPrevButtonTextStyle}>
              Next
            </Text>
          </TouchableOpacity>}
          {current === questions.length - 1  && <TouchableOpacity onPress={this.getResult} style={styles.nextPrevButtonStyle}>
            <Text style={styles.nextPrevButtonTextStyle}>
              Finish
            </Text>
          </TouchableOpacity>}
        </View>
        <Loading ref="loading" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  nextPrevButtonStyle:{
    flex:1, 
    justifyContent: 'center', 
    alignItems:'center', 
    height:50,
    backgroundColor: c_orange,
    margin: 10,
    borderRadius: 10
  },
  nextPrevButtonTextStyle:{
    color: 'white',
    fontWeight:'900', 
    fontSize:18,
  }
});

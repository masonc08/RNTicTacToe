import React, {Component} from 'react';
import {StyleSheet,View,Text,Image,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      //saves the state of the game in a 2d array
      game: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      // 1 for cinnamon, 2 for donuts
      turn: 0
    };
  }

  //when the app starts, run this
  componentDidMount(){
    this.startGame();
  }
  startGame = () => {
    this.setState({
      game: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    })
  }
  renderIcon = (i, j) => {
    const value = this.state.game[i][j];
    if(value == 1){
      return <Image style={styles.cinnamon} source={require("./cinnamon_sticks.jpg")}/>;
    } else if (value == 2){
      return <Image style={styles.donut} source={require("./donut.jpg")}/>
    } else {
      return <View/>
    }
  } 
  // checkWinner = (row, col) => {
  //   let sum = 0;
  //   for(let i = 0; i < 3; i++){
  //     sum += this.state.game[i][col];
  //   }
  // }
  updateValue = (i, j) => {
    // only respond if the tile isn't occupied
    if (this.state.game[i][j] == 0){
      let newPosition = this.state.game;
      newPosition[i][j] = this.state.turn%2 + 1;
      this.setState({
        game: newPosition,
        turn: this.state.turn + 1
      });
    }
  }
  render() {
    return (
      <View style = {styles.container}>
        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.updateValue(0, 0)} style = {[styles.box, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateValue(0, 1)} style = {[styles.box, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateValue(0, 2)} style = {[styles.box, {borderRightWidth: 0, borderTopWidth: 0}]}>
          {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.updateValue(1, 0)} style = {[styles.box, {borderLeftWidth: 0}]}>
          {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateValue(1, 1)} style = {styles.box}>
          {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateValue(1, 2)} style = {[styles.box, {borderRightWidth: 0}]}>
          {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style = {{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.updateValue(2, 0)} style = {[styles.box, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateValue(2, 1)} style = {[styles.box, {borderBottomWidth: 0}]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateValue(2, 2)} style = {[styles.box, {borderBottomWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cinnamon: {
    width: 75,
    height: 75
  },
  donut: {
    width: 50,
    height: 50
  },
  box: {
    borderWidth: 1,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  }
});
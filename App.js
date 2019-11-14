import React, {Component} from 'react';
import {Button,StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native';

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
      // -1 for cinnamon, -1 for donuts
      turn: -1,
      // how many moves have been made by both players
      turns: 0,
      gameState: true
    };
  }

  //reset state
  startGame = () => {
    this.setState({
      game: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      turn: -1,
      turns: 0,
      gameState: true
    })
  }
  renderIcon = (i, j) => {
    const value = this.state.game[i][j];
    if(value == -1){
      return <Image style={styles.cinnamon} source={require("./cinnamon_sticks.jpg")}/>;
    } else if (value == 1){
      return <Image style={styles.donut} source={require("./donut.jpg")}/>
    } else {
      return <View/>
    }
  } 
  checkSum = (sum) => {
    if(sum == -3){
      alert('Cinnamon wins!');
      this.setState({
        gameState: false
      })
      return true;
    } else if (sum == 3){
      alert('Donut wins!');
      this.setState({
        gameState: false
      })
      return true;
    }
    return false;
  }
  checkWinner = (row, col) => {
    //check if the column has a win
    let sum = 0;
    for(let i = 0; i < 3; i++){
      sum += this.state.game[i][col];
    }
    if(this.checkSum(sum)) return;
    //check if the row has a win
    sum = 0;
    for(let i = 0; i < 3; i++){
      sum += this.state.game[row][i];
    }
    if(this.checkSum(sum)) return;
    //check if the top left to bottom right diagonal has a win
    sum = 0;
    if(row == col){
      for(let i = 0; i < 3; i++){
        sum += this.state.game[i][i];
      }
      if(this.checkSum(sum)) return;
      sum = 0;
    }
    //check if the top right to bottom left diagonal has a win
    if(row == 2 && col == 0 || row == 0 && col == 2){
      for(let i = 0; i < 3; i++){
        sum += this.state.game[i][2-i];
      }
      if(this.checkSum(sum)) return;
      sum = 0;
    }
    //check if it's a tie
    if(this.state.turns == 9){
      alert("It was a tie!");
      this.setState({
        gameState: false
      })
      return;
    }
  }
  updateValue = (i, j) => {
    // only respond if the tile isn't occupied, and if the game hasn't ended
    if (this.state.game[i][j] == 0 && this.state.gameState){
      let newPosition = this.state.game;
      newPosition[i][j] = this.state.turn;
      this.setState({
        game: newPosition,
        turn: (this.state.turn == -1) ? 1 : -1,
        turns: this.state.turns + 1
      }, () => this.checkWinner(i, j));
    }
  }
  render() {
    return (
      <View style = {styles.container}>  
        <View style = {{flex: 3, justifyContent: "center"}}>
          <Text style = {{fontSize: 36}}>Tic Tac Toe</Text>
        </View>
        <View style = {{flex: 5}}>
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
        <View style={{flex: 2}}>
            <Button title="Clear" onPress={() => this.startGame()}/>
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
import React, {Component} from 'react';
import {StyleSheet,View,Text,Image,} from 'react-native';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      //saves the state of the game in a 2d array
      game: [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      // 1 for cinnamon, 2 for donuts
      turn: 1
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
  render() {
    return (
      <View style = {styles.container}>
        <View style = {{flexDirection: "row"}}>
          <View style = {[styles.box, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </View>
          <View style = {[styles.box, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
          </View>
          <View style = {[styles.box, {borderRightWidth: 0, borderTopWidth: 0}]}/>
        </View>
        <View style = {{flexDirection: "row"}}>
          <View style = {[styles.box, {borderLeftWidth: 0}]}/>
          <View style = {styles.box}/>
          <View style = {[styles.box, {borderRightWidth: 0}]}/>
        </View>
        <View style = {{flexDirection: "row"}}>
          <View style = {[styles.box, {borderLeftWidth: 0, borderBottomWidth: 0}]}/>
          <View style = {[styles.box, {borderBottomWidth: 0}]}/>
          <View style = {[styles.box, {borderBottomWidth: 0, borderRightWidth: 0}]}/>
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
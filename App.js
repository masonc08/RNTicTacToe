/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <View style = {styles.container}>
      <View style = {{flexDirection: "row"}}>
        <View style = {[styles.tiles, {borderLeftWidth: 0, borderTopWidth: 0}]}>
        </View>
        <View style = {[styles.tiles, {borderTopWidth: 0}]}/>
        <View style = {[styles.tiles, {borderRightWidth: 0, borderTopWidth: 0}]}/>
      </View>
      <View style = {{flexDirection: "row"}}>
        <View style = {[styles.tiles, {borderLeftWidth: 0}]}/>
        <View style = {styles.tiles}/>
        <View style = {[styles.tiles, {borderRightWidth: 0}]}/>
      </View>
      <View style = {{flexDirection: "row"}}>
        <View style = {[styles.tiles, {borderLeftWidth: 0, borderBottomWidth: 0}]}/>
        <View style = {[styles.tiles, {borderBottomWidth: 0}]}/>
        <View style = {[styles.tiles, {borderBottomWidth: 0, borderRightWidth: 0}]}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tiles: {
    borderWidth: 1,
    width: 100,
    height: 100
  }
});

export default App;

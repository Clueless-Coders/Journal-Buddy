import { SafeAreaView, StyleSheet, Text, View , Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DailyPrompt from './src/Components/DailyPrompt/DailyPrompt';
import Menu from './src/Components/HamburgerMenu/Menu';
import React from 'react';

export default function App() {
  //using state to determine if the menu should be visible or not
   

  return (
      <SafeAreaView style={styles.wrapper}>
        <DailyPrompt></DailyPrompt>
      </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  background: {
    backgroundColor: '#17171a'
  },
  wrapper: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
    flex: 1
  },
  HamburgerMenuIcon: {
    position: 'absolute'
  }
});

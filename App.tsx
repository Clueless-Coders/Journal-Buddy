import { SafeAreaView, StyleSheet, Text, View , Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DailyPrompt from './src/Components/DailyPrompt';
import Menu from './src/Components/HamburgerMenu/Menu';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';

export default function App() {
  //using state to determine if the menu should be visible or not
   let [menuVisible, updateMenuVisible] = React.useState(false);

  return (
      <SafeAreaView style={styles.wrapper}>
        <View style={{zIndex: 1}}>
          {menuVisible ? <Menu /> : null}
          <Ionicons name="menu-sharp" size={50} color="white" style={{position: 'absolute'}} onPress={() => updateMenuVisible(!menuVisible)} />
        </View>
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
    backgroundColor: '#17171a',
    flex: 1
  },
  HamburgerMenuIcon: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    position: 'absolute'
  }
});

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DailyPrompt from './src/Components/DailyPrompt'
import Menu from './src/Components/HamburgerMenu/Menu'

export default function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#dcdede"
  },
  container: {
    flex: 1,
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});

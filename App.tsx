import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DailyPrompt from './src/Components/DailyPrompt'
import Menu from './src/Components/HamburgerMenu/Menu'

export default function App() {
  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.wrapper}>
        <Menu />
        <DailyPrompt />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#17171a'
  },
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});

import { SafeAreaView, StyleSheet, Text, View , Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DailyPrompt from './src/Components/DailyPrompt'
import Menu from './src/Components/HamburgerMenu/Menu'
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default function App() {
  return (
      <SafeAreaView style={styles.wrapper}>
        <View>
          
          <Menu />
          <Ionicons name="menu-sharp" size={50} color="white" style={{position: 'absolute'}} />
        </View>
      </SafeAreaView>
  );
}

function handleMenuButtonTap() {

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

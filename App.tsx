import DailyPrompt from './src/Components/Journal-Pages/DailyPrompt';
import { Image, SafeAreaView, View } from 'react-native';
import React from 'react';
import JournalEntries from './src/Components/Journal-Pages/JournalEntries';
import CheckboxButton from './src/Components/Buttons/CheckboxButton';
import GeneralButtonDark from './src/Components/Buttons/GeneralButtonDark';
import GeneralButtonLight from './src/Components/Buttons/GeneralButtonLight';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeMenu from './src/Components/HomePage/HomeMenu';

//TODO: Allow each page to change the currentPage state in order to switch which page is being displayed.
//TODO: Create bottom taskbar

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Home" component={HomeMenu}/>
      <Tab.Screen name="New Journal" component={DailyPrompt}/>
      <Tab.Screen name="Calendar" component={HomeMenu}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}
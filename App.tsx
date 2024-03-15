import DailyPrompt from './src/Components/Journal-Pages/DailyPrompt';
import { Image, SafeAreaView, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeMenu from './src/Components/HomePage/HomeMenu';
import Menu from './src/Components/HamburgerMenu/Menu';
import JournalEntries from './src/Components/Journal-Pages/JournalEntries';

//TODO: Allow each page to change the currentPage state in order to switch which page is being displayed.
//TODO: Create bottom taskbar

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Home" component={HomeMenu}/>
      <Tab.Screen name="NewJournal" component={DailyPrompt}/>
      <Tab.Screen name="Calendar" component={HomeMenu}/>
    </Tab.Navigator>
  );
}

function HomeStack() {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeMenu" component={HomeMenu} />
      <Stack.Screen name="JournalEntries" component={JournalEntries} />
    </Stack.Navigator>
  );
}

function DrawerGroup() {
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={TabGroup} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <DrawerGroup />
    </NavigationContainer>
  );
}
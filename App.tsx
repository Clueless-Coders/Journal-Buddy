import DailyPrompt from './src/Components/Journal-Pages/DailyPrompt';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeMenu from './src/Components/HomePage/HomeMenu';
import JournalEntries from './src/Components/Journal-Pages/JournalEntries';
import { FontAwesome5 } from '@expo/vector-icons';
import LoginPage from './src/Components/Login/LoginPage';
import SignUp from './src/Components/Login/SignUp';
import { AuthenticationContext, AuthContext } from './src/AuthContext';

//TODO: Allow each page to change the currentPage state in order to switch which page is being displayed.
//TODO: Create bottom taskbar

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TabGroup() {
  

  return (
    <Tab.Navigator
      
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: (focused: boolean, color: string, size: number) => {
          let iconName;
          if (route.name === "Home")
            iconName = "home";
          else if (route.name === "NewJournal")
            iconName = "plus-square";
          else if (route.name === "Calendar")
            iconName = "calendar";

          return (<FontAwesome5 name={iconName} size={20} color={color} />) ;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStack}/>
      <Tab.Screen name="NewJournal" component={DailyPrompt} />
      <Tab.Screen name="Calendar" component={HomeMenu}/>
    </Tab.Navigator>
  );
}

function JournalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JournalEntries" component={JournalEntries} />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Drawer" component={DrawerGroup} />

    </Stack.Navigator>
  )
}

function DrawerGroup() {
  return(
    <Drawer.Navigator initialRouteName='HomeStack'>
      <Stack.Screen name="Home" component={HomeMenu} />
      <Stack.Screen name="JournalStack" component={JournalStack} />
    </Drawer.Navigator>
  );
}

function AuthenticationStack() {
  return(
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

function AuthLogic() {
  const auth = useContext(AuthContext);
  return auth.user === null ? <AuthenticationStack /> : <TabGroup />
}

export default function App() {
  return(
    <AuthenticationContext>
      <NavigationContainer>
        <AuthLogic />
      </NavigationContainer>
    </AuthenticationContext>
    
  );
}
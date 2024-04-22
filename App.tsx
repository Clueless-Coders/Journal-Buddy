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
import ForgotPassword from './src/Components/Login/ForgotPassword';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence, getAuth, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


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
      }) }
    >
      <Tab.Screen name="Home" component={HomeStack} options = {{headerShown:false}}/>
      <Tab.Screen name="NewJournal" component={DailyPrompt} />
      <Tab.Screen name="Calendar" component={HomeMenu}/>
    </Tab.Navigator>
  );
}

function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="JournalEntries" component={JournalEntries} />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Drawer" component={DrawerGroup} />

    </Stack.Navigator>
  )
}

function DrawerGroup() {
  return(
    <Drawer.Navigator initialRouteName='HomeStack' >
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
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

function AuthLogic() {
  let [loggedIn, setLoggedIn ] = React.useState(getAuth().currentUser !== null);
  onAuthStateChanged(getAuth(),(user) => {
    setLoggedIn(user !== null);
  })
  return !loggedIn ? <AuthenticationStack /> : <TabGroup />
}

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyCOshsr_f422QOgFGCtG6F2HFvAy4DIqpg",
    authDomain: "journal-buddy-bfa71.firebaseapp.com",
    databaseURL: "https://journal-buddy-bfa71-default-rtdb.firebaseio.com",
    projectId: "journal-buddy-bfa71",
    storageBucket: "journal-buddy-bfa71.appspot.com",
    messagingSenderId: "750765241871",
    appId: "1:750765241871:web:cf391de4e20373bb9f957a",
    measurementId: "G-Q0VF0V7M1T"
  };

  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })

  return(
    <NavigationContainer>
      <AuthLogic />
    </NavigationContainer>    
  );
}
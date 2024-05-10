import DailyPrompt from './src/Components/Journal-Pages/DailyPrompt';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeMenu from './src/Components/HomePage/HomeMenu';
import JournalEntries from './src/Components/Journal-Pages/JournalEntries';
import { FontAwesome5 } from '@expo/vector-icons';
import LoginPage from './src/Components/Login/LoginPage';
import SignUp from './src/Components/Login/SignUp';
import ForgotPassword from './src/Components/Login/ForgotPassword';
import HabitPage from './src/Components/Habits/HabitPage';
import Create from './src/Components/Habits/Create';
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth, onAuthStateChanged } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from './Keys';
import Slider from './src/Components/TutorialPages/Slider';
import { Daily, getDaily, isFirstTimeLogin } from './src/firebase/Database';
import { getDatabase, onValue, ref } from 'firebase/database';

export const DailyContext = React.createContext({} as Daily);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TabGroup() {
  const [daily, setDaily] = React.useState(
    {
      prompt: "None",
      quote: {
        a: "None",
        h: "None",
        q: "None",
      }
    });

  React.useEffect(() => {
    async function retrieveDaily() {
      const response = await getDaily();
      setDaily(response);
    }
    retrieveDaily();
  }, []);

  return (
    <DailyContext.Provider value={daily}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: (color: string) => {
            let iconName;
            if (route.name === "Home")
              iconName = "home";
            else if (route.name === "Journals")
              iconName = "book";
            else if (route.name === "Calendar")
              iconName = "calendar";

            return (<FontAwesome5 name={iconName} size={20} color={color} />);
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Journals" component={JournalStack} />
        <Tab.Screen name="Calendar" component={HomeMenu} />
      </Tab.Navigator>
    </DailyContext.Provider>
  );
}

function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JournalEntries" component={JournalEntries} />
      <Stack.Screen name="Journal" component={DailyPrompt} />
    </Stack.Navigator>
  )
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerGroup} />
    </Stack.Navigator>
  )
}


function TutorialStack() {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tutorial" component={Slider} />
    </Stack.Navigator>
  )
}

function DrawerGroup() {
  return (
    <Drawer.Navigator initialRouteName='HomeStack' >
      <Stack.Screen name="Home" component={HomeMenu} />
      <Stack.Screen name="Journals" component={JournalStack} />
      <Stack.Screen name="Habits" component={HabitPage} />
      <Stack.Screen name="Create Habit" component={Create} />
    </Drawer.Navigator>
  );
}

function AuthenticationStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

function AuthLogic() {
  let [loggedIn, setLoggedIn] = React.useState(getAuth().currentUser !== null);
  let [firstTime, setFirstTime] = React.useState(true);

  React.useEffect(() => {

    onAuthStateChanged(getAuth(), (user) => {
      setLoggedIn(user !== null);
    });
  }, []);

  React.useEffect(() => {
    async function checkFirstTime() {
      setFirstTime(await isFirstTimeLogin());
    }
    onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/firstSignIn`), () =>{
      checkFirstTime();
    });
  }, [loggedIn])
  
  
  return !loggedIn ? <AuthenticationStack /> : firstTime ? <TutorialStack /> : <TabGroup />;
}



export default function App() {
  const app = initializeApp(firebaseConfig);
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })

  return (
    <NavigationContainer>
      <AuthLogic />
    </NavigationContainer>
  );
}
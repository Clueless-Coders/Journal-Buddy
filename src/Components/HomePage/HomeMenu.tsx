import React from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, Button, Alert } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { Quotes } from '../../Types';
import { getAuth, signOut } from 'firebase/auth';

import GeneralButtonLight from '../Buttons/GeneralButtonLight';
import DailyPrompt from '../Journal-Pages/DailyPrompt';
import Menu from '../HamburgerMenu/Menu';
// import { getapi } from '../../Quotes';

export default function HomeMenu({ navigation }: any) {
    //TODO: Add functions to do their respective tasks once they are implemented
    //TODO: Interface with the backend in order to save the user's response.
    let [quote, updateQuote] = React.useState({q: 'haiii', a: '- T'});
    const [fontsLoaded] = useFonts({Inter_400Regular});

    async function getQuote(){
        const url:string ="https://zenquotes.io/api/random";
        const response = await fetch(url);
        let data = await response.json();
        let quotes: Quotes = data[0];
        updateQuote(quotes);
    }

    let [input, onChangeInput] = React.useState('');
    return (
        <SafeAreaView style={styles.overlord}>
            {/*<View style={{zIndex: 1}}>
                <Menu />
            </View>*/}
            <ScrollView style={styles.wrapper}>
                <View style={styles.top}>
                    {/* insert button here */}
                    <Text style={styles.header}>
                        {"Home"}
                        </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.header2}>
                            Hi, John!
                    </Text>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header2}>
                            {"\"" + quote.q + "\""}
                        </Text>
                        <Text style={styles.prompt}>
                            {"-" + quote.a}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.header2}>
                            Today's Task
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {new Date().toDateString()}
                        </Text>
                    </View>
                    
                    <View style = {styles.buttonBox}>
                        {/* <GeneralButton buttonText={"Start Today's Entry"} onPress = {() => null}/> */}
                        <GeneralButtonDark onPress={() => navigation.navigate("NewJournal")} buttonText="Start Today's Entry" textStyle={styles.buttonText}/>
                    </View>
                    <View style = {styles.habitBox}>
                        {/* <GeneralButton buttonText={"Habit 1"} onPress={() => null}/> */}
                        {/* <GeneralButton buttonText={"Habit 2"} onPress={() => null}/> */}
                        {/* <GeneralButton buttonText={"Habit 3"} onPress={() => null}/> */}
                    </View>
                    <GeneralButtonDark onPress={ () => signOut(getAuth()) } buttonText='Sign Out'/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        zIndex: 0,
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: 'black',
    },
    headerWrapper: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#f2f9ff',
        flex:1
    },
    header2: {
        fontSize: 20,
    },
    prompt: {
        fontSize: 15,
        color: 'black',
        padding: 10,
        
    },
    top: {
        fontSize: 30,
        // flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    buttonBox:{
        width:'100%',
        alignItems:'center'
    },
    button: {
            height: 50,
            borderWidth: 1,
            margin: 10,
            borderRadius: 12,
    },
    buttonText: {
            fontSize: 15,
            textAlign: 'center'
    },
    habitBox:{
        borderWidth:1,
        borderRadius: 12,
        width:'90%',
        alignItems:'center'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
        fontFamily: "Inter_400Regular"
    }
}
)
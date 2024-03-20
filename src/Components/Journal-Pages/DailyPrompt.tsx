import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableHighlight, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import BackButton from '../Buttons/BackButton';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';

export default function DailyPrompt() {
    //TODO: Add functions to do their respective tasks once they are implemented
    //TODO: Interface with the backend in order to save the user's response.
    let [input, onChangeInput] = React.useState('');
    const [fontsLoaded] = useFonts({Inter_400Regular});
    return (
        <SafeAreaView style={styles.overlord}>
            <ScrollView style={styles.wrapper}>
                <View style={styles.top}>
                    <BackButton onPress={() => console.log("hello")} buttonText='Past Entries'/>
                    <Text style={styles.date}>
                        {new Date().toDateString()}
                    </Text>
                </View>
                <View style={styles.container}>
                    
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header}>
                            Daily Prompt:
                        </Text>
                        <Text style={styles.prompt}>
                            Recall a moment from your past that still lingers in your memory. 
                            Explore the details of that moment, the emotions it evoked, and the lessons you may have learned. 
                            How does that memory shape your present perspectives or decisions?
                            Reflect on the impact it had on your personal growth and the person you've become today.
                        </Text>
                    </View>
                    <GeneralButtonDark buttonText={"Save Response"} onPress={() => null}/>
                </View>
                <TextInput 
                    editable 
                    multiline 
                    onChangeText={text => onChangeInput(text)} 
                    value={input} placeholder="Enter your response here." 
                    style={styles.inputField} 
                    numberOfLines={20}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
            fontFamily: "Inter_400Regular"
        },
        container: {
            flex: 1,
            zIndex: 0,
            alignItems: 'center'
        },
        header: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
        },
        headerWrapper: {
            marginBottom: 10,
            alignItems: 'center',
            backgroundColor: '#f2f9ff'
        },
        prompt: {
            fontSize: 15,
            color: 'black',
            padding: 10,
            
        },
        inputField: {
            marginLeft: 5,
            marginRight: 5,
            textAlign: 'left',
            borderWidth: 1,
            padding: 10
        },
        backButton: {
            fontSize: 20,
            color: '#23395b',
            flexWrap: 'nowrap'
        },
        date: {
            fontSize: 20,
            alignSelf: 'flex-end'
        },
        top: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5
        },
        overlord: {
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            backgroundColor: 'white',
            flex: 1
        }
    }
)
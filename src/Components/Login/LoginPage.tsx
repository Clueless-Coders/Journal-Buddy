import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableHighlight, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';


export default function LoginPage() {
    let [input, onChangeInput] = React.useState('');
    return (
        <SafeAreaView style={styles.overlord}>
        <View style={styles.top}>
                <Text style={styles.header}>
                    Welcome!
                </Text>
        </View>
            <View style={styles.container}> 
                    <Text style={styles.prompt}>
                        Username:
                    </Text>
                    <TextInput 
                        editable 
                        multiline 
                        onChangeText={text => onChangeInput(text)} 
                        value={input} placeholder="will be empty" 
                        style={styles.inputField} 
                        numberOfLines={1}
                    />
                    <Text style={styles.prompt}>
                        Password:
                    </Text>
                    <TextInput 
                        editable 
                        multiline 
                        onChangeText={text => onChangeInput(text)} 
                        value={input} placeholder="will be empty" 
                        style={styles.inputField} 
                        numberOfLines={1}
                    />
                <GeneralButtonDark buttonText={"Log In"} onPress={() => null} textStyle={styles.textStyle}/>
                <Text style={styles.thin}>
                        Don't have an account? Sign Up!
                    </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    top: {
        alignItems: 'center'
    },
    container: {
        alignItems: 'center'
    },
    header: {
        marginTop: 300,
        marginBottom: 15,
        fontSize: 50,
        fontWeight: 'bold',
        color: '#050B24',
        alignItems: 'center'
    },
    prompt: {
        color: '#050B24',
        marginBottom: 5,
        textAlign: 'left' //how to align prompts to the left of the boxes, not screen??
    },
    inputField: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 15,
        borderRadius: 5,
        //textAlign: 'center',  why are the input boxes tiny lol
        backgroundColor: '#E7EFFF',
        padding: 10
    },
    thin: {
        alignItems: 'center',
        fontWeight: '100',
        color: '#050B24'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    },
    textStyle: {
        fontSize: 20
    }
});
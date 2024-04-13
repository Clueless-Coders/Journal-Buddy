import React, { useContext } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { AuthContext } from '../../AuthContext';

//ask tristan about setPassword with the confirm, rn it just types in both
//i can't find how to get the png from the assests folder

export default function SignUp({navigation}){
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    let auth = useContext(AuthContext);


    function handleLogin() {
        auth.login();
    }

    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.header}>
                Sign Up            
            </Text>
            <View style={styles.texboxWithLabel}>
                <Text style={styles.label}>
                    Email:
                </Text>
                <TextInput
                    editable 
                    onChangeText={text => setEmail(text)} 
                    value={email} placeholder="" 
                    autoCapitalize="none"
                    style={styles.inputField} 
                    numberOfLines={1}
                />
           </View>
           <View style={styles.texboxWithLabel}>
                <Text style={styles.label}>
                    Password:
                </Text>
                <TextInput
                    editable 
                    onChangeText={text => setPassword(text)} 
                    value={password} placeholder="" 
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.inputField} 
                    numberOfLines={1}
                />
           </View>
           <View style={styles.texboxWithLabel}>
                <Text style={styles.label}>
                    Confirm Password:
                </Text>
                <TextInput
                    editable 
                    onChangeText={text => setPassword(text)} 
                    value={password} placeholder="" 
                    autoCapitalize="none"
                    style={styles.inputField} 
                    numberOfLines={1}
                />
           </View>
           <GeneralButtonDark buttonText={"Sign Up"} onPress={navigation.navigate("SignUp")} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: 0}}/>
        </View>
        </ScrollView>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )       
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    header: {
        marginTop: '70%',
        marginBottom: '5%',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#050B24',
        
    },
    label: {
        color: '#050B24',
        textAlign: 'left',
        marginBottom: 2,
    },
    texboxWithLabel: {
        width: '78%',
        height: 100
    },
    inputField: {
        marginBottom: '10%',
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: '3%',
        height: '50%'
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    overlord: {
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1
    }
});
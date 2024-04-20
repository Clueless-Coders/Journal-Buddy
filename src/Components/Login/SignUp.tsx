import React, { useContext } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { login } from '../../firebase/Database.ts'

//ask tristan about setPassword with the confirm, rn it just types in both
//like is there a handleSignUp function?

export default function SignUp({navigation}){
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');

    function handleLogin() {
        login(email, password);
    }

    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
            <Image source={require('./cat.png')}
                   style={{width: 250, height: 250, marginTop: "1%"}}  />
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
                    secureTextEntry
                    style={styles.inputField} 
                    numberOfLines={1}
                />
           </View>
           <GeneralButtonDark buttonText={"Sign Up"} onPress={} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: 10}}/>
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
        marginTop: '10%',
        marginBottom: '7%',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#050B24',
        
    },
    label: {
        color: '#050B24',
        marginBottom: 2,
        textAlign: 'left' //how to align labels to the left of the boxes, not screen?? use views!!
    },
    inputField: {
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: '3%',
        height: '50%'
    },
    texboxWithLabel: {
        width: '78%',
        height: 100,
        marginBottom: -10
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
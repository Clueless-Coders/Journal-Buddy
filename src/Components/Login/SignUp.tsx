import React, { useContext } from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { signup } from '../../firebase/Database';

export default function SignUp({navigation}: any){
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [confirmedPassword, setConfirmedPassword] = React.useState('');

    function handleSignup() {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const passwordsMatch = validatePasswordsMatch(password, confirmedPassword);
    
        if (isEmailValid && isPasswordValid && passwordsMatch) {
            signup(email, password);
        }
    }

    let [emailError, setEmailError] = React.useState('');
    let [passwordError, setPasswordError] = React.useState('');
    let [confirmedPasswordError, setConfirmedPasswordError] = React.useState('');

    function validateEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            return false;
        }
        setEmailError('');
        return true;
    }
    
    function validatePassword(password: string) {
        if (password.length < 6) {
            setPasswordError('Enter 6 or more characters');
            return false;
        }
        setPasswordError('');
        return true;
    }

    function validatePasswordsMatch(password: string, confirmedPassword: string) {
        if (password !== confirmedPassword) {
            setConfirmedPasswordError('Passwords do not match');
            return false;
        }
        setConfirmedPassword('');
        return true;
    }

    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
            <Image source={require('./cat.png')}
                   style={{width: 250, height: 250, marginTop: "7%"}} />
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
                    onBlur={() => validateEmail(email)}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
                    onBlur={() => validateEmail(email)}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
           </View>
           <View style={styles.texboxWithLabel}>
                <Text style={styles.label}>
                    Confirm Password:
                </Text>
                <TextInput
                    editable 
                    onChangeText={text => setConfirmedPassword(text)} 
                    value={confirmedPassword} placeholder="" 
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.inputField} 
                    numberOfLines={3}
                />
                {confirmedPasswordError ? <Text style={styles.errorText}>{confirmedPasswordError}</Text> : null}
           </View>
           <GeneralButtonDark buttonText={"Sign Up"} onPress={handleSignup} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: 10}}/>
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
        textAlign: 'left'
    },
    inputField: {
        marginBottom: 2,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: '3%',
        height: '100%'
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
    errorText: {
        fontSize: 14,
        fontWeight: '100',
        color: 'red',
        textAlign: 'right'
    },
    overlord: {
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1
    }
});
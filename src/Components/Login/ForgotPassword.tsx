import React, { useContext } from 'react';
import {Image, View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { login } from '../../firebase/Database.tsx'


//potentionally add eye icon to mask and unmask
//incorrect password/email
//if click outside keyboard get rid off, no worky in android?
//confirm password

export default function LoginPage({navigation}) {
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
            {/* <Image source={require('./cat.png')}
                   style={{width: 250, height: 250, marginTop: "10%"}}  /> */}
            <Text style={styles.header}>
                Password Reset
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
           
           <GeneralButtonDark buttonText={"Reset"} onPress={handleLogin} textStyle={styles.textStyle} containerStyle={{width: '60%', marginTop: "7%"}}/>
        </View>
        </ScrollView>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        marginTop: '70%',
        marginBottom: '7%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#050B24',
        alignItems: 'center'
    },
    label: {
        color: '#050B24',
        marginBottom: 2,
        textAlign: 'left' //how to align labels to the left of the boxes, not screen?? use views!!
    },
    label2: {
        color: '#050B24',
        marginBottom: 0,
        textAlign: 'right',
        fontWeight: '100'
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
    thin: {
        alignItems: 'center',
        fontWeight: '100',
        color: '#050B24'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});
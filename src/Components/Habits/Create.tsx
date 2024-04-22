import React, { useContext } from 'react';
import {Image, View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import GeneralButtonDark from '../Buttons/GeneralButtonDark';

export default function HabitPage({navigation}) {
    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.header}>
                Create a Habit
            </Text>
            <View style={styles.div} />
        </View>
        </ScrollView>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )       
}

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center'
    },
    div: {
        width: "90%",
        height: 1,
        backgroundColor: 'gray',
        marginBottom: '1%'
    },
    header: {
        marginTop: '1%',
        marginBottom: '1%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#050B24',
        alignItems: 'center'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});
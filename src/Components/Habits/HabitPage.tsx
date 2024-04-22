import React, { useContext } from 'react';
import {Image, View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableHighlight, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import GeneralButtonDark from '../Buttons/GeneralButtonDark';

export default function HabitPage({navigation}: any) {
    return(
        <SafeAreaView style={styles.overlord}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.header}>
                Habits
            </Text>
            <View style={styles.div} />
            <View style={styles.row}>
            <Pressable
                style={({ pressed }) => [
                    styles.press,
                    {opacity: pressed ? 0.5 : 1 } 
                ]}
                onPress={() => navigation.navigate("Create Habit")}>
                <Text style={styles.textStyle}>
                        Today
                </Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    styles.press,
                    {opacity: pressed ? 0.5 : 1 } 
                ]}
                onPress={() => navigation.navigate("Create Habit")}>
                <Ionicons name="add" size={16} color="white" />
            </Pressable>
            </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 25
    },
    press: {
        backgroundColor: "#8DB1F7",
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    header: {
        marginTop: '1%',
        marginBottom: '1%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#050B24',
        alignItems: 'center'
    },
    textStyle: {
        alignItems: 'center',
        fontSize: 13,
        color: 'white'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});
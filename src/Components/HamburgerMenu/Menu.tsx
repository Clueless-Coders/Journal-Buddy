import React, { useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, FlatList, StatusBar, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MenuButton from './MenuButton'


//Hamburger menu that shows all of the options for accessing other features of the app
export default function Menu() {
    return(
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.header}>
                    Journal Buddy
                </Text>
                <FlatList 
                    renderItem={({item}) => <MenuButton style={styles.button} buttonText={item}/>}
                    data={DATA}
                />
            </View>
            <View style={{backgroundColor: '#00000050', flex: .75}}/>
        </View>
        
    )
}

//Array of strings that will be the title of the buttons
//I will probably change this later because it's not a good system :p
const DATA = ["test.", "test.", "test.", "test."]

const styles = StyleSheet.create( {
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'baseline',
        backgroundColor: '#dcdede',
        borderRightColor: 'black',
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        height: 1000,
        flex: 1,
    },
    button: {
        flex: 1,
        fontSize: 20,
        marginBottom: 20
    },
    header: {
        fontSize: 25,
        paddingLeft: 50,
        marginBottom: 20 
    }
})
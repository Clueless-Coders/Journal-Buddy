import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MenuButton from './MenuButton'

export default function Menu() {
    return(
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Ionicons name="menu-sharp" size={50} color="black" />
                <MenuButton style={styles.button} buttonText="test."></MenuButton>
                <MenuButton style={styles.button} buttonText="test."></MenuButton>
                <MenuButton style={styles.button} buttonText="test."></MenuButton>
                <MenuButton style={styles.button} buttonText="test."></MenuButton>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create( {
    wrapper: {
        maxWidth: 200
    },
    container: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'baseline',
        backgroundColor: '#dcdede',
        borderRightColor: 'black',
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        width: 215,
        gap: 50,
        height: 1000,
        marginTop: 60
    },
    button: {
        flex: 1,
        fontSize: 20
    }
})
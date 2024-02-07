import React from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import MenuButton from './MenuButton'

export default function Menu() {
    return(
        <SafeAreaView style={styles.container}>
            <MenuButton style={styles.button}></MenuButton>
            <MenuButton style={styles.button}></MenuButton>
            <MenuButton style={styles.button}></MenuButton>
            <MenuButton style={styles.button}></MenuButton>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'column',
        alignItems: 'baseline',
        flex:1,
        backgroundColor: '#dcdede',
        borderRightColor: 'black',
        borderRightWidth: 5,
        width: 215,
        gap: 50
    },
    button: {
        
    }
})
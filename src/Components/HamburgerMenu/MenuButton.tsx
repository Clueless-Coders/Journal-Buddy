import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function MenuButton({ ...props }, children: any) {
    return(
        <View style={styles.container}>
            <Text style={styles.button}>Test.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dcdede',
        borderColor: '#17171a',
        alignContent: 'center',
        borderWidth: 3,
        borderRadius: 50,
        marginLeft: 5,
        width: 200,
        flexBasis: 75
    },
    button: {
        flex: 1,
        fontSize: 20
    }
})
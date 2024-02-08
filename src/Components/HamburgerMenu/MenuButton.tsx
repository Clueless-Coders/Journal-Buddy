import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ButtonInput {
    buttonText: string,
    style: any

}

export default function MenuButton(props: ButtonInput ) {
    return(
        <View style={styles.container}>
            <Text style={props.style}>{props.buttonText}</Text>
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
        flexBasis: 75,
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        flex: 1,
        fontSize: 20,
    }
})
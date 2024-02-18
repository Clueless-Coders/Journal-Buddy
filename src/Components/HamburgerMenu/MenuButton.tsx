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
        backgroundColor: '#BFDAF6',
        alignContent: 'center',
        borderRadius: 5,
        marginLeft: 5,
        width: 200,
        flexBasis: 75,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20
    },
    text: {
        flex: 1,
        fontSize: 20,
    }
})
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

/*
*/
export default function GeneralButtonLight(props: ButtonInput ) {
    //allows text to be customizable through both dynamic input and stylesheet
    return(
        <View style={{ ...props.containerStyle, ...styles.containerDefault }}>
            <Text onPress={props.onPress} style={ {...props.textStyle, ...styles.text }}>{ props.buttonText }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerDefault: {
        backgroundColor: '#BFDAF6',
        borderRadius: 5,
        width: 200,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center'
    }
})
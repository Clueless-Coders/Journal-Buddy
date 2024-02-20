import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

/*
*/
export default function GeneralButtonLight(props: ButtonInput ) {
    //allows text to be customizable through both dynamic input and stylesheet
    return(
        <Pressable onPress={props.onPress}>
            <View style={{ ...styles.containerDefault, ...props.containerStyle }}>
                <Text style={ props.textStyle }>
                    {props.buttonText} 
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    containerDefault: {
        backgroundColor: '#BFDAF6',
        borderRadius: 5,
        width: 200,
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    text: {
        flex: 1,
        fontSize: 20,
    }
})
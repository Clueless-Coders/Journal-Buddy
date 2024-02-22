import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

let buttonColor: string = "#8EA8C3";

export default function GeneralButton(props: ButtonInput, color: string) {
    buttonColor = color;

    return(
        <View style={styles.wrapper}>
            <Text onPress={props.onPress} style={props.style ? props.style : styles.textStyleDefault}>
                {props.buttonText}
            </Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        width: '90%',
        borderWidth: 1,
        margin: 10,
        borderRadius: 12,
        backgroundColor: buttonColor,
    },
    textStyleDefault: {
        fontSize: 15,
        textAlign: 'center'
    }
});
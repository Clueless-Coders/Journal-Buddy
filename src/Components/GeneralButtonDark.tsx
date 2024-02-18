import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GeneralButtonDark(props: ButtonInput) {
    return(
        <View style={styles.wrapper}>
            <Text style={props.style ? props.style : styles.textStyleDefault}>
                {props.buttonText}
            </Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    wrapper: {
        width: 150,
        height: 30,
        borderWidth: 1,
        margin: 10,
        borderRadius: 12,
        backgroundColor: "#8EA8C3"
    },
    textStyleDefault: {
        fontSize: 15,
        textAlign: 'center'
    }
});
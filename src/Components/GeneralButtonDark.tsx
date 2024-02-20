import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GeneralButtonDark(props: ButtonInput) {
    return(
        <Pressable onPress={props.onPress}>
            <View style={{ ...styles.containerStyleDefault, ...props.containerStyle }}>
                <Text style={ props.textStyle }>
                    {props.buttonText}
                </Text>
            </View>
        </Pressable>
        
    )
    
}

const styles = StyleSheet.create({
    containerStyleDefault: {
        width: 150,
        height: 30,
        borderWidth: 1,
        margin: 10,
        borderRadius: 12,
        backgroundColor: "#8EA8C3"
    },
    textStyleDefault: {
        fontSize: 20,
        textAlign: 'center'
    }
});
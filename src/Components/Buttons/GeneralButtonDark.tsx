import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GeneralButtonDark(props: ButtonInput) {
    return(
        <Pressable onPress={ props.onPress }>
            <View style={{ ...styles.containerStyleDefault, ...props.containerStyle }}>
                <Text style={ props.textStyle }>
                    {props.buttonText} Dark
                </Text>
            </View>
        </Pressable>
        
    )
    
}

const styles = StyleSheet.create({
    containerStyleDefault: {
        borderRadius: 5,
        width: 200,
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: "#8EA8C3"
    },
    textStyleDefault: {
        fontSize: 20
    }
});
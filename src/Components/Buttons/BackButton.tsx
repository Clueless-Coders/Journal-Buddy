import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BackButton(props: ButtonInput) {
    return (
        <Pressable onPress={props.onPress} style={{flexDirection: 'row', flex: 1 }}> 
            <AntDesign name="left" size={30} color="#23395b" style={{maxWidth: 50}}/>        
            <Text style={styles.backButton} >
                {props.buttonText}
            </Text>        
        </Pressable>
    )
}

const styles = StyleSheet.create( {
    backButton: {
        fontSize: 20,
        paddingTop: 2,
        color: '#23395b',
    },
})
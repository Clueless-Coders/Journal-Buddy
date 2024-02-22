import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

/* A button that can be used as a navigation backwards. 
*  REQUIRED PARAMETERS: onPress -> a function that executes when the button is clicked,
*                       buttonText -> Text that is displayed as a prompt to the user
*  OPTIONAL PARAMETERS: containerStyle -> define styling for the box around the text (the area to be clicked). Mainly used for sizing and positioning
*                       containerStyle -> define styling for the text in the button. Mainly used for font, color, and font size.
*  Optional parameters have defaults defined 
*/
export default function BackButton(props: ButtonInput) {
    return (
        <Pressable onPress={props.onPress} style={{flexDirection: 'row' }}> 
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
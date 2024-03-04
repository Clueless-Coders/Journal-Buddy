import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { ButtonInput } from '../../Types'

/* A button that can be used as a navigation backwards. 
*  REQUIRED PARAMETERS: onPress -> a function that executes when the button is clicked,
*                       buttonText -> Text that is displayed as a prompt to the user
*  OPTIONAL PARAMETERS: containerStyle -> define styling for the box around the text (the area to be clicked). Mainly used for sizing and positioning
*                       containerStyle -> define styling for the text in the button. Mainly used for font, color, and font size.
*  Optional parameters have defaults defined 
*/
export default function GeneralButtonLight(props: ButtonInput, children: React.JSX.Element ) {
    //allows text to be customizable through both dynamic input and stylesheet
    return(
        <Pressable onPress={props.onPress} style={{ ...styles.containerStyleDefault, ...props.containerStyle }}>
            <View>
                <Text style={ props.textStyle }>
                    {props.buttonText} 
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    containerStyleDefault: {
        backgroundColor: '#BFDAF6',
        borderRadius: 5,
        width: 200,
        height: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
        fontSize: 20,
    }
})
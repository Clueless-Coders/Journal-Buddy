import GeneralButtonLight from "./GeneralButtonLight";
import React from 'react';
import { ButtonInput, CheckboxInput } from "../../Types";
import { Button, StyleSheet, View } from "react-native";

export default function CheckboxButton(props: CheckboxInput) {
    const [isChecked, setIsChecked] = React.useState((props.checked === undefined)? false: props.checked);
    //trying to add color interchangability when we make new checkbox
    const color1 = (props.on === undefined)? '#95dbc0' : props.on;
    const color2 = (props.off === undefined)? '#ffffff' : props.off;

    function handlePress(){
        setIsChecked(!isChecked);
        console.log("props undefined: " + isChecked);
        props.onPress();
        
    }
    let color = isChecked? color1 : color2;

    return(
        <GeneralButtonLight {...props} onPress={() => handlePress()} textStyle={styles.textStyle}>
            <View style={{...styles.checkboxStyle, backgroundColor: color}}></View>
        </GeneralButtonLight>
    );
}

const styles = StyleSheet.create({
    checkboxStyle: {
        borderRadius: 50, 
        borderWidth: 2, 
        width: 35, 
        height: 35,
        margin: 10
    },
    textStyle: {
        fontSize: 17
    }
})
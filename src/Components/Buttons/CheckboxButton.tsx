import GeneralButtonLight from "./GeneralButtonLight";
import React from 'react';
import { ButtonInput } from "../../Types";
import { StyleSheet, View } from "react-native";

export default function CheckboxButton(props: ButtonInput) {
    const [isChecked, setIsChecked] = React.useState(false);

    function handlePress(){
        setIsChecked(!isChecked);
        props.onPress();
    }

    let color = isChecked ? '#95dbc0' : '#ffffff';

    return(
        <GeneralButtonLight {...props} onPress={handlePress} textStyle={styles.textStyle}>
            <View style={{...styles.checkboxStyle, backgroundColor: color}}>

            </View>
        </GeneralButtonLight>
    );
}

const styles = StyleSheet.create({
    checkboxStyle: {
        borderRadius: 50, 
        borderWidth: 2, 
        width: '15%', 
        height: '60%',
    },
    textStyle: {
        fontSize: 17
    }
})
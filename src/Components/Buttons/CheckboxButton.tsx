import GeneralButtonLight from "./GeneralButtonLight";
import React from 'react';
import { ButtonInput } from "../../Types";

export default function CheckboxButton(props: ButtonInput) {
    const [isChecked, setIsChecked] = React.useState(false);

    function handlePress(){
        setIsChecked(!isChecked);
        props.onPress()
    }

    return(
        <GeneralButtonLight {...props} onPress={handlePress}>

        </GeneralButtonLight>
    );
}


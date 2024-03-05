import { CSSProperties } from "react"
import { StyleProp, TextStyle, ViewStyle, StyleSheet } from "react-native"

export type ButtonInput = {
    buttonText: string,
    onPress(): void,
    textStyle?: any,
    containerStyle?: any
}

export type Quotes = {
    q: string,
    a: string
}

export type ButtonInput = {
    buttonText: string,
    onPress(): void,
    textStyle?: any,
    containerStyle?: any,
    children?: React.JSX.Element
}

export type Quotes = {
    q: string,
    a: string
}

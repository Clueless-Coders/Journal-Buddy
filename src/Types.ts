type ButtonInput = {
    buttonText: string,
    onPress(): void,
    textStyle?: any,
    containerStyle?: {
        width?: number,
        height?: number,
        flex?: number,
        flexBasis?: number
    }
    
}

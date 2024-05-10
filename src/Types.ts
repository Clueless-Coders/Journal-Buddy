export interface ButtonInput {
    buttonText: string,
    onPress: () => void,
    textStyle?: any,
    containerStyle?: any,
    children?: React.JSX.Element
    enabled?: boolean
}

export interface CheckboxInput extends ButtonInput{
    checked?: boolean
    key?: string
}

export type Quotes = {
    q: string,
    a: string
}



export type Slide = {
    subtitle: string,
    id: number,
    ImageLocation: any,
    slideButton?: ButtonInput
    SlideButton?: ButtonInput
}

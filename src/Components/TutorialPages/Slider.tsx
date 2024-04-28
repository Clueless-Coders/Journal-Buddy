import React from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, FlatList, Pressable} from 'react-native';
import SlideItem from './SlideItem'

type Slide = {
    Text: string,
    id: number,
    ImageLocation: any,
}

let Slides:Slide[] =  [
    {
        Text: 'haiii',
        id: 1,
        ImageLocation: require('../../../assets/cat.png'),
    },
    {
        Text: 'baiiiii',
        id: 2,
        ImageLocation: require('../../../assets/cat.png'),
    }
];

export default function SliderPage({ navigation }: any) {
    

    const [fontsLoaded] = useFonts({Inter_400Regular});

    return (
        <View>
            <FlatList data = {Slides} renderItem={({item}) => <SlideItem/>}>

            </FlatList>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flex: 1,
        zIndex: 0,
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: '#050B24',
    },
    headerWrapper: {
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#f2f9ff',
        flex:1
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
        fontFamily: "Inter_400Regular"
    }
}
)
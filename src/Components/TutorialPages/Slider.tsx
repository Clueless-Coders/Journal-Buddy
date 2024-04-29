import React from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, FlatList, Pressable} from 'react-native';
import SlideItem from './SlideItem'
import {Slide} from '../../Types'


let Slides:Slide[] =  [
    {
        subtitle: 'haiii',
        id: 1,
        ImageLocation: require('../../../assets/cat.png'),
    },
    {
        subtitle: 'baiiiii',
        id: 2,
        ImageLocation: require('../../../assets/cat.png'),
    }
];

export default function Slider({ navigation }: any) {
    

    const [fontsLoaded] = useFonts({Inter_400Regular});

    return (
        <View>
            <FlatList data = {Slides} renderItem={({item}) => <SlideItem subtitle={item.subtitle} ImageLocation={item.ImageLocation} id={item.id}/>}/>

            
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    header: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: '#050B24',
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
        fontFamily: "Inter_400Regular"
    },
    image: {

    },
    content: {
        
    }
}
)
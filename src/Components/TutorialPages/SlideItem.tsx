import React from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import {Dimensions, Image, View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, FlatList, Pressable} from 'react-native';
import { Slide } from '../../Types';

// Text: 'baiiiii',
//         id: 2,
//         ImageLocation: require('../../../assets/cat.png')
const {width, height} = Dimensions.get('screen');

const SlideItem =  ({subtitle,id, ImageLocation}: Slide) => {
    return (
        <View style = {styles.container}>
            <Image source={ImageLocation}
                resizeMode='contain'
                style = {styles.image}
            />
            <View style = {styles.content}>
                <Text style = {styles.text}>
                    {subtitle}
                </Text>
            </View>
        </View>
    );
};

export default SlideItem;

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
        width:'100%',
        flex: 0.6,
    },
    content: {
        alignItems: 'center',
        flex: 0.4,

    },
    container: {
        width: width,
        height: height,
        alignItems: 'center',

    },
    text: {
        fontSize: 18,
        marginVertical: 12
    }
}
)
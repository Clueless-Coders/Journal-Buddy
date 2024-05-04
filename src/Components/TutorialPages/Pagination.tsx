

import React from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { View, Text, Animated, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, FlatList, Pressable, Dimensions} from 'react-native';
import { dot } from 'node:test/reporters';

const {width} = Dimensions.get('screen')

const Pagination = ({data, scrollX, index}: any) => {
    return(
    <SafeAreaView style={styles.content}>
            {data.map((_ : any, idx : any) => {
            const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp',
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                })
                return <Animated.View key={idx.toString} style=
            {[styles.dot, {width: dotWidth, opacity},
                idx === index && styles.dotActive
            ]} />;
        })}
    </SafeAreaView>
    );
};

export default Pagination/*({ navigation }: any) {
    

    const [fontsLoaded] = useFonts({Inter_400Regular});
    return (
        <SafeAreaView style={styles.overlord}>

        </SafeAreaView>
    );
}*/

const styles = StyleSheet.create({
    
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ccc',
        marginHorizontal: 3
    },
    
    dotActive: {
        backgroundColor: '#000',
    },

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
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
            width: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
    }
}
)
import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import MenuButton from './MenuButton'

export default function Menu() {
    return(
        <View style={styles.container}>
            <Ionicons name="menu-sharp" size={50} color="black" />
            <FlatList 
                renderItem={({item}) => <MenuButton style={styles.button} buttonText={item}/>}
                data={DATA}
            />
        </View>
    )
}

const DATA = ["test.", "test.", "test.", "test."]

const styles = StyleSheet.create( {
    wrapper: {
        maxWidth: 200
    },
    container: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'baseline',
        backgroundColor: '#dcdede',
        borderRightColor: 'black',
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderBottomColor: 'black',
        height: 1000,
        marginTop: 60
    },
    button: {
        flex: 1,
        fontSize: 20,
        marginBottom: 20
    }
})
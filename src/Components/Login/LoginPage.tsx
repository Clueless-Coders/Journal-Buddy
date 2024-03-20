import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, Platform, StatusBar, TouchableHighlight, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import GeneralButtonLight from '../Buttons/GeneralButtonLight';

//password masking
//add eye icon to mask and unmask
//incorrect password/email
//fix textbox scaling

export default function LoginPage() {
    let [email, setEmail] = React.useState('');
    let [password, setPassword] = React.useState('');
    return (
        <SafeAreaView style={styles.overlord}>
        <View style={styles.top}>
                <Text style={styles.header}>
                    Welcome!
                </Text>
        </View>
            <View style={styles.container}> 
                <View style={styles.texboxWithLabel}>
                    <Text style={styles.prompt}>
                        Email:
                    </Text>
                    <TextInput
                        editable 
                        onChangeText={text => setEmail(text)} 
                        value={email} placeholder="" 
                        autoCapitalize="none"
                        style={styles.inputField} 
                        numberOfLines={1}
                    />
                </View>
                <View style={styles.texboxWithLabel}>
                    <Text style={styles.prompt}>
                        Password:
                    </Text>
                    <TextInput  
                        editable 
                        onChangeText={text => setPassword(text)} 
                        value={password} placeholder=""
                        autoCapitalize="none"
                        secureTextEntry
                        style={styles.inputField} 
                        numberOfLines={1}
                    />
                </View>
                <GeneralButtonDark buttonText={"Log In"} onPress={() => null} textStyle={styles.textStyle} containerStyle={{width: '78%', marginTop: 25}}/>
                <Text style={styles.thin}>
                        Don't have an account? Sign Up!
                    </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    top: {
        alignItems: 'center'
    },
    container: {
        alignItems: 'center'
    },
    header: {
        marginTop: '70%',
        marginBottom: '5%',
        fontSize: 55,
        fontWeight: 'bold',
        color: '#050B24',
        alignItems: 'center'
    },
    prompt: {
        color: '#050B24',
        marginBottom: 5,
        textAlign: 'left' //how to align prompts to the left of the boxes, not screen?? use views!!
    },
    inputField: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#E7EFFF70',
        padding: 10
    },
    thin: {
        alignItems: 'center',
        fontWeight: '100',
        color: '#050B24'
    },
    texboxWithLabel: {
        width: '78%',
    },
    textStyle: {
        fontSize: 20,
        color: 'white'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1
    }
});
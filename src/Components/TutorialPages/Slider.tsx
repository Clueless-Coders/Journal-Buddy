import React, {useRef, useState} from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, FlatList, Pressable} from 'react-native';
import SlideItem from './SlideItem'
import {Slide} from '../../Types'
import Pagination from './Pagination'
import Animated from 'react-native-reanimated';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';


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

//export default function Slider({ navigation }: any)

export default function Slider ({ navigation }: any) {
    const [index, setindex] = useState(0);
    
    /*const scrollX = useRef(new Animated.Value(0)).current;
    
    const handleOnScroll = (event: any) => {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX,
                    }
                }
            }
        ],
        {
            useNativeDriver: false,
        }
    ) (event);
    };*/

    //export default Slider

    const [fontsLoaded] = useFonts({Inter_400Regular});

    const handleOnViewableItemsChanged = useRef((viewableItems: any) => 
    {
        // console.log('viewableItems', viewableItems);
        setindex(viewableItems[0]);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current

    return (
        <View>
            <FlatList 
            data = {Slides} 
            renderItem={({item}) => <SlideItem subtitle={item.subtitle} 
            ImageLocation={item.ImageLocation} id={item.id}/>}
            horizontal
            pagingEnabled
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
            //onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            />
                <Pagination data = {Slides} /*scrollX={scrollX}*/ index={index}/>
            
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
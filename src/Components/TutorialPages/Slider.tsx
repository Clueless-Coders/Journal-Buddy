import React, { useRef, useState } from 'react';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, FlatList, Pressable } from 'react-native';
import SlideItem from './SlideItem'
import { Slide } from '../../Types'
import Pagination from './Pagination'
import Animated from 'react-native-reanimated';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import { ButtonInput } from '../../Types'
import GeneralButtonLight from '../Buttons/GeneralButtonLight';
import { toggleFirstTimeLogin } from '../../firebase/Database';

let Slides: Slide[] = [
    {
        subtitle: 'Welcome to Journal Buddy!',
        id: 1,
        ImageLocation: require('../../../assets/cat.png'),
    },
    {
        subtitle: 'Be motivated with a daily inspiratinal quote!',
        id: 2,
        ImageLocation: require('./DailyQuote.png'),
    },
    {
        subtitle: 'Share your thoughts in our journal, using a daily journal prompt!',
        id: 3,
        ImageLocation: require('./JournalEntry.png'),
    },
    {
        subtitle: 'Build good habits with our habit creator!',
        id: 4,
        ImageLocation: require('./CreateHabit.png'),
    },
    {
        subtitle: 'And track your habits in your calendar!',
        id: 5,
        ImageLocation: require('../../../assets/cat.png'),
        /*slideButton: {
            buttonText: 'Home',
            onPress: () => {
                console.log("Button pressed");
            },
        }*/
    },
];

//export default function Slider({ navigation }: any)

export default function Slider({ navigation }: any) {
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

    const [fontsLoaded] = useFonts({ Inter_400Regular });

    const handleOnViewableItemsChanged = useRef((viewableItems: any) => {
        // console.log('viewableItems', viewableItems);
        setindex(viewableItems[0]);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current

    return (
        <View>

            <FlatList
                data={Slides}
                renderItem={({ item }) => <SlideItem subtitle={item.subtitle}
                    ImageLocation={item.ImageLocation} id={item.id} />}
                horizontal
                pagingEnabled
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                //onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={Slides} /*scrollX={scrollX}*/ index={index} />
            <GeneralButtonLight
                buttonText={'Get Journaling!'}
                onPress={toggleFirstTimeLogin}
                containerStyle={styles.button}
            />

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
    button: {
        position: 'absolute',
        marginTop: '170%',
        marginLeft: '25%'
    },
    image: {
        flex: 0.6,
        width: '100%',
    }
}
)
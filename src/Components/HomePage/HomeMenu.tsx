import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import GeneralButtonDark from '../Buttons/GeneralButtonDark';
import { getAuth, signOut } from 'firebase/auth';
import CheckboxButton from '../Buttons/CheckboxButton';
import { getDatabase, onValue, ref } from 'firebase/database'
import { Habit, addHabitTime, getHabitsByCurrentUser } from '../../firebase/Database';
import { time } from 'console';
import { DailyContext } from '../../../App';
//import { FlatList } from 'react-native-gesture-handler';
// import { getapi } from '../../Quotes';


export default function HomeMenu({ navigation }: any) {
    //TODO: Add functions to do their respective tasks once they are implemented
    //TODO: Interface with the backend in order to save the user's response.
    let [DATA, setData] = React.useState([] as Habit[])
    //let [ data, setData ] = React.useState([] as Journal[])
    let days:string[] = ["monday", "tuesday", "wednsday", "thursday", "friday"];

    const daily = React.useContext(DailyContext);
    //let user = getAuth().currentUser?.uid;
    
    React.useEffect(() => {
        let ignore = false;
        async function getHabits(){
            getHabitsByCurrentUser().then((habits) => {
                if(!ignore){
                    // let todaysHabits: Habit[] = [];
                    // let currentDay:number = new Date().getDay();
                    // habits.forEach(function (i) {
                    //     i.daysToComplete[days[currentDay]];
                        
                        
                         
                    // });
                    // console.log(todaysHabits);
                    setData(habits);
                    //console.log("habit done:");
                    //console.log(DATA);
                }
            });
        }

        onValue(ref(getDatabase(), `users/${getAuth().currentUser?.uid}/habits`), () =>{
            getHabits();
        })
        return () => {ignore = true};
    }, []);

    function UTCToTime(UTCms: number){
        return UTCms%86400000;
    }
    
    function HabitIsDone(habit : Habit): boolean {
        /*let currentDate: string = new Date().toDateString();
        let DaysDone =  habit.timesCompleted;
        if( DaysDone !== undefined){
            let timeKeys: string[] = Object.keys(DaysDone);
            //let lastDateDone: string = new Date(parseInt(timeKeys[timeKeys.length - 1])).toDateString(); //gets date of when it was last done
            let lastDone: number = Object.values(DaysDone[timeKeys[timeKeys.length - 1]])[0];
            
            //if they're same date, check for specific time slot
            if(currentDate === new Date().toDateString()){
                //let timesObject = Object.values(DaysDone);
                
                //get's latest habit time completed ... i think
                let recentTime: number = UTCToTime(Object.values(DaysDone[timeKeys[timeKeys.length - 1]])[0]);

                let timesToCompleteKeys: string[] = Object.keys(habit.timesToComplete);
                let i: number = 0;
                while(currentTime > TimeList[i]){
                    i++;
                }
        
                let j: number = 0;
                while(currentTime > TimeList[j]){
                    j++;
                }
                console.log("i: " + i);
                console.log("j: " + j);
                return i === j;
                // return true;
            } else {
                console.log("no previous time logged")
                return false;
            }

            

        } else {
            return false;
        } */
        return false;
    } 

    return (
        <SafeAreaView style={styles.overlord}>
            {/*<View style={{zIndex: 1}}>
                <Menu />
            </View>*/}
            <ScrollView style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.header2}>
                            {"\"" + daily.quote.q + "\""}
                        </Text>
                        <Text style={styles.prompt}>
                            {"-" + daily.quote.a}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.header2}>
                            Today's Task
                        </Text>
                    </View>
                    <View style = {styles.habitBox}>
                        {   DATA.length > 0 ?
                            DATA.map((item, index) => {
                            return <CheckboxButton  onPress={() => {
                                    if(HabitIsDone(item)){
                                        console.log("Habit is done today, switch to not done");
                                        //uncomment later when you have habiti time removal done
                                        //item.lastTimeComplete = undefined;
                                        //add database logic later :3
                                    } else {
                                        console.log("habit was not done, changing to completed");
                                        let timestamp: number = Date.now();
                                        item.lastTimeComplete = timestamp;
                                        addHabitTime(item.uid, timestamp);
                                    }}} buttonText={(item.uid === undefined)? ":c" : item.title} containerStyle={styles.checkButton} checked = {HabitIsDone(item)} key = {index + ""}/>;
                            }) : <Text>:c</Text>
                        }
                    </View>

                    <View>
                    {/* <GeneralButtonLight buttonText='refresh' onPress={()=> getHa}></GeneralButtonLight> */}
                    </View>
                    <GeneralButtonDark onPress={ () => signOut(getAuth()) } buttonText='Sign Out'/>
                </View>
            </ScrollView>
        </SafeAreaView>
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
    header2: {
        fontSize: 20,
    },
    prompt: {
        fontSize: 15,
        color: 'black',
        padding: 10,
    },
    top: {
        fontSize: 30,
        // flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    buttonBox:{
        width:'100%',
        alignItems:'center'
    },
    button: {
        height: 50,
        width: '90%',
        margin: 10,
        borderRadius: 12,
        flexDirection:'row',
    },
    checkButton:{
        height: 50,
        width: '90%',
        margin: 10,
        borderRadius: 12,
        justifyContent:'flex-start'
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center'
    },
    habitBox:{
        borderWidth:1,
        borderRadius: 12,
        width:'90%',
        height:400,
        alignItems:'center'
    },
    overlord: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'white',
        flex: 1,
    }
}
)
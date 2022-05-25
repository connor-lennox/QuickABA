import {RootStackScreenProps} from "../../types";
import {Text, View} from "../components/Themed";
import {StyleSheet, TouchableOpacity} from "react-native";
import colors from "../constants/Colors";
import {useState} from "react";
import {SessionEvent} from "../model/TrackedSession";

export default function SessionTrackingScreen({navigation}: RootStackScreenProps<'SessionTracking'>) {
    const [events, setEvents] = useState(new Array<SessionEvent>());

    const onAddEventClick = () => {
        setEvents(arr => [...arr, new SessionEvent(`test event` + events.length)])
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.title}>Session Tracker</Text>
            </View>

            {/*Display events*/}
            {events.map((item, key)=>(
                <Text key={key}>{item.title}</Text>
            ))}

            <TouchableOpacity
                style={styles.addEventButton}
                onPress={onAddEventClick}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addEventButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 32,
        bottom: 32,
        opacity: 1,
        borderWidth: 1,
        borderColor: colors.light.text,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});

import {RootStackScreenProps} from "../../types";
import {Text, View} from "../components/Themed";
import {StyleSheet} from "react-native";

export default function SessionTrackingScreen({navigation}: RootStackScreenProps<'SessionTracking'>) {
    return (
        <View style={styles.eventContainer}>
            <Text style={styles.title}>Session Tracker</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    eventContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

import {RootStackScreenProps} from "../../types";
import {SessionEvent} from "../model/TrackedSession";
import {Text, View} from "../components/Themed";
import {StyleSheet} from "react-native";

export interface ViewSessionEventScreenProps {
    event: SessionEvent,
}

export default function ViewSessionEventScreen({route, navigation}: RootStackScreenProps<"EventView">) {
    const {event} = route.params;

    return (
        <View style={styles.container}>
            <Text style={[styles.textField, styles.title]}>{event.title}</Text>

            <Text
                style={styles.textField}
                numberOfLines={6}>
                {event.notes}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textField: {
        width: '90%',
        marginTop: 8,
        marginBottom: 32,
    }
})

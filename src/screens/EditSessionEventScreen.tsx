import {SessionEvent} from "../model/TrackedSession";
import {StyleSheet} from "react-native";
import { Text, TextInput, View } from '../components/Themed';
import {RootStackScreenProps} from "../../types";

export interface EditSessionEventScreenProps {
    event: SessionEvent,
}

export default function EditSessionEventScreen({route, navigation}: RootStackScreenProps<'EventEdit'>) {
    const {event} = route.params;

    const updateEventTitle = (newTitle: string) => {
       event.title = newTitle;
    }

    const updateEventNotes = (newNotes: string) => {
        event.notes = newNotes;
    }

    return (
        <View>
            <Text style={styles.title}>Edit Event</Text>
            <TextInput
                onChangeText={updateEventTitle}
                defaultValue={event.title}/>
            <TextInput
                onChangeText={updateEventNotes}
                defaultValue={event.notes}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

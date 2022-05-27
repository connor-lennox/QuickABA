import {SessionEvent} from "../model/TrackedSession";
import {SafeAreaView, StyleSheet} from "react-native";
import {Text, TextInput, View} from '../components/Themed';
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
        <View style={styles.container}>
            <TextInput
                style={[styles.inputField, styles.title]}
                onChangeText={updateEventTitle}
                defaultValue={event.title}
                placeholder={"Title"}
                autoCapitalize={"words"}/>

            <TextInput
                    style={styles.inputField}
                    onChangeText={updateEventNotes}
                    defaultValue={event.notes}
                    placeholder={"Notes..."}
                    multiline={true}
                    textAlignVertical={'top'}
                    numberOfLines={6}/>
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
    inputField: {
        width: '90%',
        borderBottomWidth: 1,
        marginTop: 8,
        marginBottom: 32,
    }
})

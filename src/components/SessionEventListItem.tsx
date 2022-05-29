import {SessionEvent} from "../model/TrackedSession";
import {TouchableOpacity, StyleSheet} from "react-native";
import {Text} from "./Themed"
import {useNavigation} from "@react-navigation/native";

interface SessionEventListItemProps {
    event: SessionEvent;
}

const SessionEventListItem = (props: SessionEventListItemProps, onClick: (sessionEvent: SessionEvent) => void) => {
    const time = new Date(props.event.time);
    const timeString = time.toLocaleTimeString(undefined, {hour12: true, timeZoneName: undefined});

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onClick(props.event)}>
            <Text style={{alignSelf: 'flex-start'}}>
                {props.event.title}
            </Text>

            <Text style={{alignSelf: 'flex-end'}}>
                {timeString}
            </Text>
        </TouchableOpacity>
    )
}

export const EditableSessionEventListItem = (props: SessionEventListItemProps) => {
    const navigation = useNavigation();

    const openSessionEventEditor = (sessionEvent: SessionEvent) => {
        navigation.navigate('EventEdit', {event: sessionEvent});
    }

    return SessionEventListItem(props, openSessionEventEditor);
}

export const ViewOnlySessionEventListItem = (props: SessionEventListItemProps) => {
    const navigation = useNavigation();

    const openSessionEventViewer = (sessionEvent: SessionEvent) => {
        navigation.navigate('EventView', {event: sessionEvent});
    }

    return SessionEventListItem(props, openSessionEventViewer);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: "solid",
        padding: 8,
        margin: 4
    }
})

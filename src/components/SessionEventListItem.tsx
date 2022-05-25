import {SessionEvent} from "../model/TrackedSession";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

interface SessionEventListItemProps {
    key: number,
    event: SessionEvent;
}

export function SessionEventListItem(props: SessionEventListItemProps) {
    const navigation = useNavigation();

    const openSessionEventEditor = (sessionEvent: SessionEvent) => {
        navigation.navigate('EventEdit', {event: sessionEvent});
        console.log("editing event '" + sessionEvent.title + "'");
    }

    return (
        <TouchableOpacity onPress={() => openSessionEventEditor(props.event)}>
            <Text style={{color: 'white'}}>
                {props.event.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})

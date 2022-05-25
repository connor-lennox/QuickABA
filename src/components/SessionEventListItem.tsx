import {SessionEvent} from "../model/TrackedSession";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

interface SessionEventListItemProps {
    key: number,
    event: SessionEvent;
}

export function SessionEventListItem(props: SessionEventListItemProps) {
    const openSessionEventEditor = (sessionEvent: SessionEvent) => {
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

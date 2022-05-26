import {SessionEvent} from "../model/TrackedSession";
import {TouchableOpacity, StyleSheet} from "react-native";
import {Text} from "./Themed"
import {useNavigation} from "@react-navigation/native";

interface SessionEventListItemProps {
    event: SessionEvent;
}

export function SessionEventListItem(props: SessionEventListItemProps) {
    const navigation = useNavigation();

    const openSessionEventEditor = (sessionEvent: SessionEvent) => {
        navigation.navigate('EventEdit', {event: sessionEvent});
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => openSessionEventEditor(props.event)}>
            <Text>
                {props.event.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: "solid",
        padding: 8,
        margin: 4
    }
})

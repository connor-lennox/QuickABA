import {SessionEvent} from "../model/TrackedSession";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

interface SessionEventListItemProps {
    event: SessionEvent;
}

export function SessionEventListItem(props: SessionEventListItemProps) {
    return (
        <TouchableOpacity>
            <Text style={{color: 'white'}}>
                {props.event.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

})

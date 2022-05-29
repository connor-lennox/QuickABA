import {StyleSheet, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import {SessionEvent, TrackedSession} from "../model/TrackedSession";
import {useNavigation} from "@react-navigation/native";

interface SessionListItemProps {
    session: TrackedSession;
}

export default function SessionListItem(props: SessionListItemProps) {
    const navigation = useNavigation();

    const openSessionViewer = (session: TrackedSession) => {
        navigation.navigate('SessionView', {session: session});
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => openSessionViewer(props.session)}>
            <Text style={{alignSelf: 'flex-start'}}>
                {props.session.title}
            </Text>
        </TouchableOpacity>
    )
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
});

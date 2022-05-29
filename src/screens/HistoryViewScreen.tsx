import {RootStackScreenProps} from "../../types";
import {Text, View} from "../components/Themed";
import React, {useState} from "react";
import {TrackedSession} from "../model/TrackedSession";
import {getSessions} from "../util/SessionStorage";
import {FlatList, StyleSheet, TouchableOpacity} from "react-native";
import SessionListItem from "../components/SessionListItem";

export default function HistoryViewScreen({navigation}: RootStackScreenProps<'HistoryView'>) {
    const [sessions, setSessions] = useState(new Array<TrackedSession>());

    // Decrypt and read in sessions:
    React.useEffect(() => {
        getSessions().then((allSessions) => setSessions(allSessions));
    }, [])


    const renderSessionTitle = ({item}: {item: TrackedSession}) => (
        <SessionListItem session={item}/>
    )

    return (
        <View style={styles.container}>
            <FlatList data={sessions} renderItem={renderSessionTitle} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 8,
    },
})

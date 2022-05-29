import {RootStackScreenProps} from "../../types";
import {SessionEvent, TrackedSession} from "../model/TrackedSession";
import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import DialogContainer from "react-native-dialog/lib/Container";
import DialogTitle from "react-native-dialog/lib/Title";
import DialogDescription from "react-native-dialog/lib/Description";
import DialogInput from "react-native-dialog/lib/Input";
import DialogButton from "react-native-dialog/lib/Button";
import {Text, View} from "../components/Themed";
import React from "react";
import {ViewOnlySessionEventListItem} from "../components/SessionEventListItem";

export interface ViewSessionScreenProps {
    session: TrackedSession,
}

export default function ViewSessionScreen({route, navigation}: RootStackScreenProps<"SessionView">) {
    const session = route.params.session;

    // Set screen title to session title
    React.useEffect(() => {
        navigation.setOptions({
            title: session.title,
        })
    }, [navigation])

    // Rendering session events
    const renderItem = ({item}: {item: SessionEvent}) => <ViewOnlySessionEventListItem event={item}/>

    return (
        <View style={styles.container}>
            {/*Display events*/}
            <SafeAreaView style={styles.eventContainer}>
                <FlatList data={session.events} renderItem={renderItem} />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    eventContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

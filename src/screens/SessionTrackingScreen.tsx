import {RootStackScreenProps} from "../../types";
import {Text, View} from "../components/Themed";
import {FlatList, Pressable, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import colors from "../constants/Colors";
import React, {useState} from "react";
import {SessionEvent, TrackedSession} from "../model/TrackedSession";
import {SessionEventListItem} from "../components/SessionEventListItem";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {saveSession, getSessions} from "../util/SessionStorage";
import DialogContainer from "react-native-dialog/lib/Container";
import DialogTitle from "react-native-dialog/lib/Title";
import DialogDescription from "react-native-dialog/lib/Description";
import DialogButton from "react-native-dialog/lib/Button";
import DialogInput from "react-native-dialog/lib/Input";


export interface SessionTrackingParams {
    newEvent: string;
}

// Create a hook to force updates on functional components
function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export default function SessionTrackingScreen({route, navigation}: RootStackScreenProps<'SessionTracking'>) {
    const [session, setSession] = useState(new TrackedSession());
    const [dialogVisible, setDialogVisible] = useState(false);
    const [saveName, setSaveName] = useState(``);

    const onAddEventClick = () => {
        // Navigate to the New Event Screen, providing a handle to the active Session
        navigation.navigate('NewEvent', {session: session});
    };

    const saveAndExit = () => {
        session.title = saveName;
        saveSession(session).then(() => navigation.goBack());
    }

    const cancelSave = () => {
        setDialogVisible(false);
    }

    // Update screen when we regain focus to update event titles
    const forceUpdate = useForceUpdate();
    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            forceUpdate();
        });
    }, [navigation])

    // Add "Save Session" button to headerRight
    const colorScheme = useColorScheme();

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress={() => setDialogVisible(true)}
                    style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                    })}>
                    <FontAwesome name="check" size={24} color={Colors[colorScheme].text} style={{marginRight: 15}}/>
                </Pressable>
            )
        });
    }, [navigation]);

    const renderItem = ({item}: { item: SessionEvent }) => <SessionEventListItem event={item} />;

    return (
        <View style={styles.container}>
            {/*Confirmation Dialogue*/}
            <DialogContainer visible={dialogVisible}>
                <DialogTitle>Save Session</DialogTitle>
                <DialogDescription>Enter a title for this session:</DialogDescription>
                <DialogInput placeholder={"Title"} onChangeText={(newText) => setSaveName(newText)} />
                <DialogButton label="Cancel" onPress={cancelSave} />
                <DialogButton label="Save" onPress={saveAndExit} />
            </DialogContainer>

            {/*Display events*/}
            <SafeAreaView style={styles.eventContainer}>
                <FlatList data={session.events} renderItem={renderItem} />
            </SafeAreaView>

            <TouchableOpacity
                style={styles.addEventButton}
                onPress={onAddEventClick}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
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
    addEventButton: {
        flex: 1,
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 32,
        bottom: 32,
        opacity: 1,
        borderWidth: 1,
        borderColor: colors.light.text,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
});

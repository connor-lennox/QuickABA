import {RootStackScreenProps} from "../../types";
import {Text, TextInput, View} from "../components/Themed";
import React, {useState} from "react";
import {PaletteItem} from "../model/PaletteItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {SessionEvent, TrackedSession} from "../model/TrackedSession";

export interface NewEventScreenParams {
    session: TrackedSession;
}

export default function NewEventScreen({route, navigation}: RootStackScreenProps<'NewEvent'>) {
    const [newEventName, setNewEventName] = useState(``);
    const [palette, setPalette] = useState(new Array<PaletteItem>());

    const session = route.params.session;

    // On screen open, read palette and populate
    React.useEffect(() => {
        AsyncStorage.getItem('@paletteKey')
            .then((v) => {
                setPalette(v != null ? JSON.parse(v) : new Array<PaletteItem>());
            })
    }, []);

    const addNewEventIfPresent = () => {
        if (newEventName.trim().length > 0) {
            session.addEvent(new SessionEvent(newEventName));
        }
    }

    // On screen close, create the new event and add it to the array
    React.useEffect(() => {
        return navigation.addListener('beforeRemove', addNewEventIfPresent);
    });

    // Selecting a palette item fills the field automatically and then triggers a goBack, confirming the entry
    const selectPaletteItem = (item: string) => {
        session.addEvent(new SessionEvent(item));
        navigation.removeListener('beforeRemove', addNewEventIfPresent);
        navigation.goBack();
    }

    const renderPaletteItem = ({item}: {item: PaletteItem}) =>
        <TouchableOpacity style={styles.paletteItemContainer} onPress={() => selectPaletteItem(item.title)}>
            <Text>{item.title}</Text>
        </TouchableOpacity>

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(newText) => setNewEventName(newText)}
                placeholder={"Title"}
                style={{borderBottomWidth: 1}}/>
            <SafeAreaView>
                <FlatList data={palette} renderItem={renderPaletteItem} />
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    paletteItemContainer: {
        width: '90%',
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: "solid",
        padding: 8,
        margin: 4
    }
})

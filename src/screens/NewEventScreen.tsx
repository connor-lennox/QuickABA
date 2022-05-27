import {RootStackScreenProps} from "../../types";
import {Text, TextInput, View} from "../components/Themed";
import React, {useState} from "react";
import {PaletteItem} from "../model/PaletteItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FlatList} from "react-native";
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

    // On screen close, create the new event and add it to the array
    React.useEffect(() => {
        return navigation.addListener('beforeRemove', () => {
            if (newEventName.trim().length > 0) {
                session.addEvent(new SessionEvent(newEventName));
                console.log(session.events);
            }
        });
    });

    const renderPaletteItem = ({item}: {item: PaletteItem}) => <Text>{item.title}</Text>

    return (
        <View>
            <Text>New Event</Text>
            <TextInput
                onChangeText={(newText) => setNewEventName(newText)}/>
            <View>
                <FlatList data={palette} renderItem={renderPaletteItem} />
            </View>
        </View>
    )
}

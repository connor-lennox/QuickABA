import {RootStackScreenProps} from "../../types";
import {Text, TextInput, View} from "../components/Themed";
import React, {useState} from "react";
import {PaletteItem} from "../model/PaletteItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FlatList} from "react-native";

export default function NewEventScreen({navigation}: RootStackScreenProps<'NewEvent'>) {

    const [palette, setPalette] = useState(new Array<PaletteItem>());

    // On screen open, read palette and populate
    React.useEffect(() => {
        AsyncStorage.getItem('@paletteKey')
            .then((v) => {
                console.log("loaded " + v?.length + " palette items")
                setPalette(v != null ? JSON.parse(v) : new Array<PaletteItem>());
            })
    })


    const renderPaletteItem = ({item}: {item: PaletteItem}) => <Text>{item.title}</Text>

    return (
        <View>
            <Text>New Event</Text>
            <TextInput/>
            <View>
                <FlatList data={palette} renderItem={renderPaletteItem} />
            </View>
        </View>
    )
}

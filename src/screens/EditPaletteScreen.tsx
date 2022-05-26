import {RootStackScreenProps} from "../../types";
import {Text, View} from "../components/Themed";
import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";
import {EditPaletteListItem} from "../components/EditPaletteListItem";
import colors from "../constants/Colors";

export default function EditPaletteScreen({navigation}: RootStackScreenProps<"EditPalette"> ) {

    const [palette, setPalette] = useState(new Array<string>());

    React.useEffect(() => {
        AsyncStorage.getItem('@paletteKey')
        .then((v) => {
            console.log("loaded " + v)
            setPalette(v != null ? JSON.parse(v) : new Array<string>());
        })
    }, []);

    const renderItem = ({item}: { item: string }) => <EditPaletteListItem title={item} />

    const onAddElementClick = () => {
        setPalette(arr => [...arr, "test palette item " + palette.length]);
        AsyncStorage.setItem('@paletteKey', JSON.stringify(palette));
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.paletteContainer}>
                <FlatList data={palette} renderItem={renderItem} />
            </SafeAreaView>

            <TouchableOpacity
                style={styles.addElementButton}
                onPress={onAddElementClick}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    paletteContainer: {
        flex: 1,
        width: '100%',
        marginBottom: 100,
    },
    addElementButton: {
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

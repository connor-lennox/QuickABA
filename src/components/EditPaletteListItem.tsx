import {TextInput, View} from "./Themed";
import {StyleSheet} from "react-native";
import {PaletteItem} from "../model/PaletteItem";

interface EditPaletteListItemProps {
    item: PaletteItem;
}

export function EditPaletteListItem(props: EditPaletteListItemProps) {
    return (
        <View style={styles.container}>
            <TextInput
                defaultValue={props.item.title}
                placeholder={"Event Title"}
                onChangeText={(newText) => props.item.title = newText}/>
        </View>
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

import {Text} from "./Themed";

interface EditPaletteListItemProps {
    title: string;
}

export function EditPaletteListItem(props: EditPaletteListItemProps) {
    return (
        <Text>{props.title}</Text>
    )
}

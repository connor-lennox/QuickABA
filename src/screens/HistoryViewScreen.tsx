import {RootStackScreenProps} from "../../types";
import {Text, View} from "../components/Themed";

export default function HistoryViewScreen({navigation}: RootStackScreenProps<'HistoryView'>) {
    return (
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>History View</Text>
        </View>
    );
}

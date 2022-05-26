import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import colors from "../constants/Colors";

export default function MainMenuScreen({ navigation }: RootTabScreenProps<'MainMenu'>) {
  const colorScheme = useColorScheme();

  const sessionButtonColor = colorScheme === 'light' ? styles.sessionButtonLight : styles.sessionButtonDark;
  const historyButtonColor = colorScheme === 'light' ? styles.historyButtonLight : styles.historyButtonDark;
  const paletteButtonColor = colorScheme === 'light' ? styles.paletteButtonLight : styles.paletteButtonDark;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SessionTracking')} style={[styles.menuOption, styles.sessionButton, sessionButtonColor]}>
        <Text style={styles.title}>Start Session</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('HistoryView')} style={[styles.menuOption, styles.historyButton, historyButtonColor]}>
        <Text style={styles.title}>Session History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditPalette')} style={[styles.menuOption, styles.paletteButton, paletteButtonColor]}>
        <Text style={styles.title}>Event Palette</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  menuOption: {
    width: '90%',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    elevation: 5
  },
  sessionButton: {
    height: '50%',
  },
  sessionButtonLight: {
    backgroundColor: colors.light.tint,
    borderColor: 'black',
  },
  sessionButtonDark: {
    backgroundColor: colors.dark.tint,
    borderColor: 'white',
  },
  historyButton: {
    height: '20%',
  },
  historyButtonLight: {
    backgroundColor: colors.light.tint,
    borderColor: 'black',
  },
  historyButtonDark: {
    backgroundColor: colors.dark.tint,
    borderColor: 'white',
  },
  paletteButton: {
    height: '20%',
  },
  paletteButtonLight: {
    backgroundColor: colors.light.tint,
    borderColor: 'black',
  },
  paletteButtonDark: {
    backgroundColor: colors.dark.tint,
    borderColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

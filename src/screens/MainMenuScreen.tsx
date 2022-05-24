import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../../types';
import colors from "../constants/Colors";

export default function MainMenuScreen({ navigation }: RootTabScreenProps<'MainMenu'>) {
  const colorScheme = useColorScheme();

  const sessionButtonColor = colorScheme === 'light' ? styles.sessionButtonLight : styles.sessionButtonDark;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SessionTracking')} style={[sessionButtonColor, styles.sessionButton]}>
        <Text style={styles.title}>Start Session</Text>
      </TouchableOpacity>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionButton: {
    width: "90%",
    height: '50%',
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 8,
  },
  sessionButtonLight: {
    backgroundColor: colors.light.tint,
    borderColor: 'black',
  },
  sessionButtonDark: {
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

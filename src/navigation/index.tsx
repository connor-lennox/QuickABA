/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import SessionTrackingScreen from "../screens/SessionTrackingScreen";
import HistoryViewScreen from "../screens/HistoryViewScreen";
import EditSessionEventScreen from "../screens/EditSessionEventScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import EditPaletteScreen from "../screens/EditPaletteScreen";
import NewEventScreen from "../screens/NewEventScreen";
import ViewSessionEventScreen from "../screens/ViewSessionEventScreen";
import ViewSessionScreen from "../screens/ViewSessionScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={MainMenuScreen} options={{ title: 'QuickABA' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SessionTracking" component={SessionTrackingScreen} options={{title: "Session Tracking"}} />
      <Stack.Screen name="HistoryView" component={HistoryViewScreen} options={{title: "History"}} />
      <Stack.Screen name="EventEdit" component={EditSessionEventScreen} options={{title: "Edit Event"}} />
      <Stack.Screen name="EventView" component={ViewSessionEventScreen} options={{title: "View Event"}} />
      <Stack.Screen name="SessionView" component={ViewSessionScreen} />
      <Stack.Screen name="EditPalette" component={EditPaletteScreen} options={{title: "Edit Palette"}} />
      <Stack.Screen name="NewEvent" component={NewEventScreen} options={{title: "New Event"}} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="MainMenu"
        component={MainMenuScreen}
        options={({ navigation }: RootTabScreenProps<'MainMenu'>) => ({
          title: 'QuickABA',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {EditSessionEventScreenProps} from "./src/screens/EditSessionEventScreen";
import {SessionTrackingParams} from "./src/screens/SessionTrackingScreen";
import {NewEventScreenParams} from "./src/screens/NewEventScreen";
import {ViewSessionEventScreenProps} from "./src/screens/ViewSessionEventScreen";
import {ViewSessionScreenProps} from "./src/screens/ViewSessionScreen";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  SessionTracking: SessionTrackingParams | undefined;
  HistoryView: undefined,
  EventEdit: EditSessionEventScreenProps,
  EventView: ViewSessionEventScreenProps,
  SessionView: ViewSessionScreenProps,
  EditPalette: undefined,
  NewEvent: NewEventScreenParams,
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  MainMenu: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

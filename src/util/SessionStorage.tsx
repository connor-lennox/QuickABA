import EncryptedStorage from 'react-native-encrypted-storage';
import {TrackedSession} from "../model/TrackedSession";

const SESSIONS_KEY = 'stored-sessions';

export async function getSessions(): Promise<Array<TrackedSession>> {
    return EncryptedStorage.getItem(SESSIONS_KEY).then((v) => {
        if(v) {
            return JSON.parse(v)
        } else {
            return new Array<TrackedSession>();
        }
    });
}

export async function saveSession(newSession: TrackedSession) {
    let oldSessions = await getSessions();
    let newSessions = [...oldSessions, newSession];
    await EncryptedStorage.setItem(SESSIONS_KEY, JSON.stringify(newSessions));
}

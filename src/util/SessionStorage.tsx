import {TrackedSession} from "../model/TrackedSession";
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import * as Random from 'expo-random';

// @ts-ignore
import binaryToBase64 from 'react-native/Libraries/Utilities/binaryToBase64';
import CryptoES from "crypto-es";

const SESSIONS_KEY = 'stored-sessions';

const ENCRYPTION_KEY = 'QUICK_ABA';

export const getEncryptionKey = async () => {
    // Grab key from Secure Store
    let key = await SecureStore.getItemAsync(ENCRYPTION_KEY);
    // If key not present, generate a new one (should only happen once)
    if(!key) {
        key = binaryToBase64(Random.getRandomBytes(32));
        if(!key) {
            throw Error("failed to generate new encryption key");
        }
        await SecureStore.setItemAsync(ENCRYPTION_KEY, key);
    }
    return key;
};


const SESSIONS_PATH = FileSystem.documentDirectory + 'sessions/'

const ensureSessionFolderExists = async () => {
    let folder = await FileSystem.getInfoAsync(SESSIONS_PATH);
    if(!folder.exists) {
        await FileSystem.makeDirectoryAsync(SESSIONS_PATH);
    }
}


export const getSessions = async () => {
    // Make sure the sessions folder exists
    await ensureSessionFolderExists();

    // Grab all files in directory
    let fileNames = await FileSystem.readDirectoryAsync(SESSIONS_PATH);

    // Get encryption key
    let encryptionKey = await getEncryptionKey();

    // Read each file, decrypt string, create object
    // Returns once all promises have been resolved
    return Promise.all(fileNames.map<Promise<TrackedSession>>(async (v) => {
        let fileData = await FileSystem.readAsStringAsync(SESSIONS_PATH + v);
        let decryptedData = CryptoES.AES.decrypt(fileData, encryptionKey).toString(CryptoES.enc.Utf8);
        return JSON.parse(decryptedData) as TrackedSession;
    }));
}

export const saveSession = async (newSession: TrackedSession) => {
    // Make sure the sessions folder exists
    await ensureSessionFolderExists();

    // Encrypt data with AES256, get name from SHA-1 hash
    let sessionJson = JSON.stringify(newSession);
    let encryptedData = CryptoES.AES.encrypt(sessionJson, await getEncryptionKey()).ciphertext.toString(CryptoES.enc.Utf8);
    let hashedName = CryptoES.SHA1(sessionJson);

    // Write file to local storage
    await FileSystem.writeAsStringAsync(SESSIONS_PATH + hashedName, encryptedData);
}

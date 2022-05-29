import {TrackedSession} from "../model/TrackedSession";
import * as Keychain from 'react-native-keychain';
import * as FileSystem from 'expo-file-system';
import {generateSecureRandom} from "react-native-securerandom";
// @ts-ignore
import binaryToBase64 from 'react-native/Libraries/Utilities/binaryToBase64';
import CryptoES from "crypto-es";

const SESSIONS_KEY = 'stored-sessions';

// Getting a secure key consistently:
export type EncryptionKeyType = {
    isFresh: boolean;
    key: string;
}
export type GetEncryptionKeyType = () => Promise<EncryptionKeyType>;

const ENCRYPTION_USER = 'QUICK_ABA';

export const getEncryptionKey: GetEncryptionKeyType = async () => {
    try {
        const existingCredentials = await Keychain.getGenericPassword();
        if (existingCredentials) {
            return {isFresh: false, key: existingCredentials.password};
        }

        const randomBytes = await generateSecureRandom(32);
        if (!randomBytes) {
            throw new Error('Error generating a secure random key buffer');
        }
        const randomBytesString = binaryToBase64(randomBytes);
        if (!randomBytesString) {
            throw new Error('Error converting secure random key buffer');
        }

        const hasSetCredentials = await Keychain.setGenericPassword(
            ENCRYPTION_USER,
            randomBytesString,
        );
        if (hasSetCredentials) {
            return {isFresh: true, key: randomBytesString};
        }
        throw new Error('Error setting the generic password on Keychain');
    } catch (error) {
        throw new Error(error);
    }
};


const SESSIONS_PATH = FileSystem.documentDirectory + 'sessions/'

export const getSessions = async () => {
    // Grab all files in directory
    let fileNames = await FileSystem.readDirectoryAsync(SESSIONS_PATH);

    // Get encryption key
    let encryptionKey = (await getEncryptionKey()).key;

    // Read each file, decrypt string, create object
    // Returns once all promises have been resolved
    return Promise.all(fileNames.map<Promise<TrackedSession>>(async (v) => {
        let fileData = await FileSystem.readAsStringAsync(SESSIONS_PATH + v);
        let decryptedData = CryptoES.AES.decrypt(fileData, encryptionKey).toString();
        return JSON.parse(decryptedData) as TrackedSession;
    }));
}

export const saveSession = async (newSession: TrackedSession) => {
    // Encrypt data with AES256, get name from SHA-1 hash
    let sessionJson = JSON.stringify(newSession);
    let encryptedData = CryptoES.AES.encrypt(sessionJson, (await getEncryptionKey()).key).toString();
    let hashedName = CryptoES.SHA1(sessionJson);

    // Write file to local storage
    await FileSystem.writeAsStringAsync(SESSIONS_PATH + hashedName, encryptedData);
}

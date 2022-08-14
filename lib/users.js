import firestore from '@react-native-firebase/firestore';
import {Platform} from 'react-native';
import {v4 as uuidv4} from 'uuid';

export const userCollection = firestore().collection('users');
export function createUser({id, displayName, photoURL, role, code}) {
  return userCollection.doc(id).set({
    id,
    displayName,
    photoURL,
    code: code.length
      ? code
      : Platform.OS === 'ios'
      ? uuidv4().replaceAll('-', '')
      : uuidv4().split('-').join(''),
    role,
  });
}

export async function getUser({id}) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}

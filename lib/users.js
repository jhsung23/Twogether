import firestore from '@react-native-firebase/firestore';
import {v4 as uuidv4} from 'uuid';

export const userCollection = firestore().collection('users');
export function createUser({id, displayName, photoURL, role, code}) {
  return userCollection.doc(id).set({
    id,
    displayName,
    photoURL,
    code: code.length ? code : uuidv4().replaceAll('-', ''),
    role,
  });
}

export async function getUser({id}) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}

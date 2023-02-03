import firestore from '@react-native-firebase/firestore';
import {Platform} from 'react-native';
import {v4 as uuidv4} from 'uuid';

export const userCollection = firestore().collection('users');

export async function createUser({id, displayName, photoURL, role, code}) {
  const partnerId = code ? await getPartnerId({code, id}) : '';

  // 공유코드로 회원가입을 한 경우,
  // 먼저 가입한 상대의 정보에 새로 가입한 사용자의 아이디를 넣어줌
  updatePartnerId({code, id, partnerId});

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
    partnerId,
  });
}

export async function getUser({id}) {
  const doc = await userCollection.doc(id).get();

  return doc.data();
}

export async function getPartnerId({code, id}) {
  const snapshot = await userCollection.where('code', '==', code).get();
  const ids = snapshot.docs.filter(doc => doc.id !== id).map(doc => doc.id);

  return ids[0];
}

export async function updatePartnerId({id, partnerId}) {
  return await userCollection.doc(partnerId).update({partnerId: id});
}

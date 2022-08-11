import firestore from '@react-native-firebase/firestore';

const babyDocument = firestore().collection('babys').doc('baby');

export function createBaby({user}) {
  return babyDocument.add({
    user,
    //TODO: firebase firestore에 저장할 아기 정보 추가로 입력해야
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getBaby({code}) {
  const snapshot = await babyDocument
    .collection(code)
    .orderBy('order', 'asc')
    .get();

  const babys = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return babys;
}

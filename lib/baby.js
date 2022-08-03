import firestore from '@react-native-firebase/firestore';

const babyCollection = firestore().collection('babys');

export function createBaby({user}) {
  return babyCollection.add({
    user,
    //TODO: firebase firestore에 저장할 아기 정보 추가로 입력해야
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getBaby() {
  const snapshot = await babyCollection.get();
  const babys = snapshot.docs.map(doc => ({
    ...doc.data(),
  }));

  return babys;
}

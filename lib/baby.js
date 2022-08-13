import firestore from '@react-native-firebase/firestore';

const babyDocument = firestore().collection('babys').doc('baby');

export function createBaby({code, babyForm}) {
  return babyDocument
    .collection(code)
    .doc(babyForm.order + '')
    .set(babyForm);
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

export async function getBabyInfo({code, order}) {
  const snapshot = await babyDocument
    .collection(code)
    .doc(order + '')
    .get();

  const info = snapshot.data();

  return info;
}

import firestore from '@react-native-firebase/firestore';

const statisticsCollection = firestore().collection('statistics');

export function updateCount({code, id}) {
  return statisticsCollection.doc(code).collection(id).add({
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getMyCount({code, id}) {
  const snapshot = await statisticsCollection.doc(code).collection(id).get();
  const count = snapshot.docs.map(doc => doc.data());

  return count.length;
}

export async function getPartnerCount({code, partnerId}) {
  const snapshot = await statisticsCollection
    .doc(code)
    .collection(partnerId)
    .get();

  const count = snapshot.docs.map(doc => doc.data());

  return count.length;
}

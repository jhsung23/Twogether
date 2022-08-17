import firestore from '@react-native-firebase/firestore';

const statisticsCollection = firestore().collection('statistics');

export function createCount({code, id}) {
  return statisticsCollection.doc(code).collection(id).add({
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getCount({code, id}) {
  const snapshot = await statisticsCollection.doc(code).collection(id).get();

  const count = snapshot.docs.map(doc => doc.data());

  return count;
}

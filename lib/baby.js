import firestore from '@react-native-firebase/firestore';

const babyDocument = firestore().collection('babys').doc('baby');

export function createBaby({code, babyForm}) {
  const today = new Date();
  const age = today.getFullYear() - parseInt(babyForm.birthYear, 10);
  const monthsAfterBirth = age * 12 + today.getMonth();
  const daysAfterBirth =
    age * 365 + (today.getMonth() - 1) * 30 + today.getDate();

  console.log(monthsAfterBirth);
  console.log(today.getMonth());
  return babyDocument
    .collection(code)
    .doc(babyForm.order + '')
    .set({
      ...babyForm,
      age: age,
      monthsAfterBirth: monthsAfterBirth,
      daysAfterBirth: daysAfterBirth,
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

export async function getBabyInfo({code, order}) {
  const snapshot = await babyDocument
    .collection(code)
    .doc(order + '')
    .get();

  const info = snapshot.data();

  return info;
}

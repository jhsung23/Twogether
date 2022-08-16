import firestore from '@react-native-firebase/firestore';
import {formatDate} from '../utils/date';

const recordsCollection = firestore().collection('records');

//Create Record
//1. eat {공유코드, 작성자, 뭘 먹었는지, 얼마나 먹었는지, 언제 먹었는지, 특이사항}
export function createEatRecord({code, order, writer, what, how, date, memo}) {
  const when = firestore.Timestamp.fromDate(date);
  const colName = formatDate(new Date());

  return recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('eat')
    .add({
      writer,
      what,
      how,
      when,
      memo,
    });
}

//2. toilet {공유코드, 작성자, 대/소변 중 무엇인지, 대/소변 양, 언제 기저귀 교체, 특이사항}
export function createToiletRecord({
  code,
  order,
  writer,
  what,
  how,
  date,
  memo,
}) {
  const when = firestore.Timestamp.fromDate(date);
  const colName = formatDate(new Date());

  return recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('toilet')
    .add({
      writer,
      what,
      how,
      when,
      memo,
    });
}

//3. sleep {공유코드, 작성자, 낮잠/밤잠 중 무엇인지, 언제 잠들었는지, 언제 깼는지, 특이사항}
export function createSleepRecord({
  code,
  order,
  writer,
  what,
  startDate,
  endDate,
  diff,
  memo,
}) {
  const when = firestore.Timestamp.fromDate(startDate);
  const whenEnd = firestore.Timestamp.fromDate(endDate);
  const colName = formatDate(new Date());

  return recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('sleep')
    .add({
      writer,
      what,
      when,
      whenEnd,
      diff,
      memo,
    });
}

//4. health {공유코드, 작성자, 뭘 먹었는지, 얼마나 먹었는지, 언제 먹었는지, 특이사항}
export function createHealthRecord({
  code,
  order,
  writer,
  height,
  weight,
  what,
  date,
  memo,
}) {
  const when = firestore.Timestamp.fromDate(date);
  const colName = formatDate(new Date());

  return recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('health')
    .add({
      writer,
      what,
      height,
      weight,
      when,
      memo,
    });
}

//5. etc {공유코드, 작성자, 무슨 활동인지, 언제 시작했는지, 언제 끝났는지, 특이사항}
export function createEtcRecord({
  code,
  order,
  writer,
  what,
  startDate,
  endDate,
  diff,
  memo,
}) {
  const when = firestore.Timestamp.fromDate(startDate);
  const whenEnd = firestore.Timestamp.fromDate(endDate);
  const colName = formatDate(new Date());

  return recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('etc')
    .add({
      writer,
      what,
      when,
      whenEnd,
      diff,
      memo,
    });
}

//Get Record - 필요시 구현
//1. eat
export async function getEat({code, order}) {
  const colName = formatDate(new Date());

  const snapshot = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('eat')
    .orderBy('when', 'desc')
    .get();

  return snapshot.docs.map(doc => doc.data());
}

//2. toilet
export async function getToilet({code, order}) {
  const colName = formatDate(new Date());

  const snapshot = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('toilet')
    .orderBy('when', 'desc')
    .get();

  return snapshot.docs.map(doc => doc.data());
}

//3. sleep
export async function getSleep({code, order}) {
  const colName = formatDate(new Date());

  const snapshot = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('sleep')
    .orderBy('when', 'desc')
    .get();

  return snapshot.docs.map(doc => doc.data());
}

//4. health
//5. etc

//Get Recent Record
//1. eat
export async function getRecentEat({code, order}) {
  const colName = formatDate(new Date());

  const snapshot = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('eat')
    .orderBy('when', 'desc')
    .limit(1)
    .get();

  const records = snapshot.docs.map(doc => doc.data().when);

  return records;
}

//2. toilet
export async function getRecentToilet({code, order}) {
  const colName = formatDate(new Date());

  const snapshot = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('toilet')
    .orderBy('when', 'desc')
    .limit(1)
    .get();

  const records = snapshot.docs.map(doc => doc.data().when);

  return records;
}

//3. sleep
export async function getRecentSleep({code, order}) {
  const colName = formatDate(new Date());

  const snapshot = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('sleep')
    .orderBy('when', 'desc')
    .limit(1)
    .get();

  const records = snapshot.docs.map(doc => doc.data().when);

  return records;
}

//Get Document Size
//1. eat
export async function getEatRecordSize({code, order}) {
  const colName = formatDate(new Date());

  const size = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('eat')
    .get()
    .then(snap => snap.size);

  return size;
}

//2. toilet
export async function getToiletRecordSize({code, order}) {
  const colName = formatDate(new Date());

  const size = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('toilet')
    .get()
    .then(snap => snap.size);

  return size;
}

//3. sleep
export async function getSleepRecordSize({code, order}) {
  const colName = formatDate(new Date());

  const size = await recordsCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .collection('sleep')
    .get()
    .then(snap => snap.size);

  return size;
}

//For Record Screen
//특정 날짜에 해당하는 records 전부 가져오기
export async function getAllRecordWithDate({code, order, date}) {
  const eatSnapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('eat')
    .get();

  const eat = eatSnapshot.docs.map(doc => ({
    type: 'eat',
    id: doc.id,
    ...doc.data(),
  }));

  const toiletSnapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('toilet')
    .get();

  const toilet = toiletSnapshot.docs.map(doc => ({
    type: 'toilet',
    id: doc.id,
    ...doc.data(),
  }));

  const sleepSnapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('sleep')
    .get();

  const sleep = sleepSnapshot.docs.map(doc => ({
    type: 'sleep',
    id: doc.id,
    ...doc.data(),
  }));

  const healthSnapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('health')
    .get();

  const health = healthSnapshot.docs.map(doc => ({
    type: 'health',
    id: doc.id,
    ...doc.data(),
  }));

  const etcSnapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('etc')
    .get();

  const etc = etcSnapshot.docs.map(doc => ({
    type: 'etc',
    id: doc.id,
    ...doc.data(),
  }));

  const data = eat
    .concat(toilet, sleep, health, etc)
    .sort((a, b) => (a.when > b.when ? 1 : -1));

  console.log('data', data);

  return data;
}

//1. eat
export async function getAllEatWithDate({code, order, date}) {
  const snapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('eat')
    .get();

  return snapshot.docs.map(doc => doc.data());
}

//2. toilet
export async function getAllToiletWithDate({code, order, date}) {
  const snapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('toilet')
    .get();

  return snapshot.docs.map(doc => doc.data());
}
//3. sleep
export async function getAllSleepWithDate({code, order, date}) {
  const snapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('sleep')
    .get();

  return snapshot.docs.map(doc => doc.data());
}
//4. health
export async function getAllHealthWithDate({code, order, date}) {
  const snapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('health')
    .get();

  return snapshot.docs.map(doc => doc.data());
}
//5. etc
export async function getAllEtcWithDate({code, order, date}) {
  const snapshot = await recordsCollection
    .doc(code)
    .collection(date)
    .doc(order + '')
    .collection('etc')
    .get();

  return snapshot.docs.map(doc => doc.data());
}

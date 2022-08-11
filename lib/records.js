import firestore from '@react-native-firebase/firestore';
import {formatDate} from '../utils/date';

const recordsCollection = firestore().collection('records');

//Create Record
//1. eat {공유코드, 작성자, 뭘 먹었는지, 얼마나 먹었는지, 언제 먹었는지, 특이사항}
export function createEatRecord({code, writer, what, how, date, memo}) {
  const when = firestore.Timestamp.fromDate(date);
  const docName = formatDate(new Date());

  return recordsCollection
    .doc('record')
    .collection(code)
    .doc(docName)
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
export function createToiletRecord({code, writer, what, how, date, memo}) {
  const when = firestore.Timestamp.fromDate(date);
  const docName = formatDate(new Date());

  return recordsCollection
    .doc('record')
    .collection(code)
    .doc(docName)
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
  writer,
  what,
  startDate,
  endDate,
  memo,
}) {
  const whenStart = firestore.Timestamp.fromDate(startDate);
  const whenEnd = firestore.Timestamp.fromDate(endDate);
  const docName = formatDate(new Date());

  return recordsCollection
    .doc('record')
    .collection(code)
    .doc(docName)
    .collection('sleep')
    .add({
      writer,
      what,
      whenStart,
      whenEnd,
      memo,
    });
}

//4. health {공유코드, 작성자, 뭘 먹었는지, 얼마나 먹었는지, 언제 먹었는지, 특이사항}
export function createHealthRecord({code, writer, what, how, date, memo}) {
  const when = firestore.Timestamp.fromDate(date);
  const docName = formatDate(new Date());

  return recordsCollection
    .doc('record')
    .collection(code)
    .doc(docName)
    .collection('health')
    .add({
      writer,
      what,
      how,
      when,
      memo,
    });
}

//5. etc {공유코드, 작성자, 무슨 활동인지, 언제 시작했는지, 언제 끝났는지, 특이사항}
export function createEtcRecord({
  code,
  writer,
  what,
  startDate,
  endDate,
  memo,
}) {
  const whenStart = firestore.Timestamp.fromDate(startDate);
  const whenEnd = firestore.Timestamp.fromDate(endDate);
  const docName = formatDate(new Date());

  return recordsCollection
    .doc('record')
    .collection(code)
    .doc(docName)
    .collection('etc')
    .add({
      writer,
      what,
      whenStart,
      whenEnd,
      memo,
    });
}

//Get Record
//1. eat
//2. toilet
//3. sleep
//4. health
//5. etc

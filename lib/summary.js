import firestore from '@react-native-firebase/firestore';

import {formatDate, formatTime} from '../utils/date';
import {getBabyInfo} from './baby';
import {
  getEatRecordSize,
  getToiletRecordSize,
  getSleepRecordSize,
  getRecentEat,
  getRecentSleep,
  getRecentToilet,
} from './records';

const summaryCollection = firestore().collection('summary');

export async function updateSummary({code, order}) {
  const colName = formatDate(new Date());

  //babys 관련
  const babyInfo = await getBabyInfo({code, order});
  console.log(babyInfo);

  //records 관련
  // 가장 최근 eat, toilet, sleep 가져오기
  const recentWhenEat = await getRecentEat({code, order});
  const recentWhenToilet = await getRecentToilet({code, order});
  const recentWhenSleep = await getRecentSleep({code, order});

  console.log(recentWhenEat);
  // 가장 최근 document에서 when 추출
  const whenEat = recentWhenEat[0]?.toDate();
  const whenToilet = recentWhenToilet[0]?.toDate();
  const whenSleep = recentWhenSleep[0]?.toDate();

  // 오늘 날짜로 올린 eat, toilet, sleep document의 개수
  const eatDocSize = await getEatRecordSize({code, order});
  const toiletDocSize = await getToiletRecordSize({code, order});
  const sleepDocSize = await getSleepRecordSize({code, order});

  return summaryCollection
    .doc(code)
    .collection(colName)
    .doc(order + '')
    .set({
      name: babyInfo.name,
      age: babyInfo.age,
      birthDay: babyInfo.birthDay,
      birthMonth: babyInfo.birthMonth,
      birthYear: babyInfo.birthYear,
      daysAfterBirth: babyInfo.daysAfterBirth,
      monthsAfterBirth: babyInfo.monthsAfterBirth,
      eatCount: eatDocSize,
      lastEatTime: whenEat ? formatTime(whenEat) : null,
      toiletCount: toiletDocSize,
      lastToiletTime: whenToilet ? formatTime(whenToilet) : null,
      sleepCount: sleepDocSize,
      lastSleepTime: whenSleep ? formatTime(whenSleep) : null,
    });
}

export async function getSummary({code}) {
  const colName = formatDate(new Date());

  const snapshot = await summaryCollection.doc(code).collection(colName).get();

  const summary = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return summary;
}

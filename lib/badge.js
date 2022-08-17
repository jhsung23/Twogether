import firestore from '@react-native-firebase/firestore';

const badgeCollection = firestore().collection('badges');

//회원가입 시
//badge 12개에 대한 데이터베이스를 만들어준다.
//badges>uid>badge>배지순서>{배지 이름, url, 획득여부}

//획득여부는 record submit 시에 배지 데이터베이스를 update(수정)하는 방향으로.

//회원가입시 회원별 배지 현황 database create
export function createBadge1({id}) {
  //family 배지
  return badgeCollection.doc(id).collection('badge').doc('1').set({
    badgeName: '행복한 우리 가족',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Ffamily.png?alt=media&token=52a85718-8198-4808-abf7-bc171c96d453',
    achieve: true,
  });
}

export function createBadge2({id}) {
  // sleep 배지
  return badgeCollection.doc(id).collection('badge').doc('2').set({
    badgeName: '잘자는 우리 아기',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fsleep.png?alt=media&token=a1812aca-26f0-4448-a9aa-eea193d0715d',
    achieve: false,
  });
}

export function createBadge3({id}) {
  // bottle 배지
  return badgeCollection.doc(id).collection('badge').doc('3').set({
    badgeName: '잘 먹는 우리 아기',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fbottle.png?alt=media&token=4b5535d0-241c-4503-8515-86653b380911',
    achieve: false,
  });
}

export function createBadge4({id}) {
  // diapers 배지
  return badgeCollection.doc(id).collection('badge').doc('4').set({
    badgeName: '기저귀 교체는 신속히',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fdiapers.png?alt=media&token=f64d500f-9421-4e04-b01c-35d79f5d245f',

    achieve: false,
  });
}

export function createBadge5({id}) {
  // toys 배지
  return badgeCollection.doc(id).collection('badge').doc('5').set({
    badgeName: '놀아주기 달인',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Ftoys.png?alt=media&token=d1703d83-59e2-43c9-ad6b-a5c996ed96aa',
    achieve: false,
  });
}

export function createBadge6({id}) {
  // bathtub 배지
  return badgeCollection.doc(id).collection('badge').doc('6').set({
    badgeName: '즐거운 목욕',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fbathtub.png?alt=media&token=349daca1-01d2-449e-b3dd-05f98afd70b1',
    achieve: false,
  });
}

export function createBadge7({id}) {
  // health 배지
  return badgeCollection.doc(id).collection('badge').doc('7').set({
    badgeName: '건강한 우리 아기',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fhealth.png?alt=media&token=2fe73fda-4907-42f4-88e9-5a92a48eb255',
    achieve: false,
  });
}

export function createBadge8({id}) {
  // heights 배지
  return badgeCollection.doc(id).collection('badge').doc('8').set({
    badgeName: '쑥쑥 자라렴',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fheights.png?alt=media&token=0bfa1cfd-fd47-4a8a-8535-a07c843a4b0e',
    achieve: false,
  });
}

export function createBadge9({id}) {
  // crawl 배지
  return badgeCollection.doc(id).collection('badge').doc('9').set({
    badgeName: '기어다니기 시작',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fcrawl.png?alt=media&token=b9e8cf86-aace-403c-a205-6a27c5e13506',
    achieve: false,
  });
}

export function createBadge10({id}) {
  // picnic 배지
  return badgeCollection.doc(id).collection('badge').doc('10').set({
    badgeName: '소풍 다녀왔어요',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fpicnic.png?alt=media&token=14289d22-35cf-4ee8-8372-8f2382b943e7',
    achieve: false,
  });
}

export function createBadge11({id}) {
  // good 배지
  return badgeCollection.doc(id).collection('badge').doc('11').set({
    badgeName: '수고했어요',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fgood.png?alt=media&token=229fc0b6-5240-4ffa-b6f1-734a49905c80',
    achieve: false,
  });
}

export function createBadge12({id}) {
  // crown 배지
  return badgeCollection.doc(id).collection('badge').doc('12').set({
    badgeName: '육아의 달인',
    badgeImageUri:
      'https://firebasestorage.googleapis.com/v0/b/together-7fd7d.appspot.com/o/badge%2Fcrown.png?alt=media&token=f9d07031-2a0b-474f-af9f-b0619a84966b',
    achieve: false,
  });
}

//사용자가 가진 뱃지 현황을 가져옴
export async function getBadges({id}) {
  const snapshot = await badgeCollection
    .doc(id)
    .collection('badge')
    .orderBy(firestore.FieldPath.documentId(), 'asc')
    .get();

  const badges = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(badges);

  return badges;
}

//획득한 배지 개수
export async function getAchieveBadges({id}) {
  const snapshot = await badgeCollection
    .doc(id)
    .collection('badge')
    .where('achieve', '==', true)
    .get();

  const badges = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return badges.length;
}

//배지 achieve 상태 업데이트
export function updateBadgeAchieve({id, badgeNumber}) {
  return badgeCollection
    .doc(id)
    .collection('badge')
    .doc(badgeNumber + '')
    .update({
      achieve: true,
    });
}

export async function getBadgeAchieveState({id, badgeNumber}) {
  const snapshot = await badgeCollection
    .doc(id)
    .collection('badge')
    .doc(badgeNumber + '')
    .get();

  return snapshot.data();
}

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native';

import {useUserContext} from '../contexts/UserContext';
import {getEat, getToilet, getSleep} from '../lib/records';
import {formatTime} from '../utils/date';

function HomeItem({
  width, // 컴포넌트(홈아이템) 가로 길이

  name, //이름
  birthYear, //생년
  birthMonth, //생월
  birthDay, //생일
  daysAfterBirth, //태어난지 n일째
  monthsAfterBirth, //태어난지 n개월째
  age, //나이
  order,
}) {
  const {user} = useUserContext();
  const [eat, setEat] = useState();
  const [toilet, setToilet] = useState();
  const [sleep, setSleep] = useState();

  useEffect(() => {
    const code = user.code;

    getEat({code, order}).then(setEat);
    getToilet({code, order}).then(setToilet);
    getSleep({code, order}).then(setSleep);
  }, [user.code, order]);

  return (
    <View style={[styles.container, styles.boxShadow]} width={width}>
      <View style={styles.babyInfoContainer}>
        <Image
          style={styles.babyPhoto}
          source={require('../assets/baby.png')}
        />

        <View style={styles.babyInfo}>
          <Text style={styles.babyName}>
            {name} (만 {age}세)
          </Text>
          <Text style={styles.babyBirth}>
            {birthYear}.{birthMonth}.{birthDay}
            {'  '}D+{daysAfterBirth}
            {'  '}
            {monthsAfterBirth}개월
          </Text>
        </View>
      </View>

      <View style={styles.box} backgroundColor={'rgba(208, 230, 165, 0.6)'}>
        <Image
          style={styles.iconImage}
          source={require('../assets/milk.png')}
        />
        <View style={styles.flexDirection}>
          {!eat ? (
            <View style={styles.spinnerWrapper}>
              <ActivityIndicator size={32} color="#454545" />
            </View>
          ) : eat.length ? (
            <>
              <Text style={styles.mainText}>밥을 {eat.length} 끼 먹었어요</Text>
              <Text style={styles.subText}>
                마지막 섭취 시간: {formatTime(eat[0].when.toDate())}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.mainTextNone}>오늘의 섭취 기록이 없음</Text>
              <Text style={styles.subTextNone}>
                마지막 섭취 시간: 등록된 기록 없음
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.box} backgroundColor={'rgba(255, 201, 219, 0.6)'}>
        <Image
          style={styles.iconImage}
          source={require('../assets/diaper.png')}
        />
        <View style={styles.flexDirection}>
          {!toilet ? (
            <View style={styles.spinnerWrapper}>
              <ActivityIndicator size={32} color="#454545" />
            </View>
          ) : toilet.length ? (
            <>
              <Text style={styles.mainText}>
                기저귀를 {toilet.length} 회 교체했어요
              </Text>
              <Text style={styles.subText}>
                마지막 교체 시간: {formatTime(toilet[0].when.toDate())}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.mainTextNone}>오늘의 배변 기록이 없음</Text>
              <Text style={styles.subTextNone}>
                마지막 기저귀 교체 시간: 등록된 기록 없음
              </Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.box} backgroundColor={'rgba(168, 205, 240, 0.6)'}>
        <Image
          style={styles.iconImage}
          source={require('../assets/sleeping.png')}
        />
        <View style={styles.flexDirection}>
          {!sleep ? (
            <View style={styles.spinnerWrapper}>
              <ActivityIndicator size={32} color="#454545" />
            </View>
          ) : sleep.length ? (
            <>
              <Text style={styles.mainText}>잠을 {sleep.length} 번 잤어요</Text>
              <Text style={styles.subText}>
                마지막 잠든 시간: {formatTime(sleep[0].whenStart.toDate())}{' '}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.mainTextNone}>오늘의 수면 기록이 없음</Text>
              <Text style={styles.subTextNone}>
                마지막 잠든 시간: 등록된 기록 없음
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'column',
  },
  container: {
    height: 335,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginEnd: 20,
  },
  babyInfoContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 15,
  },
  babyPhoto: {
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 64,
    marginRight: 15,
    width: 50,
    height: 50,
  },
  babyInfo: {marginTop: 5},
  babyName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#454545',
  },
  babyBirth: {
    marginTop: 5,
    fontSize: 13,
    color: '#454545',
  },
  box: {
    marginHorizontal: 20,
    marginBottom: 11,
    borderRadius: 10,
    height: 70,
    backgroundColor: '#dbdbdb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 35,
    marginHorizontal: 15,
    height: 35,
  },
  line: {
    height: 55,
    backgroundColor: '#424242',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  mainText: {
    color: '#454545',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subText: {
    color: '#454545',
    fontSize: 12,
    marginTop: 5,
  },
  mainTextNone: {
    color: '#7a7a7a',
    fontSize: 15,
  },
  subTextNone: {
    color: '#7a7a7a',
    fontSize: 12,
    marginTop: 5,
  },
  spinnerWrapper: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center',
  },
});

export default HomeItem;

import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

function HomeItem({width}) {
  return (
    <View style={[styles.container, styles.boxShadow]} width={width}>
      <View style={styles.babyInfoContainer}>
        <Image
          style={styles.babyPhoto}
          source={require('../assets/user.png')}
        />
        <View style={styles.babyInfo}>
          <Text style={styles.babyName}>성이름 (만 n세)</Text>
          <Text style={styles.babyBirth}>D+nnnn nn개월 (nnn주 n일째)</Text>
        </View>
      </View>
      <View style={styles.box} backgroundColor={'rgba(208, 230, 165, 0.6)'}>
        <Image
          style={styles.iconImage}
          source={require('../assets/milk.png')}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.mainText}>밥을 n끼 먹었어요</Text>
          <Text style={styles.subText}>
            마지막 섭취 시간: 오후 n시 nn분 (n시간 전)
          </Text>
        </View>
      </View>
      <View style={styles.box} backgroundColor={'rgba(255, 201, 219, 0.6)'}>
        <Image
          style={styles.iconImage}
          source={require('../assets/diaper.png')}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.mainText}>기저귀를 n번 교체했어요</Text>
          <Text style={styles.subText}>
            마지막 교체 시간: 오후 n시 nn분 (n시간 전)
          </Text>
        </View>
      </View>
      <View style={styles.box} backgroundColor={'rgba(168, 205, 240, 0.6)'}>
        <Image
          style={styles.iconImage}
          source={require('../assets/sleeping.png')}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.mainText}>잠을 n시간 잤어요</Text>
          <Text style={styles.subText}>
            마지막 잠든 시간: 오후 n시 nn분 (n시간 전)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#cdcdcd',
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
    fontSize: 11,
    marginTop: 3,
  },
});

export default HomeItem;

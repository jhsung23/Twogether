import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function BabyProfile({
  name, //이름
  age, //나이
  order,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.babyImageWrapper}>
        <View style={styles.babyImageBackground}>
          <Image
            source={require('../assets/baby.png')}
            resizeMode="cover"
            style={styles.babyImage}
          />
        </View>
        <Text style={styles.babyInfoText}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 100,
    marginEnd: 20,
  },
  babyImageWrapper: {
    width: '100%',
  },
  babyImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    width: '100%',
    borderRadius: 35,
    height: 70,
  },
  babyImage: {
    width: 50,
    height: 50,
  },
  babyInfoText: {
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 15,
  },
});

export default BabyProfile;

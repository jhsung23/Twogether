import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {getUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';

function BabyProfile({
  name, //이름
  age, //나이
  order,
}) {
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.babyProfile}>
          <Image
            source={require('../assets/baby.png')}
            resizeMode="cover"
            style={styles.avatar}
          />
          <Text style={styles.babyName}>
            {name}(만 {age}세)
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  babyProfile: {
    paddingTop: 10,
    paddingBottom: 64,
    marginLeft: 20,
  },
  babyName: {
    marginLeft: 5,
    marginTop: 5,
    color: '#424242',
  },
});

export default BabyProfile;

import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';

function Profile({userId}) {
  const {user} = useUserContext();
  const id = user.id;
  const code = user.code;
  const role = user.role;

  if (!user) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Image
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : require('../assets/user.png')
            }
            resizeMode="cover"
            style={styles.avatar}
          />
          <View style={styles.row}>
            <Text style={styles.role}>{user.role}</Text>
            <Text style={styles.blank}> </Text>
            <Text style={styles.username}>{user.displayName}</Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
    //height: '30%',
  },
  userInfo: {
    paddingTop: 10,
    paddingBottom: 64,
    alignItems: 'center',
  },

  username: {
    paddingTop: 8,
    fontSize: 22,
    color: '#424242',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 96 / 2,
  },
  role: {
    padding: 8,
    fontSize: 18,
    color: '#424242',
    backgroundColor: '#EEF5E4',
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-start',
  },
  blank: {
    width: 10,
  },
});

export default Profile;

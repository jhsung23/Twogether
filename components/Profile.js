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
  //const [user, setUser] = useState(null);
  //const [posts, setPosts] = useState(null);

  const {user} = useUserContext();
  const id = user.id;
  const code = user.code;

  // useEffect(() => {
  //   getUser(userId).then(setUser);
  // }, [userId]);

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
          {/* <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
           */}
          <Image
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : require('../assets/user.png') //response값이 없으면 user.png를 보여줌
            }
            resizeMode="cover"
            style={styles.avatar}
          />

          <Text style={styles.username}>{user.displayName}</Text>
          {/* <Text style={styles.username}>{user.code}</Text> */}
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
    marginTop: 8,
    fontSize: 22,
    color: '#424242',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 96 / 2,
  },
});

export default Profile;

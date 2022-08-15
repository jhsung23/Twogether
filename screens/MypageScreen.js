import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  Pressable,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';
import Clipboard from '@react-native-clipboard/clipboard';
import {signOut} from '../lib/auth';

function MypageScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName} = route.params ?? {};

  const {user} = useUserContext();
  const {setUser} = useUserContext();
  const code = user.code;

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  const copyToClipboard = () => {
    Clipboard.setString(code); //초대코드 복사
    if (Platform.OS === 'android') {
      ToastAndroid.show('초대코드가 복사되었습니다', ToastAndroid.SHORT);
    }
  };

  //임시 로그아웃 기능
  const onLogout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <SafeAreaView style={styles.block}>
      <Profile userId={userId} />

      <View style={styles.bl} />

      <View style={styles.ff}>
        <View>
          <Text style={styles.menuText}>아이</Text>
        </View>
      </View>

      <View style={styles.bl} />
      <View style={styles.ff2}>
        <View>
          <Text style={styles.menuText}>설정</Text>
        </View>
        <View style={styles.bl} />
        <View>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.menuText}>공동 양육자 초대하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bl} />
        <View>
          <Text style={styles.menuText}>알림 설정하기</Text>
        </View>
        <View style={styles.bl} />

        <View>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.menuText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  co: {
    height: '80%',
    //flex: 0.3,
    flexGrow: 0,
    paddingTop: 50,
    //marginHorizontal: 20,
    marginTop: 1,
    backgroundColor: '#f5f5f5',
  },
  ff: {
    flex: 1,
    backgroundColor: 'white',
  },
  ff2: {
    flex: 1.3,
    backgroundColor: 'white',
  },
  bl: {
    flex: 0.01,
    backgroundColor: '#454545',
  },

  menuText: {
    color: '#454545',
    marginTop: 10,
    marginBottom: 10,
    marginStart: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  // blr: { //프로필에 적용해도 소용없음
  //   flex: 5,
  //   backgroundColor: 'white',
  // },
  // cc: {
  //   flex: 0.7,
  //   width: '100%',
  //   height: 0,
  //   justifyContent: 'center',
  //   borderWidth: 2,
  //   borderStyle: 'solid',
  //   // borderStyle: 'dotted'
  //   // borderStyle: 'dashed'
  // },
});

export default MypageScreen;

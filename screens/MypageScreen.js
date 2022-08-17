import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  Image,
  Text,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';
import BabyProfile from '../components/BabyProfile';
import {getBaby} from '../lib/baby';
import events from '../lib/events';
import AddBabyProfile from '../components/AddBabyProfile';

function MypageScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  // eslint-disable-next-line no-unused-vars
  const {userId, displayName} = route.params ?? {};

  const {user} = useUserContext();
  const {setUser} = useUserContext();

  // const id = user.id;
  const name = user.displayName;
  const role = user.role;
  const code = user.code;

  const [babyInfo, setBabyInfo] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  useEffect(() => {});

  //아기 정보 가져오기
  useEffect(() => {
    getBaby({code}).then(setBabyInfo);
    //홈에서 추가한 아기를 마이페이지와 동기화
    events.emit('updateBaby'); //주석해도 결과 동일
  }, [code]);

  const updateBaby = useCallback(() => {
    getBaby({code}).then(setBabyInfo);
  }, [code]);

  useEffect(() => {
    events.addListener('updateBaby', updateBaby);

    return () => {
      events.removeListener('updateBaby', updateBaby);
    };
  }, [updateBaby]);

  const copyToClipboard = () => {
    Clipboard.setString(code); //초대코드 복사
    if (Platform.OS === 'android') {
      ToastAndroid.show('초대코드가 복사되었습니다', ToastAndroid.SHORT);
    }
  };

  //로그아웃
  const onLogout = async () => {
    await signOut();
    setUser(null);
  };

  const renderBabyInfo = ({item}) => {
    return <BabyProfile name={item.name} age={item.age} order={item.order} />;
  };

  return (
    <SafeAreaView style={styles.block}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userImageWrapper}>
          <Image
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : require('../assets/user.png')
            }
            resizeMode="cover"
            style={styles.userImage}
          />
        </View>
        <View style={styles.userNameWrapper}>
          <Text style={styles.userNameText}>{name} 님, 반가워요!</Text>
          <View style={styles.userRoleWrapper}>
            <Text style={styles.userRoleText}>{role}</Text>
          </View>
        </View>
      </View>

      <View style={styles.lightLine} />

      <Text style={styles.title}>아기</Text>
      <FlatList
        data={babyInfo}
        renderItem={renderBabyInfo}
        keyExtractor={item => item.id}
        horizontal={true}
        style={styles.list}
        ListFooterComponent={<AddBabyProfile />}
      />

      <View style={styles.boldLine} />

      <Text style={styles.title}>기타</Text>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text style={styles.menuText}>공동 양육자 초대하기</Text>
      </TouchableOpacity>
      <Text style={styles.menuText}>앱 설정</Text>
      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.menuText}>로그아웃</Text>
      </TouchableOpacity>
      <Text style={styles.menuText}>회원탈퇴</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  menuText: {
    color: '#454545',
    marginStart: 20,
    marginTop: 20,
    fontSize: 18,
  },
  userInfoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 100,
    marginBottom: 10,
  },
  userImageWrapper: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {width: '70%', height: '70%', borderRadius: 100},
  userNameWrapper: {
    width: '70%',
    padding: 10,
    marginTop: 10,
  },
  userNameText: {
    color: '#454545',
    fontSize: 23,
    fontWeight: 'bold',
  },
  userRoleWrapper: {
    marginTop: 10,
    alignSelf: 'baseline',
    paddingHorizontal: 10,
    height: 25,
    backgroundColor: 'rgba(152,196,102,0.5)',
    justifyContent: 'center',
    borderRadius: 10,
  },
  userRoleText: {
    color: 'white',
    fontSize: 17,
  },
  lightLine: {
    height: 2,
    backgroundColor: '#f5f5f5',
  },
  boldLine: {
    height: 13,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
    color: '#454545',
    fontSize: 19,
    marginTop: 20,
    marginStart: 20,
  },
  list: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    // backgroundColor: 'pink',
    flexGrow: 0,
  },
});

export default MypageScreen;

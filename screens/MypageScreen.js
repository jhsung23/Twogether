import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  Text,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';
import Clipboard from '@react-native-clipboard/clipboard';
import {signOut} from '../lib/auth';
import BabyProfile from '../components/BabyProfile';
import {getBaby} from '../lib/baby';
import events from '../lib/events';

function MypageScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName} = route.params ?? {};

  const {user} = useUserContext();
  const {setUser} = useUserContext();
  const code = user.code;

  const [babyInfo, setBabyInfo] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

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

  //임시 로그아웃 기능
  const onLogout = async () => {
    await signOut();
    setUser(null);
  };

  const renderTodayInfo = ({item}) => {
    return <BabyProfile name={item.name} age={item.age} order={item.order} />;
  };

  return (
    <SafeAreaView style={styles.block}>
      <Profile userId={userId} />

      <View style={styles.line} />

      <View style={styles.back1}>
        <View>
          <Text style={styles.menuText}>아이</Text>
          <FlatList
            data={babyInfo}
            renderItem={renderTodayInfo}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          />
        </View>
      </View>

      <View style={styles.line} />
      <View style={styles.back2}>
        <View>
          <Text style={styles.menuText}>설정</Text>
        </View>
        <View style={styles.line} />
        <View>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.menuText}>공동 양육자 초대하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <View>
          <Text style={styles.menuText}>알림 설정하기</Text>
        </View>
        <View style={styles.line} />

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
  back1: {
    flex: 1,
    backgroundColor: 'white',
  },
  back2: {
    flex: 1.3,
    backgroundColor: 'white',
  },
  line: {
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
});

export default MypageScreen;

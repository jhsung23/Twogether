import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  View,
  RefreshControl,
  DevSettings,
  Platform,
  LogBox,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

// eslint-disable-next-line no-unused-vars
import NoticeMsgBox from '../components/NoticeMsgBox';
import HomeItem from '../components/HomeItem';
import HomeItemAdd from '../components/HomeItemAdd';
import NotToDoBox from '../components/NotToDoBox';
import {useUserContext} from '../contexts/UserContext';
import {getBaby} from '../lib/baby';
import {signOut} from '../lib/auth';
import useModal from '../utils/modal';
import BottomSheet from '../components/BottomSheet';
import AddTodo from '../components/AddTodo';

//TODO
//1. Pressable 클릭 시 메시지 스크린으로 이동
//2. 메시지가 온 경우에만 Pressable 컴포넌트 visible

const {width} = Dimensions.get('window');

function HomeScreen() {
  //현재 로그인한 유저 정보를 담은 객체(user)
  const {user} = useUserContext();
  const {setUser} = useUserContext();

  const code = user.code;

  const [babyInfo, setBabyInfo] = useState();
  const [todos, setTodos] = useState([]);
  const babyInfoReady = babyInfo !== null;

  //날짜 표시
  const today = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const time = {
    month: today.getMonth() + 1,
    date: today.getDate(),
    day: week[today.getDay()],
  };

  //일정 관련 Hook
  const [isOpenModal, openModal, closeModal] = useModal();

  const pressAddTodo = () => {
    // setBottomSheetType(label);
    // setIsMenuOpen(false);
    openModal();
  };
  //warning 무시
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  //스플래시 화면이 보이는 동안, 초기 홈화면 셋팅 (아기 정보 가져오기)
  useEffect(() => {
    console.log('home');
    getBaby({code}).then(setBabyInfo);
  }, [code]);

  //아기 정보가 잘 가져와졌다면 스플래시 화면 숨김
  useEffect(() => {
    if (babyInfoReady) {
      SplashScreen.hide();
    }
  }, [babyInfoReady]);

  // 페이지 당기면 reload (새로고침 기능 대체)
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      DevSettings.reload();
      setRefreshing(false);
    });
  }, []);

  //임시 로그아웃 기능
  const onLogout = async () => {
    await signOut();
    setUser(null);
  };

  //화면 구현
  return (
    <SafeAreaView style={styles.block}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.TopContainer}>
          <View>
            <Text style={styles.dateText}>
              {`${time.month}월 ${time.date}일 ${time.day}요일`}
            </Text>
            <Text style={styles.greetText}>
              {`${user.displayName}님 안녕하세요!`}
            </Text>
          </View>

          <Pressable
            style={styles.msgIcon}
            onPress={() => {
              console.log('pressed chat icon'); //구현 필요
              onLogout(); // 임시 로그아웃 조치 -> 후에 삭제
            }}>
            <Icon name={'chatbubbles-outline'} size={30} />
          </Pressable>
        </View>

        {/* <Pressable
          onPress={() => {
            console.log('pressed message alert(notice)'); //구현 필요
          }}>
          <NoticeMsgBox
            color="#f2d46f"
            text="상대방님이 남긴 메시지가 있어요"
          />
        </Pressable> */}

        <Text style={styles.titleText}>이번 주 주요 일정</Text>
        <Pressable
          style={({pressed}) => [
            Platform.OS === 'ios' && {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          android_ripple={{color: '#ededed'}}
          onPress={() => {
            // 일정 추가하기를 누른 경우
            pressAddTodo();
          }}>
          <Text style={styles.addTodoTextButton}>+ 일정 추가하기</Text>
        </Pressable>
        {todos.length ? (
          <FlatList
            style={styles.todoContainer}
            data={todos}
            renderItem={renderTodo}
          />
        ) : (
          <NotToDoBox /> //todo 없는경우
        )}
        <BottomSheet
          modalVisible={isOpenModal}
          onClose={closeModal}
          addTodo={true}>
          <AddTodo onSubmit={closeModal} todos={todos} setTodos={setTodos} />
        </BottomSheet>

        <Text style={styles.titleText}>오늘 우리 아가는</Text>
        <FlatList
          style={styles.list}
          data={babyInfo}
          renderItem={renderTodayInfo}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ListFooterComponent={<HomeItemAdd width={width - 200} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const renderTodo = ({item}) => {
  return (
    <BouncyCheckbox
      marginTop={15}
      marginStart={25}
      size={20}
      fillColor="#e8cb6b"
      unfillColor="#ffffff"
      text={item}
      iconInnerStyle={styles.borderWidth}
      onPress={isChecked => {}}
    />
  );
};
const renderTodayInfo = ({item}) => {
  return (
    <HomeItem
      width={width - 50}
      name={item.name}
      birthYear={item.birthYear}
      birthMonth={item.birthMonth}
      birthDay={item.birthDay}
      daysAfterBirth={item.daysAfterBirth}
      monthsAfterBirth={item.monthsAfterBirth}
      age={item.age}
      order={item.order}
    />
  );
};

const styles = StyleSheet.create({
  borderWidth: {
    borderWidth: 1,
  },
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  TopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  dateText: {
    color: '#929292',
    fontSize: 15,
    marginStart: 20,
    marginTop: 15,
  },
  greetText: {
    color: '#454545',
    fontSize: 25,
    marginStart: 20,
    marginTop: 5,
    fontWeight: 'bold',
  },
  titleText: {
    color: '#454545',
    marginTop: 25,
    marginStart: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  msgIcon: {
    marginEnd: 20,
    marginTop: 30,
  },
  list: {
    paddingTop: 15,
    paddingStart: 20,
    paddingEnd: 15,
    paddingBottom: 35,
  },
  todoContainer: {
    flexGrow: 0,
    borderRadius: 10,
    paddingBottom: 15,
    marginBottom: 5,
    marginHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  addTodoTextButton: {
    alignSelf: 'flex-end',
    fontSize: 12,
    marginEnd: 20,
    marginBottom: 2,
    color: '#7d7d7d',
  },
});

export default HomeScreen;

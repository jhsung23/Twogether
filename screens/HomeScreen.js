import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';

// eslint-disable-next-line no-unused-vars
import NoticeMsgBox from '../components/NoticeMsgBox';
import HomeItem from '../components/HomeItem';
import HomeItemAdd from '../components/HomeItemAdd';
import NotToDoBox from '../components/NotToDoBox';
import {useUserContext} from '../contexts/UserContext';
import {getSummary} from '../lib/summary';

//TODO
//1. Pressable 클릭 시 메시지 스크린으로 이동
//2. 메시지가 온 경우에만 Pressable 컴포넌트 visible

const {width} = Dimensions.get('window');

function HomeScreen() {
  //현재 로그인한 유저 정보를 담은 객체(user)
  const {user} = useUserContext();

  const [babyInfo, setBabyInfo] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [todos, setTodos] = useState('dd');

  //날짜 표시
  const today = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const time = {
    month: today.getMonth() + 1,
    date: today.getDate(),
    day: week[today.getDay()],
  };

  useEffect(() => {
    const code = user.id;
    getSummary({code}).then(setBabyInfo);
  }, [user.id]);

  return (
    <SafeAreaView style={styles.block}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
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
        {todos ? (
          <FlatList
            style={styles.todoContainer}
            data={todos}
            renderItem={renderTodo}
          />
        ) : (
          <NotToDoBox /> //todo 없는경우
        )}

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

        <Text style={styles.titleText}>타이틀 또 어떤거 넣지</Text>
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
      text="임시 투두 임시 투두"
      iconInnerStyle={styles.borderWidth}
      onPress={isChecked => {}}
    />
  );
};
const renderTodayInfo = ({item}) => {
  return (
    <HomeItem
      width={width - 50}
      id={item.id}
      name={item.name}
      birthYear={item.birthYear}
      birthMonth={item.birthMonth}
      birthDay={item.birthDay}
      daysAfterBirth={item.daysAfterBirth}
      monthsAfterBirth={item.monthsAfterBirth}
      age={item.age}
      order={item.order}
      eatCount={item.eatCount}
      sleepCount={item.sleepCount}
      toiletCount={item.toiletCount}
      lastEatTime={item.lastEatTime}
      lastSleepTime={item.lastSleepTime}
      lastToiletTime={item.lastToiletTime}
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
    marginTop: 40,
    marginStart: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
    fontSize: 20,
  },
  msgIcon: {marginEnd: 20, marginTop: 30},
  list: {
    // flex: 1,
    paddingTop: 15,
    paddingStart: 20,
    paddingEnd: 15,
    paddingBottom: 35,
    // backgroundColor: '#424242',
  },
  todoContainer: {
    flexGrow: 0,
    borderRadius: 10,
    paddingBottom: 15,
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;

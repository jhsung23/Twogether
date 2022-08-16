import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {FloatingMenu} from 'react-native-floating-action-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarStrip from 'react-native-calendar-strip';
import {Chip} from 'react-native-paper';

import BottomSheet from '../components/BottomSheet';
import useModal from '../utils/modal';
import EatingRecord from '../components/recordSheets/EatRecord';
import SleepRecord from '../components/recordSheets/SleepRecord';
import ToiletRecord from '../components/recordSheets/ToiletRecord';
import HealthRecord from '../components/recordSheets/HealthRecord';
import EtcRecord from '../components/recordSheets/EtcRecord';
import {formatDate} from '../utils/date';
import {useUserContext} from '../contexts/UserContext';
import {getBabyOrder} from '../lib/baby';
import {getAllRecordWithDate} from '../lib/records';
import RecordItem from '../components/RecordItem';
import events from '../lib/events';

const orderKor = [{1: '첫째'}, {2: '둘째'}, {3: '셋째'}, {4: '넷째'}];

function RecordScreen() {
  const {user} = useUserContext();
  const code = user.code;

  const [category, setCategory] = useState([]);
  const [selectedChip, setSelectedChip] = useState('1');
  const [order, setOrder] = useState('1'); //기본값은 첫째
  const [selectedDate, setSelectedDate] = useState(new Date()); //기본값은 오늘 날짜
  const [fullData, setFullData] = useState();

  useEffect(() => {
    const date = formatDate(selectedDate);
    getAllRecordWithDate({code, order, date}).then(setFullData);
  }, [code, order, selectedDate]);

  useEffect(() => {
    console.log('chip setting');
    getBabyOrder({code}).then(setCategory);
  }, [code]);

  const updateBaby = useCallback(() => {
    getBabyOrder({code}).then(setCategory);
  }, [code]);

  useEffect(() => {
    events.addListener('updateBaby', updateBaby);

    return () => {
      events.removeListener('updateBaby', updateBaby);
    };
  }, [updateBaby]);

  const updateFullData = useCallback(() => {
    const date = formatDate(selectedDate);
    getAllRecordWithDate({code, order, date}).then(setFullData);
  }, [code, order, selectedDate]);

  useEffect(() => {
    events.addListener('recordScreenUpdate', updateFullData);

    return () => {
      events.removeListener('recordScreenUpdate', updateFullData);
    };
  }, [updateFullData]);

  //기록 작성 관련 모달
  const [isOpenModal, openModal, closeModal] = useModal();
  const [bottomSheetType, setBottomSheetType] = useState('');
  const pressButton = ({label}, index) => {
    setBottomSheetType(label);
    setIsMenuOpen(false);
    openModal();
  };

  //fAB items
  const items = [
    {
      label: '기타 활동 기록',
      image: require('../assets/etc.png'),
      onPress: pressButton,
    },
    {
      label: '병원 방문 기록',
      image: require('../assets/hospital.png'),
      onPress: pressButton,
    },
    {
      label: '수면 기록',
      image: require('../assets/sleeping.png'),
      onPress: pressButton,
    },
    {
      label: '배변 기록',
      image: require('../assets/diaper.png'),
      onPress: pressButton,
    },
    {
      label: '섭취 기록',
      image: require('../assets/milk.png'),
      onPress: pressButton,
    },
  ];

  //FAB render 관련
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const renderItemIcon = ({image}) =>
    image && <Image style={styles.image} source={image} resizeMode="contain" />;

  //screen rendering
  return (
    <View style={styles.block}>
      <CalendarStrip
        scrollable
        style={styles.calendar}
        selectedDate={selectedDate}
        onDateSelected={date => {
          setSelectedDate(date.toDate());
          console.log(formatDate(date.toDate()));
        }}
        calendarColor={'#ffffff'}
        calendarHeaderStyle={styles.textColor}
        dateNumberStyle={styles.textColor}
        dateNameStyle={styles.textColor}
        highlightDateContainerStyle={styles.selectedDateContainer}
      />

      <View style={styles.chipWrapper}>
        <Text style={styles.categoryText}>아기 구분</Text>
        {category.map(({id}) => (
          <Chip
            key={id}
            style={styles.chip}
            textStyle={styles.chipText}
            height={30}
            icon={id === selectedChip ? 'check' : null}
            selected={id === selectedChip}
            onPress={() => {
              if (id === selectedChip) {
                setSelectedChip(null);
              } else {
                setSelectedChip(id);
                setOrder(id + '');
              }
            }}>
            {orderKor[parseInt(id, 10) - 1][id]}
          </Chip>
        ))}
      </View>

      {!fullData ? (
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size={32} color="#454545" />
        </View>
      ) : fullData.length === 0 ? (
        <View style={styles.noneView}>
          <Image
            style={styles.noneImage}
            source={require('../assets/box.png')}
          />
          <Text style={styles.noneText}>
            해당 날짜에{'\n'}기록한 내용이 없습니다
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={fullData}
          renderItem={renderItem}
          keyExtractor={({id, type}) => `${type}-${id}`}
        />
      )}

      <FloatingMenu
        items={items}
        isOpen={isMenuOpen}
        onMenuToggle={value => setIsMenuOpen(value)}
        primaryColor="#98c466"
        backgroundUpColor="#98c466"
        backgroundDownColor="rgba(152,196,102,0.6)"
        iconColor="white"
        innerWidth={50}
        right={25}
        bottom={25}
        renderMenuIcon={() => <Icon name="mode-edit" size={24} color="white" />}
        renderItemIcon={renderItemIcon}
      />
      <BottomSheet modalVisible={isOpenModal} onClose={closeModal}>
        {bottomSheetType === '기타 활동 기록' && (
          <EtcRecord order={order} onSubmit={closeModal} />
        )}
        {bottomSheetType === '병원 방문 기록' && (
          <HealthRecord order={order} onSubmit={closeModal} />
        )}
        {bottomSheetType === '수면 기록' && (
          <SleepRecord order={order} onSubmit={closeModal} />
        )}
        {bottomSheetType === '배변 기록' && (
          <ToiletRecord order={order} onSubmit={closeModal} />
        )}
        {bottomSheetType === '섭취 기록' && (
          <EatingRecord order={order} onSubmit={closeModal} />
        )}
      </BottomSheet>
    </View>
  );
}

const renderItem = ({item}) => {
  const {type, how, memo, what, when, whenEnd, diff} = item;
  console.log('RecordItem', item);

  return (
    <RecordItem
      type={type}
      how={how}
      memo={memo}
      what={what}
      when={when}
      whenEnd={whenEnd}
      diff={diff}
    />
  );
};

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  image: {width: 32, height: 32},
  calendar: {
    height: 80,
    paddingTop: 15,
    paddingBottom: 10,
  },
  textColor: {color: '#454545'},
  noneView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noneText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#b0b0b0',
  },
  noneImage: {
    width: 80,
    height: 80,
  },
  categoryText: {fontSize: 15, marginStart: 20, marginEnd: 10},
  chipWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  chip: {
    marginEnd: 5,
    justifyContent: 'center',
    backgroundColor: 'rgba(152,196,102,0.25)',
  },
  chipText: {
    color: '#454545',
    fontSize: 15,
  },
  selectedDateContainer: {
    // height: 40,
    // width: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(152,196,102,0.25)',
  },
  spinnerWrapper: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center',
  },
});

export default RecordScreen;

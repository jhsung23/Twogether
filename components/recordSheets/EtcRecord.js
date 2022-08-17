import React, {useState, useCallback} from 'react';
import {
  View,
  Platform,
  Pressable,
  TextInput,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Chip} from 'react-native-paper';

import {updateBadgeAchieve, getBadgeAchieveState} from '../../lib/badge';
import DatePickerModal from '../../shareComponents/DatePickerModal';
import {useUserContext} from '../../contexts/UserContext';
import {createEtcRecord} from '../../lib/records';
import events from '../../lib/events';
import {createCount} from '../../lib/statistics';

const categoryChips = [
  {id: 1, content: '체험'},
  {id: 2, content: '학습'},
  {id: 3, content: '신체활동'},
  {id: 4, content: '소풍'},
];

const category = {
  1: '체험',
  2: '학습',
  3: '신체활동',
  4: '소풍',
};

const badgeNumber = {
  1: '5',
  2: '8',
  3: '9',
  4: '10',
};

function EtcRecord({order, onSubmit}) {
  const {user} = useUserContext();

  const [selectedCategory, setSelectedCategory] = useState(null); //what
  const [startDate, setStartDate] = useState(new Date()); //when Start
  const [endDate, setEndDate] = useState(new Date()); //whenEnd
  const [memo, setMemo] = useState(''); //memo

  const timeDiff = Math.round(((endDate - startDate) % 86400000) / 3600000);

  const submit = useCallback(async () => {
    onSubmit();

    const id = user.id;
    const code = user.code;
    const writer = user.photoURL;
    const what = category[selectedCategory];
    const diff = timeDiff;

    await createEtcRecord({
      code,
      order,
      writer,
      what,
      startDate,
      endDate,
      diff,
      memo,
    }).catch(error => {
      console.log(error.message);
    });

    await createCount({code, id}).catch(error => {
      console.log(error.message);
    });

    const state = await getBadgeAchieveState({
      id,
      badgeNumber: badgeNumber[selectedCategory],
    });

    if (!state.achieve) {
      Alert.alert(
        '🎉축하합니다!🎉',
        '\n배지를 획득하였습니다.\n배지 탭에서 확인해보세요.',
        [{text: '확인', onPress: () => {}, style: 'cancel'}],
      );
    }

    await updateBadgeAchieve({
      id,
      badgeNumber: badgeNumber[selectedCategory],
    }).catch(error => {
      console.log(error.message);
    });

    events.emit('badgeUpdate');
    events.emit('recordScreenUpdate');
    events.emit('statisticsBadgeUpdate');
  }, [
    onSubmit,
    user.id,
    user.code,
    user.photoURL,
    selectedCategory,
    timeDiff,
    order,
    startDate,
    endDate,
    memo,
  ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>활동 기록</Text>
          <Pressable
            style={({pressed}) => [
              Platform.OS === 'ios' && {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            android_ripple={{color: '#ededed'}}
            onPress={() => {
              submit();
            }}>
            <Icon name="done" size={29} color={'#2dad3c'} />
          </Pressable>
        </View>

        <Text style={styles.itemTitle}>어떤 활동이었나요?</Text>
        <View style={styles.chipWrapper}>
          {categoryChips.map(({id, content}) => (
            <Chip
              key={id}
              style={styles.chip}
              textStyle={styles.chipText}
              height={30}
              icon={id === selectedCategory ? 'check' : null}
              // showSelectedOverlay={id === selected}
              selected={id === selectedCategory}
              onPress={() => {
                if (id === selectedCategory) {
                  setSelectedCategory(null);
                } else {
                  setSelectedCategory(id);
                }
              }}>
              {content}
            </Chip>
          ))}
        </View>

        <Text style={styles.itemTitle}>활동한 시간은 언제인가요?</Text>
        <View style={styles.startTimeViewWrapper}>
          <Text style={styles.itemText}>시작 시간</Text>
          <View style={styles.itemChipWrapper}>
            <DatePickerModal date={startDate} onClick={setStartDate} />
          </View>
          <Text style={styles.itemText}>부터</Text>
        </View>
        <View style={styles.endTimeViewWrapper}>
          <Text style={styles.itemText}>종료 시간</Text>
          <View style={styles.itemChipWrapper}>
            <DatePickerModal date={endDate} onClick={setEndDate} />
          </View>
          <Text style={styles.itemText}>까지</Text>
          <Text
            style={[
              styles.itemText,
              // eslint-disable-next-line react-native/no-inline-styles
              {marginStart: 10},
            ]}>{`( 약 ${timeDiff} 시간 )`}</Text>
        </View>

        <Text style={styles.itemTitle}>활동에 대해 적어주세요.</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="이런 활동을 했어요"
          textAlignVertical="top"
          value={memo}
          onChangeText={setMemo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sheetTitle: {
    color: '#454545',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitle: {
    color: '#454545',
    fontSize: 18,
  },
  itemText: {
    color: '#454545',
    fontSize: 15,
  },
  itemChipWrapper: {
    marginHorizontal: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  chipWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 25,
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
  startTimeViewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  endTimeViewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    backgroundColor: 'rgba(152,196,102,0.25)',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#424242',
  },
  input: {
    marginTop: 10,
    minHeight: 150,
    maxHeight: 150,
    borderRadius: 10,
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
    paddingBottom: 10,
    fontSize: 15,
    backgroundColor: '#f5f5f5',
  },
});

export default EtcRecord;

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
import {createHealthRecord} from '../../lib/records';
import DatePickerModal from '../../shareComponents/DatePickerModal';
import {useUserContext} from '../../contexts/UserContext';
import events from '../../lib/events';
import {createCount} from '../../lib/statistics';

const categoryChips = [
  {id: 1, content: '외래진료'},
  {id: 2, content: '검진'},
  {id: 3, content: '예방접종'},
  {id: 4, content: '기타'},
];

const category = {
  1: '외래진료',
  2: '검진',
  3: '예방접종',
  4: '기타',
};

function HealthRecord({order, onSubmit}) {
  const {user} = useUserContext();

  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [date, setDate] = useState(new Date()); //언제 다녀왔는지 when
  const [memo, setMemo] = useState(''); //기타 특이사항 memo

  const submit = useCallback(async () => {
    onSubmit(); //close modal

    const id = user.id; //uid
    const code = user.code; //공유 코드
    const writer = user.photoURL;
    const what = category[selectedCategory];

    await createHealthRecord({
      code,
      order,
      writer,
      height,
      weight,
      what,
      date,
      memo,
    }).catch(error => {
      console.log(error.message);
    });

    await createCount({code, id}).catch(error => {
      console.log(error.message);
    });

    const state = await getBadgeAchieveState({id, badgeNumber: 7});

    if (!state.achieve) {
      Alert.alert(
        '🎉축하합니다!🎉',
        '\n배지를 획득하였습니다.\n배지 탭에서 확인해보세요.',
        [{text: '확인', onPress: () => {}, style: 'cancel'}],
      );
    }

    await updateBadgeAchieve({id, badgeNumber: 7}).catch(error => {
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
    order,
    height,
    weight,
    date,
    memo,
  ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>병원 방문 기록</Text>
          <Pressable //체크 버튼
            style={({pressed}) => [
              Platform.OS === 'ios' && {
                opacity: pressed ? 0.6 : 1,
              },
            ]}
            android_ripple={{color: '#ededed'}}
            onPress={() => {
              submit(); //close modal
            }}>
            <Icon name="done" size={29} color={'#2dad3c'} />
          </Pressable>
        </View>

        <Text style={styles.itemTitle}>키와 몸무게를 적어주세요.</Text>
        <View style={styles.wrapper}>
          <>
            <TextInput
              style={styles.inputt}
              placeholder="키"
              placeholderTextColor="#919191"
              value={height}
              onChangeText={setHeight}
            />
            <Text style={styles.unitText}>cm</Text>
            <TextInput
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.inputt, {marginStart: 20}]}
              placeholder="몸무게"
              placeholderTextColor="#919191"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <Text style={styles.unitText}>kg</Text>
          </>
        </View>

        <Text style={styles.itemTitle}>병원 방문 목적이 무엇인가요?</Text>
        <View style={styles.chipWrapper}>
          {categoryChips.map(({id, content}) => (
            <Chip
              key={id}
              style={styles.chip}
              textStyle={styles.chipText}
              height={30}
              icon={id === selectedCategory ? 'check' : null}
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

        <Text style={styles.itemTitle}>언제 다녀왔나요?</Text>
        <View style={styles.chipWrapper}>
          <DatePickerModal date={date} onClick={setDate} />
        </View>

        <Text style={styles.itemTitle}>특이사항이 있나요?</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="특이사항을 남겨보세요"
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
    minHeight: 90,
    maxHeight: 130,
    borderRadius: 10,
    paddingStart: 10,
    paddingTop: 10,
    paddingEnd: 10,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  wrapper: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  inputt: {
    borderColor: '#F3F3F3',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    height: 40,
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    marginBottom: 25,
  },
  unitText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#454545',
    paddingBottom: 7,
  },
});

export default HealthRecord;

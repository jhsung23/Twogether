import React, {useState, useCallback} from 'react';
import {
  View,
  Platform,
  Pressable,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Chip} from 'react-native-paper';

import {createEatRecord} from '../../lib/records';
import DatePickerModal from '../../shareComponents/DatePickerModal';
import {useUserContext} from '../../contexts/UserContext';

const foodChips = [
  {id: 1, content: '모유'},
  {id: 2, content: '분유'},
  {id: 3, content: '이유식'},
  {id: 4, content: '미음'},
  {id: 5, content: '기타'},
];

const food = {
  1: '모유',
  2: '분유',
  3: '이유식',
  4: '미음',
  5: '기타',
};

const volChips = [
  {id: 1, content: '양 적음'},
  {id: 2, content: '양 적당'},
  {id: 3, content: '양 많음'},
];

const vol = {
  1: '양 적음',
  2: '양 적당',
  3: '양 많음',
};

function EatingRecord({order, onSubmit}) {
  const {user} = useUserContext();

  const [selectedFood, setSelectedFood] = useState(null); //무엇을 먹었는지 what
  const [selectedVol, setSelectedVol] = useState(null); //얼마나 먹었는지 how
  const [date, setDate] = useState(new Date()); //언제 먹었는지 when
  const [memo, setMemo] = useState(''); //기타 특이사항 memo

  const submit = useCallback(async () => {
    onSubmit(); //close modal

    const code = user.id; //공유 코드
    const writer = user.displayName;
    const what = food[selectedFood];
    const how = vol[selectedVol];

    await createEatRecord({
      code,
      order,
      writer,
      what,
      how,
      date,
      memo,
    }).catch(error => {
      console.log(error.message);
    });
  }, [
    onSubmit,
    order,
    user.id,
    user.displayName,
    selectedFood,
    selectedVol,
    date,
    memo,
  ]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.sheetWrapper}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      {/* <> */}
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>섭취 기록</Text>
        <Pressable //체크 버튼
          style={({pressed}) => [
            Platform.OS === 'ios' && {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          android_ripple={{color: '#ededed'}}
          onPress={() => {
            submit(); //저장하기 함수
          }}>
          <Icon name="done" size={29} color={'#2dad3c'} />
        </Pressable>
      </View>

      <Text style={styles.itemTitle}>무엇을 먹었나요?</Text>
      <View style={styles.chipWrapper}>
        {foodChips.map(({id, content}) => (
          <Chip
            key={id}
            style={styles.chip}
            textStyle={styles.chipText}
            height={30}
            icon={id === selectedFood ? 'check' : null}
            selected={id === selectedFood}
            onPress={() => {
              if (id === selectedFood) {
                setSelectedFood(null);
              } else {
                setSelectedFood(id);
              }
            }}>
            {content}
          </Chip>
        ))}
      </View>

      <Text style={styles.itemTitle}>얼마나 먹었나요?</Text>
      <View style={styles.chipWrapper}>
        {volChips.map(({id, content}) => (
          <Chip
            key={id}
            style={styles.chip}
            textStyle={styles.chipText}
            height={30}
            icon={id === selectedVol ? 'check' : null}
            selected={id === selectedVol}
            onPress={() => {
              if (id === selectedVol) {
                setSelectedVol(null);
              } else {
                setSelectedVol(id);
              }
            }}>
            {content}
          </Chip>
        ))}
      </View>

      <Text style={styles.itemTitle}>언제 먹었나요?</Text>
      <View style={styles.chipWrapper}>
        <DatePickerModal date={date} onClick={setDate} />
      </View>

      <Text style={styles.itemTitle}>기타 특이사항이 있나요?</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="특이사항을 남겨보세요"
        textAlignVertical="top"
        value={memo}
        onChangeText={setMemo}
      />
      {/* </> */}
      {/* /      // </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
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
});

export default EatingRecord;

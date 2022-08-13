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

import DatePickerModal from '../../shareComponents/DatePickerModal';
import {useUserContext} from '../../contexts/UserContext';
import {createToiletRecord} from '../../lib/records';

const categoryChips = [
  {id: 1, content: '소변'},
  {id: 2, content: '대변'},
];

const category = {
  1: '소변',
  2: '대변',
};

const volChips = [
  {id: 1, content: '적음'},
  {id: 2, content: '보통'},
  {id: 3, content: '많음'},
];

const vol = {
  1: '적음',
  2: '보통',
  3: '많음',
};

function ToiletRecord({order, onSubmit}) {
  const {user} = useUserContext();

  const [selectedCategory, setSelectedCategory] = useState(null); //what
  const [selectedVol, setSelectedVol] = useState(null); //how
  const [date, setDate] = useState(new Date()); //when
  const [memo, setMemo] = useState(''); //memo

  const submit = useCallback(async () => {
    onSubmit(); //close modal

    const code = user.code;
    const writer = user.displayName;
    const what = category[selectedCategory];
    const how = vol[selectedVol];

    await createToiletRecord({
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
    user.code,
    user.displayName,
    selectedCategory,
    selectedVol,
    date,
    memo,
  ]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.sheetWrapper}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      {/* <> */}
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>배변 기록</Text>
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

      <Text style={styles.itemTitle}>무엇에 대한 기록인가요?</Text>
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

      <Text style={styles.itemTitle}>양은 얼마나 되나요?</Text>
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

      <Text style={styles.itemTitle}>기저귀를 교체한 시간은 언제인가요?</Text>
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

export default ToiletRecord;

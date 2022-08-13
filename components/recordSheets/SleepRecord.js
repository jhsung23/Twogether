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

import {useUserContext} from '../../contexts/UserContext';
import DatePickerModal from '../../shareComponents/DatePickerModal';
import {createSleepRecord} from '../../lib/records';

const categoryChips = [
  {id: 1, content: '낮잠'},
  {id: 2, content: '밤잠'},
];

const category = {
  1: '낮잠',
  2: '밤잠',
};

function SleepRecord({order, onSubmit}) {
  const {user} = useUserContext();

  const [selectedCategory, setSelectedCategory] = useState(null); //what
  const [startDate, setStartDate] = useState(new Date()); //whenStart
  const [endDate, setEndDate] = useState(new Date()); //whenEnd
  const [memo, setMemo] = useState(''); //memo

  const timeDiff = Math.ceil(((endDate - startDate) % 86400000) / 3600000);

  const submit = useCallback(async () => {
    onSubmit();

    const code = user.code; //공유 코드
    const writer = user.displayName;
    const what = category[selectedCategory];

    await createSleepRecord({
      code,
      order,
      writer,
      what,
      startDate,
      endDate,
      memo,
    });
  }, [
    onSubmit,
    order,
    user.code,
    user.displayName,
    selectedCategory,
    startDate,
    endDate,
    memo,
  ]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.sheetWrapper}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      {/* <> */}
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>수면 기록</Text>
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

      <Text style={styles.itemTitle}>언제 잔 잠인가요?</Text>
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

      <Text style={styles.itemTitle}>언제부터 언제까지 잠을 잤나요?</Text>
      <View style={styles.startTimeViewWrapper}>
        <Text style={styles.itemText}>잠든 시간</Text>
        <View style={styles.itemChipWrapper}>
          <DatePickerModal date={startDate} onClick={setStartDate} />
        </View>
        <Text style={styles.itemText}>부터</Text>
      </View>
      <View style={styles.endTimeViewWrapper}>
        <Text style={styles.itemText}>잠깬 시간</Text>
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

export default SleepRecord;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Platform,
  Pressable,
  useWindowDimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  DismissKeyboardView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Chip} from 'react-native-paper';

import DatePickerModal from '../../shareComponents/DatePickerModal';

function SleepRecord() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [memo, setMemo] = useState('');

  const categoryChips = [
    {id: 1, content: '낮잠'},
    {id: 2, content: '밤잠'},
  ];

  const timeDiff = Math.ceil(((endDate - startDate) % 86400000) / 3600000);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.sheetWrapper}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      {/* <> */}
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>수면 기록</Text>
        <Pressable
          style={({pressed}) => [
            // styles.button,
            Platform.OS === 'ios' && {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={() =>
            console.log('저장 완료 구현 필요!!!!!!!! check pressed')
          }>
          <Icon name="done" size={29} color={'#2dad3c'} />
        </Pressable>
      </View>

      <Text style={styles.itemTitle}>언제 잔 잠인가요?</Text>
      <View style={styles.chipWrapper}>
        {categoryChips.map(({id, content}) => (
          <Chip
            key={id}
            style={styles.chip}
            textStyle={{color: '#454545', fontSize: 15}}
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

      <Text style={styles.itemTitle}>언제부터 언제까지 잠을 잤나요?</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={styles.itemText}>잠든 시간</Text>
        <View style={styles.itemChipWrapper}>
          <DatePickerModal date={startDate} onClick={setStartDate} />
        </View>
        <Text style={styles.itemText}>부터</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          marginBottom: 20,
        }}>
        <Text style={styles.itemText}>잠깬 시간</Text>
        <View style={styles.itemChipWrapper}>
          <DatePickerModal date={endDate} onClick={setEndDate} />
        </View>
        <Text style={styles.itemText}>까지</Text>
        <Text
          style={[
            styles.itemText,
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
    // backgroundColor: 'lightblue',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    // backgroundColor: 'lightgrey',
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

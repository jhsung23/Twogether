import React, {useState} from 'react';
import {View, Platform, Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Chip} from 'react-native-paper';

import DatePickerModal from '../../shareComponents/DatePickerModal';

function HealthRecord() {
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(new Date());

  const chips = [
    {id: 1, content: '모유'},
    {id: 2, content: '분유'},
    {id: 3, content: '이유식'},
    {id: 4, content: '미음'},
    {id: 5, content: '기타'},
  ];

  return (
    <View style={styles.sheetWrapper}>
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>섭취 기록</Text>
        <Pressable
          style={({pressed}) => [
            styles.button,
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
      <Text style={styles.itemTitle}>무엇을 먹었나요?</Text>
      <View style={styles.chipWrapper}>
        {chips.map(({id, content}) => (
          <Chip
            key={id}
            style={styles.chip}
            textStyle={{color: '#454545', fontSize: 15}}
            height={30}
            icon={id === selected ? 'check' : null}
            showSelectedOverlay={id === selected}
            selected={id === selected}
            onPress={() => {
              if (id === selected) {
                setSelected(null);
              } else {
                setSelected(id);
              }
            }}>
            {content}
          </Chip>
        ))}
      </View>
      <Text style={styles.itemTitle}>얼마나 먹었나요?</Text>
      <Text style={styles.itemTitle}>언제 먹었나요?</Text>
      <View></View>
      <DatePickerModal date={date} onClick={setDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  sheetWrapper: {
    flexWrap: 'wrap',
    padding: 30,
    flex: 1,
    justifyContent: 'flex-start',
  },
  sheetHeader: {
    height: 30,
    flexDirection: 'row',
    // backgroundColor: '#585858',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sheetTitle: {
    fontSize: 18,
    color: '#454545',
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 18,
    // flexBasis: 'auto',
    // backgroundColor: '#424242',
    color: '#454545',
  },
  chipWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 25,
  },
  chip: {
    backgroundColor: 'rgba(152,196,102,0.25)',
    marginEnd: 5,
    flexWrap: 'wrap',
  },
});

export default HealthRecord;

import React, {useState} from 'react';
import {Platform, StyleSheet, Pressable, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {formatTime} from '../utils/date';

export default ({date, onClick}) => {
  const [open, setOpen] = useState(false);
  const dateStr = formatTime(date);

  return (
    <>
      <Pressable
        style={({pressed}) => [
          styles.pressable,
          Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        onPress={() => setOpen(true)}>
        <Text style={styles.text}>{dateStr}</Text>
      </Pressable>
      <DatePicker
        modal
        open={open}
        mode="time"
        date={date}
        confirmText="선택 완료"
        cancelText="취소"
        onConfirm={selectedDate => {
          setOpen(false);
          onClick(selectedDate);
          console.log(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: 'rgba(152,196,102,0.25)',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  text: {
    color: '#454545',
    fontSize: 15,
  },
});

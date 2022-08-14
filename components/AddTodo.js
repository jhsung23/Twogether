import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';

import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';

function AddTodo({onSubmit, todos, setTodos}) {
  //   const {user} = useUserContext();
  const [data, setData] = useState('');

  const submit = () => {
    onSubmit(); //close modal
    setTodos([...todos, data]);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.sheetWrapper}>
      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>일정 추가하기</Text>
      </View>
      <BorderedInput
        placeholder="일정을 입력하세요."
        onChangeText={setData}
        value={data}
        onSubmitEditing={onSubmit}
        returnKeyType="next"
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{marginBottom: 10}} />
      <CustomButton title="등록" onPress={submit} />
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
    marginBottom: 5,
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

export default AddTodo;

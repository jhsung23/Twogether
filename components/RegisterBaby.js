import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useUserContext} from '../contexts/UserContext';
import {createBaby} from '../lib/baby';
import events from '../lib/events';
import CustomButton from './CustomButton';

function RegisterBaby({onSubmit, babyForm, onChange, additional}) {
  const {user} = useUserContext();

  const [baby, setBaby] = useState({
    name: '',
    order: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    height: '',
    weight: '',
  });

  const updateBabyForm = (key, value) => {
    value = value + '';
    setBaby({...baby, [key]: value});
  };

  const submit = async () => {
    onSubmit(); //modal 닫기

    const code = user.code;

    await createBaby({code, babyForm: baby});

    events.emit('updateBaby');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}>
      <View style={styles.block}>
        {additional ? (
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>아기 정보 등록</Text>
          </View>
        ) : (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={{margin: 5}} />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 350}
          behavior={'padding'}>
          <View style={styles.wrapper}>
            <>
              <TextInput
                style={styles.input}
                placeholder="아기 이름"
                placeholderTextColor="#919191"
                value={baby.name}
                onChangeText={value => {
                  updateBabyForm('name', value);
                  onChange ? onChange('name', value) : null;
                }}
              />
              <TextInput
                // eslint-disable-next-line react-native/no-inline-styles
                style={[styles.input, {marginStart: 20}]}
                placeholder="몇째인가요?"
                placeholderTextColor="#919191"
                keyboardType="numeric"
                value={baby.order}
                onChangeText={value => {
                  updateBabyForm('order', value);
                  onChange ? onChange('order', value) : null;
                }}
              />
              <Text style={styles.unitText}>째</Text>
            </>
          </View>

          <View style={styles.wrapper}>
            <>
              <TextInput
                style={styles.input}
                placeholder="생년"
                placeholderTextColor="#919191"
                keyboardType="numeric"
                value={baby.birthYear}
                onChangeText={value => {
                  updateBabyForm('birthYear', value);
                  onChange ? onChange('birthYear', value) : null;
                }}
              />
              <Text style={styles.unitText}>년</Text>
            </>
            <>
              <TextInput
                style={styles.input}
                placeholder="생월"
                placeholderTextColor="#919191"
                keyboardType="numeric"
                value={baby.birthMonth}
                onChangeText={value => {
                  updateBabyForm('birthMonth', value);
                  onChange ? onChange('birthMonth', value) : null;
                }}
              />
              <Text style={styles.unitText}>월</Text>
            </>
            <>
              <TextInput
                style={styles.input}
                placeholder="생일"
                placeholderTextColor="#919191"
                keyboardType="numeric"
                value={baby.birthDay}
                onChangeText={value => {
                  updateBabyForm('birthDay', value);
                  onChange ? onChange('birthDay', value) : null;
                }}
              />
              <Text style={styles.unitText}>일</Text>
            </>
          </View>
          <View style={styles.wrapper}>
            <>
              <TextInput
                style={styles.input}
                placeholder="키"
                placeholderTextColor="#919191"
                keyboardType="numeric"
                value={baby.height}
                onChangeText={value => {
                  updateBabyForm('height', value);
                  onChange ? onChange('height', value) : null;
                }}
              />
              <Text style={styles.unitText}>cm</Text>
            </>
            <>
              <TextInput
                style={styles.input}
                placeholder="몸무게"
                placeholderTextColor="#919191"
                keyboardType="numeric"
                value={baby.weight}
                onChangeText={value => {
                  updateBabyForm('weight', value);
                  onChange ? onChange('weight', value) : null;
                }}
              />
              <Text style={styles.unitText}>kg</Text>
            </>
          </View>
        </KeyboardAvoidingView>
        {additional ? (
          <>
            {/*eslint-disable-next-line react-native/no-inline-styles*/}
            <View style={{marginBottom: 20}} />
            <CustomButton title="등록" onPress={submit} />
          </>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    // backgroundColor: 'red',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sheetTitle: {
    color: '#454545',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wrapper: {
    marginTop: 13,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  input: {
    borderColor: '#F3F3F3',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    height: 45,
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
  },
  unitText: {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#454545',
    paddingBottom: 7,
  },
});

export default RegisterBaby;

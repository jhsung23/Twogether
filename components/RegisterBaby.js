import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

function RegisterBaby({babyForm, onChange}) {
  return (
    <View style={styles.block}>
      <View style={styles.wrapper}>
        <>
          <TextInput
            style={styles.input}
            placeholder="아기 이름"
            placeholderTextColor="#919191"
            value={babyForm.name}
            onChangeText={value => onChange('name', value)}
          />
          <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styles.input, {marginStart: 20}]}
            placeholder="몇째인가요?"
            placeholderTextColor="#919191"
            keyboardType="numeric"
            value={babyForm.order}
            onChangeText={value => onChange('order', value)}
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
            value={babyForm.birthYear}
            onChangeText={value => onChange('birthYear', value)}
          />
          <Text style={styles.unitText}>년</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            placeholder="생월"
            placeholderTextColor="#919191"
            keyboardType="numeric"
            value={babyForm.birthMonth}
            onChangeText={value => onChange('birthMonth', value)}
          />
          <Text style={styles.unitText}>월</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            placeholder="생일"
            placeholderTextColor="#919191"
            keyboardType="numeric"
            value={babyForm.birthDay}
            onChangeText={value => onChange('birthDay', value)}
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
            value={babyForm.height}
            onChangeText={value => onChange('height', value)}
          />
          <Text style={styles.unitText}>cm</Text>
        </>
        <>
          <TextInput
            style={styles.input}
            placeholder="몸무게"
            placeholderTextColor="#919191"
            keyboardType="numeric"
            value={babyForm.weight}
            onChangeText={value => onChange('weight', value)}
          />
          <Text style={styles.unitText}>kg</Text>
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    // backgroundColor: 'red',
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

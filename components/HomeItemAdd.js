import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

//TODO
//Pressable onPress에 아기를 등록할 수 있도록 구현 필요

function HomeItemAdd({width}) {
  return (
    <Pressable
      style={[styles.container, styles.boxShadow]}
      width={width}
      onPress={() => console.log('pressed register baby')}>
      <Icon name="add" color={'white'} size={80} />
      <Text style={styles.text}>아기 등록하기</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 335,
    borderRadius: 10,
    // marginHorizontal: 20,
    backgroundColor: '#ebebeb',
    marginEnd: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HomeItemAdd;

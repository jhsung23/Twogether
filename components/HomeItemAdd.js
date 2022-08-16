import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import useModal from '../utils/modal';
import BottomSheet from './BottomSheet';
import RegisterBaby from './RegisterBaby';

function HomeItemAdd({width}) {
  const [isOpenModal, openModal, closeModal] = useModal();

  const pressRegisterBaby = () => {
    openModal();
  };

  return (
    <>
      <Pressable
        style={[styles.container, styles.boxShadow]}
        width={width}
        onPress={pressRegisterBaby}>
        <Icon name="add" color={'white'} size={80} />
        <Text style={styles.text}>아기 등록하기</Text>
      </Pressable>
      <BottomSheet
        modalVisible={isOpenModal}
        onClose={closeModal}
        registerBaby={true}>
        <RegisterBaby onSubmit={closeModal} additional />
      </BottomSheet>
    </>
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

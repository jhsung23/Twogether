import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import BottomSheet from './BottomSheet';
import useModal from '../utils/modal';
import RegisterBaby from './RegisterBaby';

function AddBabyProfile({
  name, //이름
  age, //나이
  order,
}) {
  const [isOpenModal, openModal, closeModal] = useModal();

  const pressRegisterBaby = () => {
    openModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={pressRegisterBaby}>
        <View style={styles.container}>
          <View style={styles.babyImageWrapper}>
            <View style={styles.babyImageBackground}>
              <Image
                source={require('../assets/add.png')}
                resizeMode="cover"
                style={styles.babyImage}
              />
            </View>
            <Text style={styles.babyInfoText}>추가</Text>
          </View>
        </View>
      </TouchableOpacity>
      <BottomSheet
        modalVisible={isOpenModal}
        onClose={closeModal}
        registerBaby={true}>
        <RegisterBaby onSubmit={closeModal} additional />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 100,
    marginEnd: 20,
  },
  babyImageWrapper: {
    width: '100%',
  },
  babyImageBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f5f5f5',
    width: '100%',
    borderRadius: 35,
    borderWidth: 3,
    height: 70,
  },
  babyImage: {
    tintColor: '#f0f0f0',
    width: 40,
    height: 40,
  },
  babyInfoText: {
    alignSelf: 'center',
    marginTop: 3,
    fontSize: 15,
    color: '#c0c0c0',
  },
});

export default AddBabyProfile;

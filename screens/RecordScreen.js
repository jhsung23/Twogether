import React, {useState} from 'react';
import {StyleSheet, Platform, View, Image, Text} from 'react-native';
import {FloatingMenu} from 'react-native-floating-action-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BottomSheet from '../components/BottomSheet';
import useModal from '../utils/modal';
import EatingRecord from '../components/recordSheets/EatRecord';
import SleepRecord from '../components/recordSheets/SleepRecord';
import ToiletRecord from '../components/recordSheets/ToiletRecord';
import HealthRecord from '../components/recordSheets/HealthRecord';
import EtcRecord from '../components/recordSheets/EtcRecord';

// import FloatingWriteButton from '../components/FloatingWriteButton';

function RecordScreen() {
  const [isOpenModal, openModal, closeModal] = useModal();
  const [bottomSheetType, setBottomSheetType] = useState('');
  const pressButton = ({label}, index) => {
    setBottomSheetType(label);
    setIsMenuOpen(false);
    openModal();
  };

  const items = [
    {
      label: '기타 활동 기록',
      image: require('../assets/etc.png'),
      onPress: pressButton,
    },
    {
      label: '건강 기록',
      image: require('../assets/heartbeat.png'),
      onPress: pressButton,
    },
    {
      label: '수면 기록',
      image: require('../assets/sleeping.png'),
      onPress: pressButton,
    },
    {
      label: '배변 기록',
      image: require('../assets/diaper.png'),
      onPress: pressButton,
    },
    {
      label: '섭취 기록',
      image: require('../assets/milk.png'),
      onPress: pressButton,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const renderItemIcon = ({image}) =>
    image && <Image style={styles.image} source={image} resizeMode="contain" />;

  return (
    <View style={styles.block}>
      <FloatingMenu
        items={items}
        isOpen={isMenuOpen}
        onMenuToggle={value => setIsMenuOpen(value)}
        primaryColor="#98c466"
        backgroundUpColor="#98c466"
        backgroundDownColor="rgba(152,196,102,0.6)"
        iconColor="white"
        innerWidth={50}
        right={25}
        bottom={25}
        renderMenuIcon={() => <Icon name="mode-edit" size={24} color="white" />}
        renderItemIcon={renderItemIcon}
      />
      <BottomSheet modalVisible={isOpenModal} onClose={closeModal}>
        {bottomSheetType === '기타 활동 기록' && (
          <EtcRecord onSubmit={closeModal} />
        )}
        {bottomSheetType === '건강 기록' && (
          <HealthRecord onSubmit={closeModal} />
        )}
        {bottomSheetType === '수면 기록' && (
          <SleepRecord onSubmit={closeModal} />
        )}
        {bottomSheetType === '배변 기록' && (
          <ToiletRecord onSubmit={closeModal} />
        )}
        {bottomSheetType === '섭취 기록' && (
          <EatingRecord onSubmit={closeModal} />
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  image: {width: 32, height: 32},
});

export default RecordScreen;

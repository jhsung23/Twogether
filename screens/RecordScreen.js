import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {FloatingMenu} from 'react-native-floating-action-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BottomSheet from '../components/BottomSheet';
import useModal from '../utils/modal';
import EatingRecord from '../components/recordSheets/EatRecord';
import SleepRecord from '../components/recordSheets/SleepRecord';
import ToiletRecord from '../components/recordSheets/ToiletRecord';
import HealthRecord from '../components/recordSheets/HealthRecord';
import EtcRecord from '../components/recordSheets/EtcRecord';

//TODO
//해당하는 아기에 대한 기록을 추가할 수 있도록
//바텀시트에게 현재 record screen에 보여지는
//아기에 대한 정보(order:1(첫째), 2(둘째) 등)를 넘겨주어야 함.
//그래야 바텀시트에서 기록을 저장할 때
//해당 아기의 데이터베이스로 정보가 저장됨.
//-> 해당 부분 현재는 숫자 1로 하드코딩 되어 있으며 레코드 스크린 ui 구현 후에 변경해야 함.

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
          <EtcRecord order={1} onSubmit={closeModal} />
        )}
        {bottomSheetType === '건강 기록' && (
          <HealthRecord order={1} onSubmit={closeModal} />
        )}
        {bottomSheetType === '수면 기록' && (
          <SleepRecord order={1} onSubmit={closeModal} />
        )}
        {bottomSheetType === '배변 기록' && (
          <ToiletRecord order={1} onSubmit={closeModal} />
        )}
        {bottomSheetType === '섭취 기록' && (
          <EatingRecord order={1} onSubmit={closeModal} />
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

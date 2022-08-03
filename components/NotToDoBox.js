import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

function NotToDoBox() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        width={50}
        height={50}
        source={require('../assets/relaxation.png')}
      />
      <Text style={styles.text}>등록된 일정이 없어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#eef5e4',
    justifyContent: 'center',
    alignItems: 'center',

    //그림자
    // shadowColor: '#c4c4c4',
    // shadowOffset: {
    //   width: 0,
    //   height: 9,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 12.35,

    // elevation: 19,
  },
  image: {
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    fontSize: 12,
    color: '#454545',
  },
});

export default NotToDoBox;

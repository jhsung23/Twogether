import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

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
    backgroundColor: '#eef5e4',
    justifyContent: 'center',
    alignItems: 'center',
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

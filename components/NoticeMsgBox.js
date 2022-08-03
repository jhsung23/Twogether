import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function NoticeMsgBox({color, text}) {
  return (
    <View backgroundColor={color} style={[styles.box, styles.boxShadow]}>
      <Icon name="mail" color="white" size={24} style={styles.margin} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 20,
  },
  box: {
    height: 60,
    marginHorizontal: 20,
    borderRadius: 10,
    opacity: 0.85,
    marginTop: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxShadow: {
    shadowColor: '#c4c4c4',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NoticeMsgBox;

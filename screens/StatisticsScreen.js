import React from 'react';
import {StyleSheet, View} from 'react-native';
import ChartKit from '../components/ChartKit';

function StatisticsScreen() {
  return (
    <View>
      <ChartKit />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
});

export default StatisticsScreen;

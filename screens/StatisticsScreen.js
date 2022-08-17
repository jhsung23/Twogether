import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ChartKit from '../components/ChartKit';

function StatisticsScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.block}>
        <ScrollView>
          <ChartKit />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white', paddingTop: 20},
});

export default StatisticsScreen;

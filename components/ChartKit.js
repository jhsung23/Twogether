import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import React, {useState} from 'react';
import {format, add} from 'date-fns';
import {ko} from 'date-fns/locale';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const screenWidth = Dimensions.get('window').width;

function ChartKit() {
  const date = new Date();

  return (
    <SafeAreaView style={styles.full}>
      <ScrollView>
        <View style={styles.block}>
          <Image
            source={require('../assets/calendar.png')}
            style={styles.image}
            resizeMode="center"
          />
          <Text style={styles.titleDate}>
            {format(add(date, {days: -6}), 'MM.dd', {
              locale: ko,
            })}
            <Text> ~ </Text>
            {format(date, 'MM.dd', {
              locale: ko,
            })}
          </Text>
        </View>

        <View style={styles.padding}>
          <Text style={styles.title}>수면 시간</Text>
        </View>

        <BarChart
          data={{
            //x축 이름
            labels: [
              format(add(date, {days: -6}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -5}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -4}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -3}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -2}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -1}), 'MM.dd', {
                locale: ko,
              }),
              format(date, 'MM.dd', {
                locale: ko,
              }),
            ],
            datasets: [
              {
                //표시할 값
                data: [
                  //Math.random() * 100,
                  // 0.13, 0.15, 0.125, 0.13, 0.15, 0.14, 0.16,
                  14, 15, 14, 15, 16, 14, 13,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // 화면 너비만큼 채우기
          height={200} //그래프 높이
          // yAxisLabel="$" //y축 첫글자
          yAxisSuffix="시간" //y축 끝글자
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#ffffff', //왼쪽 색(그라데이션)
            backgroundGradientTo: '#ffffff', //오른쪽 색
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //막대, 점선 색
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //글자 색
            barPercentage: 0.8, //막대 너비
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '5',
              stroke: '#ffa726',
            },
          }}
          bezier //선그래프에서 곡선옵션
          style={{
            marginVertical: 8, //그래프 위 마진
            borderRadius: 0, //그림 테두리 둥근정도
          }}
        />

        <View style={styles.padding}>
          <Text style={styles.title}>낮잠 시간</Text>
        </View>

        <BarChart
          data={{
            //x축 이름
            labels: [
              format(add(date, {days: -6}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -5}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -4}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -3}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -2}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -1}), 'MM.dd', {
                locale: ko,
              }),
              format(date, 'MM.dd', {
                locale: ko,
              }),
            ],
            datasets: [
              {
                //표시할 값
                data: [
                  //Math.random() * 100,
                  // 0.13, 0.15, 0.125, 0.13, 0.15, 0.14, 0.16,
                  2, 2, 4, 2, 3, 4, 4,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // 화면 너비만큼 채우기
          height={200} //그래프 높이
          // yAxisLabel="$" //y축 첫글자
          yAxisSuffix="시간" //y축 끝글자
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#ffffff', //왼쪽 색(그라데이션)
            backgroundGradientTo: '#ffffff', //오른쪽 색
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //막대, 점선 색
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //글자 색
            barPercentage: 0.8, //막대 너비
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '5',
              stroke: '#ffa726',
            },
          }}
          bezier //선그래프에서 곡선옵션
          style={{
            marginVertical: 8, //그래프 위 마진
            borderRadius: 0, //그림 테두리 둥근정도
          }}
        />

        <View style={styles.padding}>
          <Text style={styles.title}>배변 횟수</Text>
        </View>

        <BarChart
          data={{
            //x축 이름
            labels: [
              format(add(date, {days: -6}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -5}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -4}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -3}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -2}), 'MM.dd', {
                locale: ko,
              }),
              format(add(date, {days: -1}), 'MM.dd', {
                locale: ko,
              }),
              format(date, 'MM.dd', {
                locale: ko,
              }),
            ],
            datasets: [
              {
                //표시할 값
                data: [
                  //Math.random() * 100,
                  // 0.13, 0.15, 0.125, 0.13, 0.15, 0.14, 0.16,
                  1, 2, 1, 1, 1, 2, 2,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // 화면 너비만큼 채우기
          height={200} //그래프 높이
          // yAxisLabel="$" //y축 첫글자
          yAxisSuffix="번" //y축 끝글자
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#ffffff', //왼쪽 색(그라데이션)
            backgroundGradientTo: '#ffffff', //오른쪽 색
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //막대, 점선 색
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //글자 색
            barPercentage: 0.8, //막대 너비
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '5',
              stroke: '#ffa726',
            },
          }}
          bezier //선그래프에서 곡선옵션
          style={{
            marginVertical: 8, //그래프 위 마진
            borderRadius: 0, //그림 테두리 둥근정도
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: 'black',
    marginTop: 25,
    marginBottom: 5,
  },
  block: {
    width: '70%',
    height: 80,
    marginLeft: 60,
    //flex: 1,
    alignItems: 'center', //가로 가운데
    justifyContent: 'center', //세로
    flexDirection: 'row',
    borderStyle: 'solid',
    borderRadius: 50 / 2,
    borderWidth: 2,
  },
  titleDate: {
    fontSize: 30,
    color: 'black',
    marginTop: 5,
  },
  full: {
    //flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  padding: {
    paddingLeft: 5,
  },
  image: {
    width: 30,
    marginHorizontal: 15,
    marginTop: 5,
    height: 30,
  },
});

export default ChartKit;

import React, {useEffect, useState, useCallback} from 'react';
// import {BarChart} from 'react-native-chart-kit';
import {BarChart} from 'react-native-gifted-charts';
import {format, add} from 'date-fns';
import {ko} from 'date-fns/locale';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Chip} from 'react-native-paper';
import PieChart from 'react-native-pie-chart';
import Tooltip from 'react-native-walkthrough-tooltip';
import Icon from 'react-native-vector-icons/Octicons';

import {useUserContext} from '../contexts/UserContext';
import {getEat, getToilet, getSleep} from '../lib/records';
import events from '../lib/events';
import {getBabyOrder} from '../lib/baby';
import {getCount} from '../lib/statistics';
import {getAchieveBadges} from '../lib/badge';

const screenWidth = Dimensions.get('window').width;
const orderKor = [{1: '첫째'}, {2: '둘째'}, {3: '셋째'}, {4: '넷째'}];

function ChartKit() {
  const date = new Date();

  const {user} = useUserContext();
  const id = user.id;
  const code = user.code;

  const [count, setCount] = useState();
  const [achieveBadge, setAchieveBadge] = useState();
  const [eat, setEat] = useState();
  const [toilet, setToilet] = useState();
  const [sleep, setSleep] = useState();

  const [category, setCategory] = useState([]);
  const [selectedChip, setSelectedChip] = useState('1');
  const [order, setOrder] = useState('1'); //기본값은 첫째

  const [eatVisible, setEatVisible] = useState(false);
  const [toiletVisible, setToiletVisible] = useState(false);
  const [sleepVisible, setSleepVisible] = useState(false);

  // firebase에서 데이터 Load
  useEffect(() => {
    getEat({code, order}).then(setEat);
    getToilet({code, order}).then(setToilet);
    getSleep({code, order}).then(setSleep);
  }, [code, order]);

  // firebase에서 칩 세팅을 위한 자녀 명수 정보 load
  useEffect(() => {
    console.log('chip setting');
    getBabyOrder({code}).then(setCategory);
  }, [code]);

  //count 정보 load
  useEffect(() => {
    getCount({code, id}).then(setCount);
  }, [code, id]);

  //사용자의 뱃지 현황 가져오기
  useEffect(() => {
    getAchieveBadges({id}).then(setAchieveBadge);
  }, [id]);

  // 아기 추가 등록 시 chip 새로 셋팅할 수 있도록 order reload
  const updateBaby = useCallback(() => {
    getBabyOrder({code}).then(setCategory);
  }, [code]);

  useEffect(() => {
    events.addListener('updateBaby', updateBaby);

    return () => {
      events.removeListener('updateBaby', updateBaby);
    };
  }, [updateBaby]);

  // record 등록 시 통계에 바로 반영되도록 동기화
  const chartUpdate = useCallback(() => {
    getEat({code, order}).then(setEat);
    getToilet({code, order}).then(setToilet);
    getSleep({code, order}).then(setSleep);
    getCount({code, id}).then(setCount);
  }, [code, order, id]);

  useEffect(() => {
    events.addListener('chartUpdate', chartUpdate);

    return () => {
      events.removeListener('chartUpdate', chartUpdate);
    };
  }, [chartUpdate]);

  // 배지 획득 시 통계에 바로 반영되도록 동기화
  const badgeUpdate = useCallback(() => {
    getAchieveBadges({id}).then(setAchieveBadge);
  }, [id]);

  useEffect(() => {
    events.addListener('statisticsBadgeUpdate', badgeUpdate);

    return () => {
      events.removeListener('statisticsBadgeUpdate', badgeUpdate);
    };
  }, [badgeUpdate]);

  const widthAndHeight = 110;
  const series = [!count ? 0 : count.length ? count.length : 0, 4]; //자기자신이 0번, 파트너 1번
  const sliceColor = ['rgba(255, 211, 99,0.7)', 'rgba(255, 232, 179, 0.6)'];

  const eatData = [
    {label: '08.15', value: 4},
    {label: '08.16', value: 3},
    {label: '08.17', value: 4},
    {label: '08.18', value: !eat ? 0 : eat.length ? eat.length : 0},
  ];

  const toiletData = [
    {label: '08.15', value: 4},
    {label: '08.16', value: 3},
    {label: '08.17', value: 4},
    {label: '08.18', value: !toilet ? 0 : toilet.length ? toilet.length : 0},
  ];

  const sleepData = [
    {label: '08.15', value: 4},
    {label: '08.16', value: 3},
    {label: '08.17', value: 4},
    {label: '08.18', value: !sleep ? 0 : sleep.length ? sleep.length : 0},
  ];

  //render
  return (
    <View>
      <Text style={styles.title}>나의 육아 참여도는?</Text>
      <View style={styles.reportBoxContainer}>
        <View style={styles.box}>
          <View style={styles.pieChart}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
            />
          </View>
          <View style={styles.pieChartDescription}>
            <View style={styles.rowContent}>
              <View style={styles.contentItemBox}>
                <Text style={styles.contentItem}>나의 기록 횟수</Text>
              </View>
              <Text style={styles.contenItemText}>
                {!count ? 0 : count.length ? count.length : 0}회
              </Text>
            </View>

            <View style={styles.rowContent}>
              <View style={styles.contentItemBox}>
                <Text style={styles.contentItem}>획득한 배지 개수</Text>
              </View>
              <Text style={styles.contenItemText}>{achieveBadge}개</Text>
            </View>

            <View style={styles.rowContent}>
              <View style={styles.contentItemBox}>
                <Text style={styles.contentItem}>배우자의 기록 횟수 </Text>
              </View>
              <Text style={styles.contenItemText}>3회</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.title}>우리 아이 기록 통계</Text>
      <View style={styles.chipWrapper}>
        <Text style={styles.categoryText}>아기 구분</Text>
        {category.map(({id}) => (
          <Chip
            key={id}
            style={styles.chip}
            textStyle={styles.chipText}
            height={30}
            icon={id === selectedChip ? 'check' : null}
            selected={id === selectedChip}
            onPress={() => {
              if (id === selectedChip) {
                setSelectedChip(null);
              } else {
                setSelectedChip(id);
                setOrder(id + '');
              }
            }}>
            {orderKor[parseInt(id, 10) - 1][id]}
          </Chip>
        ))}
      </View>

      <View style={styles.titleHeader}>
        <Text style={styles.title}>섭취 횟수</Text>
        <Tooltip
          isVisible={eatVisible}
          onClose={() => setEatVisible(!eatVisible)}
          content={
            <Text>
              영유아 권장 단백질/수분 섭취량{'\n'}
              {'\n'}
              0~11개월 : 13g, 750ml{'\n'}
              1~3세 : 13g, 1000ml
            </Text>
          }>
          <TouchableOpacity onPress={() => setEatVisible(!eatVisible)}>
            <Icon
              style={styles.icon}
              name={'question'}
              color={'#c0c0c0'}
              size={18}
            />
          </TouchableOpacity>
        </Tooltip>
      </View>
      <View style={styles.barchart}>
        <BarChart
          data={eatData}
          width={260}
          initialSpacing={30}
          height={140}
          yAxisThickness={0}
          xAxisColor="#454545"
          yAxisLabelTexts={['0번', ' 2번', ' 4번', ' 6번', ' 8번', '10번']}
          spacing={30}
          barWidth={30}
          barBorderRadius={4}
          minValue={0}
          noOfSections={5}
          backgroundColor="#f5f5f5"
          frontColor={'rgba(152,196,102,0.5)'}
          showLine
          lineConfig={{
            color: '#F29C6E',
            thickness: 4,
            curved: true,
            hideDataPoints: true,
            shiftY: 5,
            initialSpacing: 15,
          }}
          dashWidth={4}
        />
      </View>

      <View style={styles.titleHeader}>
        <Text style={styles.title}>배변 횟수</Text>
        <Tooltip
          isVisible={toiletVisible}
          onClose={() => setToiletVisible(!toiletVisible)}
          content={
            <Text>
              유아 평균 배변 횟수{'\n'}
              {'\n'}
              출생~3개월(모유수 유아): 2.9회{'\n'}
              출생~3개월(분유수 유아): 2.0회{'\n'}
              6-10개월: 1.8회{'\n'}
              1-3세: 1.4회
            </Text>
          }>
          <TouchableOpacity onPress={() => setToiletVisible(!toiletVisible)}>
            <Icon
              style={styles.icon}
              name={'question'}
              color={'#c0c0c0'}
              size={18}
            />
          </TouchableOpacity>
        </Tooltip>
      </View>
      <View style={styles.barchart}>
        <BarChart
          data={toiletData}
          initialSpacing={30}
          dashWidth={4}
          width={260}
          height={140}
          yAxisThickness={0}
          xAxisColor="#454545"
          spacing={30}
          barWidth={30}
          barBorderRadius={4}
          minValue={0}
          noOfSections={5}
          backgroundColor="#f5f5f5"
          yAxisLabelTexts={['0번', ' 2번', ' 4번', ' 6번', ' 8번', '10번']}
          showLine
          lineConfig={{
            color: '#F29C6E',
            thickness: 4,
            curved: true,
            hideDataPoints: true,
            shiftY: 5,
            initialSpacing: 15,
          }}
          frontColor={'rgba(232, 135, 159, 0.5)'}
        />
      </View>

      <View style={styles.titleHeader}>
        <Text style={styles.title}>수면 횟수</Text>
        <Tooltip
          isVisible={sleepVisible}
          onClose={() => setSleepVisible(!sleepVisible)}
          content={
            <Text>
              유아 평균 수면 시간{'\n'}
              {'\n'}
              4~12개월: 12 ~ 16 시간{'\n'}
              1~2세: 11 ~ 14 시간{'\n'}
              3세 이상: 10 ~ 13시간
            </Text>
          }>
          <TouchableOpacity onPress={() => setSleepVisible(!sleepVisible)}>
            <Icon
              style={styles.icon}
              name={'question'}
              color={'#c0c0c0'}
              size={18}
            />
          </TouchableOpacity>
        </Tooltip>
      </View>
      <View style={styles.barchart}>
        <BarChart
          data={sleepData}
          dashWidth={4}
          initialSpacing={30}
          height={140}
          width={260}
          yAxisThickness={0}
          xAxisColor="#454545"
          spacing={30}
          barWidth={30}
          barBorderRadius={4}
          minValue={0}
          maxValue={6}
          noOfSections={6}
          backgroundColor="#f5f5f5"
          showLine
          lineConfig={{
            color: '#F29C6E',
            thickness: 4,
            curved: true,
            hideDataPoints: true,
            shiftY: 5,
            initialSpacing: 15,
          }}
          yAxisLabelTexts={['0번', '1번', ' 2번', ' 3번', ' 4번', '5번', '6번']}
          frontColor={'rgba(168, 205, 240, 1)'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#454545',
    marginStart: 20,
    // marginTop: 10,
    fontWeight: 'bold',
  },
  reportBoxContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 180,
  },
  box: {
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    height: '100%',
    width: '100%',
    marginEnd: 10,
    flexDirection: 'row',
  },
  categoryText: {fontSize: 15, marginStart: 20, marginEnd: 10},
  chipWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  chip: {
    marginEnd: 5,
    justifyContent: 'center',
    backgroundColor: 'rgba(152,196,102,0.25)',
  },
  chipText: {
    color: '#454545',
    fontSize: 15,
  },
  pieChart: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '43%',
  },
  pieChartDescription: {
    justifyContent: 'center',
    width: '57%',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  contentItemBox: {
    backgroundColor: '#dbdbdb',
    alignSelf: 'baseline',
    paddingHorizontal: 10,
    height: 23,
    justifyContent: 'center',
    borderRadius: 8,
  },
  contentItem: {
    color: '#ffffff',
    fontSize: 12,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  contenItemText: {
    fontSize: 15,
    marginStart: 10,
    color: '#454545',
  },
  pieDescriptionTitle: {
    fontSize: 14,
    color: '#454545',
  },
  barGraphContainer: {
    width: '100%',
    marginHorizontal: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  barchart: {
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
    padding: 10,
  },
  titleHeader: {
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'flex-end',
    marginEnd: 25,
  },
});

export default ChartKit;

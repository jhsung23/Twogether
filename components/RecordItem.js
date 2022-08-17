import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {format} from 'date-fns';

const RECORD_TYPE_TO_COLOR = {
  eat: 'rgba(152,196,102,0.5)',
  toilet: 'rgba(232, 135, 159, 0.4)',
  sleep: 'rgba(168, 205, 240, 1)',
  health: 'rgba(255, 212, 120, 0.8)',
  etc: 'rgba(242, 155, 111,0.7)',
};

const RECORD_TYPE_TO_TEXT = {
  eat: '섭취 기록',
  toilet: '배변 기록',
  sleep: '수면 기록',
  health: '병원 방문 기록',
  etc: '기타 활동 기록',
};

function RecordItem({type, how, memo, what, when, whenEnd, diff, writer}) {
  return (
    <View style={styles.container}>
      <View style={styles.time}>
        {/* FIXME: when 없는 경우 때문에 존재여부 확인 */}
        {when && (
          <Text style={styles.timeText}>{format(when.toDate(), 'HH:mm')}</Text>
        )}
        {whenEnd && (
          <Text style={styles.timeText}>
            ~ {format(whenEnd.toDate(), 'HH:mm')}
          </Text>
        )}
      </View>

      <View
        style={{...styles.divider, backgroundColor: RECORD_TYPE_TO_COLOR[type]}}
      />

      <View style={styles.content}>
        <View style={styles.leftWidth}>
          <Text style={styles.recordType}>{RECORD_TYPE_TO_TEXT[type]}</Text>
          <View style={styles.contentWrapper}>
            <View
              style={{
                backgroundColor: RECORD_TYPE_TO_COLOR[type],
                ...styles.contentItemBox,
              }}>
              <Text style={styles.contentItem}>
                {type === 'health' ? '방문 목적' : '종류'}
              </Text>
            </View>
            <Text style={styles.contentValue}>{what}</Text>
            {type === 'health' ? null : (
              <>
                <View
                  style={{
                    backgroundColor: RECORD_TYPE_TO_COLOR[type],
                    ...styles.contentItemBox,
                  }}>
                  <Text style={styles.contentItem}>
                    {type === 'sleep'
                      ? '수면 시간'
                      : type === 'etc'
                      ? '활동 시간'
                      : '양'}
                  </Text>
                </View>
                <Text style={styles.contentValue}>
                  {type === 'sleep' ? diff + '시간' : how}
                </Text>
              </>
            )}
          </View>

          <View style={styles.contentWrapper}>
            <View
              style={{
                backgroundColor: RECORD_TYPE_TO_COLOR[type],
                ...styles.contentItemBox,
              }}>
              <Text style={styles.contentItem}>특이사항</Text>
            </View>
            {memo.length === 0 ? (
              <Text style={styles.noneContentValue}>없음</Text>
            ) : (
              <Text style={styles.contentValue}>{memo}</Text>
            )}
          </View>
        </View>
        <View style={styles.rightWidth}>
          <Image
            style={styles.userPhoto}
            source={
              writer === undefined
                ? require('../assets/user.png')
                : {
                    uri: writer,
                  }
            }
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  time: {
    width: 40,
  },
  timeText: {
    color: '#454545',
    fontSize: 13,
  },
  divider: {
    width: 5,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 7,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  leftWidth: {
    width: '85%',
  },
  rightWidth: {
    width: '15%',
    alignItems: 'flex-end',
  },
  recordType: {
    fontSize: 17,
    marginBottom: 2,
    color: '#505050',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  contentItem: {
    color: '#ffffff',
    fontSize: 14,
  },
  contentItemBox: {
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    height: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  contentValue: {
    marginStart: 6,
    marginEnd: 10,
    fontSize: 15,
    color: '#454545',
  },
  noneContentValue: {
    marginStart: 6,
    marginEnd: 10,
    fontSize: 15,
    color: '#b0b0b0',
  },
  userPhoto: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
});

export default RecordItem;

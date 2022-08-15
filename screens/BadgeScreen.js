import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';

import BadgeGridItem from '../components/badge/BadgeGridItem';
import {useUserContext} from '../contexts/UserContext';
import {getBadges, getAchieveBadges} from '../lib/badge';
import events from '../lib/events';

function BadgeScreen() {
  const {user} = useUserContext();
  const id = user.id;

  const [badge, setBadge] = useState();
  const [achieveBadge, setAchieveBadge] = useState();

  //사용자의 뱃지 현황 가져오기
  useEffect(() => {
    getBadges({id}).then(setBadge);
    getAchieveBadges({id}).then(setAchieveBadge);
  }, [id]);

  const update = useCallback(() => {
    getBadges({id}).then(setBadge);
    getAchieveBadges({id}).then(setAchieveBadge);
  }, [id]);

  useEffect(() => {
    events.addListener('badgeUpdate', update);

    return () => {
      events.removeListener('badgeUpdate', update);
    };
  }, [update]);

  return (
    <View style={styles.block}>
      <View style={styles.titleTextWrapper}>
        <Text style={styles.titleText}>나의 배지 현황</Text>
      </View>
      <Text style={styles.description}>
        목표가 달성되면 자동으로 배지가 획득돼요!
      </Text>
      <Text style={styles.description}>
        지금까지 획득한 배지 개수: {achieveBadge}
      </Text>
      <FlatList
        style={styles.list}
        data={badge}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const renderItem = ({item}) => <BadgeGridItem badge={item} />;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  list: {
    marginTop: 10,
    flex: 1,
  },
  titleTextWrapper: {
    borderRadius: 20,
    marginStart: 15,
    marginTop: 20,
    marginBottom: 15,
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(152,196,102,0.15)',
  },
  titleText: {
    color: '#454545',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginStart: 25,
    color: '#454545',
    marginTop: 5,
    fontSize: 15,
  },
});

export default BadgeScreen;

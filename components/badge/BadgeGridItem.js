import React, {Fragment} from 'react';
import {StyleSheet, useWindowDimensions, Image, Text, View} from 'react-native';

function BadgeGridItem({badge}) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 3) / 3;

  return (
    <View
      style={[
        styles.block,
        {
          width: size,
          height: size,
        },
      ]}>
      <View
        style={[styles.imageWrapper, {width: size - 25, height: size - 25}]}>
        {badge.achieve ? (
          <Image
            source={{uri: badge.badgeImageUri}}
            resizeMethod="auto"
            resizeMode="contain"
            style={{width: size - 65, height: size - 65}}
          />
        ) : (
          <>
            <Fragment>
              <Image
                source={{uri: badge.badgeImageUri}}
                resizeMethod="auto"
                resizeMode="contain"
                style={styles.notAchieveImage}
              />
              <Image
                source={{uri: badge.badgeImageUri}}
                resizeMethod="auto"
                resizeMode="contain"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: size - 65,
                  height: size - 65,
                  position: 'absolute',
                  opacity: 0.2,
                }}
              />
            </Fragment>
            <Text style={styles.notAchieveText}>
              아직 획득하지{'\n'}못했어요
            </Text>
          </>
        )}
        {badge.achieve ? (
          <Text style={styles.achieveText}>{badge.badgeName}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    margin: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notAchieveImage: {
    tintColor: 'gray',
    opacity: 0.3,
  },
  notAchieveText: {
    color: '#858585',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 11,
  },
  achieveText: {
    marginTop: 4,
    color: '454545',
    fontSize: 11,
  },
});

export default BadgeGridItem;

import React from 'react';
import {StyleSheet, View, Pressable, Platform, Text} from 'react-native';

function CustomButton({onPress, title, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';
  return (
    <View style={[styles.block, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{
          color: '#ffffff',
        }}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 15,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    //배경색 제거
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  primaryWrapper: {
    //primary면 배경색깔 지정해줌
    backgroundColor: '#FFDD95',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#8D8D8D',
  },

  margin: {
    marginBottom: 8,
  },
});

export default CustomButton;

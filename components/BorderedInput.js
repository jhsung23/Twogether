import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

function BorderedInput({hasMarginBottom, ...rest}, ref) {
  //hasMarginBottom이 true라면 하단에 여백 지정
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      ref={ref}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#F3F3F3',
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: '#F3F3F3',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderedInput);

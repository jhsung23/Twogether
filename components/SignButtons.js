import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';

//SignInScreen에서 쓰는 버튼
function SignButtons({isSignUp, onSubmit, loading}) {
  const navigation = useNavigation();
  const primaryTitle = isSignUp ? '회원가입' : '로그인';
  const secondaryTitle = isSignUp ? '로그인' : '회원가입';

  const onSecondaryButtonPress = () => {
    if (isSignUp) {
      navigation.goBack(); //회원가입창에서 로그인버튼 누르면 이전화면으로 감
    } else {
      navigation.push('SignIn', {isSignUp: true}); //Rootstack에 있는이름. 로그인화면 이동
    }
  };

  if (loading) {
    //로딩시 돌아가는 효과
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#FFDD95" />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      <CustomButton title={primaryTitle} hasMarginBottom onPress={onSubmit} />
      <CustomButton
        title={secondaryTitle}
        theme="secondary"
        onPress={onSecondaryButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttons: {
    marginTop: 64,
  },
});

export default SignButtons;

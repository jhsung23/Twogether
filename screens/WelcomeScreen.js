import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SetupProfile from '../components/SetupProfile';

//사용자의 프로필사진, 성함 등록
function WelcomeScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.block}>
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.description}>
          서비스 이용을 위한 프로필을 작성해주세요.
        </Text>
        <SetupProfile />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
    backgroundColor: 'white',
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#494949',
  },
  description: {
    marginTop: 5,
    fontSize: 16,
    color: '#757575',
  },
});
export default WelcomeScreen;

import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignInForm from '../components/SignInForm';
import {signIn, signUp} from '../lib/auth';
import {getUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params || {};
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState();
  const {setUser} = useUserContext();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      return;
    }

    const info = {email, password};
    setLoading(true);

    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      const profile = await getUser(user.uid);

      //navigation.navigate('MainTab', {uid: user.uid});
      if (!profile) {
        //사용자가 존재하지 않을때
        navigation.navigate('Welcome', {uid: user.uid});
      } else {
        setUser(profile); //로그인했을때 프로필이 존재하면 setUser 호출
      }
      setUser(profile);
      //console.log(profile);
      console.log(user);
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지않는 이메일 주소입니다.',
      };
      const msg = messages[e.code] || `${isSignUp ? ' 가입' : '로그인'}실패`;
      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>Together</Text>
        <View style={styles.form}>
          <SignInForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#494949',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});
export default SignInScreen;

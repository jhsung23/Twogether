import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

//인풋
function SignInForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none" //첫번째 문자 자동 대문자 해제
        autoCorrect={false} //자동 수정 비활성
        autoCompleteType="email" //이메일 자동 완성
        keyboardType="email-address" //이메일 전용 키보드 활성화
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호"
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry //비밀번호 숨김
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && ( //회원가입이면 비밀번호 확인을 보여줌
        <BorderedInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}
export default SignInForm;

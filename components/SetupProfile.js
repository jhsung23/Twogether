import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Chip} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import {signOut} from '../lib/auth';
import {createUser, getUser} from '../lib/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import RegisterBaby from './RegisterBaby';
import {createBaby} from '../lib/baby';
import {createCount} from '../lib/statistics';
import {
  createBadge1,
  createBadge2,
  createBadge3,
  createBadge4,
  createBadge5,
  createBadge6,
  createBadge7,
  createBadge8,
  createBadge9,
  createBadge10,
  createBadge11,
  createBadge12,
} from '../lib/badge';

const roleChips = [
  {id: 1, content: '엄마'},
  {id: 2, content: '아빠'},
  {id: 3, content: '할머니'},
  {id: 4, content: '할아버지'},
  {id: 5, content: '선생님'},
];

const role = {
  1: '엄마',
  2: '아빠',
  3: '할머니',
  4: '할아버지',
  5: '선생님',
};

const answerChips = [
  {id: 1, content: '네'},
  {id: 2, content: '아니요'},
];

function SetupProfile() {
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const [response, setResponse] = useState(null);

  //user info
  const [displayName, setDisplayName] = useState(''); //닉네임
  const [selectedRole, setSelectedRole] = useState(''); //역할
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [code, setCode] = useState('');

  const [babyForm, setBabyForm] = useState({
    name: '',
    order: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    height: '',
    weight: '',
  });

  const updateBabyForm = (key, value) => {
    value = value + '';
    setBabyForm({...babyForm, [key]: value});
  };

  const {params} = useRoute();
  const {uid} = params || {};

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    if (response) {
      const asset = response.assets[0];
      const extension = asset.fileName.split('.').pop(); //확장자 추출
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      if (Platform.OS === 'android') {
        await reference.putString(asset.base64, 'base64', {
          contentType: asset.type,
        });
      } else {
        await reference.putFile(asset.uri);
      }
      photoURL = response ? await reference.getDownloadURL() : null;
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
      code,
      role: role[selectedRole],
    };

    await createUser(user);
    const userInfo = await getUser({id: uid});
    setUser(userInfo);

    createCount({code, id: uid});

    //badge 등록
    const id = userInfo.id;
    console.log(id);
    createBadge1({id});
    createBadge2({id});
    createBadge3({id});
    createBadge4({id});
    createBadge5({id});
    createBadge6({id});
    createBadge7({id});
    createBadge8({id});
    createBadge9({id});
    createBadge10({id});
    createBadge11({id});
    createBadge12({id});

    if (selectedAnswer === 2) {
      // eslint-disable-next-line no-shadow
      const code = userInfo.code;

      await createBaby({code, babyForm});
    }
  };
  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          //취소했을경우
          return;
        }
        setResponse(res);
      },
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}>
      <View style={styles.block}>
        <Pressable onPress={onSelectImage}>
          <Image
            style={styles.circle}
            source={
              response
                ? {uri: response?.assets[0]?.uri}
                : require('../assets/user.png') //response값이 없으면 user.png를 보여줌
            }
          />
        </Pressable>
        <View style={styles.form}>
          <BorderedInput
            placeholder="성함"
            placeholderTextColor="#919191"
            onChangeText={setDisplayName}
            value={displayName}
            onSubmitEditing={onSubmit}
            returnKeyType="next"
          />
          <View style={styles.chipWrapper}>
            {roleChips.map(({id, content}) => (
              <Chip
                key={id}
                style={styles.chip}
                textStyle={styles.chipText}
                height={30}
                icon={id === selectedRole ? 'check' : null}
                selected={id === selectedRole}
                onPress={() => {
                  if (id === selectedRole) {
                    setSelectedRole('');
                  } else {
                    setSelectedRole(id);
                  }
                }}>
                {content}
              </Chip>
            ))}
          </View>
          <Text style={styles.questionText}>등록된 아기 정보가 있나요?</Text>
          <View style={styles.chipWrapper}>
            {answerChips.map(({id, content}) => (
              <Chip
                key={id}
                style={styles.chip}
                textStyle={styles.chipText}
                height={30}
                icon={id === selectedAnswer ? 'check' : null}
                selected={id === selectedAnswer}
                onPress={() => {
                  if (id === selectedAnswer) {
                    setSelectedAnswer(null);
                  } else {
                    setSelectedAnswer(id);
                  }
                }}>
                {content}
              </Chip>
            ))}
          </View>
          {!selectedAnswer ? null : selectedAnswer === 2 ? (
            <>
              <Text style={styles.questionText}>아기 정보를 등록해주세요.</Text>
              <RegisterBaby babyForm={babyForm} onChange={updateBabyForm} />
            </>
          ) : (
            <>
              <Text style={styles.questionText}>
                공동 양육자 코드를 입력해주세요.
              </Text>
              <BorderedInput
                hasMarginTop
                placeholder="코드 입력"
                placeholderTextColor="#919191"
                onChangeText={setCode}
                value={code}
                onSubmitEditing={onSubmit}
                returnKeyType="next"
              />
            </>
          )}
          {loading ? (
            <ActivityIndicator
              size={32}
              color="#FFDD95"
              style={styles.spinner}
            />
          ) : (
            <View style={styles.buttons}>
              <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
              <CustomButton title="취소" onPress={onCancel} theme="secondary" />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 16,
    width: '100%',
  },
  circle: {
    backgroundColor: '#cdcdcd',
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 30,
  },
  chipWrapper: {
    // backgroundColor: 'red',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 13,
    marginBottom: 25,
  },
  chip: {
    marginEnd: 5,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 221, 149, 0.35)',
  },
  chipText: {
    color: '#454545',
    fontSize: 15,
  },
  questionText: {
    color: '#454545',
    fontSize: 17,
  },
});

export default SetupProfile;

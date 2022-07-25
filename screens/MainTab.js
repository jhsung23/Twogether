import React from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import RecordScreen from './RecordScreen';
import StatisticsScreen from './StatisticsScreen';
import BadgeScreen from './BadgeScreen';
import MypageScreen from './MypageScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#98c466',
      }}>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{
          headerTitleAlign: Platform.OS === 'ios' ? 'left' : undefined,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                // eslint-disable-next-line react-native/no-inline-styles
                style={{paddingRight: 20}}
                name="chatbubbles-outline"
                size={24}
                color={'#424242'}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="기록"
        component={RecordScreen}
        options={{
          headerTitleAlign: Platform.OS === 'ios' ? 'left' : undefined,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="event-note" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="통계"
        component={StatisticsScreen}
        options={{
          headerTitleAlign: Platform.OS === 'ios' ? 'left' : undefined,
          tabBarIcon: ({color, size}) => (
            <Octicons name="graph" size={size - 5} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="배지"
        component={BadgeScreen}
        options={{
          headerTitleAlign: Platform.OS === 'ios' ? 'left' : undefined,
          tabBarIcon: ({color, size}) => (
            <Feather name="award" size={size - 4} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={MypageScreen}
        options={{
          headerTitleAlign: Platform.OS === 'ios' ? 'left' : undefined,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;

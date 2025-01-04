import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CalendarScreen from '../screens/CalendarScreen';
import LibraryScreen from '../screens/LibraryScreen';
import MypageScreen from '../screens/MypageScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          tabBarActiveTintColor: '#000',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: 'HOME',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'home'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            title: 'CALENDAR',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'calendar-month'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            title: 'LIBRARY',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'grade'} color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Mypage"
          component={MypageScreen}
          options={{
            title: 'MYPAGE',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'person'} color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

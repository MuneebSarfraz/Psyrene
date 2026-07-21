import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/auth/WelcomeScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/home/DashboardScreen';
import DailyCheckinScreen from '../screens/moodCheckin/DailyCheckinScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import AIChatScreen from '../screens/chatbot/AIChatScreen';
import TherapistsScreen from '../screens/therapists/TherapistsScreen';
import TherapistDetailScreen from '../screens/therapists/TherapistDetailScreen';
import BookSessionScreen from '../screens/booking/BookSessionScreen';
import CallSessionScreen from '../screens/session/CallSessionScreen';
import ExercisesScreen from '../screens/exercises/ExercisesScreen';
import RecordsScreen from '../screens/records/RecordsScreen';
import RewardsScreen from '../screens/rewards/RewardsScreen';
import FinancialAidScreen from '../screens/financialAid/FinancialAidScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: { backgroundColor: '#F4EFE8' } }}
      >
        {/* Auth */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Main tabs (as stack routes so bottom nav can navigate freely) */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="AIChat" component={AIChatScreen} />
        <Stack.Screen name="Therapists" component={TherapistsScreen} />
        <Stack.Screen name="Records" component={RecordsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />

        {/* Detail / flow screens */}
        <Stack.Screen name="DailyCheckin" component={DailyCheckinScreen} />
        <Stack.Screen name="TherapistDetail" component={TherapistDetailScreen} />
        <Stack.Screen name="BookSession" component={BookSessionScreen} />
        <Stack.Screen name="CallSession" component={CallSessionScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Exercises" component={ExercisesScreen} />
        <Stack.Screen name="Rewards" component={RewardsScreen} />
        <Stack.Screen name="FinancialAid" component={FinancialAidScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
